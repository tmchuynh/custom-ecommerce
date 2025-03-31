import {
  FaBookOpen,
  FaAward,
  FaGift,
  FaStar,
  FaShoppingBag,
  FaBriefcase,
  FaHeart,
  FaUsers,
  FaClock,
  FaCreditCard,
  FaFileAlt,
  FaKey,
  FaLock,
  FaServer,
  FaCookie,
  FaDatabase,
  FaInfo,
  FaEdit,
  FaPhoneAlt,
  FaShare,
  FaShieldAlt,
  FaUserCheck,
  FaCheckCircle,
  FaDollarSign,
  FaRegCopyright,
  FaShoppingBasket,
  FaCogs,
  FaLightbulb,
  FaQuestionCircle,
  FaTags,
  FaUser,
  FaGlobe,
  FaLanguage,
  FaShippingFast,
  FaUndo,
  FaEnvelope,
  FaShoppingCart,
  FaUserFriends,
  FaBan,
  FaClipboardCheck,
  FaMoneyBill,
  FaTruck,
} from "react-icons/fa";
import {
  IoIosTrendingUp,
  IoIosHelpCircleOutline,
  IoMdSettings,
  IoMdRefresh,
} from "react-icons/io";
import { InformationDetails } from "../interfaces";
import {
  FaCircleXmark,
  FaMessage,
  FaShield,
  FaShirt,
  FaTruckFast,
} from "react-icons/fa6";
import { FiHelpCircle } from "react-icons/fi";
import { GoAlertFill, GoAlert } from "react-icons/go";
import { MdManageHistory } from "react-icons/md";
import { PiPantsFill } from "react-icons/pi";
import { RiFootprintFill } from "react-icons/ri";
import { TbRulerMeasure2 } from "react-icons/tb";

export const loyalty_program_sections: InformationDetails[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: FaBookOpen,
  },
  {
    id: "how-it-works",
    title: "How It Works",
    icon: FaAward,
  },
  {
    id: "benefits",
    title: "Program Benefits",
    icon: FaGift,
  },
  {
    id: "earning",
    title: "Earning Points",
    icon: FaStar,
  },
  {
    id: "redeeming",
    title: "Redeeming Points",
    icon: FaShoppingBag,
  },
  {
    id: "tiers",
    title: "Membership Tiers",
    icon: IoIosTrendingUp,
  },
  {
    id: "faqs",
    title: "FAQs",
    icon: IoIosHelpCircleOutline,
  },
];

export const about_sections: InformationDetails[] = [
  {
    id: "mission",
    title: "Our Mission",
    icon: FaBookOpen,
  },
  {
    id: "values",
    title: "Our Values",
    icon: FaHeart,
  },
  {
    id: "team",
    title: "Our Team",
    icon: FaUsers,
  },
  {
    id: "partners",
    title: "Our Partners",
    icon: FaBriefcase,
  },
];

export const payment_security_sections: InformationDetails[] = [
  {
    id: "overview",
    title: "Security Overview",
    icon: FaShield,
  },
  {
    id: "encryption",
    title: "Data Encryption",
    icon: FaLock,
  },
  {
    id: "payment-processing",
    title: "Payment Processing",
    icon: FaCreditCard,
  },
  {
    id: "authentication",
    title: "Authentication Methods",
    icon: FaKey,
  },
  {
    id: "compliance",
    title: "Security Compliance",
    icon: FaFileAlt,
  },
  {
    id: "monitoring",
    title: "Security Monitoring",
    icon: FaServer,
  },
  {
    id: "fraud",
    title: "Fraud Prevention",
    icon: GoAlertFill,
  },
  {
    id: "contact",
    title: "Contact Security Team",
    icon: GoAlert,
  },
];

export const cookie_policy_sections: InformationDetails[] = [
  {
    id: "overview",
    title: "Overview",
    icon: FaBookOpen,
  },
  {
    id: "encryption",
    title: "Encryption",
    icon: FaDatabase,
  },
  {
    id: "what-are-cookies",
    title: "What Are Cookies",
    icon: FaCookie,
  },
  {
    id: "types",
    title: "Types of Cookies",
    icon: FaFileAlt,
  },
  {
    id: "how-we-use",
    title: "How We Use Cookies",
    icon: IoMdSettings,
  },
  {
    id: "third-party",
    title: "Third-Party Cookies",
    icon: FaShield,
  },
  {
    id: "duration",
    title: "Cookie Duration",
    icon: FaClock,
  },
  {
    id: "management",
    title: "Cookie Management",
    icon: MdManageHistory,
  },
  {
    id: "policy-updates",
    title: "Policy Updates",
    icon: FaInfo,
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: FaPhoneAlt,
  },
];

export const internationalReturnPolicySections = [
  {
    id: "eligibility",
    title: "Return Eligibility",
    icon: FaClipboardCheck,
  },
  {
    id: "process",
    title: "Return Process",
    icon: FaTruck,
  },
  {
    id: "shipping",
    title: "Return Shipping Costs",
    icon: FaMoneyBill,
  },
  {
    id: "refunds",
    title: "Refunds",
    icon: FaMoneyBill,
  },
  {
    id: "nonreturnable",
    title: "Non-Returnable Items",
    icon: FaBan,
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: FaPhoneAlt,
  },
];

