import CurrencyDollarIcon from "@heroicons/react/20/solid/CurrencyDollarIcon";
import {
  CursorArrowRaysIcon,
  DocumentTextIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";
import {
  BriefcaseIcon,
  CalendarIcon,
  GiftIcon,
  MapPinIcon,
  RulerIcon,
  ShieldCheckIcon,
  StarIcon,
} from "lucide-react";
import { Fa500Px } from "react-icons/fa";

export const currencies = ["CAD", "USD", "AUD", "EUR", "GBP"];

export const navigations = {
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
            items: [
              { name: "Tops", href: "/shopping/women/clothes/tops" },
              { name: "Pants", href: "/shopping/women/clothes/pants" },
              { name: "Bras", href: "/shopping/women/clothes/bras" },
              {
                name: "Dresses & Skirts",
                href: "/shopping/women/clothes/dresses_skirts",
              },
              { name: "Swimwear", href: "/shopping/women/clothes/swimwear" },
              {
                name: "Activewear",
                href: "/shopping/women/clothes/activewear",
              },
              {
                name: "Formal Wear",
                href: "/shopping/women/clothes/formal_wear",
              },
              { name: "Underwear", href: "/shopping/women/clothes/underwear" },
              { name: "Outerwear", href: "/shopping/women/clothes/outerwear" },
            ],
          },
          {
            id: "shoes",
            name: "Shoes",
            items: [
              { name: "Formal Shoes", href: "/shopping/women/shoes/formal" },
              { name: "Sneakers", href: "/shopping/women/shoes/sneakers" },
              { name: "Sandals", href: "/shopping/women/shoes/sandals" },
              { name: "Boots", href: "/shopping/women/shoes/boots" },
              { name: "Flats", href: "/shopping/women/shoes/flats" },
              { name: "Heels", href: "/shopping/women/shoes/heels" },
            ],
          },
        ],
        [
          {
            id: "accessories",
            name: "Accessories",
            items: [
              {
                name: "Sunglasses",
                href: "/shopping/women/accessories/sunglasses",
              },
              { name: "Watches", href: "/shopping/women/accessories/watches" },
              { name: "Wallets", href: "/shopping/women/accessories/wallets" },
              { name: "Bags", href: "/shopping/women/accessories/bags" },
              { name: "Belts", href: "/shopping/women/accessories/belts" },
              { name: "Scarves", href: "/shopping/women/accessories/scarves" },
              { name: "Hats", href: "/shopping/women/accessories/hats" },
            ],
          },
        ],
        [
          {
            id: "shop-collection",
            name: "Shop by Collection",
            items: [
              {
                name: "New Arrivals",
                href: "/shopping/women/collections/new_arrivals",
              },
              {
                name: "Latest Drops",
                href: "/shopping/women/collections/latest_drops",
              },
              {
                name: "Best Sellers",
                href: "/shopping/women/collections/best_sellers",
              },
              { name: "Sale", href: "/shopping/women/collections/sale" },
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
            items: [
              { name: "Tops", href: "/shopping/men/clothes/tops" },
              { name: "Pants", href: "/shopping/men/clothes/pants" },
              { name: "Swimwear", href: "/shopping/men/clothes/swimwear" },
              {
                name: "Activewear",
                href: "/shopping/men/clothes/activewear",
              },
              {
                name: "Formal Wear",
                href: "/shopping/men/clothes/formal_wear",
              },
              { name: "Underwear", href: "/shopping/men/clothes/underwear" },
              { name: "Outerwear", href: "/shopping/men/clothes/outerwear" },
            ],
          },
          {
            id: "shoes",
            name: "Shoes",
            items: [
              { name: "Formal Shoes", href: "/shopping/men/shoes/formal" },

              { name: "Sneakers", href: "/shopping/men/shoes/sneakers" },

              { name: "Sandals", href: "/shopping/men/shoes/sandals" },
              { name: "Boots", href: "/shopping/men/shoes/boots" },
            ],
          },
        ],
        [
          {
            id: "accessories",
            name: "Accessories",
            items: [
              {
                name: "Sunglasses",
                href: "/shopping/men/accessories/sunglasses",
              },
              { name: "Watches", href: "/shopping/men/accessories/watches" },
              { name: "Wallets", href: "/shopping/men/accessories/wallets" },
              { name: "Bags", href: "/shopping/men/accessories/bags" },
              { name: "Belts", href: "/shopping/men/accessories/belts" },
              { name: "Scarves", href: "/shopping/men/accessories/scarves" },
              { name: "Hats", href: "/shopping/men/accessories/hats" },
            ],
          },
        ],
        [
          {
            id: "shop-collection",
            name: "Shop by Collection",
            items: [
              {
                name: "New Arrivals",
                href: "/shopping/men/collections/new_arrivals",
              },
              {
                name: "Latest Drops",
                href: "/shopping/men/collections/latest_drops",
              },
              {
                name: "Best Sellers",
                href: "/shopping/men/collections/best_sellers",
              },
              { name: "Sale", href: "/shopping/men/collections/sale" },
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
      "Ensure the perfect fit with our detailed size guides for clothing and shoes.",
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
  {
    name: "For the planet",
    imageUrl:
      "https://tailwindcss.com/plus-assets/img/ecommerce/icons/icon-planet-light.svg",
    description:
      "We’ve pledged 1% of sales to the preservation and restoration of the natural environment.",
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

export const jobDetails = [
  {
    icon: BriefcaseIcon,
    text: "Full-time",
  },
  {
    icon: MapPinIcon,
    text: "Remote",
  },
  {
    icon: CurrencyDollarIcon,
    text: "Remote",
  },
  {
    icon: CalendarIcon,
    text: "Remote",
  },
];
