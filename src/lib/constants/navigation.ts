export const navbarItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Shop",
    dropdown: [
      {
        label: "All Products",
        href: "/shopping",
      },
      {
        label: "Categories",
        href: "/shopping/categories",
      },
      {
        label: "Sale Items",
        href: "/shopping/sale-items",
      },
    ],
  },
  {
    label: "Services",
    dropdown: [
      {
        label: "Membership",
        href: "/membership",
      },
      {
        label: "Order Tracking",
        href: "/track-order",
      },
      {
        label: "Returns & Exchanges",
        href: "/returns-&-exchanges",
      },
      {
        label: "Size Guide",
        href: "/size-guide",
      },
    ],
  },

  {
    label: "About",
    dropdown: [
      {
        label: "Our Story",
        href: "/about",
      },
      {
        label: "Careers",
        href: "/careers",
      },
    ],
  },
  {
    label: "Contact",
    href: "/contact-us",
  },
];
