import {
  CursorArrowRaysIcon,
  DocumentTextIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";
import { GiftIcon, RulerIcon, ShieldCheckIcon, StarIcon } from "lucide-react";
import { Fa500Px } from "react-icons/fa";
import { CategoryDetails, NavigationDetails } from "./types";

export const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];

export const navigations: NavigationDetails = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "/shopping/women/collections/new_arrivals",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Latest arrivals in women's fashion, from dresses to casual wear.",
        },
        {
          name: "Accessories",
          href: "/shopping/women/accessories",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/women/collections/latest_drops",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
          imageAlt: "Elegant accessories to complement your outfits.",
        },
      ],
      sections: [
        [
          {
            id: "clothing",
            name: "Clothing",
            href: "",
            imageSrc:
              "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
            items: [
              {
                name: "Tops",
                href: "/shopping/women/clothing/tops",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Pants",
                href: "/shopping/women/clothing/pants",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Bras",
                href: "/shopping/women/clothing/bras",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Maternity Clothes",
                href: "/shopping/women/clothing/maternity_clothing",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Dresses & Skirts",
                href: "/shopping/women/clothing/dresses_skirts",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Swimwear",
                href: "/shopping/women/clothing/swimwear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Activewear",
                href: "/shopping/women/clothing/activewear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Formal Wear",
                href: "/shopping/women/clothing/formal_wear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Underwear",
                href: "/shopping/women/clothing/underwear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Outerwear",
                href: "/shopping/women/clothing/outerwear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
            ],
          },
          {
            id: "shoes",
            name: "Shoes",
            href: "",
            imageSrc:
              "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
            items: [
              {
                name: "Formal Shoes",
                href: "/shopping/women/shoes/formal",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Sneakers",
                href: "/shopping/women/shoes/sneakers",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Sandals",
                href: "/shopping/women/shoes/sandals",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Boots",
                href: "/shopping/women/shoes/boots",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Flats",
                href: "/shopping/women/shoes/flats",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Heels",
                href: "/shopping/women/shoes/heels",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
            ],
          },
        ],
        [
          {
            id: "accessories",
            name: "Accessories",
            href: "",
            imageSrc:
              "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
            items: [
              {
                name: "Sunglasses",
                href: "/shopping/women/accessories/sunglasses",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Necklaces & Bracelets",
                href: "/shopping/kids/accessories/necklaces_and_braceslets",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Watches",
                href: "/shopping/women/accessories/watches",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Wallets",
                href: "/shopping/women/accessories/wallets",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Bags",
                href: "/shopping/women/accessories/bags",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Belts",
                href: "/shopping/women/accessories/belts",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Scarves",
                href: "/shopping/women/accessories/scarves",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Hats",
                href: "/shopping/women/accessories/hats",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
            ],
          },
        ],
        [
          {
            id: "shop-collection",
            name: "Shop by Collection",
            href: "",
            imageSrc:
              "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
            items: [
              {
                name: "New Arrivals",
                href: "/shopping/women/collections/new_arrivals",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Latest Drops",
                href: "/shopping/women/collections/latest_drops",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Best Sellers",
                href: "/shopping/women/collections/best_sellers",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Sale",
                href: "/shopping/women/collections/sale",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
            ],
          },
        ],
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "/shopping/men/collections/new_arrivals",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt: "New men's fashion trends for every occasion.",
        },
        {
          name: "Shoes",
          href: "/shopping/men/shoes",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-01.jpg",
          imageAlt: "Hats, watches, and accessories to complete your look.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/men/collections/latest_drops",

          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt: "Comfortable and stylish t-shirts and shirts for men.",
        },
      ],
      sections: [
        [
          {
            id: "clothing",
            name: "Clothing",
            href: "",
            imageSrc:
              "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
            items: [
              {
                name: "Tops",
                href: "/shopping/men/clothing/tops",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Pants",
                href: "/shopping/men/clothing/pants",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Swimwear",
                href: "/shopping/men/clothing/swimwear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Activewear",
                href: "/shopping/men/clothing/activewear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Formal Wear",
                href: "/shopping/men/clothing/formal_wear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Underwear",
                href: "/shopping/men/clothing/underwear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Outerwear",
                href: "/shopping/men/clothing/outerwear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
            ],
          },
          {
            id: "shoes",
            name: "Shoes",
            href: "",
            imageSrc:
              "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
            items: [
              {
                name: "Formal Shoes",
                href: "/shopping/men/shoes/formal",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },

              {
                name: "Sneakers",
                href: "/shopping/men/shoes/sneakers",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },

              {
                name: "Sandals",
                href: "/shopping/men/shoes/sandals",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Boots",
                href: "/shopping/men/shoes/boots",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
            ],
          },
        ],
        [
          {
            id: "accessories",
            name: "Accessories",
            href: "",
            imageSrc:
              "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
            items: [
              {
                name: "Sunglasses",
                href: "/shopping/men/accessories/sunglasses",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Necklaces & Bracelets",
                href: "/shopping/kids/accessories/necklaces_and_braceslets",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Watches",
                href: "/shopping/men/accessories/watches",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Wallets",
                href: "/shopping/men/accessories/wallets",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Bags",
                href: "/shopping/men/accessories/bags",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Belts",
                href: "/shopping/men/accessories/belts",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Scarves",
                href: "/shopping/men/accessories/scarves",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Hats",
                href: "/shopping/men/accessories/hats",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
            ],
          },
        ],
        [
          {
            id: "shop-collection",
            name: "Shop by Collection",
            href: "",
            imageSrc:
              "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
            items: [
              {
                name: "New Arrivals",
                href: "/shopping/men/collections/new_arrivals",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Latest Drops",
                href: "/shopping/men/collections/latest_drops",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Best Sellers",
                href: "/shopping/men/collections/best_sellers",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Sale",
                href: "/shopping/men/collections/sale",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
            ],
          },
        ],
      ],
    },
    {
      id: "kids",
      name: "Kids",
      featured: [
        {
          name: "New Arrivals",
          href: "/shopping/kids/collections/new_arrivals",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt: "New kids's fashion trends for every occasion.",
        },
        {
          name: "Shoes",
          href: "/shopping/kids/shoes",
          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-category-01.jpg",
          imageAlt: "Hats, watches, and accessories to complete your look.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/kids/collections/latest_drops",

          imageSrc:
            "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt: "Comfortable and stylish t-shirts and shirts for kids.",
        },
      ],
      sections: [
        [
          {
            id: "clothing",
            name: "Clothing",
            href: "",
            imageSrc:
              "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
            items: [
              {
                name: "Tops",
                href: "/shopping/kids/clothing/tops",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Pants",
                href: "/shopping/kids/clothing/pants",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Swimwear",
                href: "/shopping/kids/clothing/swimwear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Sleepwear",
                href: "/shopping/kids/clothing/sleepwear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Activewear",
                href: "/shopping/kids/clothing/activewear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Formal Wear",
                href: "/shopping/kids/clothing/formal_wear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Underwear",
                href: "/shopping/kids/clothing/underwear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Outerwear",
                href: "/shopping/kids/clothing/outerwear",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
            ],
          },
          {
            id: "shoes",
            name: "Shoes",
            href: "",
            imageSrc:
              "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
            items: [
              {
                name: "Formal Shoes",
                href: "/shopping/kids/shoes/formal",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },

              {
                name: "Sneakers",
                href: "/shopping/kids/shoes/sneakers",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },

              {
                name: "Sandals",
                href: "/shopping/kids/shoes/sandals",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Boots",
                href: "/shopping/kids/shoes/boots",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
            ],
          },
        ],
        [
          {
            id: "accessories",
            name: "Accessories",
            href: "",
            imageSrc:
              "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
            items: [
              {
                name: "Sunglasses",
                href: "/shopping/kids/accessories/sunglasses",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Toys",
                href: "/shopping/kids/accessories/toys",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Necklaces & Bracelets",
                href: "/shopping/kids/accessories/necklaces_and_braceslets",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Watches",
                href: "/shopping/kids/accessories/watches",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Bags",
                href: "/shopping/kids/accessories/bags",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Belts",
                href: "/shopping/kids/accessories/belts",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Scarves",
                href: "/shopping/kids/accessories/scarves",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Hats",
                href: "/shopping/kids/accessories/hats",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
            ],
          },
        ],
        [
          {
            id: "shop-collection",
            name: "Shop by Collection",
            href: "",
            imageSrc:
              "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
            items: [
              {
                name: "New Arrivals",
                href: "/shopping/kids/collections/new_arrivals",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Latest Drops",
                href: "/shopping/kids/collections/latest_drops",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Best Sellers",
                href: "/shopping/kids/collections/best_sellers",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
              {
                name: "Sale",
                href: "/shopping/kids/collections/sale",
                imageSrc:
                  "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-03.jpg",
              },
            ],
          },
        ],
      ],
    },
  ],
  pages: [
    { name: "Our Story", href: "/about" },
    { name: "Find Stores", href: "/about/locations" },
  ],
};

export const about = [
  {
    name: "Customer Service",
    description:
      "Get assistance with your orders, returns, and inquiries. We're here to help you!",
    href: "/customer_service",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Frequently Asked Questions",
    description:
      "Get assistance with your orders, returns, and inquiries. We're here to help you!",
    href: "/about/frequently_asked_questions",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Privacy Policy",
    description:
      "Read how we handle and protect your personal data with complete privacy.",
    href: "/policies/privacy_policy",
    icon: ShieldCheckIcon,
  },
  {
    name: "Return Policy",
    description:
      "Learn about our hassle-free returns and exchanges process. Shop with confidence.",
    href: "/policies/return_policy",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Loyalty Program",
    description:
      "Earn rewards, discounts, and exclusive offers by joining our loyalty program.",
    href: "/loyalty_program",
    icon: GiftIcon,
  },
  {
    name: "Size Guides",
    description:
      "Ensure the perfect fit with our detailed size guides for clothes and shoes.",
    href: "/size_guides",
    icon: RulerIcon,
  },
  {
    name: "Customer Reviews",
    description:
      "See what other customers have to say about our products and services.",
    href: "/about/customer_reviews",
    icon: StarIcon,
  },
  {
    name: "Track Order",
    description:
      "Easily track your order status and delivery details in real-time.",
    href: "/customer_service/track_order",
    icon: FingerPrintIcon,
  },
  {
    name: "Terms & Conditions",
    description:
      "Understand the rules and regulations of using our website and purchasing from us.",
    href: "/policies/terms_and_conditions",
    icon: DocumentTextIcon,
  },
];

export const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Michael Jordan",
    role: "Chief Marketing Officer",
    imageUrl:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sam Dwyer",
    role: "VP of Engineering",
    imageUrl:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jordan Wolfe",
    role: "Product Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lillian Ruiz",
    role: "Lead Designer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1670884441012-c5cf195c062a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Evelyn Collins",
    role: "Chief Technology Officer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1670884442192-7b58d513cd55?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "David Kim",
    role: "Head of Operations",
    imageUrl:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Anna West",
    role: "Lead Software Engineer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1691784781482-9af9bce05096?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Charlie Foster",
    role: "Product Designer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1669879825881-6d4e4bde67d5?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Tom Smith",
    role: "Business Analyst",
    imageUrl:
      "https://images.unsplash.com/photo-1649123245135-4db6ead931b5?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Olivia Bryant",
    role: "Marketing Strategist",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Lucas Howard",
    role: "Senior Data Scientist",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1669882305300-38b609862bee?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sophia Young",
    role: "Human Resources Director",
    imageUrl:
      "https://images.unsplash.com/photo-1558898479-33c0057a5d12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Nathaniel Perez",
    role: "Chief Financial Officer",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Grace Wong",
    role: "Sales Manager",
    imageUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ethan Ross",
    role: "Senior Software Engineer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Clara Mitchell",
    role: "UX/UI Designer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1689551671541-31a345ce6ae0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Miles Jenkins",
    role: "Software Engineer",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Jessica Harris",
    role: "Customer Success Manager",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const perks = [
  {
    name: "Free returns",
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-returns-light.svg",
    description:
      "Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.",
  },
  {
    name: "Free delivery all year long",
    description:
      "Name another place that offers year long free delivery? We’ll be waiting. Order now and you’ll get delivery absolutely free.",
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-delivery-light.svg",
  },
  {
    name: "Same day delivery",
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-calendar-light.svg",
    description:
      "We offer a delivery service that has never been done before. Checkout today and receive your products within hours.",
  },
  {
    name: "All year discount",
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-gift-card-light.svg",
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.',
  },
];

export const offers = [
  {
    name: "Download the app",
    description: "Get an exclusive $5 off code",
    href: "#",
  },
  {
    name: "Return when you're ready",
    description: "60 days of free returns",
    href: "#",
  },
  {
    name: "Sign up for our newsletter",
    description: "15% off your first order",
    href: "#",
  },
];

export const trendingProducts = [
  {
    id: 1,
    name: "Machined Pen",
    color: "Black",
    price: "$35",
    href: "#",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-02-product-01.jpg",
    imageAlt:
      "Black machined steel pen with hexagonal grip and small white logo at top.",
    availableColors: [
      { name: "Black", colorBg: "#111827" },
      { name: "Brass", colorBg: "#FDE68A" },
      { name: "Chrome", colorBg: "#E5E7EB" },
    ],
  },
  // More products...
];

export const testimonials = [
  {
    id: 1,
    quote:
      "My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!",
    attribution: "Sarah Peters, New Orleans",
  },
  {
    id: 2,
    quote:
      "I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!",
    attribution: "Kelly McPherson, Chicago",
  },
  {
    id: 3,
    quote:
      "Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.",
    attribution: "Chris Paul, Phoenix",
  },
];

export const stats = [
  { label: "Transactions every 24 hours", value: "44 million" },
  { label: "Assets under holding", value: "$119 trillion" },
  { label: "New users annually", value: "46,000" },
];

export const values = [
  {
    name: "Be world-class",
    description:
      "Aut illo quae. Ut et harum ea animi natus. Culpa maiores et sed sint et magnam exercitationem quia. Ullam voluptas nihil vitae dicta molestiae et. Aliquid velit porro vero.",
    Icon: Fa500Px,
  },
  {
    name: "Share everything you know",
    description:
      "Mollitia delectus a omnis. Quae velit aliquid. Qui nulla maxime adipisci illo id molestiae. Cumque cum ut minus rerum architecto magnam consequatur. Quia quaerat minima.",
    Icon: Fa500Px,
  },
  {
    name: "Always learning",
    description:
      "Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum. Commodi autem voluptatem nam. Quos voluptatem totam.",
    Icon: Fa500Px,
  },
  {
    name: "Be supportive",
    description:
      "Magnam provident veritatis odit. Vitae eligendi repellat non. Eum fugit impedit veritatis ducimus. Non qui aspernatur laudantium modi. Praesentium rerum error deserunt harum.",
    Icon: Fa500Px,
  },
  {
    name: "Take responsibility",
    description:
      "Sit minus expedita quam in ullam molestiae dignissimos in harum. Tenetur dolorem iure. Non nesciunt dolorem veniam necessitatibus laboriosam voluptas perspiciatis error.",
    Icon: Fa500Px,
  },
  {
    name: "Enjoy downtime",
    description:
      "Ipsa in earum deserunt aut. Quos minus aut animi et soluta. Ipsum dicta ut quia eius. Possimus reprehenderit iste aspernatur ut est velit consequatur distinctio.",
    Icon: Fa500Px,
  },
];

export const footerNavigation = {
  shop: [
    { name: "Bags", href: "#" },
    { name: "Tees", href: "#" },
    { name: "Objects", href: "#" },
    { name: "Home Goods", href: "#" },
    { name: "Accessories", href: "#" },
  ],
  company: [
    { name: "Who we are", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Terms & Conditions", href: "#" },
    { name: "Privacy", href: "#" },
  ],
  account: [
    { name: "Manage Account", href: "#" },
    { name: "Returns & Exchanges", href: "#" },
    { name: "Redeem a Gift Card", href: "#" },
  ],
  connect: [
    { name: "Contact Us", href: "#" },
    { name: "Facebook", href: "#" },
    { name: "Instagram", href: "#" },
    { name: "Pinterest", href: "#" },
  ],
};

export const policies = [
  {
    name: "24/7 Customer Support",
    description:
      "Or so we want you to believe. In reality our chat widget is powered by a naive series of if/else statements that churn out canned responses. Guaranteed to irritate.",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-chat-light.svg",
  },
  {
    name: "Gift Cards",
    description:
      "We sell these hoping that you will buy them for your friends and they will never actually use it. Free money for us, it's great.",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-gift-card-light.svg",
  },
  {
    name: "For the planet",
    imageSrc:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-planet-light.svg",
    description:
      "We’ve pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

export const reviews = {
  average: 4,
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This icon pack is just what I need for my latest project. There's an icon for just about anything I could ever need. Love the playful look!</p>
      `,
      date: "July 16, 2021",
      datetime: "2021-07-16",
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    {
      id: 2,
      rating: 5,
      content: `
        <p>Blown away by how polished this icon pack is. Everything looks so consistent and each SVG is optimized out of the box so I can use it directly with confidence. It would take me several hours to create a single icon this good, so it's a steal at this price.</p>
      `,
      date: "July 12, 2021",
      datetime: "2021-07-12",
      author: "Hector Gibbons",
      avatarSrc:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

export const faqs = [
  {
    question: "What format are these icons?",
    answer:
      "The icons are in SVG (Scalable Vector Graphic) format. They can be imported into your design tool of choice and used directly in code.",
  },
  {
    question: "Can I use the icons at different sizes?",
    answer:
      "Yes. The icons are drawn on a 24 x 24 pixel grid, but the icons can be scaled to different sizes as needed. We don't recommend going smaller than 20 x 20 or larger than 64 x 64 to retain legibility and visual balance.",
  },
  // More FAQs...
];

export const mockProductData = {
  men: {
    shoes: {
      formal: {
        "brown-formal-shoes": {
          name: "Brown Formal Shoes",
          price: "$60",
          description: "Elegant brown formal shoes for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "black-formal-shoes": {
          name: "Black Formal Shoes",
          price: "$65",
          description: "Classic black formal shoes for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      sneakers: {
        "blue-sneakers": {
          name: "Blue Sneakers",
          price: "$40",
          description: "Stylish and comfortable sneakers for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "white-sneakers": {
          name: "White Sneakers",
          price: "$60",
          description: "Comfortable white sneakers for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "black-sneakers": {
          name: "Black Sneakers",
          price: "$65",
          description: "Stylish black sneakers for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "green-sneakers": {
          name: "Green Sneakers",
          price: "$45",
          description: "Comfy green sneakers for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      sandals: {
        "summer-sandals": {
          name: "Summer Sandals",
          price: "$40",
          description: "Cool sandals for summer days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "brown-sandals": {
          name: "Brown Sandals",
          price: "$35",
          description: "Stylish brown sandals for casual wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "black-sandals": {
          name: "Black Sandals",
          price: "$40",
          description: "Black sandals for relaxed outings.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "leather-sandals": {
          name: "Leather Sandals",
          price: "$50",
          description: "Comfortable leather sandals for daily wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      boots: {
        "ankle-boots": {
          name: "Ankle Boots",
          price: "$80",
          description: "Stylish ankle boots for women.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "snow-boots": {
          name: "Snow Boots",
          price: "$70",
          description: "Warm snow boots for winter play.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "rain-boots": {
          name: "Rain Boots",
          price: "$55",
          description: "Waterproof rain boots for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "leather-boots": {
          name: "Leather Boots",
          price: "$120",
          description: "Durable leather boots for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "combat-boots": {
          name: "Combat Boots",
          price: "$55",
          description: "Trendy combat boots for the adventurous kid.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/combat-boots-for-kids-600nw-92008067.jpg",
        },
        "chelsea-boots": {
          name: "Chelsea Boots",
          price: "$50",
          description:
            "Classic Chelsea boots for kids, stylish and easy to wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/chelsea-boots-600nw-92008067.jpg",
        },
        "hiking-boots": {
          name: "Hiking Boots",
          price: "$60",
          description: "Durable hiking boots, perfect for young adventurers.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/hiking-boots-600nw-92008067.jpg",
        },
        "suede-boots": {
          name: "Suede Boots",
          price: "$110",
          description: "Fashionable suede boots for cold weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
    },
    clothing: {
      formal_wear: {
        "tuxedo-suit": {
          name: "Tuxedo Suit",
          price: "$250",
          description:
            "A classic tuxedo suit for formal events and black-tie occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "dress-shirt": {
          name: "Dress Shirt",
          price: "$45",
          description:
            "A tailored dress shirt perfect for business and formal occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "dress-pants": {
          name: "Dress Pants",
          price: "$80",
          description:
            "Tailored dress pants to complete your formal look with comfort and style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "suit-jacket": {
          name: "Suit Jacket",
          price: "$100",
          description: "A sophisticated suit jacket for formal occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        cufflinks: {
          name: "Cufflinks",
          price: "$25",
          description:
            "Elegant cufflinks to elevate your formal attire and add a touch of sophistication.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "dress-shoes": {
          name: "Dress Shoes",
          price: "$150",
          description:
            "Classic leather dress shoes for formal occasions, designed for comfort and style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        vest: {
          name: "Formal Vest",
          price: "$60",
          description:
            "A sleek and sophisticated vest to complete your suit for a formal look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "dress-socks": {
          name: "Dress Socks",
          price: "$12",
          description:
            "High-quality, comfortable dress socks that complement your formal outfit.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "formal-tie": {
          name: "Formal Tie",
          price: "$30",
          description:
            "A classic silk tie for any formal event, available in various colors.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "bow-tie": {
          name: "Bow Tie",
          price: "$20",
          description:
            "A stylish bow tie to complement tuxedos and suits for formal occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "parka-coat": {
          name: "Parka Coat",
          price: "$220",
          description: "Heavy-duty parka coat for ultimate winter protection.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "trench-coat": {
          name: "Trench Coat",
          price: "$160",
          description: "Sleek and stylish trench coat for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "rain-jacket": {
          name: "Rain Jacket",
          price: "$80",
          description: "Waterproof rain jacket for unpredictable weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "blazer-jacket": {
          name: "Blazer Jacket",
          price: "$180",
          description: "Sophisticated blazer jacket for business meetings.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "slim-fit-blazer": {
          name: "Slim Fit Blazer",
          price: "$120",
          description:
            "A stylish slim-fit blazer ideal for both business and casual formal wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      activewear: {
        "running-shorts": {
          name: "Running Shorts",
          price: "$35",
          description:
            "Lightweight and breathable shorts for running and workouts.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "performance-t-shirt": {
          name: "Performance T-Shirt",
          price: "$40",
          description:
            "Moisture-wicking t-shirt designed for intense physical activities.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "gym-pants": {
          name: "Gym Pants",
          price: "$50",
          description:
            "Stretchable and durable pants designed for maximum movement and comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "compression-shirt": {
          name: "Compression Shirt",
          price: "$45",
          description:
            "Tight-fitting shirt that provides support and enhances blood circulation.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "track-jacket": {
          name: "Track Jacket",
          price: "$60",
          description:
            "Comfortable and sleek jacket for warm-ups or post-workout.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "sports-leggings": {
          name: "Sports Leggings",
          price: "$55",
          description:
            "High-performance leggings designed for flexibility and comfort during workouts.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "training-shoes": {
          name: "Training Shoes",
          price: "$75",
          description:
            "Versatile shoes designed for weightlifting, running, and various workouts.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "sweat-wicking-jacket": {
          name: "Sweat-Wicking Jacket",
          price: "$70",
          description:
            "Lightweight jacket designed to wick away sweat and keep you dry during workouts.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "base-layer-shirt": {
          name: "Base Layer Shirt",
          price: "$38",
          description:
            "A moisture-wicking base layer shirt to keep you dry and comfortable in any workout.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "athletic-shorts": {
          name: "Athletic Shorts",
          price: "$25",
          description:
            "Perfect for high-intensity workouts, providing flexibility and breathability.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      sleepwear: {
        "silk-pajamas": {
          name: "Silk Pajamas",
          price: "$40",
          description: "Luxurious silk pajamas for a good night’s sleep.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "cotton-pajamas": {
          name: "Cotton Pajamas",
          price: "$30",
          description: "Soft cotton pajamas for comfortable sleep.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "silk-robes": {
          name: "Silk Robes",
          price: "$85",
          description: "Luxurious silk robes for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      underwear: {
        "cotton-boxers": {
          name: "Cotton Boxers",
          price: "$20",
          description:
            "Comfortable and breathable cotton boxers for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "slim-fit-boxers": {
          name: "Slim Fit Boxers",
          price: "$25",
          description:
            "Slim fit boxers offering a snug fit and ultimate comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "sport-boxers": {
          name: "Sports Boxers",
          price: "$30",
          description:
            "Sporty boxers designed for high performance and comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "printed-boxers": {
          name: "Printed Boxers",
          price: "$22",
          description:
            "Fun and stylish printed boxers for a more personalized look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "microfiber-boxers": {
          name: "Microfiber Boxers",
          price: "$28",
          description:
            "Soft and breathable microfiber boxers for a smooth feel.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "boxer-briefs": {
          name: "Boxer Briefs",
          price: "$25",
          description:
            "Combination of boxers and briefs for a comfortable and secure fit.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "athletic-briefs": {
          name: "Athletic Briefs",
          price: "$30",
          description: "Performance-oriented briefs for an active lifestyle.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        briefs: {
          name: "Classic Briefs",
          price: "$18",
          description: "Soft and stretchy briefs for daily wear and comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "thermal-briefs": {
          name: "Thermal Briefs",
          price: "$35",
          description: "Warm and cozy thermal briefs perfect for cold weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "luxury-briefs": {
          name: "Luxury Briefs",
          price: "$50",
          description:
            "Premium luxury briefs made from high-quality materials.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      outerwear: {
        "leather-jacket": {
          name: "Leather Jacket",
          price: "$150",
          description: "Stylish leather jacket for cool evenings.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "denim-jacket": {
          name: "Denim Jacket",
          price: "$100",
          description: "Classic denim jacket with a modern fit.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "bomber-jacket": {
          name: "Bomber Jacket",
          price: "$130",
          description: "A casual bomber jacket with a sleek design.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "puffer-coat": {
          name: "Puffer Coat",
          price: "$170",
          description: "Insulated puffer coat perfect for cold weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },

        "hooded-jacket": {
          name: "Hooded Jacket",
          price: "$120",
          description: "Casual hooded jacket for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "fleece-jacket": {
          name: "Fleece Jacket",
          price: "$90",
          description: "Comfortable fleece jacket for warmth and layering.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "vest-jacket": {
          name: "Vest Jacket",
          price: "$110",
          description: "Stylish vest jacket for layering over shirts.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },

        "quilted-jacket": {
          name: "Quilted Jacket",
          price: "$140",
          description: "Stylish quilted jacket with a modern fit.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        peacoat: {
          name: "Peacoat",
          price: "$160",
          description: "Classic peacoat for a timeless winter look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "winter-coat": {
          name: "Winter Coat",
          price: "$180",
          description: "Warm and cozy winter coat for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      swimwear: {
        "swim-trunks": {
          name: "Swim Trunks",
          price: "$35",
          description: "Comfortable swim trunks perfect for the beach or pool.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "board-shorts": {
          name: "Board Shorts",
          price: "$40",
          description:
            "Long board shorts designed for both surfing and swimming.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "swim-briefs": {
          name: "Swim Briefs",
          price: "$25",
          description: "Sleek swim briefs for a streamlined fit in the water.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "rash-guard": {
          name: "Rash Guard",
          price: "$30",
          description:
            "Protective rash guard for extra sun protection and comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        speedo: {
          name: "Speedo",
          price: "$45",
          description: "Classic speedo for a close and competitive fit.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "swim-suit": {
          name: "Swim Suit",
          price: "$50",
          description:
            "A full-body swim suit for better movement in the water.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "water-shorts": {
          name: "Water Shorts",
          price: "$38",
          description:
            "Versatile water shorts perfect for swimming and casual wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "swim-surf-trunks": {
          name: "Swim & Surf Trunks",
          price: "$42",
          description:
            "Multi-purpose trunks designed for both swimming and surfing.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "beach-shorts": {
          name: "Beach Shorts",
          price: "$28",
          description: "Casual beach shorts ideal for lounging or swimming.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      pants: {
        "skinny-jeans": {
          name: "Skinny Jeans",
          price: "$50",
          description: "Slim-fit jeans for a modern, stylish look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "straight-leg-jeans": {
          name: "Straight Leg Jeans",
          price: "$55",
          description: "Classic straight-leg jeans for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "cargo-pants": {
          name: "Cargo Pants",
          price: "$45",
          description:
            "Durable and versatile cargo pants with plenty of pockets.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        chinos: {
          name: "Chinos",
          price: "$40",
          description:
            "Casual yet refined chinos, perfect for both work and play.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        joggers: {
          name: "Joggers",
          price: "$35",
          description:
            "Comfortable jogger pants for casual wear and outdoor activities.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "dress-pants": {
          name: "Dress Pants",
          price: "$65",
          description:
            "Tailored dress pants for formal events and office wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "athletic-pants": {
          name: "Athletic Pants",
          price: "$30",
          description:
            "Comfortable athletic pants for workouts and outdoor activities.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "linen-pants": {
          name: "Linen Pants",
          price: "$50",
          description: "Lightweight linen pants perfect for warm weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "twill-pants": {
          name: "Twill Pants",
          price: "$55",
          description:
            "Soft twill pants that are durable and versatile for any occasion.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "khaki-pants": {
          name: "Khaki Pants",
          price: "$40",
          description:
            "Classic khaki pants, a timeless option for casual wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      tops: {
        "basic-t-shirt": {
          name: "Basic T-Shirt",
          price: "$25",
          description:
            "A comfortable and versatile basic t-shirt for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "polo-shirt": {
          name: "Polo Shirt",
          price: "$35",
          description:
            "A classic polo shirt, perfect for casual or smart-casual occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "v-neck-shirt": {
          name: "V-Neck Shirt",
          price: "$30",
          description:
            "A stylish v-neck shirt, a great option for a trendy and casual look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "button-down-shirt": {
          name: "Button-Down Shirt",
          price: "$50",
          description:
            "A versatile button-down shirt for both casual and semi-formal wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "henley-shirt": {
          name: "Henley Shirt",
          price: "$40",
          description:
            "A casual henley shirt with a button placket for a laid-back yet stylish look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "flannel-shirt": {
          name: "Flannel Shirt",
          price: "$55",
          description:
            "A warm and cozy flannel shirt, perfect for cooler weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "graphic-t-shirt": {
          name: "Graphic T-Shirt",
          price: "$30",
          description:
            "A bold and artistic graphic t-shirt that adds personality to your casual wardrobe.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "long-sleeve-shirt": {
          name: "Long Sleeve Shirt",
          price: "$45",
          description:
            "A comfortable long sleeve shirt for a refined yet relaxed look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "hooded-sweatshirt": {
          name: "Hooded Sweatshirt",
          price: "$60",
          description: "A cozy hooded sweatshirt for casual, laid-back days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        sweater: {
          name: "Sweater",
          price: "$70",
          description:
            "A comfortable and stylish sweater, ideal for layering in colder weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
    },
    accessories: {
      necklaces_and_braceslets: {
        "silver-necklace": {
          name: "Silver Necklace",
          price: "$55",
          description: "Elegant silver necklace for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "leather-bracelet": {
          name: "Leather Bracelet",
          price: "$25",
          description: "Stylish leather bracelet for a rugged look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "beaded-necklace": {
          name: "Beaded Necklace",
          price: "$40",
          description: "Casual beaded necklace for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "gold-chain": {
          name: "Gold Chain",
          price: "$120",
          description: "Luxury gold chain for formal and casual wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      sunglasses: {
        "round-sunglasses": {
          name: "Round Sunglasses",
          price: "$45",
          description: "Stylish round sunglasses for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "aviator-sunglasses": {
          name: "Aviator Sunglasses",
          price: "$60",
          description: "Classic aviator sunglasses for a timeless look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "square-sunglasses": {
          name: "Square Sunglasses",
          price: "$50",
          description: "Bold and modern square sunglasses.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "polarized-sunglasses": {
          name: "Polarized Sunglasses",
          price: "$70",
          description: "Polarized sunglasses to reduce glare and protect eyes.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "wayfarer-sunglasses": {
          name: "Wayfarer Sunglasses",
          price: "$55",
          description: "Iconic wayfarer sunglasses for a timeless style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/wayfarer-sunglasses-600nw-92008067.jpg",
        },

        "sport-sunglasses": {
          name: "Sport Sunglasses",
          price: "$75",
          description: "Sporty sunglasses designed for active men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/sport-sunglasses-600nw-92008067.jpg",
        },
        "fishing-sunglasses": {
          name: "Fishing Sunglasses",
          price: "$85",
          description: "Durable sunglasses for fishing and outdoor activities.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/fishing-sunglasses-600nw-92008067.jpg",
        },
        "color-block-sunglasses": {
          name: "Color Block Sunglasses",
          price: "$70",
          description: "Trendy color-block sunglasses for a fun and bold look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/color-block-sunglasses-600nw-92008067.jpg",
        },
        "tactical-sunglasses": {
          name: "Tactical Sunglasses",
          price: "$90",
          description: "Rugged tactical sunglasses for outdoor adventures.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/tactical-sunglasses-600nw-92008067.jpg",
        },
        "oversized-sunglasses": {
          name: "Oversized Sunglasses",
          price: "$70",
          description:
            "Bold oversized sunglasses for maximum protection and style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/oversized-sunglasses-600nw-92008067.jpg",
        },
      },
      watches: {
        "sport-watch": {
          name: "Sport Watch",
          price: "$80",
          description: "Sporty and durable watch for active men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "dress-watch": {
          name: "Dress Watch",
          price: "$120",
          description: "Elegant dress watch for formal occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        smartwatch: {
          name: "Smartwatch",
          price: "$150",
          description: "High-tech smartwatch with fitness tracking features.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "chronograph-watch": {
          name: "Chronograph Watch",
          price: "$200",
          description: "Premium chronograph watch with multiple dials.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      wallets: {
        "leather-wallet": {
          name: "Leather Wallet",
          price: "$70",
          description:
            "Classic leather wallet, durable and stylish for daily use.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/black-leather-wallet-600nw-92008067.jpg",
        },
        "bifold-wallet": {
          name: "Bifold Wallet",
          price: "$50",
          description:
            "Timeless bifold wallet with plenty of card slots and cash space.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/bifold-wallet-600nw-92008067.jpg",
        },
        "trifold-wallet": {
          name: "Trifold Wallet",
          price: "$55",
          description:
            "Practical trifold wallet with multiple compartments for cards and cash.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/trifold-wallet-600nw-92008067.jpg",
        },
        "minimalist-wallet": {
          name: "Minimalist Wallet",
          price: "$30",
          description: "Slim minimalist wallet designed for essentials only.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/minimalist-wallet-600nw-92008067.jpg",
        },
        "money-clip-wallet": {
          name: "Money Clip Wallet",
          price: "$45",
          description:
            "Stylish wallet with money clip for secure cash holding.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/money-clip-wallet-600nw-92008067.jpg",
        },
        "cardholder-wallet": {
          name: "Cardholder Wallet",
          price: "$40",
          description:
            "Compact wallet for cards and a bit of cash, perfect for everyday carry.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/cardholder-wallet-600nw-92008067.jpg",
        },
        "checkbook-wallet": {
          name: "Checkbook Wallet",
          price: "$60",
          description: "Wallet designed with checkbook holders and card slots.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/checkbook-wallet-600nw-92008067.jpg",
        },
        "zip-around-wallet": {
          name: "Zip-Around Wallet",
          price: "$75",
          description:
            "Secure zip-around wallet with ample storage for cards, cash, and coins.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/zip-around-wallet-600nw-92008067.jpg",
        },
        "passport-wallet": {
          name: "Passport Wallet",
          price: "$85",
          description:
            "Large wallet designed to hold a passport along with other important documents.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/passport-wallet-600nw-92008067.jpg",
        },
        "travel-wallet": {
          name: "Travel Wallet",
          price: "$90",
          description:
            "Functional travel wallet with compartments for passport, tickets, and cash.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/travel-wallet-600nw-92008067.jpg",
        },
      },
      scarves: {
        "winter-scarf": {
          name: "Winter Scarf",
          price: "$35",
          description: "Warm scarf for cold weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "silk-scarf": {
          name: "Silk Scarf",
          price: "$50",
          description: "Elegant silk scarf for formal occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "casual-scarf": {
          name: "Casual Scarf",
          price: "$25",
          description: "Casual and comfortable scarf for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "cashmere-scarf": {
          name: "Cashmere Scarf",
          price: "$100",
          description: "Luxurious cashmere scarf for the cold season.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "wool-scarf": {
          name: "Wool Scarf",
          price: "$35",
          description: "Warm wool scarf for the winter, soft and cozy.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/wool-scarf-600nw-92008067.jpg",
        },
        "plaid-scarf": {
          name: "Plaid Scarf",
          price: "$40",
          description:
            "Classic plaid pattern scarf, perfect for both casual and formal wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/plaid-scarf-600nw-92008067.jpg",
        },
        "knitted-scarf": {
          name: "Knitted Scarf",
          price: "$30",
          description: "Hand-knitted scarf for a cozy, casual look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/knitted-scarf-600nw-92008067.jpg",
        },
        "leather-scarf": {
          name: "Leather Scarf",
          price: "$90",
          description: "Sleek leather scarf for a sophisticated and edgy look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/leather-scarf-600nw-92008067.jpg",
        },
        "pashmina-scarf": {
          name: "Pashmina Scarf",
          price: "$50",
          description: "Soft pashmina scarf, perfect for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/pashmina-scarf-600nw-92008067.jpg",
        },
        "tartan-scarf": {
          name: "Tartan Scarf",
          price: "$45",
          description: "Bold tartan design scarf for a classic style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/tartan-scarf-600nw-92008067.jpg",
        },
      },
      belts: {
        "leather-belt": {
          name: "Leather Belt",
          price: "$40",
          description: "Classic leather belt for casual and formal wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/leather-belt-600nw-92008067.jpg",
        },
        "canvas-belt": {
          name: "Canvas Belt",
          price: "$25",
          description: "Durable canvas belt for everyday use.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/canvas-belt-600nw-92008067.jpg",
        },
        "dress-belt": {
          name: "Dress Belt",
          price: "$55",
          description: "Sleek dress belt for formal occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/dress-belt-600nw-92008067.jpg",
        },
        "woven-belt": {
          name: "Woven Belt",
          price: "$35",
          description: "Stylish woven belt for casual wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/woven-belt-600nw-92008067.jpg",
        },
        "reversible-belt": {
          name: "Reversible Belt",
          price: "$45",
          description: "Versatile reversible belt for different styles.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/reversible-belt-600nw-92008067.jpg",
        },
        "belt-with-buckle": {
          name: "Belt with Buckle",
          price: "$30",
          description: "Classic belt with stylish buckle design.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/belt-with-buckle-600nw-92008067.jpg",
        },
        "braided-leather-belt": {
          name: "Braided Leather Belt",
          price: "$50",
          description: "Handmade braided leather belt for a unique look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/braided-leather-belt-600nw-92008067.jpg",
        },
      },
      bags: {
        "messenger-bag": {
          name: "Messenger Bag",
          price: "$80",
          description:
            "Casual messenger bag for men, perfect for carrying essentials.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "leather-bag": {
          name: "Leather Bag",
          price: "$150",
          description:
            "Elegant leather bag for professional and casual settings.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        backpack: {
          name: "Backpack",
          price: "$70",
          description: "Spacious and durable backpack for daily use.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        briefcase: {
          name: "Leather Briefcase",
          price: "$150",
          description: "Professional leather briefcase for work.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/leather-briefcase-600nw-92008067.jpg",
        },
        "duffle-bag": {
          name: "Duffle Bag",
          price: "$70",
          description: "Spacious duffle bag for weekend trips.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/duffle-bag-600nw-92008067.jpg",
        },
        "tote-bag": {
          name: "Tote Bag",
          price: "$50",
          description: "Versatile tote bag for daily use.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/tote-bag-600nw-92008067.jpg",
        },
        "crossbody-bag": {
          name: "Crossbody Bag",
          price: "$45",
          description: "Stylish crossbody bag for on-the-go convenience.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/crossbody-bag-600nw-92008067.jpg",
        },
        "canvas-bag": {
          name: "Canvas Bag",
          price: "$40",
          description: "Casual canvas bag perfect for everyday errands.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/canvas-bag-600nw-92008067.jpg",
        },
        "duffel-bag": {
          name: "Duffel Bag",
          price: "$120",
          description: "Sturdy duffel bag for travel or gym use.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      hats: {
        "fedora-hat": {
          name: "Fedora Hat",
          price: "$50",
          description: "Classic fedora for men, perfect for any season.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "baseball-cap": {
          name: "Baseball Cap",
          price: "$25",
          description: "Casual baseball cap for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        beanie: {
          name: "Beanie",
          price: "$30",
          description: "Cozy beanie to keep you warm during the cold weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/beanie-600nw-92008067.jpg",
        },
        "bucket-hat": {
          name: "Bucket Hat",
          price: "$35",
          description: "Stylish and practical bucket hat for sunny days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/bucket-hat-600nw-92008067.jpg",
        },
        "panama-hat": {
          name: "Panama Hat",
          price: "$75",
          description: "Elegant Panama hat for a relaxed look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/panama-hat-600nw-92008067.jpg",
        },
        "trucker-hat": {
          name: "Trucker Hat",
          price: "$22",
          description: "Trendy trucker hat for a laid-back style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/trucker-hat-600nw-92008067.jpg",
        },
        "cowboy-hat": {
          name: "Cowboy Hat",
          price: "$100",
          description: "Stylish cowboy hat for a rugged and classic look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/cowboy-hat-600nw-92008067.jpg",
        },
      },
    },
  },
  women: {
    shoes: {
      sneakers: {
        "red-sneakers": {
          name: "Red Sneakers",
          price: "$55",
          description: "Comfortable red sneakers for women.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "blue-sneakers": {
          name: "Blue Sneakers",
          price: "$60",
          description: "Stylish blue sneakers for women.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "white-sneakers": {
          name: "White Sneakers",
          price: "$50",
          description: "Versatile white sneakers for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "pink-sneakers": {
          name: "Pink Sneakers",
          price: "$58",
          description: "Trendy pink sneakers for a chic look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "black-sneakers": {
          name: "Black Sneakers",
          price: "$65",
          description:
            "Sleek and stylish black sneakers, perfect for any outfit.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "gray-sneakers": {
          name: "Gray Sneakers",
          price: "$62",
          description: "Comfortable gray sneakers for casual and sporty looks.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "leather-sneakers": {
          name: "Leather Sneakers",
          price: "$80",
          description:
            "Durable leather sneakers for an upscale streetwear style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "platform-sneakers": {
          name: "Platform Sneakers",
          price: "$75",
          description: "Trendy platform sneakers for added height and comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "mesh-sneakers": {
          name: "Mesh Sneakers",
          price: "$65",
          description: "Breathable mesh sneakers, perfect for warm weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      flats: {
        "ballet-flats": {
          name: "Ballet Flats",
          price: "$45",
          description: "Classic ballet flats for casual wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "pointed-toe-flats": {
          name: "Pointed Toe Flats",
          price: "$50",
          description: "Chic pointed-toe flats for a polished look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "leather-flats": {
          name: "Leather Flats",
          price: "$65",
          description: "Elegant leather flats for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "suede-flats": {
          name: "Suede Flats",
          price: "$60",
          description:
            "Soft and comfortable suede flats, perfect for any occasion.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "floral-flats": {
          name: "Floral Flats",
          price: "$55",
          description: "Stylish floral flats for a fun and feminine look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "espadrille-flats": {
          name: "Espadrille Flats",
          price: "$70",
          description: "Light and airy espadrille flats, perfect for summer.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "metallic-flats": {
          name: "Metallic Flats",
          price: "$75",
          description:
            "Shiny metallic flats to add a touch of glam to your outfit.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "velvet-flats": {
          name: "Velvet Flats",
          price: "$80",
          description: "Luxurious velvet flats for a stylish, rich look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "strap-flats": {
          name: "Strap Flats",
          price: "$65",
          description:
            "Trendy strap flats with a secure fit and modern design.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "peep-toe-flats": {
          name: "Peep Toe Flats",
          price: "$60",
          description: "Flattering peep-toe flats with a touch of elegance.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      heels: {
        "high-heels": {
          name: "High Heels",
          price: "$90",
          description: "Elegant high heels for formal events.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "stiletto-heels": {
          name: "Stiletto Heels",
          price: "$120",
          description:
            "Classic stiletto heels for a sleek, sophisticated look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "platform-heels": {
          name: "Platform Heels",
          price: "$110",
          description: "Trendy platform heels for added height and comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "block-heels": {
          name: "Block Heels",
          price: "$95",
          description: "Stable and stylish block heels for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "wedge-heels": {
          name: "Wedge Heels",
          price: "$85",
          description: "Comfortable wedge heels with a chic, summery vibe.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "ankle-strap-heels": {
          name: "Ankle Strap Heels",
          price: "$100",
          description: "Stylish ankle-strap heels for a trendy, secure fit.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "peep-toe-heels": {
          name: "Peep Toe Heels",
          price: "$110",
          description:
            "Charming peep-toe heels for a playful and feminine look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "pointed-toe-heels": {
          name: "Pointed Toe Heels",
          price: "$105",
          description: "Elegant pointed-toe heels for formal occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "lace-up-heels": {
          name: "Lace-up Heels",
          price: "$130",
          description:
            "Fashion-forward lace-up heels for a bold and trendy look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "slingback-heels": {
          name: "Slingback Heels",
          price: "$120",
          description: "Classic slingback heels for a timeless, elegant style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      boots: {
        "ankle-boots": {
          name: "Ankle Boots",
          price: "$80",
          description: "Stylish ankle boots for women.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "knee-high-boots": {
          name: "Knee High Boots",
          price: "$140",
          description: "Stylish knee-high boots for a chic, winter-ready look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "chelsea-boots": {
          name: "Chelsea Boots",
          price: "$130",
          description:
            "Trendy Chelsea boots with an elastic side for easy wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "combat-boots": {
          name: "Combat Boots",
          price: "$150",
          description: "Edgy combat boots for a bold, tough look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "riding-boots": {
          name: "Riding Boots",
          price: "$160",
          description: "Elegant riding boots for a classic, refined style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "western-boots": {
          name: "Western Boots",
          price: "$170",
          description: "Stylish western boots with a hint of cowboy charm.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "faux-fur-boots": {
          name: "Faux Fur Boots",
          price: "$120",
          description:
            "Warm faux fur-lined boots perfect for winter adventures.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "over-the-knee-boots": {
          name: "Over-the-Knee Boots",
          price: "$180",
          description:
            "Daring over-the-knee boots for a bold, fashionable statement.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "snow-boots": {
          name: "Snow Boots",
          price: "$110",
          description:
            "Durable snow boots designed to keep you warm and dry in winter.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "platform-boots": {
          name: "Platform Boots",
          price: "$135",
          description: "Fashionable platform boots for a modern, edgy look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "rain-boots": {
          name: "Rain Boots",
          price: "$55",
          description: "Waterproof rain boots for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "leather-boots": {
          name: "Leather Boots",
          price: "$120",
          description: "Durable leather boots for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "hiking-boots": {
          name: "Hiking Boots",
          price: "$60",
          description: "Durable hiking boots, perfect for young adventurers.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/hiking-boots-600nw-92008067.jpg",
        },
        "suede-boots": {
          name: "Suede Boots",
          price: "$110",
          description: "Fashionable suede boots for cold weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      sandals: {
        "summer-sandals": {
          name: "Summer Sandals",
          price: "$30",
          description: "Cool sandals for summer days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "flip-flops": {
          name: "Flip Flops",
          price: "$12",
          description: "Easy-to-wear flip-flops for kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "flat-sandals": {
          name: "Flat Sandals",
          price: "$40",
          description:
            "Comfortable and stylish flat sandals for casual outings.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "strap-sandals": {
          name: "Strap Sandals",
          price: "$45",
          description: "Elegant strap sandals perfect for warm weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "wedge-sandals": {
          name: "Wedge Sandals",
          price: "$60",
          description: "Chic wedge sandals with a comfortable heel.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "gladiator-sandals": {
          name: "Gladiator Sandals",
          price: "$70",
          description:
            "Trendy gladiator sandals with an ancient Roman-inspired design.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "platform-sandals": {
          name: "Platform Sandals",
          price: "$80",
          description: "Bold and stylish platform sandals for a trendy look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      formal: {
        pumps: {
          name: "Pumps",
          price: "$90",
          description: "Classic pumps for formal events and office wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "ballerina-flats": {
          name: "Ballerina Flats",
          price: "$50",
          description:
            "Charming ballerina flats for elegant yet comfortable wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "ballerina-heels": {
          name: "Ballerina Heels",
          price: "$70",
          description: "Stylish ballerina heels for a chic and feminine look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        oxfords: {
          name: "Oxfords",
          price: "$120",
          description: "Elegant leather oxfords for a refined look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        stilettos: {
          name: "Stilettos",
          price: "$100",
          description: "High heel stilettos for a bold and glamorous look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "block-heels": {
          name: "Block Heels",
          price: "$95",
          description: "Stable and stylish block heels for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "wedding-shoes": {
          name: "Wedding Shoes",
          price: "$200",
          description:
            "Elegant wedding shoes with intricate details for the big day.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        mules: {
          name: "Mules",
          price: "$75",
          description: "Stylish mules with an open back for formal wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "peep-toe": {
          name: "Peep Toe Shoes",
          price: "$85",
          description:
            "Sophisticated peep toe shoes for a modern yet classic look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
    },
    clothing: {
      maternity_clothing: {
        dress: {
          name: "Maternity Dress",
          price: "$80",
          description:
            "Comfortable and stylish maternity dress for expecting mothers.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-dress-600nw-92008067.jpg",
        },
        top: {
          name: "Maternity Top",
          price: "$45",
          description: "Soft and breathable maternity top for all-day comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-top-600nw-92008067.jpg",
        },
        pants: {
          name: "Maternity Pants",
          price: "$60",
          description:
            "Stretchy and comfortable maternity pants with an adjustable waistband.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-pants-600nw-92008067.jpg",
        },
        jeans: {
          name: "Maternity Jeans",
          price: "$75",
          description:
            "Stylish and comfortable maternity jeans with a belly band.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-jeans-600nw-92008067.jpg",
        },
        skirt: {
          name: "Maternity Skirt",
          price: "$50",
          description:
            "Flattering and comfortable maternity skirt for all seasons.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-skirt-600nw-92008067.jpg",
        },
        leggings: {
          name: "Maternity Leggings",
          price: "$30",
          description:
            "Soft and stretchy leggings that grow with you throughout pregnancy.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-leggings-600nw-92008067.jpg",
        },
        blouse: {
          name: "Maternity Blouse",
          price: "$55",
          description:
            "Elegant and breathable maternity blouse for professional and casual wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-blouse-600nw-92008067.jpg",
        },
        jacket: {
          name: "Maternity Jacket",
          price: "$120",
          description: "Stylish maternity jacket for layering over outfits.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-jacket-600nw-92008067.jpg",
        },
        "nursing-top": {
          name: "Maternity Nursing Top",
          price: "$40",
          description:
            "Convenient maternity nursing top designed for easy breastfeeding.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-nursing-top-600nw-92008067.jpg",
        },
        "pencil-skirt": {
          name: "Maternity Pencil Skirt",
          price: "$50",
          description:
            "Elegant and flattering pencil skirt with an adjustable waistband for comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-pencil-skirt-600nw-92008067.jpg",
        },
        "a-line-dress": {
          name: "Maternity A-Line Dress",
          price: "$70",
          description:
            "Classic A-line dress that grows with you during pregnancy.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-a-line-dress-600nw-92008067.jpg",
        },
        "maxi-dress": {
          name: "Maternity Maxi Dress",
          price: "$90",
          description:
            "Flowy and comfortable maxi dress perfect for casual outings or formal occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-maxi-dress-600nw-92008067.jpg",
        },
        "wrap-dress": {
          name: "Maternity Wrap Dress",
          price: "$75",
          description:
            "Stylish and flattering wrap dress designed for pregnancy comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-wrap-dress-600nw-92008067.jpg",
        },
        "sun-dress": {
          name: "Maternity Sun Dress",
          price: "$55",
          description:
            "Lightweight and breathable sundress perfect for the warmer months.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-sun-dress-600nw-92008067.jpg",
        },
        "maxi-skirt": {
          name: "Maternity Maxi Skirt",
          price: "$60",
          description:
            "Comfortable and stylish maxi skirt perfect for layering with maternity tops.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-maxi-skirt-600nw-92008067.jpg",
        },
        robe: {
          name: "Maternity Robe",
          price: "$35",
          description:
            "Soft and comfortable maternity robe for lounging at home.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-robe-600nw-92008067.jpg",
        },
        sweater: {
          name: "Maternity Sweater",
          price: "$60",
          description:
            "Cozy maternity sweater perfect for layering in colder months.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maternity-sweater-600nw-92008067.jpg",
        },
      },
      dresses_skirts: {
        "maxi-dress": {
          name: "Maxi Dress",
          price: "$135",
          description:
            "Flowy and elegant maxi dress, perfect for weddings and formal gatherings.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/maxi-dress-600nw-92008067.jpg",
        },
        "floral-dress": {
          name: "Floral Dress",
          price: "$50",
          description: "A beautiful floral dress perfect for spring.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "floral-midi-dress": {
          name: "Floral Midi Dress",
          price: "$60",
          description:
            "A vibrant floral print dress perfect for spring and summer occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/floral-midi-dress-600nw-92008067.jpg",
        },
        "black-maxi-dress": {
          name: "Black Maxi Dress",
          price: "$80",
          description:
            "Classic black maxi dress for a sophisticated look, perfect for formal events.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/black-maxi-dress-600nw-92008067.jpg",
        },
        "fit-and-flare-dress": {
          name: "Fit and Flare Dress",
          price: "$55",
          description:
            "A flattering fit-and-flare dress for an elegant yet comfortable style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/fit-and-flare-dress-600nw-92008067.jpg",
        },
        "pleated-midi-skirt": {
          name: "Pleated Midi Skirt",
          price: "$45",
          description:
            "A trendy pleated skirt, perfect for both casual and formal occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/pleated-midi-skirt-600nw-92008067.jpg",
        },
        "high-waisted-pencil-skirt": {
          name: "High-Waisted Pencil Skirt",
          price: "$50",
          description:
            "A versatile high-waisted pencil skirt for professional or casual wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/high-waisted-pencil-skirt-600nw-92008067.jpg",
        },
        "floral-wrap-dress": {
          name: "Floral Wrap Dress",
          price: "$65",
          description:
            "A flattering wrap dress with a floral print, ideal for casual or evening wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/floral-wrap-dress-600nw-92008067.jpg",
        },
        "denim-pleated-skirt": {
          name: "Denim Pleated Skirt",
          price: "$40",
          description:
            "A stylish denim pleated skirt that pairs well with both casual and dressy tops.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/denim-pleated-skirt-600nw-92008067.jpg",
        },
        "striped-maxi-skirt": {
          name: "Striped Maxi Skirt",
          price: "$55",
          description:
            "A comfortable and stylish striped maxi skirt perfect for summer wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/striped-maxi-skirt-600nw-92008067.jpg",
        },
        "silk-sundress": {
          name: "Silk Sundress",
          price: "$70",
          description:
            "An elegant silk sundress, perfect for warm-weather events.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/silk-sundress-600nw-92008067.jpg",
        },
        "leather-pencil-skirt": {
          name: "Leather Pencil Skirt",
          price: "$85",
          description: "A sleek leather pencil skirt for a bold and chic look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/leather-pencil-skirt-600nw-92008067.jpg",
        },
      },
      sleepwear: {
        "silk-pajama-set": {
          name: "Silk Pajama Set",
          price: "$95",
          description:
            "Luxurious silk pajama set for ultimate comfort and elegance.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/silk-pajama-set-600nw-92008067.jpg",
        },
        "cotton-nightgown": {
          name: "Cotton Nightgown",
          price: "$40",
          description:
            "Soft cotton nightgown for a relaxed and comfortable night’s sleep.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/cotton-nightgown-600nw-92008067.jpg",
        },
        "lace-trimmed-robe": {
          name: "Lace Trimmed Robe",
          price: "$55",
          description:
            "Elegant lace trimmed robe, perfect for lounging or wearing over pajamas.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/lace-trimmed-robe-600nw-92008067.jpg",
        },
        "flannel-pajama-set": {
          name: "Flannel Pajama Set",
          price: "$60",
          description:
            "Warm and cozy flannel pajama set for the colder months.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/flannel-pajama-set-600nw-92008067.jpg",
        },
        "lace-slip-nightdress": {
          name: "Lace Slip Nightdress",
          price: "$50",
          description:
            "Elegant lace slip nightdress, perfect for a romantic evening.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/lace-slip-nightdress-600nw-92008067.jpg",
        },
        "short-sleeve-pajama-set": {
          name: "Short Sleeve Pajama Set",
          price: "$35",
          description:
            "Comfortable short-sleeve pajama set, ideal for warmer nights.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/short-sleeve-pajama-set-600nw-92008067.jpg",
        },
        "silk-robe": {
          name: "Silk Robe",
          price: "$85",
          description:
            "A luxurious silk robe for a stylish and comfortable lounging experience.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/silk-robe-600nw-92008067.jpg",
        },
        "cotton-sleep-shirt": {
          name: "Cotton Sleep Shirt",
          price: "$30",
          description:
            "Breathable cotton sleep shirt for a comfortable and relaxed sleep.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/cotton-sleep-shirt-600nw-92008067.jpg",
        },
        "satin-sleepwear-set": {
          name: "Satin Sleepwear Set",
          price: "$70",
          description:
            "Elegant satin sleepwear set for a luxurious night’s sleep.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/satin-sleepwear-set-600nw-92008067.jpg",
        },
        "long-sleeve-pajama-set": {
          name: "Long Sleeve Pajama Set",
          price: "$50",
          description:
            "Cozy long-sleeve pajama set for colder nights, made of soft fabric.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/long-sleeve-pajama-set-600nw-92008067.jpg",
        },
        "cotton-pajamas": {
          name: "Cotton Pajamas",
          price: "$30",
          description: "Soft cotton pajamas for comfortable sleep.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "silk-robes": {
          name: "Silk Robes",
          price: "$85",
          description: "Luxurious silk robes for men.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      formal_wear: {
        "evening-gown": {
          name: "Evening Gown",
          price: "$200",
          description: "Elegant evening gown for special occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "cardigan-coat": {
          name: "Cardigan Coat",
          price: "$55",
          description: "Soft cardigan coat perfect for layering.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/cardigan-coat-600nw-92008067.jpg",
        },
        "cocktail-dress": {
          name: "Cocktail Dress",
          price: "$120",
          description: "Stylish cocktail dress perfect for evening parties.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/cocktail-dress-600nw-92008067.jpg",
        },
        "sheath-dress": {
          name: "Sheath Dress",
          price: "$100",
          description:
            "Chic sheath dress, ideal for business meetings or formal dinners.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/sheath-dress-600nw-92008067.jpg",
        },
        "ball-gown": {
          name: "Ball Gown",
          price: "$250",
          description:
            "Glamorous ball gown with intricate detailing for extravagant occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/ball-gown-600nw-92008067.jpg",
        },
        "blazer-dress": {
          name: "Blazer Dress",
          price: "$110",
          description:
            "Stylish blazer dress, perfect for formal meetings or dinner dates.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/blazer-dress-600nw-92008067.jpg",
        },
        "lace-dress": {
          name: "Lace Dress",
          price: "$95",
          description:
            "Intricate lace dress with delicate details for evening events.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/lace-dress-600nw-92008067.jpg",
        },
        "halter-dress": {
          name: "Halter Dress",
          price: "$85",
          description:
            "Sophisticated halter neck dress for an elegant and chic look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/halter-dress-600nw-92008067.jpg",
        },
      },
      activewear: {
        "sports-bra": {
          name: "Sports Bra",
          price: "$30",
          description:
            "Comfortable and supportive sports bra for active women.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/sports-bra-600nw-92008067.jpg",
        },
        "yoga-pants": {
          name: "Yoga Pants",
          price: "$45",
          description:
            "Stretchable yoga pants perfect for workouts or yoga sessions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/yoga-pants-600nw-92008067.jpg",
        },
        "athletic-tank-top": {
          name: "Athletic Tank Top",
          price: "$35",
          description:
            "Breathable and lightweight tank top for intense workouts.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/athletic-tank-top-600nw-92008067.jpg",
        },
        "compression-leggings": {
          name: "Compression Leggings",
          price: "$60",
          description:
            "Compression leggings for muscle support during exercise.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/compression-leggings-600nw-92008067.jpg",
        },
        "zip-up-jacket": {
          name: "Zip-Up Jacket",
          price: "$70",
          description:
            "Lightweight zip-up jacket for layering during workouts or runs.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/zip-up-jacket-600nw-92008067.jpg",
        },
        "running-shorts": {
          name: "Running Shorts",
          price: "$25",
          description: "Comfortable running shorts for enhanced performance.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/running-shorts-600nw-92008067.jpg",
        },
        "sports-leggings": {
          name: "Sports Leggings",
          price: "$50",
          description:
            "High-waisted leggings for active women with full range of motion.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/sports-leggings-600nw-92008067.jpg",
        },
        "workout-t-shirt": {
          name: "Workout T-Shirt",
          price: "$28",
          description: "Moisture-wicking workout t-shirt for daily training.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/workout-t-shirt-600nw-92008067.jpg",
        },
        "sports-biker-shorts": {
          name: "Sports Biker Shorts",
          price: "$40",
          description:
            "Stretchy biker shorts designed for high-intensity workouts.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/sports-biker-shorts-600nw-92008067.jpg",
        },
        "athletic-sweatshirt": {
          name: "Athletic Sweatshirt",
          price: "$65",
          description: "Soft athletic sweatshirt for post-workout comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/athletic-sweatshirt-600nw-92008067.jpg",
        },
      },
      underwear: {
        "cotton-briefs": {
          name: "Cotton Briefs",
          price: "$20",
          description: "Soft cotton briefs for everyday comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/cotton-briefs-600nw-92008067.jpg",
        },
        "high-waist-briefs": {
          name: "High Waist Briefs",
          price: "$25",
          description:
            "High-waist briefs that offer full coverage and comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/high-waist-briefs-600nw-92008067.jpg",
        },
        "bikini-briefs": {
          name: "Bikini Briefs",
          price: "$18",
          description: "Comfortable bikini briefs for daily wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/bikini-briefs-600nw-92008067.jpg",
        },
        "silk-panties": {
          name: "Silk Panties",
          price: "$50",
          description: "Luxurious silk panties for a smooth and soft feel.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/silk-panties-600nw-92008067.jpg",
        },
        "lace-thong": {
          name: "Lace Thong",
          price: "$30",
          description: "Sexy lace thong for special occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/lace-thong-600nw-92008067.jpg",
        },
      },
      pants: {
        "pant-suit": {
          name: "Pant Suit",
          price: "$180",
          description:
            "Tailored pant suit for professional and formal settings.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/pant-suit-600nw-92008067.jpg",
        },
        jeans: {
          name: "Jeans",
          price: "$60",
          description: "Classic denim jeans for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      tops: {
        "floral-top": {
          name: "Floral Top",
          price: "$30",
          description: "A beautiful floral print top.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      bras: {
        "lace-bras": {
          name: "Lace Bras",
          price: "$25",
          description: "Elegant lace bras for women.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "mesh-bra": {
          name: "Mesh Bra",
          price: "$38",
          description: "Breathable mesh bra with elegant details.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/mesh-bra-600nw-92008067.jpg",
        },
        "pushup-bra": {
          name: "Push-up Bra",
          price: "$35",
          description: "Enhance your curves with this comfortable push-up bra.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "sports-bra": {
          name: "Sports Bra",
          price: "$40",
          description: "Supportive sports bra for active women.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        bralette: {
          name: "Bralette",
          price: "$28",
          description: "A stylish and comfortable bralette for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "underwire-bra": {
          name: "Underwire Bra",
          price: "$35",
          description: "Supportive underwire bra for all-day comfort.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "nursing-bra": {
          name: "Nursing Bra",
          price: "$45",
          description:
            "Convenient and comfortable nursing bra for new mothers.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "plunge-bra": {
          name: "Plunge Bra",
          price: "$38",
          description: "Low-cut plunge bra for deep-neck outfits.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "lingerie-bra": {
          name: "Lingerie Bra",
          price: "$50",
          description: "Elegant lingerie bra perfect for special occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      outerwear: {
        "trench-coat": {
          name: "Trench Coat",
          price: "$130",
          description:
            "Sophisticated trench coat for layering over formal wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/trench-coat-600nw-92008067.jpg",
        },
        "denim-jacket": {
          name: "Denim Jacket",
          price: "$85",
          description: "Classic denim jacket for casual wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/denim-jacket-600nw-92008067.jpg",
        },
        "puffer-jacket": {
          name: "Puffer Jacket",
          price: "$100",
          description: "Warm and cozy puffer jacket for cold weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/puffer-jacket-600nw-92008067.jpg",
        },
        "wool-coat": {
          name: "Wool Coat",
          price: "$180",
          description: "Luxurious wool coat for formal and casual events.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/wool-coat-600nw-92008067.jpg",
        },
        "bomber-jacket": {
          name: "Bomber Jacket",
          price: "$75",
          description: "Cool and trendy bomber jacket for a casual look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/bomber-jacket-600nw-92008067.jpg",
        },
        peacoat: {
          name: "Peacoat",
          price: "$140",
          description: "Classic peacoat for timeless style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/peacoat-600nw-92008067.jpg",
        },
        "faux-fur-coat": {
          name: "Faux Fur Coat",
          price: "$130",
          description: "Luxurious faux fur coat for a glamorous look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/faux-fur-coat-600nw-92008067.jpg",
        },
        raincoat: {
          name: "Raincoat",
          price: "$60",
          description: "Functional raincoat to keep you dry in wet weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/raincoat-600nw-92008067.jpg",
        },

        "leather-jacket": {
          name: "Leather Jacket",
          price: "$150",
          description: "Classic leather jacket for women.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      swimwear: {
        "bikini-set": {
          name: "Bikini Set",
          price: "$40",
          description: "Stylish bikini set for the beach or pool.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/bikini-set-600nw-92008067.jpg",
        },
        "one-piece-swimsuit": {
          name: "One-Piece Swimsuit",
          price: "$60",
          description: "Elegant one-piece swimsuit with flattering design.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/one-piece-swimsuit-600nw-92008067.jpg",
        },
        "high-waisted-bikini": {
          name: "High-Waisted Bikini",
          price: "$50",
          description: "Retro-inspired high-waisted bikini for extra coverage.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/high-waisted-bikini-600nw-92008067.jpg",
        },
        tankini: {
          name: "Tankini",
          price: "$45",
          description: "Comfortable tankini top with matching bottoms.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/tankini-600nw-92008067.jpg",
        },
        "swim-dress": {
          name: "Swim Dress",
          price: "$70",
          description: "Flattering swim dress with built-in support.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/swim-dress-600nw-92008067.jpg",
        },
        "cover-up": {
          name: "Swim Cover-Up",
          price: "$30",
          description: "Lightweight swim cover-up for sun protection.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/swim-cover-up-600nw-92008067.jpg",
        },
        "sport-swimsuit": {
          name: "Sport Swimsuit",
          price: "$55",
          description: "Performance swimsuit for active beach days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/sport-swimsuit-600nw-92008067.jpg",
        },
        "strapless-bikini": {
          name: "Strapless Bikini",
          price: "$35",
          description: "Strapless bikini with supportive structure.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/strapless-bikini-600nw-92008067.jpg",
        },
        monokini: {
          name: "Monokini",
          price: "$80",
          description: "Sexy monokini with cutout details.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/monokini-600nw-92008067.jpg",
        },
        "swim-shorts": {
          name: "Swim Shorts",
          price: "$25",
          description: "Comfortable swim shorts for active swimmers.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/swim-shorts-600nw-92008067.jpg",
        },
      },
    },
    accessories: {
      necklaces_and_braceslets: {
        "gold-necklace": {
          name: "Gold Necklace",
          price: "$120",
          description: "Elegant gold necklace for special occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/gold-necklace-600nw-92008067.jpg",
        },
        "silver-necklace": {
          name: "Silver Necklace",
          price: "$80",
          description: "Stylish silver necklace for daily wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/silver-necklace-600nw-92008067.jpg",
        },
        "pearl-necklace": {
          name: "Pearl Necklace",
          price: "$150",
          description: "Classic pearl necklace for formal events.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/pearl-necklace-600nw-92008067.jpg",
        },
        "choker-necklace": {
          name: "Choker Necklace",
          price: "$40",
          description: "Trendy choker necklace for a modern look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/choker-necklace-600nw-92008067.jpg",
        },
        "heart-necklace": {
          name: "Heart Necklace",
          price: "$35",
          description: "Cute heart-shaped necklace for romantic moments.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/heart-necklace-600nw-92008067.jpg",
        },
        "diamond-necklace": {
          name: "Diamond Necklace",
          price: "$250",
          description: "Luxury diamond necklace for special occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/diamond-necklace-600nw-92008067.jpg",
        },
        "silver-bracelet": {
          name: "Silver Bracelet",
          price: "$60",
          description: "Sleek silver bracelet for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/silver-bracelet-600nw-92008067.jpg",
        },
        "gold-bracelet": {
          name: "Gold Bracelet",
          price: "$130",
          description: "Luxury gold bracelet for elegant evenings.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/gold-bracelet-600nw-92008067.jpg",
        },
        "bangle-bracelet": {
          name: "Bangle Bracelet",
          price: "$50",
          description: "Classic bangle bracelet for a chic look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/bangle-bracelet-600nw-92008067.jpg",
        },
        "beaded-bracelet": {
          name: "Beaded Bracelet",
          price: "$25",
          description: "Fun and colorful beaded bracelet for casual wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/beaded-bracelet-600nw-92008067.jpg",
        },
        "gemstone-bracelet": {
          name: "Gemstone Bracelet",
          price: "$75",
          description: "Beautiful gemstone bracelet for a pop of color.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/gemstone-bracelet-600nw-92008067.jpg",
        },
        "cuff-bracelet": {
          name: "Cuff Bracelet",
          price: "$40",
          description: "Bold cuff bracelet for a fashion-forward look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/cuff-bracelet-600nw-92008067.jpg",
        },
      },
      sunglasses: {
        "round-sunglasses": {
          name: "Round Sunglasses",
          price: "$45",
          description: "Trendy round sunglasses for a stylish look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/round-sunglasses-600nw-92008067.jpg",
        },
        "aviator-sunglasses": {
          name: "Aviator Sunglasses",
          price: "$60",
          description: "Classic aviator sunglasses for a cool vibe.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/aviator-sunglasses-600nw-92008067.jpg",
        },
        "cat-eye-sunglasses": {
          name: "Cat Eye Sunglasses",
          price: "$50",
          description: "Chic cat-eye sunglasses for a vintage look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/cat-eye-sunglasses-600nw-92008067.jpg",
        },
        "oversized-sunglasses": {
          name: "Oversized Sunglasses",
          price: "$70",
          description: "Elegant oversized sunglasses for a bold style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/oversized-sunglasses-600nw-92008067.jpg",
        },
        "square-sunglasses": {
          name: "Square Sunglasses",
          price: "$55",
          description: "Modern square sunglasses for a fashionable look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/square-sunglasses-600nw-92008067.jpg",
        },
        "polarized-sunglasses": {
          name: "Polarized Sunglasses",
          price: "$80",
          description: "Premium polarized sunglasses for clear vision.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/polarized-sunglasses-600nw-92008067.jpg",
        },
        "color-block-sunglasses": {
          name: "Color Block Sunglasses",
          price: "$65",
          description: "Trendy color-block sunglasses for a fun look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/color-block-sunglasses-600nw-92008067.jpg",
        },
        "gradient-sunglasses": {
          name: "Gradient Sunglasses",
          price: "$75",
          description: "Stylish gradient sunglasses for a sleek effect.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/gradient-sunglasses-600nw-92008067.jpg",
        },
        "round-metal-sunglasses": {
          name: "Round Metal Sunglasses",
          price: "$65",
          description:
            "Fashion-forward round metal sunglasses for a minimalist style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/round-metal-sunglasses-600nw-92008067.jpg",
        },
        "chic-sunglasses": {
          name: "Chic Sunglasses",
          price: "$60",
          description: "Sophisticated chic sunglasses for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/chic-sunglasses-600nw-92008067.jpg",
        },
      },
      watches: {
        "luxury-watch": {
          name: "Luxury Watch",
          price: "$120",
          description: "Elegant and luxurious watch for women.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "sport-watch": {
          name: "Sport Watch",
          price: "$80",
          description: "Sporty watch with a durable design.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "classic-watch": {
          name: "Classic Watch",
          price: "$120",
          description: "Elegant and timeless classic watch for women.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/classic-watch-600nw-92008067.jpg",
        },
        "gold-watch": {
          name: "Gold Watch",
          price: "$250",
          description: "Sophisticated gold watch perfect for formal occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/gold-watch-600nw-92008067.jpg",
        },
        "silver-watch": {
          name: "Silver Watch",
          price: "$180",
          description: "Chic silver watch with a polished finish.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/silver-watch-600nw-92008067.jpg",
        },
        "leather-strap-watch": {
          name: "Leather Strap Watch",
          price: "$110",
          description: "Stylish leather strap watch with a minimalist design.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/leather-strap-watch-600nw-92008067.jpg",
        },
        "diamond-watch": {
          name: "Diamond Watch",
          price: "$500",
          description: "Luxurious diamond-studded watch for special occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/diamond-watch-600nw-92008067.jpg",
        },
        "fitness-watch": {
          name: "Fitness Watch",
          price: "$95",
          description:
            "Smart fitness watch with health and activity tracking features.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/fitness-watch-600nw-92008067.jpg",
        },
        "minimalist-watch": {
          name: "Minimalist Watch",
          price: "$75",
          description: "Sleek and simple minimalist watch for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/minimalist-watch-600nw-92008067.jpg",
        },
        "vintage-watch": {
          name: "Vintage Watch",
          price: "$150",
          description: "Vintage-inspired watch with a retro design.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-watch-600nw-92008067.jpg",
        },
        "rose-gold-watch": {
          name: "Rose Gold Watch",
          price: "$220",
          description: "Elegant rose gold watch with a refined design.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/rose-gold-watch-600nw-92008067.jpg",
        },
      },
      wallets: {
        "leather-wallet": {
          name: "Leather Wallet",
          price: "$60",
          description: "Premium leather wallet for women.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "clutch-wallet": {
          name: "Clutch Wallet",
          price: "$50",
          description: "Elegant clutch wallet for evening outings.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "zip-around-wallet": {
          name: "Zip-Around Wallet",
          price: "$40",
          description: "Stylish zip-around wallet with plenty of space.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/zip-around-wallet-600nw-92008067.jpg",
        },
        "cardholder-wallet": {
          name: "Cardholder Wallet",
          price: "$30",
          description:
            "Compact cardholder wallet, ideal for carrying cards and cash.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/cardholder-wallet-600nw-92008067.jpg",
        },
        "coin-wallet": {
          name: "Coin Wallet",
          price: "$25",
          description: "Practical and small wallet designed for coins.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/coin-wallet-600nw-92008067.jpg",
        },
        "wristlet-wallet": {
          name: "Wristlet Wallet",
          price: "$55",
          description:
            "Chic wristlet wallet with a convenient strap for easy carrying.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/wristlet-wallet-600nw-92008067.jpg",
        },
        "fold-over-wallet": {
          name: "Fold-Over Wallet",
          price: "$50",
          description: "Fashionable fold-over wallet with sleek design.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/fold-over-wallet-600nw-92008067.jpg",
        },
        "checkbook-wallet": {
          name: "Checkbook Wallet",
          price: "$45",
          description:
            "Classic checkbook wallet with compartments for cards and cash.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/checkbook-wallet-600nw-92008067.jpg",
        },
        "chain-wallet": {
          name: "Chain Wallet",
          price: "$75",
          description: "Fashion-forward chain wallet for a stylish touch.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/chain-wallet-600nw-92008067.jpg",
        },
        "card-case-wallet": {
          name: "Card Case Wallet",
          price: "$20",
          description: "Sleek and compact card case for minimalists.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/card-case-wallet-600nw-92008067.jpg",
        },
      },
      scarves: {
        "cashmere-scarf": {
          name: "Cashmere Scarf",
          price: "$70",
          description: "Soft cashmere scarf for the cold weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "silk-scarf": {
          name: "Silk Scarf",
          price: "$45",
          description: "Luxurious silk scarf for elegant wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "chiffon-scarf": {
          name: "Chiffon Scarf",
          price: "$40",
          description: "Light and airy chiffon scarf, perfect for layering.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/chiffon-scarf-600nw-92008067.jpg",
        },
        "floral-scarf": {
          name: "Floral Scarf",
          price: "$35",
          description:
            "Beautiful floral design scarf, adds a pop of color to your outfit.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/floral-scarf-600nw-92008067.jpg",
        },
        "animal-print-scarf": {
          name: "Animal Print Scarf",
          price: "$50",
          description: "Bold animal print scarf for a stylish statement.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/animal-print-scarf-600nw-92008067.jpg",
        },
        "knitted-scarf": {
          name: "Knitted Scarf",
          price: "$25",
          description: "Cozy knitted scarf for casual wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/knitted-scarf-600nw-92008067.jpg",
        },
        "pashmina-scarf": {
          name: "Pashmina Scarf",
          price: "$70",
          description: "Luxurious pashmina scarf for an elegant touch.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/pashmina-scarf-600nw-92008067.jpg",
        },
      },
      belts: {
        "leather-belt": {
          name: "Leather Belt",
          price: "$40",
          description: "Elegant leather belt for a stylish look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/leather-belt-600nw-92008067.jpg",
        },
        "skinny-belt": {
          name: "Skinny Belt",
          price: "$25",
          description: "Slim and chic skinny belt for waist definition.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/skinny-belt-600nw-92008067.jpg",
        },
        "wide-belt": {
          name: "Wide Belt",
          price: "$35",
          description: "Statement wide belt for a bold look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/wide-belt-600nw-92008067.jpg",
        },
        "chain-belt": {
          name: "Chain Belt",
          price: "$55",
          description: "Stylish chain belt for a trendy and chic touch.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/chain-belt-600nw-92008067.jpg",
        },
        "braided-belt": {
          name: "Braided Belt",
          price: "$30",
          description: "Casual braided belt for a laid-back look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/braided-belt-600nw-92008067.jpg",
        },
        "reversible-belt": {
          name: "Reversible Belt",
          price: "$50",
          description:
            "Practical and stylish reversible belt for different outfits.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/reversible-belt-600nw-92008067.jpg",
        },
        "cummerbund-belt": {
          name: "Cummerbund Belt",
          price: "$60",
          description: "Elegant cummerbund-style belt for formal events.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/cummerbund-belt-600nw-92008067.jpg",
        },
      },
      bags: {
        handbag: {
          name: "Handbag",
          price: "$120",
          description: "Elegant leather handbag for stylish looks.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/elegant-handbag-600nw-92008067.jpg",
        },
        "tote-bag": {
          name: "Tote Bag",
          price: "$80",
          description: "Spacious and stylish tote bag for everyday use.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "clutch-bag": {
          name: "Clutch Bag",
          price: "$65",
          description: "Elegant clutch bag for evening events.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "shoulder-bag": {
          name: "Shoulder Bag",
          price: "$70",
          description: "Comfortable shoulder bag for casual outings.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/shoulder-bag-600nw-92008067.jpg",
        },
        backpack: {
          name: "Fashion Backpack",
          price: "$95",
          description: "Trendy backpack with a modern design.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/fashion-backpack-600nw-92008067.jpg",
        },
        "crossbody-bag": {
          name: "Crossbody Bag",
          price: "$60",
          description: "Versatile crossbody bag for hands-free convenience.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/crossbody-bag-600nw-92008067.jpg",
        },
        "canvas-bag": {
          name: "Canvas Bag",
          price: "$40",
          description:
            "Casual and practical canvas bag for everyday activities.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/canvas-bag-600nw-92008067.jpg",
        },
      },
      hats: {
        "fedora-hat": {
          name: "Fedora Hat",
          price: "$50",
          description: "Stylish fedora hat for a chic look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/fedora-hat-600nw-92008067.jpg",
        },
        "sun-hat": {
          name: "Sun Hat",
          price: "$40",
          description: "Wide-brimmed sun hat to protect from the sun.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/sun-hat-600nw-92008067.jpg",
        },
        beret: {
          name: "Beret",
          price: "$30",
          description: "Elegant beret for a sophisticated touch.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/beret-600nw-92008067.jpg",
        },
        beanie: {
          name: "Beanie",
          price: "$25",
          description: "Cozy beanie for cold weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/beanie-600nw-92008067.jpg",
        },
        "bucket-hat": {
          name: "Bucket Hat",
          price: "$35",
          description: "Casual bucket hat for sunny days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/bucket-hat-600nw-92008067.jpg",
        },
        "cloche-hat": {
          name: "Cloche Hat",
          price: "$60",
          description: "Vintage-inspired cloche hat for a unique look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/cloche-hat-600nw-92008067.jpg",
        },
        "wide-brim-hat": {
          name: "Wide Brim Hat",
          price: "$75",
          description: "Elegant wide-brimmed hat for a fashion-forward style.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/wide-brim-hat-600nw-92008067.jpg",
        },
      },
    },
  },
  kids: {
    shoes: {
      formal: {
        "black-formal-shoes": {
          name: "Black Formal Shoes",
          price: "$60",
          description: "Elegant black formal shoes for kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "brown-formal-shoes": {
          name: "Brown Formal Shoes",
          price: "$55",
          description: "Stylish brown formal shoes for kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "oxford-shoes": {
          name: "Oxford Shoes",
          price: "$55",
          description:
            "Stylish oxford shoes for kids, perfect for dressy occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/oxford-shoes-600nw-92008067.jpg",
        },
        "tan-dress-shoes": {
          name: "Tan Dress Shoes",
          price: "$40",
          description:
            "Tan formal dress shoes, versatile for various occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/tan-dress-shoes-600nw-92008067.jpg",
        },
        "leather-dress-shoes": {
          name: "Leather Dress Shoes",
          price: "$65",
          description:
            "Premium leather dress shoes for kids, perfect for formal wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/leather-dress-shoes-600nw-92008067.jpg",
        },
      },
      sandals: {
        "summer-sandals": {
          name: "Summer Sandals",
          price: "$25",
          description: "Cool and comfortable sandals perfect for summer days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/summer-sandals-600nw-92008067.jpg",
        },
        "flip-flops": {
          name: "Flip Flops",
          price: "$10",
          description:
            "Easy-to-wear flip-flops, great for the beach or casual outings.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/flip-flops-600nw-92008067.jpg",
        },
        "closed-toe-sandals": {
          name: "Closed Toe Sandals",
          price: "$30",
          description:
            "Stylish and durable closed-toe sandals for active kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/closed-toe-sandals-600nw-92008067.jpg",
        },
        "velcro-sandals": {
          name: "Velcro Sandals",
          price: "$28",
          description:
            "Convenient and adjustable velcro sandals for comfort and fit.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/velcro-sandals-600nw-92008067.jpg",
        },
        "sport-sandals": {
          name: "Sport Sandals",
          price: "$35",
          description:
            "Active sport sandals designed for kids who love outdoor adventures.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/sport-sandals-600nw-92008067.jpg",
        },
      },
      boots: {
        "snow-boots": {
          name: "Snow Boots",
          price: "$45",
          description:
            "Warm snow boots to keep your child's feet cozy during winter.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/snow-boots-600nw-92008067.jpg",
        },
        "brown-boots": {
          name: "Brown Boots",
          price: "$40",
          description: "Durable brown boots for winter adventures.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/childrens-brown-boots-600nw-92008067.jpg",
        },
        "pink-boots": {
          name: "Pink Boots",
          price: "$45",
          description: "Cute pink boots for outdoor play and rainy days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/childrens-pink-boots-600nw-92008067.jpg",
        },
        "black-boots": {
          name: "Black Boots",
          price: "$50",
          description: "Stylish black boots for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/childrens-black-boots-600nw-92008067.jpg",
        },
        "ankle-boots": {
          name: "Ankle Boots",
          price: "$40",
          description:
            "Stylish ankle boots perfect for the fall and winter seasons.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/ankle-boots-600nw-92008067.jpg",
        },
        "combat-boots": {
          name: "Combat Boots",
          price: "$55",
          description: "Trendy combat boots for the adventurous kid.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/combat-boots-for-kids-600nw-92008067.jpg",
        },
        "chelsea-boots": {
          name: "Chelsea Boots",
          price: "$50",
          description:
            "Classic Chelsea boots for kids, stylish and easy to wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/chelsea-boots-600nw-92008067.jpg",
        },
        "hiking-boots": {
          name: "Hiking Boots",
          price: "$60",
          description: "Durable hiking boots, perfect for young adventurers.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/hiking-boots-600nw-92008067.jpg",
        },
        "rain-boots": {
          name: "Rain Boots",
          price: "$25",
          description: "Waterproof rain boots, perfect for those rainy days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/rain-boots-600nw-92008067.jpg",
        },
      },
      sneakers: {
        "blue-sneakers": {
          name: "Blue Sneakers",
          price: "$40",
          description: "Stylish and comfortable sneakers for kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/blue-sneakers-600nw-92008067.jpg",
        },
        "green-sneakers": {
          name: "Green Sneakers",
          price: "$45",
          description: "Comfy green sneakers for children.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/green-sneakers-600nw-92008067.jpg",
        },
        "red-sneakers": {
          name: "Red Sneakers",
          price: "$50",
          description: "Bold red sneakers with excellent grip.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/red-sneakers-600nw-92008067.jpg",
        },
        "sport-sneakers": {
          name: "Sport Sneakers",
          price: "$55",
          description: "Durable sport sneakers made for active kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/sport-sneakers-600nw-92008067.jpg",
        },
        "light-up-sneakers": {
          name: "Light-Up Sneakers",
          price: "$60",
          description: "Fun and vibrant sneakers with light-up soles.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/light-up-sneakers-600nw-92008067.jpg",
        },
      },
    },
    clothing: {
      formal_wear: {
        "boys-suit": {
          name: "Boys Suit",
          price: "$80",
          description:
            "Classic boys' suit perfect for weddings and formal events.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/boys-suit-600nw-92008067.jpg",
        },
        "girls-dress": {
          name: "Girls Formal Dress",
          price: "$75",
          description:
            "Elegant formal dress for girls, great for special occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/girls-formal-dress-600nw-92008067.jpg",
        },
        "boys-dress-shirt": {
          name: "Boys Dress Shirt",
          price: "$25",
          description:
            "Classic dress shirt for boys, perfect for formal gatherings.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/boys-dress-shirt-600nw-92008067.jpg",
        },
        "girls-formal-jacket": {
          name: "Girls Formal Jacket",
          price: "$40",
          description:
            "Chic formal jacket for girls to complement their dress.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/girls-formal-jacket-600nw-92008067.jpg",
        },
        "boys-formal-pants": {
          name: "Boys Formal Pants",
          price: "$30",
          description: "Sharp and tailored formal pants for boys.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/boys-formal-pants-600nw-92008067.jpg",
        },
        "girls-formal-shoes": {
          name: "Girls Formal Shoes",
          price: "$50",
          description:
            "Elegant formal shoes for girls, great for any special event.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/girls-formal-shoes-600nw-92008067.jpg",
        },
        "boys-tuxedo": {
          name: "Boys Tuxedo",
          price: "$120",
          description:
            "A classic tuxedo for boys, perfect for formal occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/boys-tuxedo-600nw-92008067.jpg",
        },
      },
      activewear: {
        "gym-t-shirt": {
          name: "Gym T-Shirt",
          price: "$20",
          description: "Comfortable gym t-shirt for active kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "kids-gym-shorts": {
          name: "Kids Gym Shorts",
          price: "$18",
          description: "Comfortable gym shorts for active kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-gym-shorts-600nw-92008067.jpg",
        },
        "active-t-shirt": {
          name: "Active T-Shirt",
          price: "$20",
          description: "Breathable t-shirt perfect for running and play.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/active-t-shirt-600nw-92008067.jpg",
        },
        "kids-tracksuit": {
          name: "Kids Tracksuit",
          price: "$40",
          description:
            "Complete tracksuit for kids, ideal for outdoor activities.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-tracksuit-600nw-92008067.jpg",
        },
        "sport-jacket": {
          name: "Sport Jacket",
          price: "$35",
          description: "Windproof jacket for active outdoor play.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/sport-jacket-600nw-92008067.jpg",
        },
        "athletic-pants": {
          name: "Athletic Pants",
          price: "$25",
          description:
            "Comfortable pants for kids to wear during physical activities.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/athletic-pants-600nw-92008067.jpg",
        },
        "track-pants": {
          name: "Track Pants",
          price: "$25",
          description: "Stretchable track pants for sports activities.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      sleepwear: {
        "kids-pajama-set": {
          name: "Kids Pajama Set",
          price: "$30",
          description:
            "Soft and comfortable pajama set for a good night's sleep.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-pajama-set-600nw-92008067.jpg",
        },
        "flannel-pajamas": {
          name: "Flannel Pajamas",
          price: "$35",
          description: "Warm and cozy flannel pajamas for winter nights.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/flannel-pajamas-600nw-92008067.jpg",
        },
        "sleeping-bag": {
          name: "Sleeping Bag",
          price: "$50",
          description: "Comfy sleeping bag perfect for sleepovers and camping.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/sleeping-bag-600nw-92008067.jpg",
        },
        "princess-nightgown": {
          name: "Princess Nightgown",
          price: "$25",
          description: "Cute nightgown for girls who love princess themes.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/princess-nightgown-600nw-92008067.jpg",
        },
        "superhero-pajamas": {
          name: "Superhero Pajamas",
          price: "$30",
          description: "Superhero-themed pajamas for little heroes.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/superhero-pajamas-600nw-92008067.jpg",
        },
        "boys-pajama-bottoms": {
          name: "Boys Pajama Bottoms",
          price: "$18",
          description: "Soft and stretchy pajama bottoms for boys.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/boys-pajama-bottoms-600nw-92008067.jpg",
        },
        "girls-pajama-set": {
          name: "Girls Pajama Set",
          price: "$32",
          description: "Adorable pajama set for girls, perfect for bedtime.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/girls-pajama-set-600nw-92008067.jpg",
        },
      },
      pants: {
        jeans: {
          name: "Jeans",
          price: "$25",
          description: "Durable jeans for active kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        leggings: {
          name: "Leggings",
          price: "$20",
          description: "Stretchy leggings for comfort and flexibility.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "kids-chinos": {
          name: "Kids Chinos",
          price: "$30",
          description: "Casual chinos that are perfect for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-chinos-600nw-92008067.jpg",
        },
        "kids-cargo-pants": {
          name: "Kids Cargo Pants",
          price: "$35",
          description:
            "Spacious cargo pants with plenty of pockets for storage.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-cargo-pants-600nw-92008067.jpg",
        },
      },
      tops: {
        "t-shirt": {
          name: "T-Shirt",
          price: "$15",
          description: "Soft cotton t-shirt for everyday wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "kids-polo-shirt": {
          name: "Kids Polo Shirt",
          price: "$20",
          description: "Classic polo shirt for a smart and casual look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-polo-shirt-600nw-92008067.jpg",
        },
        "kids-long-sleeve": {
          name: "Kids Long Sleeve T-Shirt",
          price: "$22",
          description:
            "Warm and comfortable long sleeve shirt for fall and winter.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-long-sleeve-600nw-92008067.jpg",
        },
      },
      outerwear: {
        "winter-jacket": {
          name: "Winter Jacket",
          price: "$70",
          description: "Warm winter jacket to keep kids cozy.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-winter-coat-600nw-92008067.jpg",
        },
        "kids-vest": {
          name: "Kids Vest",
          price: "$40",
          description: "Puffy vest for added warmth without the bulk.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-vest-600nw-92008067.jpg",
        },
        hoodie: {
          name: "Hoodie",
          price: "$35",
          description: "Cozy hoodie for chilly weather.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        raincoat: {
          name: "Raincoat",
          price: "$45",
          description: "Colorful raincoat for rainy days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
      },
      swimwear: {
        "kids-swimsuit": {
          name: "Kids Swimsuit",
          price: "$25",
          description: "Bright swimsuit for summer fun.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "kids-swim-trunks": {
          name: "Kids Swim Trunks",
          price: "$25",
          description: "Bright and fun swim trunks for pool days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-swim-trunks-600nw-92008067.jpg",
        },
        "kids-bikini": {
          name: "Kids Bikini",
          price: "$28",
          description: "Cute two-piece bikini for girls.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-bikini-600nw-92008067.jpg",
        },
        "kids-swimshirt": {
          name: "Kids Swim Shirt",
          price: "$22",
          description: "UV-protectant swim shirt for sun protection.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-swimshirt-600nw-92008067.jpg",
        },
      },
      underwear: {
        "kids-boxers": {
          name: "Kids Boxers",
          price: "$12",
          description: "Soft cotton boxers for kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-boxers-600nw-92008067.jpg",
        },
        "kids-briefs": {
          name: "Kids Briefs",
          price: "$10",
          description: "Comfortable and stretchy briefs for boys.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-briefs-600nw-92008067.jpg",
        },
        "kids-girls-briefs": {
          name: "Girls Briefs",
          price: "$10",
          description: "Soft and comfortable briefs for girls.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-girls-briefs-600nw-92008067.jpg",
        },
        "kids-girls-panties": {
          name: "Girls Panties",
          price: "$12",
          description: "Cute and comfortable panties for girls.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-girls-panties-600nw-92008067.jpg",
        },
      },
    },
    accessories: {
      necklaces_and_braceslets: {
        "beaded-necklace": {
          name: "Beaded Necklace",
          price: "$15",
          description: "Colorful beaded necklace for kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "kids-silver-necklace": {
          name: "Kids Silver Necklace",
          price: "$25",
          description: "Delicate silver necklace perfect for kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-silver-necklace-600nw-92008067.jpg",
        },
        "kids-beaded-bracelet": {
          name: "Kids Beaded Bracelet",
          price: "$15",
          description: "Colorful beaded bracelet, fun for any occasion.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-beaded-bracelet-600nw-92008067.jpg",
        },
        "kids-gold-necklace": {
          name: "Kids Gold Necklace",
          price: "$40",
          description: "Elegant gold necklace for special occasions.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-gold-necklace-600nw-92008067.jpg",
        },
        "kids-charm-bracelet": {
          name: "Kids Charm Bracelet",
          price: "$20",
          description: "Fun charm bracelet for little ones.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-charm-bracelet-600nw-92008067.jpg",
        },
      },
      sunglasses: {
        "round-sunglasses": {
          name: "Round Sunglasses",
          price: "$10",
          description: "Cute round sunglasses for sunny days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/vintage-red-shoes-on-white-600nw-92008067.jpg",
        },
        "kids-sunglasses-blue": {
          name: "Kids Blue Sunglasses",
          price: "$15",
          description: "Stylish blue sunglasses for sunny days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-sunglasses-blue-600nw-92008067.jpg",
        },
        "kids-sunglasses-pink": {
          name: "Kids Pink Sunglasses",
          price: "$15",
          description: "Cute pink sunglasses perfect for the beach.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-sunglasses-pink-600nw-92008067.jpg",
        },
        "kids-sunglasses-red": {
          name: "Kids Red Sunglasses",
          price: "$18",
          description: "Bright red sunglasses for a fun, summer look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-sunglasses-red-600nw-92008067.jpg",
        },
        "kids-sunglasses-aviator": {
          name: "Kids Aviator Sunglasses",
          price: "$20",
          description: "Classic aviator sunglasses for a cool look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-sunglasses-aviator-600nw-92008067.jpg",
        },
      },
      watches: {
        "kids-analog-watch": {
          name: "Kids Analog Watch",
          price: "$25",
          description: "Simple and colorful analog watch for kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-analog-watch-600nw-92008067.jpg",
        },
        "kids-digital-watch": {
          name: "Kids Digital Watch",
          price: "$30",
          description: "Durable digital watch with fun features.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-digital-watch-600nw-92008067.jpg",
        },
        "kids-smartwatch": {
          name: "Kids Smartwatch",
          price: "$50",
          description: "Smartwatch with games and fitness tracking for kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-smartwatch-600nw-92008067.jpg",
        },
        "kids-printed-watch": {
          name: "Kids Printed Watch",
          price: "$22",
          description: "Watch with fun printed designs like superheroes.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-printed-watch-600nw-92008067.jpg",
        },
      },
      scarves: {
        "kids-winter-scarf": {
          name: "Kids Winter Scarf",
          price: "$18",
          description: "Warm and cozy scarf for chilly days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-winter-scarf-600nw-92008067.jpg",
        },
        "kids-summer-scarf": {
          name: "Kids Summer Scarf",
          price: "$12",
          description: "Lightweight and breathable scarf for summer wear.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-summer-scarf-600nw-92008067.jpg",
        },
        "kids-pink-scarf": {
          name: "Kids Pink Scarf",
          price: "$15",
          description: "Soft pink scarf, perfect for girls.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-pink-scarf-600nw-92008067.jpg",
        },
        "kids-striped-scarf": {
          name: "Kids Striped Scarf",
          price: "$14",
          description: "Colorful striped scarf for boys and girls.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-striped-scarf-600nw-92008067.jpg",
        },
      },
      belts: {
        "kids-leather-belt": {
          name: "Kids Leather Belt",
          price: "$20",
          description: "Durable leather belt for boys and girls.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-leather-belt-600nw-92008067.jpg",
        },
        "kids-denim-belt": {
          name: "Kids Denim Belt",
          price: "$18",
          description: "Classic denim belt, easy to pair with jeans.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-denim-belt-600nw-92008067.jpg",
        },
        "kids-colorful-belt": {
          name: "Kids Colorful Belt",
          price: "$15",
          description: "Fun and vibrant belt for kids, perfect for summer.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-colorful-belt-600nw-92008067.jpg",
        },
        "kids-buckle-belt": {
          name: "Kids Buckle Belt",
          price: "$22",
          description: "Stylish buckle belt for a trendy look.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-buckle-belt-600nw-92008067.jpg",
        },
      },
      bags: {
        "kids-backpack": {
          name: "Kids Backpack",
          price: "$30",
          description: "A durable and spacious backpack for school and play.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-backpack-600nw-92008067.jpg",
        },
        "kids-tote-bag": {
          name: "Kids Tote Bag",
          price: "$25",
          description: "Cute and lightweight tote bag for daily use.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-tote-bag-600nw-92008067.jpg",
        },
        "kids-drawstring-bag": {
          name: "Kids Drawstring Bag",
          price: "$18",
          description:
            "Practical and fun drawstring bag for storing toys and snacks.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-drawstring-bag-600nw-92008067.jpg",
        },
        "kids-lunch-bag": {
          name: "Kids Lunch Bag",
          price: "$22",
          description: "Insulated lunch bag to keep snacks fresh and cool.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-lunch-bag-600nw-92008067.jpg",
        },
      },
      hats: {
        "kids-baseball-cap": {
          name: "Kids Baseball Cap",
          price: "$15",
          description: "A sporty baseball cap for sunny days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-baseball-cap-600nw-92008067.jpg",
        },
        "kids-beanie": {
          name: "Kids Beanie",
          price: "$12",
          description: "Cozy beanie hat to keep warm during the colder months.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-beanie-600nw-92008067.jpg",
        },
        "kids-sun-hat": {
          name: "Kids Sun Hat",
          price: "$20",
          description: "Protective sun hat with wide brim for sunny days.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-sun-hat-600nw-92008067.jpg",
        },
        "kids-visor": {
          name: "Kids Visor",
          price: "$18",
          description: "Lightweight visor for sports and outdoor activities.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/kids-visor-600nw-92008067.jpg",
        },
      },
      toys: {
        "silk-teddy": {
          name: "Silk Teddy",
          price: "$80",
          description: "Luxurious silk teddy for elegant nights.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/silk-teddy-600nw-92008067.jpg",
        },
        "lego-set": {
          name: "Lego Set",
          price: "$25",
          description:
            "Creative and fun Lego set for building and imagination.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/lego-set-600nw-92008067.jpg",
        },
        "plush-teddy-bear": {
          name: "Plush Teddy Bear",
          price: "$15",
          description: "Soft and cuddly teddy bear for kids of all ages.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/plush-teddy-bear-600nw-92008067.jpg",
        },
        "toy-car": {
          name: "Toy Car",
          price: "$10",
          description: "Fun toy car for kids to race around.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/toy-car-600nw-92008067.jpg",
        },
        "doll-house": {
          name: "Doll House",
          price: "$40",
          description: "Miniature doll house set for imaginative play.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/doll-house-600nw-92008067.jpg",
        },
        "building-blocks": {
          name: "Building Blocks",
          price: "$18",
          description:
            "Colorful building blocks set for building and stacking.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/building-blocks-600nw-92008067.jpg",
        },
        "action-figure": {
          name: "Action Figure",
          price: "$12",
          description:
            "Collectible action figure for role play and collection.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/action-figure-600nw-92008067.jpg",
        },
        "puzzle-game": {
          name: "Puzzle Game",
          price: "$8",
          description:
            "Engaging puzzle game for developing problem-solving skills.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/puzzle-game-600nw-92008067.jpg",
        },
        "play-doh-set": {
          name: "Play-Doh Set",
          price: "$12",
          description: "A colorful set of Play-Doh for creative sculpting.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/play-doh-set-600nw-92008067.jpg",
        },
        "remote-control-car": {
          name: "Remote Control Car",
          price: "$35",
          description:
            "Fast and fun remote control car for outdoor adventures.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/remote-control-car-600nw-92008067.jpg",
        },
        "baby-doll": {
          name: "Baby Doll",
          price: "$18",
          description:
            "Soft baby doll with a bottle and blanket for pretend play.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/baby-doll-600nw-92008067.jpg",
        },
        "magic-marker-set": {
          name: "Magic Marker Set",
          price: "$15",
          description: "A set of washable magic markers for arts and crafts.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/magic-marker-set-600nw-92008067.jpg",
        },
        "toy-piano": {
          name: "Toy Piano",
          price: "$22",
          description:
            "A colorful piano with fun sounds for budding musicians.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/toy-piano-600nw-92008067.jpg",
        },
        "play-kitchen-set": {
          name: "Play Kitchen Set",
          price: "$50",
          description: "Miniature kitchen set with cooking utensils and food.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/play-kitchen-set-600nw-92008067.jpg",
        },
        "toy-dinosaur": {
          name: "Toy Dinosaur",
          price: "$20",
          description: "A realistic toy dinosaur for imaginative play.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/toy-dinosaur-600nw-92008067.jpg",
        },
        "sports-set": {
          name: "Sports Set",
          price: "$25",
          description: "Mini sports set including a ball, bat, and gloves.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/sports-set-600nw-92008067.jpg",
        },
        "bouncing-ball": {
          name: "Bouncing Ball",
          price: "$10",
          description: "A bouncy ball for kids to play indoors and outdoors.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/bouncing-ball-600nw-92008067.jpg",
        },
        "puzzle-toys": {
          name: "Puzzle Toys",
          price: "$18",
          description: "A set of wooden puzzle toys for brain development.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/puzzle-toys-600nw-92008067.jpg",
        },
        "water-gun": {
          name: "Water Gun",
          price: "$12",
          description: "A fun water gun for outdoor summer play.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/water-gun-600nw-92008067.jpg",
        },
        "toy-guitar": {
          name: "Toy Guitar",
          price: "$30",
          description: "A colorful toy guitar for young rockstars.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/toy-guitar-600nw-92008067.jpg",
        },
        "jump-rope": {
          name: "Jump Rope",
          price: "$8",
          description: "A colorful jump rope for active kids.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/jump-rope-600nw-92008067.jpg",
        },
        "animal-figurines": {
          name: "Animal Figurines",
          price: "$15",
          description: "A set of realistic animal figurines for creative play.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/animal-figurines-600nw-92008067.jpg",
        },
        "toy-fishing-set": {
          name: "Toy Fishing Set",
          price: "$18",
          description: "A fun toy fishing set for pretend play.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/toy-fishing-set-600nw-92008067.jpg",
        },
        "toy-train-set": {
          name: "Toy Train Set",
          price: "$30",
          description:
            "Interactive toy train set with tracks for hours of fun.",
          imageSrc:
            "https://www.shutterstock.com/image-photo/toy-train-set-600nw-92008067.jpg",
        },
      },
    },
  },
};