export const giftCardsSections = [
  { id: "overview", title: "Overview", icon: FaGift },
  { id: "how_to_use", title: "How to Use", icon: FaShoppingCart },
  { id: "limitations", title: "Limitations", icon: FaCreditCard },
  { id: "e_vs_physical", title: "E-Gift Cards vs Physical", icon: FaEnvelope },
  { id: "send_to_friend", title: "Send to a Friend", icon: FaUserFriends },
  { id: "faq", title: "FAQ", icon: FaQuestionCircle },
];

export const internationalOrdersSections = [
  { id: "shipping", title: "Shipping Information", icon: FaShippingFast },
  { id: "customs", title: "Customs and Duties", icon: FaGlobe },
  { id: "payment", title: "Payment Options", icon: FaDollarSign },
  { id: "returns", title: "International Returns Policy", icon: FaUndo },
  { id: "language", title: "Language Support", icon: FaLanguage },
  { id: "faqs", title: "Frequently Asked Questions", icon: FaQuestionCircle },
];

export const productRecommendationsSections = [
  { id: "overview", title: "Overview", icon: FaStar },
  { id: "how_it_works", title: "How It Works", icon: FaLightbulb },
  { id: "benefits", title: "Benefits", icon: FaTags },
  {
    id: "how_to_get",
    title: "How to Get Recommendations",
    icon: FaQuestionCircle,
  },
  { id: "who_provides", title: "Who Provides Recommendations", icon: FaUser },
  { id: "how_chosen", title: "How Recommendations Are Chosen", icon: FaCogs },
  { id: "customize", title: "How to Customize Recommendations", icon: FaTags },
  { id: "time_to_get", title: "How Long It Takes", icon: FaClock },
  { id: "faq", title: "FAQ", icon: FaQuestionCircle },
];

export const customer_service_sections: InformationDetails[] = [
  {
    id: "introduction",
    title: "How Can We Help You?",
    icon: FiHelpCircle,
  },
  {
    id: "contact",
    title: "Contact Information",
    icon: FaPhoneAlt,
  },
  {
    id: "hours",
    title: "Business Hours",
    icon: FaClock,
  },
  {
    id: "faq",
    title: "Frequently Asked Questions",
    icon: FaMessage,
  },
  {
    id: "other-services",
    title: "Other Services",
    icon: FaGift,
  },
];

export const terms_and_conditions_sections: InformationDetails[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: FaBookOpen,
  },
  {
    id: "use",
    title: "Use of the Site",
    icon: FaShield,
  },
  {
    id: "product",
    title: "Product Information",
    icon: FaShoppingBag,
  },
  {
    id: "order",
    title: "Order Process",
    icon: FaShoppingBasket,
  },
  {
    id: "payments",
    title: "Payments",
    icon: FaCreditCard,
  },
  {
    id: "shipping",
    title: "Shipping and Delivery",
    icon: FaTruckFast,
  },
  {
    id: "returns",
    title: "Returns and Exchanges",
    icon: IoMdRefresh,
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    icon: GoAlertFill,
  },
  {
    id: "intellectual",
    title: "Intellectual Property",
    icon: FaRegCopyright,
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    icon: FaLock,
  },
  {
    id: "changes",
    title: "Changes to Terms",
    icon: FaEdit,
  },
  { id: "contact", title: "Contact Us", icon: FaPhoneAlt },
];

export const return_policy_sections: InformationDetails[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: FaBookOpen,
  },
  {
    id: "timeframe",
    title: "Return Timeframe",
    icon: FaClock,
  },
  {
    id: "eligibility",
    title: "Eligibility for Return",
    icon: FaCheckCircle,
  },
  {
    id: "non-returnable",
    title: "Non-Returnable Items",
    icon: FaCircleXmark,
  },
  {
    id: "process",
    title: "How to Return an Item",
    icon: IoMdRefresh,
  },
  {
    id: "refunds",
    title: "Refunds and Exchanges",
    icon: FaDollarSign,
  },
  {
    id: "shipping",
    title: "Return Shipping Costs",
    icon: FaTruckFast,
  },
  {
    id: "damaged",
    title: "Damaged or Defective Items",
    icon: GoAlertFill,
  },
  { id: "contact", title: "Contact Us", icon: FaPhoneAlt },
];

export const privacy_policy_sections: InformationDetails[] = [
  {
    id: "introduction",
    title: "Introduction",
    icon: FaBookOpen,
  },
  {
    id: "information-collect",
    title: "Information We Collect",
    icon: FaDatabase,
  },
  {
    id: "information-usage",
    title: "How We Use Your Information",
    icon: FaFileAlt,
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    icon: FaShare,
  },
  {
    id: "data-protection",
    title: "How We Protect Your Information",
    icon: FaShieldAlt,
  },
  {
    id: "your-rights",
    title: "Your Rights",
    icon: FaUserCheck,
  },

  {
    id: "changes",
    title: "Changes to Privacy Policy",
    icon: FaEdit,
  },
  { id: "contact", title: "Contact Us", icon: FaPhoneAlt },
];

export const sizeGuideCategories: InformationDetails[] = [
  {
    id: "shirts",
    title: "Shirts & Tops",
    icon: FaShirt,
  },
  {
    id: "pants",
    title: "Pants & Bottoms",
    icon: PiPantsFill,
  },
  {
    id: "shoes",
    title: "Shoes & Footwear",
    icon: RiFootprintFill,
  },
  {
    id: "measuring",
    title: "How to Measure",
    icon: TbRulerMeasure2,
  },
];
