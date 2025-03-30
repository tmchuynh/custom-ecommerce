import { ColumnDef } from "@tanstack/react-table";
import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
import {
  FeaturedDetails,
  LengthType,
  PaymentStatus,
  ProductFilters,
  ProductType,
  SectionDetails,
  ShippingMethod,
  SortOption,
} from "./types";

export interface LoaderSizeMarginProps extends CommonProps {
  size?: LengthType;
  margin?: LengthType;
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

export interface PaymentInfoData {
  paymentMethod: "creditCard" | "paypal";
  cardNumber: string;
  nameOnCard: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  savePaymentInfo: boolean;
  billingAddressSameAsShipping: boolean;
}

export interface ShippingAddress {
  id?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: "residential" | "business";
  isDefault?: boolean;
  label?: string; // e.g., "Home", "Office", "Mom's house"
  deliveryInstructions?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ShippingRate {
  id: string;
  carrier: string;
  service: string;
  estimatedDays: number;
  price: number;
  currencyCode: string;
}

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  addresses?: ShippingAddress[];
  defaultShippingAddress?: string;
  token: string;
}

export interface ShippingAddress {
  id?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: "residential" | "business";
  isDefault?: boolean;
  label?: string; // e.g., "Home", "Office", "Mom's house"
  deliveryInstructions?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ShippingRate {
  id: string;
  carrier: string;
  service: string;
  estimatedDays: number;
  price: number;
  currencyCode: string;
}

export interface CreditCard {
  number: string;
  expirationDate: string;
  cvv: string;
  issuer: string;
}

export interface Payment {
  id: string;
  amount: number;
  status: PaymentStatus;
  email: string;
  date: Date;
  cardDetails?: Partial<CreditCard>;
  error?: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  error?: string;
  status: PaymentStatus;
  transaction?: Payment;
}

export interface PaymentProcessorOptions {
  testMode?: boolean;
  currency?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface PaymentSubmissionData {
  cardDetails: CreditCard;
  amount: number;
  billingAddress?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  customerInfo?: {
    name: string;
    email: string;
    phone: string;
  };
}

export interface FeaturedCategoryProps {
  item: FeaturedDetails;
  index: number;
  closePopovers?: () => void;
}

export interface DiscountFormProps {
  onApply?: (code: string) => void;
  discountCode?: string;
  setDiscountCode?: (code: string) => void;
  discountApplied?: boolean;
  discountError?: boolean;
  setDiscountError?: (error: boolean) => void;
  handleApplyDiscount?: () => void;
}

export interface ShippingAddressData {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: "residential" | "business";
  saveAddress: boolean;
  shippingMethod: "standard" | "express" | "overnight";
}
