export type LengthType = number | string;
export type Gender = "men" | "women" | "children";

export type NotFoundContextType = {
  isNotFound: boolean;
  setNotFound: (value: boolean) => void;
};

// Base type for navigation items
export type LinkItem = {
  name: string;
  href: string;
};

// Extended type for items with images
export type ImageLinkItem = LinkItem & {
  imageSrc: string;
  imageAlt?: string;
};

export type ProductDetails = {
  name: string;
  price: number;
  description: string;
};

export type CategoryItems = {
  [item: string]: {
    [slug: string]: ProductDetails; // Dynamic slug values for items under each category
  };
};

export type CategoryCard = {
  slug: string;
  name: string;
  description: string;
  imageSrc: string;
};

export type CategoryCardProps = {
  category: CategoryCard;
};

export type GenderCategories = {
  [gender: string]: {
    [category: string]: CategoryItems; // Categories (clothing, shoes, accessories) under each gender
  };
};

export type FeaturedDetails = ImageLinkItem;

export type PagesDetails = LinkItem;

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
