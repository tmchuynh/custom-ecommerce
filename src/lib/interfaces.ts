import { ColumnDef } from "@tanstack/react-table";
import { DetailedHTMLProps, HTMLAttributes, CSSProperties } from "react";
import {
  FeaturedDetails,
  LengthType,
  ProductFilters,
  ProductType,
  SectionDetails,
  ShippingMethod,
  SortOption,
} from "./types";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export interface LoaderSizeMarginProps extends CommonProps {
  size?: LengthType;
  margin?: LengthType;
}

export interface LengthObject {
  value: number;
  unit: string;
}

export interface LoaderSizeProps extends CommonProps {
  size?: LengthType;
}

export interface LoaderSizeMarginProps extends CommonProps {
  size?: LengthType;
  margin?: LengthType;
}

export interface CommonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  color?: string;
  loading?: boolean;
  cssOverride?: CSSProperties;
  speedMultiplier?: number;
}

export type CurrencyCode = string;

export type Currency = {
  code: CurrencyCode;
  name: string;
  rate: number;
};

export interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

export interface DynamicButtonProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  text: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
}

export interface FeaturedCategoryProps {
  item: FeaturedDetails;
  index: number;
  closePopovers?: () => void;
}

export interface CategoryProps {
  category: {
    id: string;
    name: string;
    featured: FeaturedDetails[];
    sections: SectionDetails[];
  };
  section: SectionDetails;
  index: number;
  closePopovers?: () => void;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface UserType {
  id: string;
  name: string;
  email: string;
}

export interface ProductItem {
  name: string;
  price: string | number;
  description: string;
  imageSrc: string;
}

export interface CartItem extends ProductItem {
  id: string;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartItem: (name: string) => CartItem | undefined;
  updateQuantity: (id: string, quantity: number) => void;
  calculateTaxAmount: (total: number, taxRate?: number) => number;
  getTotalPrice: () => number;
  getSubTotal: () => number;
  getTotalItems: () => number;

  getShippingMethod: (getTotalItems: number) => ShippingMethod;
  itemExistsInCart: (name: string) => boolean;
  applyDiscount: (code: string) => boolean;
  getDiscountedTotal: () => number;
  saveCartForLater: () => void;
  loadSavedCart: () => void;
  calculateShippingCost: (method: ShippingMethod) => number;
  getEstimatedDeliveryDate: (method: ShippingMethod) => Date;
  getDeliveryWindowDates: (
    method: ShippingMethod,
    startDate: Date,
    country: string
  ) => { windowStart: Date; windowEnd: Date };
  startCheckout: () => void;
  moveToWishlist: (itemId: string) => void;
  calculateInternationalShippingFee: (
    country: string,
    method?: ShippingMethod
  ) => number;
  selectedShippingMethod: ShippingMethod;
  updateShippingMethod: (method: ShippingMethod) => void;
}

export interface ProductContextType {
  getProductByName: (name: string) => ProductType | undefined;
  getProductsByCategory: (categoryObj: Record<string, any>) => any;
  getSubcategoriesByGender: (gender: string, category?: string) => string[];
  searchProducts: (query: string) => ProductType[];
  filterProducts: (filters: ProductFilters) => ProductType[];
  getRelatedProducts: (productName: string, limit?: number) => ProductType[];
  getFeaturedProducts: (limit?: number) => ProductType[];
  getNewArrivals: (limit?: number) => ProductType[];
  sortProducts: (products: ProductType[], sortBy: SortOption) => ProductType[];
  getProductsByPriceRange: (min: number, max: number) => ProductType[];
  convertPrice: (
    priceInUSD: number | string,
    currencyOverride?: Currency
  ) => string;
  formatPrice: (price: number, currencyCode: string) => string;
}

export interface ProductBadgesProps {
  highlights: string[];
}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
}

export interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
}

export interface ComingSoonMessageProps {
  gender: string;
  sectionName: string;
}

export interface RandomNumberArrayOptions {
  length: number;
  min: number;
  max: number;
}

export interface FormattedItem {
  name: string;
  url: string;
}
