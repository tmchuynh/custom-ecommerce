export interface CartItem {
  id: number;
  productId: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  category: string;
  thumbnail?: string;
  discountPercentage?: number;
  brand?: string;
}

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
