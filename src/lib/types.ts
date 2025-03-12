import { DetailedHTMLProps, HTMLAttributes, CSSProperties } from "react";

export type LengthType = number | string;

export interface CommonProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> {
  color?: string;
  loading?: boolean;
  cssOverride?: CSSProperties;
  speedMultiplier?: number;
}

export type User = {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  creditCard: CreditCard;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
};

export type CreditCard = {
  number: string;
  expirationDate: string;
  cvv: string;
  issuer: string;
};

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  date: Date;
};

export type PurchaseRecord = {
  user: User;
  userId: string;
  date: Date;
  items: Item[];
  payment: Payment;
};

export type Item = {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
};

export type StoreItem = {
  id: number;
  href: string;
  name: string;
  description: string;
  color: string;
  availableColors: {
    name: string;
    colorBg: string;
  }[];
  price: number;
  imageSrc: string;
  imageAlt: string;
};
