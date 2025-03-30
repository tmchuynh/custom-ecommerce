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
  calculateImportFee: (value: number, countryCode: string) => number;
  getImportTaxBreakdown: (
    subtotal: number,
    country: string
  ) => {
    duty: number;
    vat: number;
    total: number;
    subtotal: number;
    grandTotal: number;
  };
  calculateImportTaxes: (
    subtotal: number,
    country: string
  ) => {
    dutyAmount: number;
    vatAmount: number;
    totalImportCharges: number;
    appliedDuty: boolean;
    appliedVAT: boolean;
  };

  // Currency conversion
  convertAmount: (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ) => number;
  formatCurrency: (amount: number, currencyCode: string) => string;

  // Currency rates management
  updateExchangeRate: (currencyCode: string, newRate: number) => void;
  getExchangeRate: (currencyCode: string) => number;

  // Currency validation
  isCurrencySupported: (currencyCode: string) => boolean;
  getAvailableCurrencies: () => Currency[];

  // Currency info
  getCurrencySymbol: (currencyCode: string) => string;
  getCurrencyName: (currencyCode: string) => string;

  getTaxInfoByCountryCode: (countryCode: string) => CountryTaxInfo | undefined;
  getTaxInfoByCountryName: (countryName: string) => CountryTaxInfo | undefined;
  getTaxInfoByCurrencyCode: (
    currencyCode: string
  ) => CountryTaxInfo | undefined;
  getTaxInfoByCurrencyName: (
    currencyName: string
  ) => CountryTaxInfo | undefined;
  getTaxInfoByCurrency: (currency: Currency) => CountryTaxInfo | undefined;
  getTaxInfoByCountry: (country: string) => CountryTaxInfo | undefined;

  // Last updated timestamp
  lastRatesUpdate: Date | null;
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
  highlights: string[];
  isLimited?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  featured?: boolean;
  originalPrice?: number;
  discountPrice?: number;
  options?: { name: string; value: string }[];
}

export interface CartItem extends ProductItem {
  id: string;
  quantity: number;
  color?: string;
  size?: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getCartItem: (name: string) => CartItem | undefined;
  updateQuantity: (id: string, quantity: number) => void;
  calculateTaxAmount: (total: number, country: string) => number;
  getTotalPrice: (country: string) => number;
  getSubTotal: () => number;
  getTotalItems: () => number;

  getShippingMethod: (totalItems: number) => ShippingMethod;
  itemExistsInCart: (name: string) => CartItem | undefined;
  applyDiscount: (code: string) => boolean;
  getDiscountedTotal: (country: string) => number;
  saveCartForLater: () => void;
  loadSavedCart: () => void;
  calculateShippingCost: (method: ShippingMethod) => number;
  getEstimatedDeliveryDate: (method: ShippingMethod) => Date;
  getDeliveryWindowDates: (
    method: ShippingMethod,
    startDate: Date,
    country: string
  ) => { windowStart: Date; windowEnd: Date };

  getDeliveryDescription: (
    shippingMethod: ShippingMethod,
    startDate: Date,
    country: string
  ) => string;
  moveToWishlist: (itemId: string) => void;
  calculateInternationalShippingFee: (
    country: string,
    method?: ShippingMethod
  ) => number;
  selectedShippingMethod: ShippingMethod;
  updateShippingMethod: (method: ShippingMethod) => void;
  getDeliveryEstimateText: (shippingCountry: string) => string;

  getProductSalesCount: (productName: string) => number;
  getSalesTrends: (days?: number) => Array<{
    date: string;
    productName: string;
    quantity: number;
  }>;
}

export interface CountryTaxInfo {
  country: string;
  code: string;
  vatRate: number; // VAT/GST rate in decimal (e.g., 0.19 for 19%)
  dutyRate: number; // Duty rate in decimal
  deMinimisDuty: number; // De minimis threshold for duty in USD
  deMinimisVAT: number; // De minimis threshold for VAT/GST in USD
  hasImportFees: boolean; // Whether the country applies additional import processing fees
}

export interface currencyCountriesInfo {
  code: string;
  name: string;
  symbol: string;
  rate: number;
  countries: CountriesInformation[];
}

export interface CountriesInformation {
  value: string;
  label: string;
  distanceFactor: number;
  taxRate: number;
}

export interface ProductContextType {
  getProductByName: (name: string) => ProductType | undefined;
  getProductsByGender: (gender: string) => ProductType[];
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
  hasDiscount: (id: string) => boolean;
  hasPriceDrop: (id: string) => boolean;
  updatePriceHistory: (id: string, newPrice: number) => void;

  // Inventory management
  getStockLevel: (productName: string) => number;
  isInStock: (productName: string) => boolean;
  isLowStock: (productName: string, threshold?: number) => boolean;

  // Ratings and reviews
  getProductRating: (productName: string) => number;
  getProductReviewCount: (productName: string) => number;

  // Analytics
  getPopularityScore: (productName: string) => number;
  getMostViewedProducts: (limit?: number) => ProductType[];
  getBestSellingProducts: (limit?: number) => ProductType[];

  // Price history stats
  getPriceHistory: (
    productName: string,
    days?: number
  ) => Array<{ date: string; price: number }>;
  getLowestPrice: (productName: string, days?: number) => number;
  getHighestPrice: (productName: string, days?: number) => number;
  getAveragePrice: (productName: string, days?: number) => number;
  getPriceDropPercentage: (productName: string) => number;

  getSalesCount: (productName: string) => number;

  updateStockLevel: (productName: string, quantity: number) => void;

  incrementViewCount: (productName: string) => void;
}

export interface ProductBadgesProps {
  highlights: string[];
}

export interface WishlistContextType {
  wishlistItems: ProductType[];
  addToWishlist: (item: ProductType) => void;
  removeFromWishlist: (id: string) => void;
  clearWishlist: () => void;
  isInWishlist: (id: string) => boolean;
  getWishlistItem: (id: string) => ProductType | undefined;
  getWishlistItems: () => ProductType[];
  getWishlistCount: () => number;
  getWishlistTotalPrice: () => number;
  getWishlistItemByName: (name: string) => ProductType | undefined;
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
