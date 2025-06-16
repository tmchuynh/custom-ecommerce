import { ColumnDef } from "@tanstack/react-table";
import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";

export interface CommonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  color?: string;
  loading?: boolean;
  cssOverride?: CSSProperties;
  speedMultiplier?: number;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

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

// Geolocation and Address might be part of DummyJSONUser, nested
export interface Geolocation {
  lat: number; // DummyJSON uses number
  lng: number; // DummyJSON uses number, changed from long
}

export interface UserAddress {
  // Renamed from Address to UserAddress for clarity
  address: string;
  city?: string; // Optional as per DummyJSON structure
  coordinates?: Geolocation; // Optional
  postalCode?: string; // Optional
  state?: string; // Optional
  // street?: string; // Not directly in DummyJSON user address, part of 'address'
  // number?: number; // Not directly in DummyJSON user address
  // zipcode?: string; // Renamed to postalCode
}

// New DummyJSONUser interface
export interface DummyJSONUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age?: number;
  gender?: string;
  email: string;
  phone?: string;
  username: string;
  password?: string; // Likely not used directly in frontend
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: {
    color?: string;
    type?: string;
  };
  domain?: string;
  ip?: string;
  address?: UserAddress;
  macAddress?: string;
  university?: string;
  bank?: {
    cardExpire?: string;
    cardNumber?: string;
    cardType?: string;
    currency?: string;
    iban?: string;
  };
  company?: {
    address?: UserAddress; // Can reuse UserAddress
    department?: string;
    name?: string;
    title?: string;
  };
  ein?: string;
  ssn?: string;
  userAgent?: string;
  // role?: string; // Added from DummyJSON /auth/me, but might be specific to AuthUser
}

// Interface for the overall users API response from DummyJSON
export interface DummyJSONUsersResponse {
  users: DummyJSONUser[];
  total: number;
  skip: number;
  limit: number;
}

// New AuthUser interface for DummyJSON login and /auth/me responses
export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string; // Optional as per DummyJSON
  image?: string; // Optional
  token: string;
  // role?: string; // If role is part of /auth/me response
}

// CartItem from FakeStoreAPI - needs to be updated if using DummyJSON carts
// For now, commenting out as it's not the immediate focus.
// If using DummyJSON carts, a new interface based on its structure will be needed
/*
export interface CartItem {
  id: number; // from /carts (DummyJSON cart ID)
  products: Array<{
    id: number; // productId
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedPrice: number; // DummyJSON calls this discountedPrice
    thumbnail?: string;
  }>;
  total: number; // total of all products in cart
  discountedTotal: number; // total after discounts
  userId: number;
  totalProducts: number; // total number of products in cart
  totalQuantity: number; // total quantity of items in cart
}

export interface DummyJSONCartResponse {
  carts: CartItem[];
  total: number;
  skip: number;
  limit: number;
}
*/

// ... (rest of the interfaces like CountryTaxInfo, CurrencyInfo, etc. remain for now)
