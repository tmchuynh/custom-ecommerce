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
  price: number;
  description: string;
  slug: string;
  imageSrc: string;
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
  slug: string;
  name: string;
  description: string;
  imageSrc: string;
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

export type ProductType = {
  name: string;
  description: string;
  price: string;
  colors: Color[];
};
