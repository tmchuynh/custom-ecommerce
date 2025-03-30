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
  FaPhone,
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
    icon: FaPhone,
  },
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
    icon: FaPhone,
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
    id: "account",
    title: "Account Registration",
    icon: FaUsers,
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
  { id: "contact", title: "Contact Us", icon: FaPhone },
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
  { id: "contact", title: "Contact Us", icon: FaPhone },
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
