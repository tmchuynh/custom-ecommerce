"use client";
import {
  FaBook,
  FaChevronRight,
  FaGift,
  FaGifts,
  FaGlobeAfrica,
  FaNewspaper,
  FaRss,
  FaShoppingBag,
  FaStar,
} from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { HiCursorClick } from "react-icons/hi";
import { IoMdHelp } from "react-icons/io";
import { LuPackageCheck } from "react-icons/lu";
import { TbRulerMeasure2 } from "react-icons/tb";
const links = [
  {
    id: "customer_service",
    title: "Customer Service",
    description:
      "Need help with your order or have questions? Our customer service team is here to assist you with returns, inquiries, and any concerns you may have.",
    href: "/customer_service",
    icon: HiCursorClick,
  },
  {
    id: "frequently_asked_questions",
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about our products, shipping, returns, and more. Get quick solutions to your most pressing queries.",
    href: "/info/frequently_asked_questions",
    icon: IoMdHelp,
  },
  {
    id: "loyalty_program",
    title: "Loyalty Program",
    description:
      "Join our loyalty program and start earning rewards, discounts, and exclusive offers every time you shop with us.",
    href: "/loyalty_program",
    icon: FaGift,
  },
  {
    id: "gift_cards",
    title: "Gift Cards",
    description:
      "Give the gift of choice with our gift cards. Perfect for any occasion, they can be used to shop for a wide range of products from our store.",
    href: "/info/gift_cards",
    icon: FaGifts,
  },
  {
    id: "track_order",
    title: "Track Order",
    description:
      "Stay updated on your order's status. Track its progress, shipping details, and expected delivery time in real-time.",
    href: "/customer_service/track_order",
    icon: LuPackageCheck,
  },
  {
    id: "international_orders",
    title: "International Orders",
    description:
      "Explore our seamless international shopping experience, including shipping, customs, and hassle-free returns and exchanges.",
    href: "/info/international_orders",
    icon: FaGlobeAfrica,
  },
  {
    id: "product_recommendations",
    title: "Product Recommendations",
    description:
      "Discover personalized product recommendations based on your preferences and browsing history to help you find exactly what you’re looking for.",
    href: "/info/product_recommendations",
    icon: FaBagShopping,
  },
  {
    id: "size_guides",
    title: "Size Guides",
    description:
      "Ensure the perfect fit with our detailed size guides for apparel, shoes, and accessories. Find the right size with ease.",
    href: "/size_guides",
    icon: TbRulerMeasure2,
  },
  {
    id: "customer_reviews",
    title: "Customer Reviews",
    description:
      "Read reviews from other customers to help you make informed decisions about our products and services. Get insights from real experiences.",
    href: "/info/about/customer_reviews",
    icon: FaStar,
  },
];

export default function InfoPage() {
  return (
    <div className="flex flex-col items-center py-15 justify-center w-full h-11/12">
      <ul role="list" className="-mt-6 divide-y">
        {links.map((link, linkIdx) => (
          <li
            key={linkIdx}
            className="relative items-center justify-center mx-auto w-9/12 group flex gap-x-6 p-6"
          >
            <a
              href={link.href}
              className="flex items-center justify-between w-10/12"
            >
              <div className="flex items-center w-full group hover:bg-muted rounded-2xl px-10">
                <div className="flex p-5 items-center justify-center rounded-lg  group-hover:bg-teritary ring-1 shadow-xs">
                  <link.icon
                    aria-hidden="true"
                    className="size-6 text-teritary group-hover:text-teritary-foreground"
                  />
                </div>
                <div className="flex-auto flex-col px-10 py-6">
                  <h3 className="text-sm/6 font-semibold text-primary/75">
                    {link.title}
                  </h3>
                  <p className="mt-2 text-sm/6 text-secondary flex-wrap w-9/12">
                    {link.description}
                  </p>
                </div>
                <div className="flex-none self-center">
                  <FaChevronRight
                    aria-hidden="true"
                    className="size-5 text-accent group-hover:transform group-hover:transition-transform duration-300 ease-in-out group-hover:translate-x-5"
                  />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
