import { IconType } from "react-icons/lib";
import { CartItem, ShippingAddress } from "./interfaces";

export type LengthType = number | string;
export type Gender = "men" | "women" | "children";

export type NotFoundContextType = {
  isNotFound: boolean;
  setNotFound: (value: boolean) => void;
};

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
  text?: string;
};

export type LengthObject = {
  value: number;
  unit: string;
};

export type ProductBadgesProps = {
  highlights: string[];
};

export type ComingSoonMessageProps = {
  gender: string;
  sectionName: string;
};

export type RandomNumberArrayOptions = {
  length: number;
  min: number;
  max: number;
};

export type FormattedItem = {
  name: string;
  url: string;
};

export type CurrencyCode = string;

export type Currency = {
  code: CurrencyCode;
  name: string;
  rate: number;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export type LoginCredentials = {
  email: string;
  identifier: string;
  password?: string;
  loginCode?: string;
};

export type CustomerInfoData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  marketingConsent: boolean;
};

export type ResetPasswordData = {
  email: string;
  code?: string;
  newPassword?: string;
};

export type DynamicButtonProps = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "secondaryOutline"
    | "secondaryGhost"
    | "secondaryLink"
    | "teritary"
    | "teritaryOutline"
    | "teritaryGhost"
    | "teritaryLink"
    | "destructive"
    | "destructiveOutline"
    | "destructiveGhost"
    | "destructiveLink"
    | "ghost"
    | "link";
  text: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
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
  status: PaymentStatus;
  email: string;
  date: Date;
};

export type PaymentStatus =
  | "success"
  | "pending"
  | "failed"
  | "processing"
  | "refunded";

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
  availableSizes: string[];
  availableColors: string[];
  features: string[];
  inStock: boolean;
  reviews: {
    rating: number;
    reviewCount: number;
    averageRating: number;
  };
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
  icon: IconType;
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
  collections?: FeaturedDetails[];
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
  itemType: string;
  rating: number;
  reviewCount: number;
  highlights?: string[];
  subcategory: string;
  images: string[];
  details: DetailItem[];
  colors: Color[];
  displayPrice: string;
  imageSrc: string;
  quantity: number;
  discountPrice?: number;
  originalPrice?: number;
  priceHistory?: Array<{
    date: string;
    price: number;
  }>;
  price?: string;
  badge?: string;
  viewCount: number;
  stockLevel: number;
};

export type DiscountFormProps = {
  onApply?: (code: string) => void;
  discountCode: string;
  setDiscountCode: (code: string) => void;
  discountApplied: boolean;
  discountError: boolean;
  setDiscountError: (error: boolean) => void;
  handleApplyDiscount: () => void;
};

export type OrderItemsProps = {
  cartItems: CartItem[];
  editable?: boolean;
  handleNavigation: (destination: string) => boolean;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
};

export type ShippingMethod =
  | "standard"
  | "economy"
  | "twoDay"
  | "expedited"
  | "sameDay"
  | "overnight";

export type SortOption =
  | "price-low-to-high"
  | "price-high-to-low"
  | "newest"
  | "popular";

export type OrderSummaryProps = {
  subtotal: number;
  tax: number;
  shipping: number;
  vatTax: number;
  importFees: number;
  newDate: Date;
  total: number;
  discountApplied: boolean;
  discountAmount: number;
  isInternational: boolean;
  shippingMethod: ShippingMethod;
  itemCount: number;
  estimatedDelivery?: string;
  shippingCountry: string;
  onApplyDiscount?: (code: string) => void;
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
  onSubmit: (data: CustomerInfoData) => void;
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
    shippingCity: boolean;
    shippingState: boolean;
    shippingZip: boolean;
    shippingCountry: boolean;
    [key: string]: boolean;
  };
  formErrors: {
    shippingAddress?: string;
    shippingCity?: string;
    shippingState?: string;
    shippingZip?: string;
    shippingCountry?: string;
    [key: string]: string | undefined;
  };
  handleBlur: (
    field:
      | "shippingCity"
      | "shippingState"
      | "shippingZip"
      | "shippingAddress"
      | "shippingCountry"
  ) => void;
  onSubmit: (data: ShippingAddress) => void;
};

export type PaymentInfoFormProps = {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardType: string;
  setCardType: (value: string) => void;
  validateCard: (details: any) => boolean;
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
  onSubmit: () => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  paymentError: string | null;
  isCardValid: boolean;
  setIsCardValid: (value: boolean) => void;
  resetForm: () => void;
  total: number;
  handlePayment: () => void;
  handlePaymentSuccess: () => void;
  handlePaymentPending: () => void;
  handlePaymentProcessing: () => void;
  handlePaymentCancelled: () => void;
  handlePaymentDeclined: () => void;
  handlePaymentRefunded: () => void;
};
