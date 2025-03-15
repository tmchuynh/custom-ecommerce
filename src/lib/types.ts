export type LengthType = number | string;

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

export type ProductDetails = {
  name: string;
  price: string;
  description: string;
};

export type CategoryItems = {
  [item: string]: {
    [slug: string]: ProductDetails; // Dynamic slug values for items under each category
  };
};

export type GenderCategories = {
  [gender: string]: {
    [category: string]: CategoryItems; // Categories (clothing, shoes, accessories) under each gender
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
  items: ItemDetails[];
};

export type CategoryDetails = {
  id: string;
  name: string;
  featured: FeaturedDetails[];
  sections: SectionDetails[][];
};

export type NavigationDetails = {
  categories: CategoryDetails[];
  pages: PagesDetails[];
};

export type DetailItem = {
  name: string;
  items: string[];
};

export type ProductDetailsProps = {
  details: DetailItem[];
};
