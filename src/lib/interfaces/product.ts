// Updated ProductItem for DummyJSON
export interface ProductItem {
  id: number;
  title: string;
  description: string;
  category: string; // DummyJSON uses string for category
  price: number; // DummyJSON uses number
  discountPercentage?: number; // Optional as not all products might have it
  rating?: number; // Optional
  stock?: number; // Optional
  tags?: string[]; // Optional
  brand?: string; // Optional
  sku?: string; // Optional
  weight?: number; // Optional
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
  }; // Optional
  warrantyInformation?: string; // Optional
  shippingInformation?: string; // Optional
  availabilityStatus?: string; // Optional
  reviews?: {
    rating?: number;
    comment?: string;
    date?: string; // Assuming string, adjust if it's a Date object
    reviewerName?: string;
    reviewerEmail?: string;
  }[]; // Optional array of review objects
  returnPolicy?: string; // Optional
  minimumOrderQuantity?: number; // Optional
  meta?: {
    createdAt?: string; // Assuming string, adjust if it's a Date object
    updatedAt?: string; // Assuming string, adjust if it's a Date object
    barcode?: string;
    qrCode?: string;
  }; // Optional
  thumbnail?: string; // Optional, main small image
  images?: string[]; // Array of image URLs, optional
}

// Interface for the overall products API response from DummyJSON
export interface DummyJSONProductsResponse {
  products: ProductItem[];
  total: number;
  skip: number;
  limit: number;
}
