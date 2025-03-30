import { ColumnDef } from "@tanstack/react-table";
import { CSSProperties, DetailedHTMLProps, HTMLAttributes } from "react";
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

export interface CustomerInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  marketingConsent: boolean;
}

export interface ResetPasswordData {
  email: string;
  code?: string;
  newPassword?: string;
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

export interface SignUpCredentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginCredentials {
  identifier: string; // can be email or username
  password?: string;
  loginCode?: string;
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

export interface ProductBadgesProps {
  highlights: string[];
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

export type PaymentStatus =
  | "pending"
  | "processing"
  | "success"
  | "failed"
  | "cancelled"
  | "refunded";

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
