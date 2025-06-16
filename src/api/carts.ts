// Base API URL for DummyJSON
const API_BASE_URL = "https://dummyjson.com";

export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface UserCartsResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

/**
 * Fetches all carts (order history) for a specific user
 * @param userId - The user ID to fetch carts for
 * @returns Promise<UserCartsResponse> - User's cart history
 */
export async function fetchUserCarts(
  userId: number
): Promise<UserCartsResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/carts`);

    if (!response.ok) {
      throw new Error(`Failed to fetch user carts: ${response.statusText}`);
    }

    const data: UserCartsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user carts:", error);
    throw error;
  }
}

/**
 * Fetches a single cart by ID
 * @param cartId - The cart ID to fetch
 * @returns Promise<Cart> - The cart data
 */
export async function fetchCartById(cartId: number): Promise<Cart> {
  try {
    const response = await fetch(`${API_BASE_URL}/carts/${cartId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.statusText}`);
    }

    const cart: Cart = await response.json();
    return cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

/**
 * Fetches all carts (useful for admin or general overview)
 * @param limit - Number of carts to fetch (default: 20)
 * @param skip - Number of carts to skip (default: 0)
 * @returns Promise<{ carts: Cart[]; total: number; skip: number; limit: number }> - All carts data
 */
export async function fetchAllCarts(
  limit: number = 20,
  skip: number = 0
): Promise<{
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/carts?limit=${limit}&skip=${skip}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch carts: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all carts:", error);
    throw error;
  }
}

/**
 * Gets previously purchased products for a user
 * @param userId - The user ID to get purchase history for
 * @returns Promise<CartProduct[]> - Array of all previously purchased products
 */
export async function getPreviouslyPurchased(
  userId: number
): Promise<CartProduct[]> {
  try {
    const userCarts = await fetchUserCarts(userId);

    // Flatten all products from all carts
    const allProducts: CartProduct[] = userCarts.carts.flatMap(
      (cart) => cart.products
    );

    // Remove duplicates based on product ID and aggregate quantities
    const uniqueProducts: { [key: number]: CartProduct } = {};

    allProducts.forEach((product) => {
      if (uniqueProducts[product.id]) {
        // If product already exists, add to quantity and total
        uniqueProducts[product.id].quantity += product.quantity;
        uniqueProducts[product.id].total += product.total;
        uniqueProducts[product.id].discountedTotal += product.discountedTotal;
      } else {
        // First time seeing this product
        uniqueProducts[product.id] = { ...product };
      }
    });

    return Object.values(uniqueProducts);
  } catch (error) {
    console.error("Error getting previously purchased products:", error);
    throw error;
  }
}

/**
 * Gets order history with cart details for a user
 * @param userId - The user ID to get order history for
 * @returns Promise<Cart[]> - Array of user's order history (carts)
 */
export async function getOrderHistory(userId: number): Promise<Cart[]> {
  try {
    const userCarts = await fetchUserCarts(userId);

    // Sort by cart ID (descending) to show most recent orders first
    const sortedCarts = userCarts.carts.sort((a, b) => b.id - a.id);

    return sortedCarts;
  } catch (error) {
    console.error("Error getting order history:", error);
    throw error;
  }
}

/**
 * Gets total purchase statistics for a user
 * @param userId - The user ID to get stats for
 * @returns Promise<{ totalOrders: number; totalSpent: number; totalItems: number; totalSavings: number }> - Purchase statistics
 */
export async function getUserPurchaseStats(userId: number): Promise<{
  totalOrders: number;
  totalSpent: number;
  totalItems: number;
  totalSavings: number;
}> {
  try {
    const userCarts = await fetchUserCarts(userId);

    const stats = userCarts.carts.reduce(
      (acc, cart) => {
        acc.totalOrders += 1;
        acc.totalSpent += cart.discountedTotal;
        acc.totalItems += cart.totalProducts;
        acc.totalSavings += cart.total - cart.discountedTotal;
        return acc;
      },
      {
        totalOrders: 0,
        totalSpent: 0,
        totalItems: 0,
        totalSavings: 0,
      }
    );

    return stats;
  } catch (error) {
    console.error("Error getting user purchase stats:", error);
    throw error;
  }
}
