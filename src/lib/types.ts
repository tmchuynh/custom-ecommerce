import { CartItem, Currency } from "./interfaces";

export type LengthType = number | string;
export type Gender = "men" | "women" | "children";

export type NotFoundContextType = {
  isNotFound: boolean;
  setNotFound: (value: boolean) => void;
};

export type User = {
  firstName: string;
  middleName?: string;
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

export type ProductDetails = {
  name: string;
  description: string;
  gender: string;
  category: string;
  highlights?: string[];
  subcategory: string;
  images: string[];
  imageSrc: string;
  quantity: number;
  price: string;
  colors: Color[];
};

export type CategoryItems = {
  [item: string]: {
    [slug: string]: ProductDetails;
  };
};

export type CategoryCardProps = {
  category: CategoryCardData;
};

export type CategoryCardData = {
  name: string;
  description: string;
  gender: string;
  category: string;
  highlights?: string[];
  subcategory: string;
  images: string[];
  imageSrc: string;
  quantity: number;
  price: string;
  colors: Color[];
};

export type GenderCategories = {
  [gender: string]: {
    [category: string]: CategoryItems;
  };
};

export type FeaturedDetails = {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type PagesDetails = {
  name: string;
  href: string;
};

export type ItemDetails = {
  name: string;
  href: string;
  imageSrc: string;
};

export type SectionDetails = {
  id: string;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  items: ItemDetails[];
};

export type CategoryDetails = {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  featured: FeaturedDetails[];
  sections: SectionDetails[][];
  collections: FeaturedDetails[];
};

export type NavigationDetails = {
  categories: CategoryDetails[];
  pages: PagesDetails[];
};

export type DetailItem = {
  name: string;
  items: {
    material: string[];
    construction: string[];
    sole: string;
    insole: string;
    style: string;
    care: string[];
    fabricType?: string;
    careInstructionsLink?: string;
  }[];
};

export type ProductDetailsProps = {
  details: DetailItem[];
};

export type Color = {
  name: string;
  bgColor: string;
};

export type ProductFilters = {
  gender?: string;
  category?: string;
  subcategory?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  colors?: string[];
  sizes?: string[];
  onSale?: boolean;
};

export type ProductType = {
  name: string;
  description: string;
  gender: string;
  category: string;
  highlights?: string[];
  subcategory: string;
  images: string[];
  details: DetailItem[];
  colors: Color[];
  displayPrice: string;
  imageSrc: string;
  quantity: number;
  price?: string;
  badge?: string;
};

export type DiscountFormProps = {
  discountCode: string;
  setDiscountCode: (code: string) => void;
  discountApplied: boolean;
  discountError: boolean;
  setDiscountError: (error: boolean) => void;
  handleApplyDiscount: () => void;
};

export type OrderItemsProps = {
  cartItems: CartItem[];
  handleNavigation: (destination: string) => boolean;
};

export type ShippingMethod = "standard" | "express" | "overnight";

export type SortOption =
  | "price-low-to-high"
  | "price-high-to-low"
  | "newest"
  | "popular";

export type OrderSummaryProps = {
  subtotal: number;
  tax: number;
  shippingMethod: ShippingMethod;
  shipping: number;
  internationalFee?: number;
  isInternational?: boolean;
  discountApplied: boolean;
  discountAmount: number;
  discountedTotal: number;
  newDate: Date;
  shippingCountry: string;
};

export type CustomerInfoFormProps = {
  customerName: string;
  setCustomerName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  touchedFields: {
    name: boolean;
    email: boolean;
    phone: boolean;
    [key: string]: boolean;
  };
  formErrors: {
    name?: string;
    email?: string;
    phone?: string;
    [key: string]: string | undefined;
  };
  handleBlur: (
    field:
      | "phone"
      | "email"
      | "cardNumber"
      | "cardExpiry"
      | "cardCvv"
      | "shippingAddress"
      | "name"
  ) => void;
};

export type ShippingAddressFormProps = {
  shippingAddress: string;
  setShippingAddress: (value: string) => void;
  shippingCity: string;
  setShippingCity: (value: string) => void;
  shippingState: string;
  setShippingState: (value: string) => void;
  shippingZip: string;
  setShippingZip: (value: string) => void;
  shippingCountry: string;
  setShippingCountry: (value: string) => void;
  touchedFields: {
    shippingAddress: boolean;
    [key: string]: boolean;
  };
  formErrors: {
    shippingAddress?: string;
    [key: string]: string | undefined;
  };
  handleBlur: (
    field:
      | "phone"
      | "email"
      | "cardNumber"
      | "cardExpiry"
      | "cardCvv"
      | "shippingAddress"
      | "name"
  ) => void;
};

export type PaymentInfoFormProps = {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardType: string;
  setCardType: (value: string) => void;
  cardExpiry: string;
  setCardExpiry: (value: string) => void;
  cardCvv: string;
  setCardCvv: (value: string) => void;
  billingAddress: string;
  setBillingAddress: (value: string) => void;
  billingCity: string;
  setBillingCity: (value: string) => void;
  billingState: string;
  setBillingState: (value: string) => void;
  billingZip: string;
  setBillingZip: (value: string) => void;
  sameAsShipping: boolean;
  setSameAsShipping: (value: boolean) => void;
  touchedFields: {
    cardNumber: boolean;
    cardExpiry: boolean;
    cardCvv: boolean;
    [key: string]: boolean;
  };
  formErrors: {
    cardNumber?: string;
    cardExpiry?: string;
    cardCvv?: string;
    [key: string]: string | undefined;
  };
  handleBlur: (
    field:
      | "phone"
      | "email"
      | "cardNumber"
      | "cardExpiry"
      | "cardCvv"
      | "shippingAddress"
      | "name"
  ) => void;
};
