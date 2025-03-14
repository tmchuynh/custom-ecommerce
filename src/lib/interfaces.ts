import { ColumnDef } from "@tanstack/react-table";
import { DetailedHTMLProps, HTMLAttributes, CSSProperties } from "react";
import { LengthType, PurchaseRecord } from "./types";

export interface LoaderSizeMarginProps extends CommonProps {
  size?: LengthType;
  margin?: LengthType;
}

export interface LengthObject {
  value: number;
  unit: string;
}

export interface DataTableProps<TData extends PurchaseRecord, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface LoaderSizeProps extends CommonProps {
  size?: LengthType;
}

export interface LoaderSizeMarginProps extends CommonProps {
  size?: LengthType;
  margin?: LengthType;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface User extends UserType {
  purchaseRecords: PurchaseRecord[];
}

export interface UserType {
  id: string;
  name: string;
  email: string;
}

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageSrc: string;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  getTotalPrice: () => number;
}

export interface CommonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  color?: string;
  loading?: boolean;
  cssOverride?: CSSProperties;
  speedMultiplier?: number;
}

export interface CurrencyContextType {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
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
