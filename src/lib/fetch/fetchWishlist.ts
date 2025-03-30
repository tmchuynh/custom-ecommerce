/**
 * Fetches the user's wishlist items from the API.
 *
 * @returns A promise that resolves to an array of wishlist items.
 * @throws An error if the API request fails.
 */
export const fetchWishlist = async (): Promise<string[]> => {
  const res = await fetch("/api/user/wishlist");
  if (!res.ok) {
    throw new Error("Failed to fetch wishlist");
  }
  const data = await res.json();
  return data.items;
};

/**
 * Adds an item to the user's wishlist via the API.
 *
 * @param productId - The ID of the product to add to the wishlist.
 * @returns A promise that resolves to a success status.
 * @throws An error if the API request fails.
 */
export const addToWishlist = async (productId: string): Promise<void> => {
  const res = await fetch("/api/user/wishlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });
  if (!res.ok) {
    throw new Error("Failed to add item to wishlist");
  }
};

/**
 * Removes an item from the user's wishlist via the API.
 *
 * @param productId - The ID of the product to remove from the wishlist.
 * @returns A promise that resolves to a success status.
 * @throws An error if the API request fails.
 */
export const removeFromWishlist = async (productId: string): Promise<void> => {
  const res = await fetch(`/api/user/wishlist/${productId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to remove item from wishlist");
  }
};
