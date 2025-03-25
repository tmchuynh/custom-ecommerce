import {
  CursorArrowRaysIcon,
  DocumentTextIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";
import { GiftIcon, RulerIcon, ShieldCheckIcon, StarIcon } from "lucide-react";
import { Fa500Px } from "react-icons/fa";
import { NavigationDetails } from "./types";

export const currencyCountries = [
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "CA$",
    rate: 1.35,
    countries: [{ value: "CAN", label: "Canada", distanceFactor: 0.1 }],
  },
  {
    code: "USD",
    name: "United States Dollar",
    symbol: "$",
    rate: 1,
    countries: [
      { value: "USA", label: "United States", distanceFactor: 0 },
      { value: "ASM", label: "American Samoa", distanceFactor: 0.1 },
      { value: "GUM", label: "Guam", distanceFactor: 0.1 },
      { value: "MNP", label: "Northern Mariana Islands", distanceFactor: 0.1 },
      { value: "PRI", label: "Puerto Rico", distanceFactor: 0.1 },
      {
        value: "VIR",
        label: "United States Virgin Islands",
        distanceFactor: 0.1,
      },
      {
        value: "BES",
        label: "Bonaire, Sint Eustatius, and Saba",
        distanceFactor: 0.1,
      },
      { value: "ECU", label: "Ecuador", distanceFactor: 0.1 },
      { value: "SLV", label: "El Salvador", distanceFactor: 0.1 },
      { value: "PLW", label: "Palau", distanceFactor: 0.1 },
      { value: "MHL", label: "Marshall Islands", distanceFactor: 0.1 },
      {
        value: "FSM",
        label: "Federated States of Micronesia",
        distanceFactor: 0.1,
      },
      { value: "VGB", label: "British Virgin Islands", distanceFactor: 0.1 },
      { value: "TCA", label: "Turks and Caicos Islands", distanceFactor: 0.1 },
      { value: "TLS", label: "Timor-Leste", distanceFactor: 0.1 },
      { value: "ZWE", label: "Zimbabwe", distanceFactor: 0.1 },
    ],
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    rate: 1.51,
    countries: [
      { value: "AUS", label: "Australia", distanceFactor: 0.6 },
      { value: "CXR", label: "Christmas Island", distanceFactor: 0.6 },
      { value: "CCK", label: "Cocos (Keeling) Islands", distanceFactor: 0.6 },
      { value: "NRU", label: "Nauru", distanceFactor: 0.6 },
      { value: "NFK", label: "Norfolk Island", distanceFactor: 0.6 },
      {
        value: "HMD",
        label: "Heard Island and McDonald Islands",
        distanceFactor: 0.6,
      },
    ],
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    rate: 0.92,
    countries: [
      { value: "FRA", label: "France", distanceFactor: 0.3 },
      { value: "DEU", label: "Germany", distanceFactor: 0.3 },
      { value: "ITA", label: "Italy", distanceFactor: 0.3 },
      { value: "ESP", label: "Spain", distanceFactor: 0.3 },
      { value: "NLD", label: "Netherlands", distanceFactor: 0.3 },
      { value: "GRC", label: "Greece", distanceFactor: 0.3 },
      { value: "AUT", label: "Austria", distanceFactor: 0.3 },
      { value: "BEL", label: "Belgium", distanceFactor: 0.3 },
      { value: "HRV", label: "Croatia", distanceFactor: 0.3 },
      { value: "CYP", label: "Cyprus", distanceFactor: 0.3 },
      { value: "EST", label: "Estonia", distanceFactor: 0.3 },
      { value: "FIN", label: "Finland", distanceFactor: 0.3 },
      { value: "IRL", label: "Ireland", distanceFactor: 0.3 },
      { value: "LVA", label: "Latvia", distanceFactor: 0.3 },
      { value: "LTU", label: "Lithuania", distanceFactor: 0.3 },
      { value: "LUX", label: "Luxembourg", distanceFactor: 0.3 },
      { value: "MLT", label: "Malta", distanceFactor: 0.3 },
      { value: "PRT", label: "Portugal", distanceFactor: 0.3 },
      { value: "SVK", label: "Slovakia", distanceFactor: 0.3 },
      { value: "SVN", label: "Slovenia", distanceFactor: 0.3 },
      { value: "AND", label: "Andorra", distanceFactor: 0.3 },
      { value: "MCO", label: "Monaco", distanceFactor: 0.3 },
      { value: "SMR", label: "San Marino", distanceFactor: 0.3 },
      { value: "VAT", label: "Vatican City", distanceFactor: 0.3 },
    ],
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    rate: 0.78,
    countries: [
      { value: "GBR", label: "United Kingdom", distanceFactor: 0.3 },
      {
        value: "BAT",
        label: "British Antarctic Territory",
        distanceFactor: 0.3,
      },
      {
        value: "BIOT",
        label: "British Indian Ocean Territory",
        distanceFactor: 0.3,
      },
      { value: "FLK", label: "Falkland Islands", distanceFactor: 0.3 },
      { value: "GIB", label: "Gibraltar", distanceFactor: 0.3 },
      { value: "GGY", label: "Guernsey", distanceFactor: 0.3 },
      { value: "IMN", label: "Isle of Man", distanceFactor: 0.3 },
      { value: "JEY", label: "Jersey", distanceFactor: 0.3 },
      {
        value: "SHH",
        label: "Saint Helena, Ascension, and Tristan da Cunha",
        distanceFactor: 0.3,
      },
      {
        value: "SGS",
        label: "South Georgia and the South Sandwich Islands",
        distanceFactor: 0.3,
      },
    ],
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    rate: 149.82,
    countries: [{ value: "JPN", label: "Japan", distanceFactor: 0.5 }],
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    symbol: "¥",
    rate: 7.23,
    countries: [{ value: "CHN", label: "China", distanceFactor: 0.5 }],
  },
  {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    rate: 83.14,
    countries: [{ value: "IND", label: "India", distanceFactor: 0.4 }],
  },
  {
    code: "BRL",
    name: "Brazilian Real",
    symbol: "R$",
    rate: 5.14,
    countries: [{ value: "BRA", label: "Brazil", distanceFactor: 0.5 }],
  },
  {
    code: "ZAR",
    name: "South African Rand",
    symbol: "R",
    rate: 18.33,
    countries: [{ value: "ZAF", label: "South Africa", distanceFactor: 0.7 }],
  },
  {
    code: "MXN",
    name: "Mexican Peso",
    symbol: "MX$",
    rate: 16.87,
    countries: [{ value: "MEX", label: "Mexico", distanceFactor: 0.1 }],
  },
  {
    code: "KRW",
    name: "South Korean Won",
    symbol: "₩",
    rate: 1335.97,
    countries: [{ value: "KOR", label: "South Korea", distanceFactor: 0.5 }],
  },
  {
    code: "SGD",
    name: "Singapore Dollar",
    symbol: "S$",
    rate: 1.34,
    countries: [{ value: "SGP", label: "Singapore", distanceFactor: 0.5 }],
  },
  {
    code: "NZD",
    name: "New Zealand Dollar",
    symbol: "NZ$",
    rate: 1.63,
    countries: [
      { value: "NZL", label: "New Zealand", distanceFactor: 0.6 },
      { value: "COK", label: "Cook Islands", distanceFactor: 0.6 },
      { value: "NIU", label: "Niue", distanceFactor: 0.6 },
      { value: "TKL", label: "Tokelau", distanceFactor: 0.6 },
    ],
  },
  {
    code: "CHF",
    name: "Swiss Franc",
    symbol: "CHF",
    rate: 0.88,
    countries: [
      { value: "CHE", label: "Switzerland", distanceFactor: 0.3 },
      { value: "LIE", label: "Liechtenstein", distanceFactor: 0.3 },
    ],
  },
  {
    code: "SEK",
    name: "Swedish Krona",
    symbol: "kr",
    rate: 10.45,
    countries: [{ value: "SWE", label: "Sweden", distanceFactor: 0.4 }],
  },
  {
    code: "NOK",
    name: "Norwegian Krone",
    symbol: "kr",
    rate: 10.59,
    countries: [{ value: "NOR", label: "Norway", distanceFactor: 0.4 }],
  },
  {
    code: "DKK",
    name: "Danish Krone",
    symbol: "kr",
    rate: 6.87,
    countries: [
      { value: "DNK", label: "Denmark", distanceFactor: 0.4 },
      { value: "FRO", label: "Faroe Islands", distanceFactor: 0.4 },
      { value: "GRL", label: "Greenland", distanceFactor: 0.4 },
    ],
  },
  {
    code: "RUB",
    name: "Russian Ruble",
    symbol: "₽",
    rate: 90.86,
    countries: [
      { value: "RUS", label: "Russia", distanceFactor: 0.6 },
      { value: "ABK", label: "Abkhazia", distanceFactor: 0.6 },
      { value: "SOS", label: "South Ossetia", distanceFactor: 0.6 },
    ],
  },
  {
    code: "AED",
    name: "United Arab Emirates Dirham",
    symbol: "د.إ",
    rate: 3.67,
    countries: [
      { value: "ARE", label: "United Arab Emirates", distanceFactor: 0.6 },
    ],
  },
  {
    code: "CLP",
    name: "Chilean Peso",
    symbol: "$",
    rate: 800,
    countries: [{ value: "CHL", label: "Chile", distanceFactor: 0.1 }],
  },
  {
    code: "CZK",
    name: "Czech Koruna",
    symbol: "Kč",
    rate: 22,
    countries: [{ value: "CZE", label: "Czech Republic", distanceFactor: 0.3 }],
  },
  {
    code: "HKD",
    name: "Hong Kong Dollar",
    symbol: "HK$",
    rate: 7.8,
    countries: [{ value: "HKG", label: "Hong Kong", distanceFactor: 0.3 }],
  },
  {
    code: "HUF",
    name: "Hungarian Forint",
    symbol: "Ft",
    rate: 370,
    countries: [{ value: "HUN", label: "Hungary", distanceFactor: 0.3 }],
  },
  {
    code: "IDR",
    name: "Indonesian Rupiah",
    symbol: "Rp",
    rate: 15000,
    countries: [{ value: "IDN", label: "Indonesia", distanceFactor: 0.5 }],
  },
  {
    code: "ILS",
    name: "Israeli New Shekel",
    symbol: "₪",
    rate: 3.5,
    countries: [{ value: "ISR", label: "Israel", distanceFactor: 0.3 }],
  },
  {
    code: "MYR",
    name: "Malaysian Ringgit",
    symbol: "RM",
    rate: 4.5,
    countries: [{ value: "MYS", label: "Malaysia", distanceFactor: 0.5 }],
  },
  {
    code: "PKR",
    name: "Pakistani Rupee",
    symbol: "₨",
    rate: 280,
    countries: [{ value: "PAK", label: "Pakistan", distanceFactor: 0.4 }],
  },
  {
    code: "PHP",
    name: "Philippine Peso",
    symbol: "₱",
    rate: 50,
    countries: [{ value: "PHL", label: "Philippines", distanceFactor: 0.5 }],
  },
  {
    code: "PLN",
    name: "Polish Zloty",
    symbol: "zł",
    rate: 4.2,
    countries: [{ value: "POL", label: "Poland", distanceFactor: 0.3 }],
  },
  {
    code: "SAR",
    name: "Saudi Riyal",
    symbol: "﷼",
    rate: 3.75,
    countries: [{ value: "SAU", label: "Saudi Arabia", distanceFactor: 0.3 }],
  },
  {
    code: "TWD",
    name: "New Taiwan Dollar",
    symbol: "NT$",
    rate: 30,
    countries: [{ value: "TWN", label: "Taiwan", distanceFactor: 0.3 }],
  },
  {
    code: "TRY",
    name: "Turkish Lira",
    symbol: "₺",
    rate: 19,
    countries: [{ value: "TUR", label: "Turkey", distanceFactor: 0.3 }],
  },
  {
    code: "AFN",
    name: "Afghan Afghani",
    symbol: "؋",
    rate: 87.0,
    countries: [{ value: "AFG", label: "Afghanistan", distanceFactor: 0.5 }],
  },
  {
    code: "ALL",
    name: "Albanian Lek",
    symbol: "L",
    rate: 107.0,
    countries: [{ value: "ALB", label: "Albania", distanceFactor: 0.5 }],
  },
  {
    code: "DZD",
    name: "Algerian Dinar",
    symbol: "د.ج",
    rate: 140.0,
    countries: [{ value: "DZA", label: "Algeria", distanceFactor: 0.5 }],
  },
  {
    code: "AOA",
    name: "Angolan Kwanza",
    symbol: "Kz",
    rate: 500.0,
    countries: [{ value: "AGO", label: "Angola", distanceFactor: 0.5 }],
  },
  {
    code: "ARS",
    name: "Argentine Peso",
    symbol: "$",
    rate: 140.0,
    countries: [{ value: "ARG", label: "Argentina", distanceFactor: 0.5 }],
  },
  {
    code: "AMD",
    name: "Armenian Dram",
    symbol: "֏",
    rate: 480.0,
    countries: [{ value: "ARM", label: "Armenia", distanceFactor: 0.5 }],
  },
  {
    code: "AWG",
    name: "Aruban Florin",
    symbol: "ƒ",
    rate: 2.0,
    countries: [{ value: "ABW", label: "Aruba", distanceFactor: 0.5 }],
  },
  {
    code: "AZN",
    name: "Azerbaijani Manat",
    symbol: "₼",
    rate: 1.7,
    countries: [{ value: "AZE", label: "Azerbaijan", distanceFactor: 0.5 }],
  },
  {
    code: "BSD",
    name: "Bahamian Dollar",
    symbol: "$",
    rate: 1,
    countries: [{ value: "BHS", label: "Bahamas", distanceFactor: 0.5 }],
  },
  {
    code: "BHD",
    name: "Bahraini Dinar",
    symbol: "BHD",
    rate: 0.38,
    countries: [{ value: "BHR", label: "Bahrain", distanceFactor: 0.5 }],
  },
  {
    code: "BDT",
    name: "Bangladeshi Taka",
    symbol: "৳",
    rate: 107.0,
    countries: [{ value: "BGD", label: "Bangladesh", distanceFactor: 0.5 }],
  },
  {
    code: "BBD",
    name: "Barbadian Dollar",
    symbol: "$",
    rate: 2.0,
    countries: [{ value: "BRB", label: "Barbados", distanceFactor: 0.5 }],
  },
  {
    code: "BYN",
    name: "Belarusian Ruble",
    symbol: "Br",
    rate: 2.5,
    countries: [{ value: "BLR", label: "Belarus", distanceFactor: 0.5 }],
  },
  {
    code: "BZD",
    name: "Belize Dollar",
    symbol: "$",
    rate: 2.0,
    countries: [{ value: "BLZ", label: "Belize", distanceFactor: 0.5 }],
  },
  {
    code: "BMD",
    name: "Bermudan Dollar",
    symbol: "$",
    rate: 1,
    countries: [{ value: "BMU", label: "Bermuda", distanceFactor: 0.5 }],
  },
  {
    code: "BTN",
    name: "Bhutanese Ngultrum",
    symbol: "Nu.",
    rate: 74.0,
    countries: [{ value: "BTN", label: "Bhutan", distanceFactor: 0.5 }],
  },
  {
    code: "BOB",
    name: "Bolivian Boliviano",
    symbol: "Bs.",
    rate: 6.9,
    countries: [{ value: "BOL", label: "Bolivia", distanceFactor: 0.5 }],
  },
  {
    code: "BAM",
    name: "Bosnia-Herzegovina Convertible Mark",
    symbol: "KM",
    rate: 1.8,
    countries: [
      { value: "BIH", label: "Bosnia and Herzegovina", distanceFactor: 0.5 },
    ],
  },
  {
    code: "BWP",
    name: "Botswana Pula",
    symbol: "P",
    rate: 12.0,
    countries: [{ value: "BWA", label: "Botswana", distanceFactor: 0.5 }],
  },
  {
    code: "BND",
    name: "Brunei Dollar",
    symbol: "$",
    rate: 1.35,
    countries: [{ value: "BRN", label: "Brunei", distanceFactor: 0.5 }],
  },
  {
    code: "BGN",
    name: "Bulgarian Lev",
    symbol: "лв",
    rate: 1.8,
    countries: [{ value: "BGR", label: "Bulgaria", distanceFactor: 0.5 }],
  },
  {
    code: "BIF",
    name: "Burundian Franc",
    symbol: "FBu",
    rate: 2000,
    countries: [{ value: "BDI", label: "Burundi", distanceFactor: 0.5 }],
  },
  {
    code: "XPF",
    name: "CFP Franc",
    symbol: "₣",
    rate: 100,
    countries: [
      { value: "PYF", label: "French Polynesia", distanceFactor: 0.5 },
    ],
  },
  {
    code: "KHR",
    name: "Cambodian Riel",
    symbol: "៛",
    rate: 4100,
    countries: [{ value: "KHM", label: "Cambodia", distanceFactor: 0.5 }],
  },
  {
    code: "CVE",
    name: "Cape Verdean Escudo",
    symbol: "Esc",
    rate: 100,
    countries: [{ value: "CPV", label: "Cape Verde", distanceFactor: 0.5 }],
  },
  {
    code: "KYD",
    name: "Cayman Islands Dollar",
    symbol: "$",
    rate: 0.83,
    countries: [{ value: "CYM", label: "Cayman Islands", distanceFactor: 0.5 }],
  },
  {
    code: "XAF",
    name: "Central African CFA Franc",
    symbol: "F.CFA",
    rate: 600,
    countries: [
      { value: "XAF", label: "Central African region", distanceFactor: 0.5 },
    ],
  },
  {
    code: "COP",
    name: "Colombian Peso",
    symbol: "$",
    rate: 4000,
    countries: [{ value: "COL", label: "Colombia", distanceFactor: 0.5 }],
  },
  {
    code: "KMF",
    name: "Comorian Franc",
    symbol: "FC",
    rate: 450,
    countries: [{ value: "COM", label: "Comoros", distanceFactor: 0.5 }],
  },
  {
    code: "CDF",
    name: "Congolese Franc",
    symbol: "FC",
    rate: 2000,
    countries: [{ value: "COD", label: "DR Congo", distanceFactor: 0.5 }],
  },
  {
    code: "CRC",
    name: "Costa Rican Colón",
    symbol: "₡",
    rate: 500,
    countries: [{ value: "CRI", label: "Costa Rica", distanceFactor: 0.5 }],
  },
  {
    code: "CUP",
    name: "Cuban Peso",
    symbol: "₱",
    rate: 25,
    countries: [{ value: "CUB", label: "Cuba", distanceFactor: 0.5 }],
  },
  {
    code: "DJF",
    name: "Djiboutian Franc",
    symbol: "Fdj",
    rate: 177,
    countries: [{ value: "DJI", label: "Djibouti", distanceFactor: 0.5 }],
  },
  {
    code: "DOP",
    name: "Dominican Peso",
    symbol: "$",
    rate: 56,
    countries: [
      { value: "DOM", label: "Dominican Republic", distanceFactor: 0.5 },
    ],
  },
  {
    code: "XCD",
    name: "East Caribbean Dollar",
    symbol: "EC$",
    rate: 2.7,
    countries: [
      { value: "DMA", label: "Eastern Caribbean", distanceFactor: 0.5 },
    ],
  },
  {
    code: "EGP",
    name: "Egyptian Pound",
    symbol: "E£",
    rate: 30,
    countries: [{ value: "EGY", label: "Egypt", distanceFactor: 0.5 }],
  },
  {
    code: "ETB",
    name: "Ethiopian Birr",
    symbol: "Br",
    rate: 50,
    countries: [{ value: "ETH", label: "Ethiopia", distanceFactor: 0.5 }],
  },
  {
    code: "FJD",
    name: "Fijian Dollar",
    symbol: "$",
    rate: 2.2,
    countries: [{ value: "FJI", label: "Fiji", distanceFactor: 0.5 }],
  },
  {
    code: "GMD",
    name: "Gambian Dalasi",
    symbol: "D",
    rate: 51,
    countries: [{ value: "GMB", label: "Gambia", distanceFactor: 0.5 }],
  },
  {
    code: "GEL",
    name: "Georgian Lari",
    symbol: "₾",
    rate: 2.8,
    countries: [{ value: "GEO", label: "Georgia", distanceFactor: 0.5 }],
  },
  {
    code: "GHS",
    name: "Ghanaian Cedi",
    symbol: "₵",
    rate: 12,
    countries: [{ value: "GHA", label: "Ghana", distanceFactor: 0.5 }],
  },
  {
    code: "GTQ",
    name: "Guatemalan Quetzal",
    symbol: "Q",
    rate: 7.7,
    countries: [{ value: "GTM", label: "Guatemala", distanceFactor: 0.5 }],
  },
  {
    code: "GNF",
    name: "Guinean Franc",
    symbol: "FG",
    rate: 9800,
    countries: [{ value: "GIN", label: "Guinea", distanceFactor: 0.5 }],
  },
  {
    code: "GYD",
    name: "Guyanese Dollar",
    symbol: "$",
    rate: 210,
    countries: [{ value: "GUY", label: "Guyana", distanceFactor: 0.5 }],
  },
  {
    code: "HTG",
    name: "Haitian Gourde",
    symbol: "G",
    rate: 105,
    countries: [{ value: "HTI", label: "Haiti", distanceFactor: 0.5 }],
  },
  {
    code: "HNL",
    name: "Honduran Lempira",
    symbol: "L",
    rate: 24,
    countries: [{ value: "HND", label: "Honduras", distanceFactor: 0.5 }],
  },
  {
    code: "ISK",
    name: "Icelandic Króna",
    symbol: "kr",
    rate: 140,
    countries: [{ value: "ISL", label: "Iceland", distanceFactor: 0.5 }],
  },
  {
    code: "IRR",
    name: "Iranian Rial",
    symbol: "﷼",
    rate: 42000,
    countries: [{ value: "IRN", label: "Iran", distanceFactor: 0.5 }],
  },
  {
    code: "IQD",
    name: "Iraqi Dinar",
    symbol: "ع.د",
    rate: 1460,
    countries: [{ value: "IRQ", label: "Iraq", distanceFactor: 0.5 }],
  },
  {
    code: "JMD",
    name: "Jamaican Dollar",
    symbol: "J$",
    rate: 155,
    countries: [{ value: "JAM", label: "Jamaica", distanceFactor: 0.5 }],
  },
  {
    code: "JOD",
    name: "Jordanian Dinar",
    symbol: "JD",
    rate: 0.71,
    countries: [{ value: "JOR", label: "Jordan", distanceFactor: 0.5 }],
  },
  {
    code: "KZT",
    name: "Kazakhstani Tenge",
    symbol: "₸",
    rate: 470,
    countries: [{ value: "KAZ", label: "Kazakhstan", distanceFactor: 0.5 }],
  },
  {
    code: "KES",
    name: "Kenyan Shilling",
    symbol: "KSh",
    rate: 110,
    countries: [{ value: "KEN", label: "Kenya", distanceFactor: 0.5 }],
  },
  {
    code: "KWD",
    name: "Kuwaiti Dinar",
    symbol: "KD",
    rate: 0.3,
    countries: [{ value: "KWT", label: "Kuwait", distanceFactor: 0.5 }],
  },
  {
    code: "KGS",
    name: "Kyrgyzstani Som",
    symbol: "KGS",
    rate: 84,
    countries: [{ value: "KGZ", label: "Kyrgyzstan", distanceFactor: 0.5 }],
  },
  {
    code: "LAK",
    name: "Laotian Kip",
    symbol: "₭",
    rate: 17000,
    countries: [{ value: "LAO", label: "Laos", distanceFactor: 0.5 }],
  },
  {
    code: "LBP",
    name: "Lebanese Pound",
    symbol: "ل.ل",
    rate: 15000,
    countries: [{ value: "LBN", label: "Lebanon", distanceFactor: 0.5 }],
  },
  {
    code: "LSL",
    name: "Lesotho Loti",
    symbol: "L",
    rate: 15,
    countries: [{ value: "LSO", label: "Lesotho", distanceFactor: 0.5 }],
  },
  {
    code: "LRD",
    name: "Liberian Dollar",
    symbol: "$",
    rate: 150,
    countries: [{ value: "LBR", label: "Liberia", distanceFactor: 0.5 }],
  },
  {
    code: "LYD",
    name: "Libyan Dinar",
    symbol: "LD",
    rate: 4.5,
    countries: [{ value: "LBY", label: "Libya", distanceFactor: 0.5 }],
  },
  {
    code: "MOP",
    name: "Macanese Pataca",
    symbol: "MOP$",
    rate: 8,
    countries: [{ value: "MAC", label: "Macau", distanceFactor: 0.5 }],
  },
  {
    code: "MKD",
    name: "Macedonian Denar",
    symbol: "ден",
    rate: 55,
    countries: [
      { value: "MKD", label: "North Macedonia", distanceFactor: 0.5 },
    ],
  },
  {
    code: "MGA",
    name: "Malagasy Ariary",
    symbol: "Ar",
    rate: 4100,
    countries: [{ value: "MDG", label: "Madagascar", distanceFactor: 0.5 }],
  },
  {
    code: "MWK",
    name: "Malawian Kwacha",
    symbol: "MK",
    rate: 820,
    countries: [{ value: "MWI", label: "Malawi", distanceFactor: 0.5 }],
  },
  {
    code: "MVR",
    name: "Maldivian Rufiyaa",
    symbol: "Rf",
    rate: 15,
    countries: [{ value: "MDV", label: "Maldives", distanceFactor: 0.5 }],
  },
  {
    code: "MRU",
    name: "Mauritanian Ouguiya",
    symbol: "UM",
    rate: 36,
    countries: [{ value: "MRT", label: "Mauritania", distanceFactor: 0.5 }],
  },
  {
    code: "MUR",
    name: "Mauritian Rupee",
    symbol: "₨",
    rate: 43,
    countries: [{ value: "MUS", label: "Mauritius", distanceFactor: 0.5 }],
  },
  {
    code: "MDL",
    name: "Moldovan Leu",
    symbol: "L",
    rate: 18,
    countries: [{ value: "MDA", label: "Moldova", distanceFactor: 0.5 }],
  },
  {
    code: "MAD",
    name: "Moroccan Dirham",
    symbol: "DH",
    rate: 9,
    countries: [{ value: "MAR", label: "Morocco", distanceFactor: 0.5 }],
  },
  {
    code: "MZN",
    name: "Mozambican Metical",
    symbol: "MT",
    rate: 63,
    countries: [{ value: "MOZ", label: "Mozambique", distanceFactor: 0.5 }],
  },
  {
    code: "MMK",
    name: "Myanmar Kyat",
    symbol: "K",
    rate: 2100,
    countries: [{ value: "MMR", label: "Myanmar", distanceFactor: 0.5 }],
  },
  {
    code: "NAD",
    name: "Namibian Dollar",
    symbol: "$",
    rate: 15,
    countries: [{ value: "NAM", label: "Namibia", distanceFactor: 0.5 }],
  },
  {
    code: "NPR",
    name: "Nepalese Rupee",
    symbol: "रु",
    rate: 130,
    countries: [{ value: "NPL", label: "Nepal", distanceFactor: 0.5 }],
  },
  {
    code: "ANG",
    name: "Netherlands Antillean Guilder",
    symbol: "ƒ",
    rate: 1.79,
    countries: [
      { value: "ANT", label: "Netherlands Antilles", distanceFactor: 0.5 },
    ],
  },
  {
    code: "NIO",
    name: "Nicaraguan Córdoba",
    symbol: "C$",
    rate: 35,
    countries: [{ value: "NIC", label: "Nicaragua", distanceFactor: 0.5 }],
  },
  {
    code: "NGN",
    name: "Nigerian Naira",
    symbol: "₦",
    rate: 460,
    countries: [{ value: "NGA", label: "Nigeria", distanceFactor: 0.5 }],
  },
  {
    code: "OMR",
    name: "Omani Rial",
    symbol: "OMR",
    rate: 0.38,
    countries: [{ value: "OMN", label: "Oman", distanceFactor: 0.5 }],
  },
  {
    code: "PAB",
    name: "Panamanian Balboa",
    symbol: "B/.",
    rate: 1,
    countries: [{ value: "PAN", label: "Panama", distanceFactor: 0.5 }],
  },
  {
    code: "PGK",
    name: "Papua New Guinean Kina",
    symbol: "K",
    rate: 3.5,
    countries: [
      { value: "PNG", label: "Papua New Guinea", distanceFactor: 0.5 },
    ],
  },
  {
    code: "PYG",
    name: "Paraguayan Guarani",
    symbol: "₲",
    rate: 8000,
    countries: [{ value: "PRY", label: "Paraguay", distanceFactor: 0.5 }],
  },
  {
    code: "PEN",
    name: "Peruvian Sol",
    symbol: "S/",
    rate: 3.5,
    countries: [{ value: "PER", label: "Peru", distanceFactor: 0.5 }],
  },
  {
    code: "SBD",
    name: "Solomon Islands Dollar",
    symbol: "$",
    rate: 7,
    countries: [
      { value: "SLB", label: "Solomon Islands", distanceFactor: 0.5 },
    ],
  },
  {
    code: "SOS",
    name: "Somali Shilling",
    symbol: "Sh",
    rate: 570,
    countries: [{ value: "SOM", label: "Somalia", distanceFactor: 0.5 }],
  },
  {
    code: "VES",
    name: "Sovereign Bolivar",
    symbol: "Bs.S",
    rate: 20000000,
    countries: [{ value: "VEN", label: "Venezuela", distanceFactor: 0.5 }],
  },
  {
    code: "SDR",
    name: "Special Drawing Rights",
    symbol: "SDR",
    rate: 1,
    countries: [{ value: "SDR", label: "IMF SDR", distanceFactor: 0.5 }],
  },
  {
    code: "LKR",
    name: "Sri Lankan Rupee",
    symbol: "Rs",
    rate: 370,
    countries: [{ value: "LKA", label: "Sri Lanka", distanceFactor: 0.5 }],
  },
  {
    code: "SDG",
    name: "Sudanese Pound",
    symbol: "LS",
    rate: 600,
    countries: [{ value: "SDN", label: "Sudan", distanceFactor: 0.5 }],
  },
  {
    code: "SRD",
    name: "Surinamese Dollar",
    symbol: "$",
    rate: 22,
    countries: [{ value: "SUR", label: "Suriname", distanceFactor: 0.5 }],
  },
  {
    code: "SZL",
    name: "Swazi Lilangeni",
    symbol: "E",
    rate: 15,
    countries: [{ value: "SWZ", label: "Eswatini", distanceFactor: 0.5 }],
  },
  {
    code: "TJS",
    name: "Tajikistani Somoni",
    symbol: "SM",
    rate: 11,
    countries: [{ value: "TJK", label: "Tajikistan", distanceFactor: 0.5 }],
  },
  {
    code: "TZS",
    name: "Tanzanian Shilling",
    symbol: "TSh",
    rate: 2300,
    countries: [{ value: "TZA", label: "Tanzania", distanceFactor: 0.5 }],
  },
  {
    code: "THB",
    name: "Thai Baht",
    symbol: "฿",
    rate: 33,
    countries: [{ value: "THA", label: "Thailand", distanceFactor: 0.5 }],
  },
  {
    code: "TOP",
    name: "Tongan Paʻanga",
    symbol: "T$",
    rate: 2.3,
    countries: [{ value: "TON", label: "Tonga", distanceFactor: 0.5 }],
  },
  {
    code: "TTD",
    name: "Trinidad & Tobago Dollar",
    symbol: "$",
    rate: 6.8,
    countries: [
      { value: "TTO", label: "Trinidad and Tobago", distanceFactor: 0.5 },
    ],
  },
  {
    code: "TND",
    name: "Tunisian Dinar",
    symbol: "د.ت",
    rate: 3,
    countries: [{ value: "TUN", label: "Tunisia", distanceFactor: 0.5 }],
  },
  {
    code: "TMT",
    name: "Turkmenistani Manat",
    symbol: "m",
    rate: 3.5,
    countries: [{ value: "TKM", label: "Turkmenistan", distanceFactor: 0.5 }],
  },
  {
    code: "UGX",
    name: "Ugandan Shilling",
    symbol: "USh",
    rate: 3700,
    countries: [{ value: "UGA", label: "Uganda", distanceFactor: 0.5 }],
  },
  {
    code: "UAH",
    name: "Ukrainian Hryvnia",
    symbol: "₴",
    rate: 27,
    countries: [{ value: "UKR", label: "Ukraine", distanceFactor: 0.5 }],
  },
  {
    code: "UYU",
    name: "Uruguayan Peso",
    symbol: "$",
    rate: 40,
    countries: [{ value: "URY", label: "Uruguay", distanceFactor: 0.5 }],
  },
  {
    code: "UZS",
    name: "Uzbekistani Som",
    symbol: "so'm",
    rate: 11000,
    countries: [{ value: "UZB", label: "Uzbekistan", distanceFactor: 0.5 }],
  },
  {
    code: "VND",
    name: "Vietnamese dong",
    symbol: "₫",
    rate: 23000,
    countries: [{ value: "VNM", label: "Vietnam", distanceFactor: 0.5 }],
  },
  {
    code: "XOF",
    name: "West African CFA Franc",
    symbol: "F.CFA",
    rate: 600,
    countries: [
      { value: "XOF", label: "West African region", distanceFactor: 0.5 },
    ],
  },
  {
    code: "YER",
    name: "Yemeni Rial",
    symbol: "﷼",
    rate: 250,
    countries: [{ value: "YEM", label: "Yemen", distanceFactor: 0.5 }],
  },
  {
    code: "ZMW",
    name: "Zambian Kwacha",
    symbol: "ZK",
    rate: 20,
    countries: [{ value: "ZMB", label: "Zambia", distanceFactor: 0.5 }],
  },
];

export const navigations: NavigationDetails = {
  categories: [
    {
      id: "women",
      name: "Women",
      imageSrc:
        "https://media.istockphoto.com/id/1366475366/photo/business-woman-at-office.jpg?s=612x612&w=0&k=20&c=AeXxpYtRJPM85ZNNLrWKD_K_Y5sLfGd1xUQNQsQWwM8=",
      imageAlt: "Women's fashion collection",
      featured: [
        {
          name: "New Arrivals",
          href: "/shopping/women/collections/new_arrivals",
          imageSrc:
            "https://media.istockphoto.com/id/1160533209/photo/female-fashion-clothes-flat-lay-square.jpg?s=612x612&w=0&k=20&c=qnrP8AQgbrQlcFPK0tVAW-1B-abTlHiGQAeP5_FY-Qw=",
          imageAlt:
            "Latest arrivals in women's fashion, from dresses to casual wear.",
        },
        {
          name: "Accessories",
          href: "/shopping/women/accessories",
          imageSrc:
            "https://media.istockphoto.com/id/654407498/photo/woman-trendy-fashion-accessories.jpg?s=612x612&w=0&k=20&c=8Iv1m5tfkhx9WcnNwV7adXkBahEPv2EvdUnpMmQzYAI=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/women/collections/latest_drops",
          imageSrc:
            "https://media.istockphoto.com/id/938463446/photo/what-do-you-think-about-this-one.jpg?s=612x612&w=0&k=20&c=kxCtSwpj1tGGJ1ITJfChtC4x50cnAi3SmiKtvk1UFLA=",
          imageAlt: "Elegant accessories to complement your outfits.",
        },
      ],
      sections: [
        [
          {
            id: "clothing",
            name: "Clothing",
            href: "/shopping/women/clothing",
            imageSrc:
              "https://media.istockphoto.com/id/974746544/photo/smiling-girl-bying-clothes-in-showroom.jpg?s=612x612&w=0&k=20&c=tqanIbdVMPOaRypay5Ni_Jnc-gG3njEPiJKQOnPL3dQ=",
            imageAlt: "",
            items: [
              {
                name: "Tops",
                href: "/shopping/women/clothing/tops",
                imageSrc:
                  "https://media.istockphoto.com/id/1159432203/photo/portrait-of-a-mixed-race-young-woman-outdoor.jpg?s=612x612&w=0&k=20&c=SuAWhYshlH80U4irDI834nFPtt4_ZpXqx0NgtaSCk8I=",
              },
              {
                name: "Pants",
                href: "/shopping/women/clothing/pants",
                imageSrc:
                  "https://media.istockphoto.com/id/1466000525/photo/woman-shopping-denim-jeans-in-a-clothing-store.jpg?s=612x612&w=0&k=20&c=E4soNORZMS5EfGvwBJ51EODH0xnvmJQqP_sz1Q3vY_E=",
              },
              {
                name: "Bras",
                href: "/shopping/women/clothing/bras",
                imageSrc:
                  "https://media.istockphoto.com/id/936298782/photo/midsection-of-a-young-woman-at-home-getting-dressed-hooking-her-bra.jpg?s=612x612&w=0&k=20&c=j4Ayqk2dvL7Vjsux8OpCwyW2bUB8VWhYnu41HplQmqg=",
              },
              {
                name: "Maternity Clothes",
                href: "/shopping/women/clothing/maternity_clothing",
                imageSrc:
                  "https://media.istockphoto.com/id/835757738/photo/pregnant-woman-in-dress-holds-hands-on-belly-on-a-white-background.jpg?s=612x612&w=0&k=20&c=OSBb7C925wBzZb0P7EUtKDmwhtD_VLN0hYWjpNh-iac=",
              },
              {
                name: "Dresses & Skirts",
                href: "/shopping/women/clothing/dresses_skirts",
                imageSrc:
                  "https://media.istockphoto.com/id/1479374495/photo/fashion-portrait-of-woman-in-white-lace-top-and-chiffon-long-maxi-beige-skirt-boho-wedding.jpg?s=612x612&w=0&k=20&c=-0ZF4aj8US4rKPU7rKpGq44YeF5KlDW-5k2abgytMlU=",
              },
              {
                name: "Swimwear",
                href: "/shopping/women/clothing/swimwear",
                imageSrc:
                  "https://media.istockphoto.com/id/928866530/photo/beautiful-woman-running-on-beach.jpg?s=612x612&w=0&k=20&c=dp_vMEzhJCv0dU6hUEENbt_Y62FxmaL3JzbyHaOZhdQ=",
              },
              {
                name: "Activewear",
                href: "/shopping/women/clothing/activewear",
                imageSrc:
                  "https://media.istockphoto.com/id/1438375009/photo/group-of-women-standing-together-in-a-yoga-studio.jpg?s=612x612&w=0&k=20&c=Kpu284MGjgrTTd5Hu8zverSCfwxtUG5HhuePPJOS2xs=",
              },
              {
                name: "Formal Wear",
                href: "/shopping/women/clothing/formal_wear",
                imageSrc:
                  "https://media.istockphoto.com/id/478671047/photo/excitement-before-the-prom.jpg?s=612x612&w=0&k=20&c=4tDjNXNmoKEXJdzTlhx4LP9pMl3ImU_tzt38AsjfzsM=",
              },
              {
                name: "Underwear",
                href: "/shopping/women/clothing/underwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1309867141/photo/colorful-clean-womens-panties-hang-on-a-rope-on-a-pink-isolated-background.jpg?s=612x612&w=0&k=20&c=6zm4XsaxrzCXmc-mHTHv1CJG3B4vi_UH8ly_LGNy6iU=",
              },
              {
                name: "Outerwear",
                href: "/shopping/women/clothing/outerwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1357329192/photo/lifestyle-portrait-of-fashionable-woman-wearing-winter-or-spring-outfit-felt-hat-gray-wool.jpg?s=612x612&w=0&k=20&c=e8eNsDBNHsgph5g2kSOceAFeTjwgbHLuGGeeyhcgIR0=",
              },
            ],
          },
          {
            id: "shoes",
            name: "Shoes",
            href: "/shopping/women/shoes",
            imageSrc:
              "https://media.istockphoto.com/id/1941360741/photo/woman-hands-packing-beige-shoes-on-heels-into-plastic-box-for-comfortable-storage-organize.jpg?s=612x612&w=0&k=20&c=4k8Bsj5yiko3ZmEHsqFPmrwk6_DWsoPiKz48hKyi3yA=",
            imageAlt: "",
            items: [
              {
                name: "Formal Shoes",
                href: "/shopping/women/shoes/formal",
                imageSrc:
                  "https://media.istockphoto.com/id/1360246837/photo/woman-putting-on-elegant-shoes-close-up-on-legs-and-red-dress.jpg?s=612x612&w=0&k=20&c=Yaxv0BRfT-5MYqjgOBB0HhEeDeVKUl-F7gjOLmIywbY=",
              },
              {
                name: "Sneakers",
                href: "/shopping/women/shoes/sneakers",
                imageSrc:
                  "https://media.istockphoto.com/id/1346094881/photo/cropped-shot-of-an-unrecognizable-woman-tying-her-shoelaces-while-exercising-at-the-gym.jpg?s=612x612&w=0&k=20&c=MFlCV5osWA0t7r2oTP6PTzvfKoO2NUDhF40zzkomxGc=",
              },
              {
                name: "Sandals",
                href: "/shopping/women/shoes/sandals",
                imageSrc:
                  "https://media.istockphoto.com/id/1034457896/photo/stylish-woman-wearing-black-summer-shoes-with-straw-sole-outdoors-comfortable-sandals-beauty.jpg?s=612x612&w=0&k=20&c=3sTprSCmzloWCysMqRjOITEdfUmhuM-TKre30nL2-TU=",
              },
              {
                name: "Boots",
                href: "/shopping/women/shoes/boots",
                imageSrc:
                  "https://media.istockphoto.com/id/846681586/photo/high-heel-boots.jpg?s=612x612&w=0&k=20&c=0JVYDAhUsvTfaCQBZAGwF11QdWw68H506ZHU8SyIdH4=",
              },
              {
                name: "Flats",
                href: "/shopping/women/shoes/flats",
                imageSrc:
                  "https://media.istockphoto.com/id/487140548/photo/womans-legs-in-jeans-and-flat-shoes.jpg?s=612x612&w=0&k=20&c=Htp86rEXSOENE730CE9uZd-_nSlxW3mt8xtBzBqgUak=",
              },
              {
                name: "Heels",
                href: "/shopping/women/shoes/heels",
                imageSrc:
                  "https://media.istockphoto.com/id/690303248/photo/woman-shopping-for-shoes.jpg?s=612x612&w=0&k=20&c=qVPbxWvS_fKRbMvWM80jP58DIXo5siT26hds8qvJYN8=",
              },
            ],
          },
        ],
        [
          {
            id: "accessories",
            name: "Accessories",
            href: "/shopping/women/accessories",
            imageSrc:
              "https://media.istockphoto.com/id/524906964/photo/top-view-of-fashion-female-accessories-for-woman.jpg?s=612x612&w=0&k=20&c=qDvtQeC80Z7rLySV6ycasi3psbYvi0AGPQ8dM5Q7gxE=",
            imageAlt: "",
            items: [
              {
                name: "Sunglasses",
                href: "/shopping/women/accessories/sunglasses",
                imageSrc:
                  "https://media.istockphoto.com/id/1134003334/photo/young-woman-walking-on-street.jpg?s=612x612&w=0&k=20&c=5kRJCmzZl3CS1q7cBJrY6pBO1o_FRJnVV66C4GsztDU=",
              },
              {
                name: "Necklaces & Bracelets",
                href: "/shopping/women/accessories/necklaces_and_braceslets",
                imageSrc:
                  "https://media.istockphoto.com/id/187043060/photo/close-up-of-a-bride-and-her-jewelry.jpg?s=612x612&w=0&k=20&c=CsNLVvOYzrCbaf6TUIBEz8yHsyr6lcUVj69D_BmTppg=",
              },
              {
                name: "Watches",
                href: "/shopping/women/accessories/watches",
                imageSrc:
                  "https://media.istockphoto.com/id/972187570/photo/close-up-young-fashion-blogger-wearing-a-floral-jacker-and-a-white-and-golden-analog-wrist.jpg?s=612x612&w=0&k=20&c=HJrSLZQ5yL7hFWNU00ZkfwDzUBi3eipm05S4UtletTA=",
              },
              {
                name: "Wallets",
                href: "/shopping/women/accessories/wallets",
                imageSrc:
                  "https://media.istockphoto.com/id/1073589496/photo/senior-unrecognizable-woman-picking-up-a-red-wallet-from-a-rack-in-a-bags-and-wallets-store.jpg?s=612x612&w=0&k=20&c=wESJSXPXcbpJslHcS6BJbRr1CNgdBMGfLwWdrv2_cnc=",
              },
              {
                name: "Bags",
                href: "/shopping/women/accessories/bags",
                imageSrc:
                  "https://media.istockphoto.com/id/1271796113/photo/women-is-holding-handbag-near-luxury-car.jpg?s=612x612&w=0&k=20&c=-jtXLmexNgRa-eKqA1X8UJ8QYWhW7XgDiWNmzuuCHmM=",
              },
              {
                name: "Belts",
                href: "/shopping/women/accessories/belts",
                imageSrc:
                  "https://media.istockphoto.com/id/1080729004/photo/unrecognizable-female-trying-out-a-red-leather-belt-in-a-bags-and-accessories-store.jpg?s=612x612&w=0&k=20&c=NFarV7wcw4r18EHJNPiryNHqZbF7_XMheIPh5iyk5Ow=",
              },
              {
                name: "Scarves",
                href: "/shopping/women/accessories/scarves",
                imageSrc:
                  "https://media.istockphoto.com/id/831416254/photo/woman-feeling-cold-in-winter.jpg?s=612x612&w=0&k=20&c=oQeNx2mbeZX4vhJwb6JKMrDLkffQAOl131obVWXScVQ=",
              },
              {
                name: "Hats",
                href: "/shopping/women/accessories/hats",
                imageSrc:
                  "https://media.istockphoto.com/id/928866976/photo/woman-wearing-black-hat-at-beach.jpg?s=612x612&w=0&k=20&c=8iHDGjAzUmwlmGJyBKbWyIQjYAXpjvuY2yIcBQRrakg=",
              },
            ],
          },
        ],
        [
          {
            id: "shop-collection",
            name: "Shop by Collection",
            href: "/shopping/women/collections",
            imageSrc:
              "https://media.istockphoto.com/id/1433320009/photo/diverse-businesswomen-smiling-at-the-camera-in-an-office.jpg?s=612x612&w=0&k=20&c=Pfez96VQsmXCTnpDD2S8FeYJLZVWVZ1c-tc6jGnVw8o=",
            imageAlt: "",
            items: [
              {
                name: "New Arrivals",
                href: "/shopping/women/collections/new_arrivals",
                imageSrc:
                  "https://media.istockphoto.com/id/610255602/photo/happy-shopping-woman.jpg?s=612x612&w=0&k=20&c=Q6e2YxvqjIQZqf7vCtlwMDI6hvhgTlKIQXOotITOZ78=",
              },
              {
                name: "Latest Drops",
                href: "/shopping/women/collections/latest_drops",
                imageSrc:
                  "https://media.istockphoto.com/id/1662088111/photo/shopping-with-girlfriend.jpg?s=612x612&w=0&k=20&c=EpwnHCgwXkezn179WcIGqXHChdhHSKwyb__68P1h09Q=",
              },
              {
                name: "Best Sellers",
                href: "/shopping/women/collections/best_sellers",
                imageSrc:
                  "https://media.istockphoto.com/id/694044976/photo/i-know-ill-find-something-i-like-here.jpg?s=612x612&w=0&k=20&c=HeGXho7xvyLVdFjo7yM7c1_IErMoPPfg3Zk8hVQlV7I=",
              },
              {
                name: "Sale",
                href: "/shopping/women/collections/sale",
                imageSrc:
                  "https://media.istockphoto.com/id/1131097418/photo/beautiful-woman-with-shopping-bags-in-the-city-sale-shopping-tourism-and-happy-people-concept.jpg?s=612x612&w=0&k=20&c=XzAFRIbtsDn4hRYNMyiNn88CuO76vqyKLFANzRzUBzE=",
              },
            ],
          },
        ],
      ],
      collections: [
        {
          name: "New Arrivals",
          href: "/shopping/women/collections/new_arrivals",
          imageSrc:
            "https://cdn.sanity.io/images/tzehqw2l/production/7776683b570c81940b1526996c1b23745be4c674-335x447.jpg?width=2000&height=2669&crop=center",
          imageAlt:
            "Latest arrivals in women's fashion, from dresses to casual wear.",
        },
        {
          name: "Best Sellers",
          href: "/shopping/women/collections/best_sellers",
          imageSrc:
            "https://media.istockphoto.com/id/867341470/photo/window-shopping.jpg?s=612x612&w=0&k=20&c=2AdLIydxyTGmePMSNu5z5RQexib39GQDF-xUsoqJBkg=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/women/collections/latest_drops",
          imageSrc:
            "https://media.istockphoto.com/id/918664682/photo/young-woman-choosing-clothes.jpg?s=612x612&w=0&k=20&c=isL-hRIaGRGKrGsCO2WtlJH-joVGrquhwB5NZ7Iw0lg=",
          imageAlt: "Elegant accessories to complement your outfits.",
        },
        {
          name: "Sale",
          href: "/shopping/women/collections/sale",
          imageSrc:
            "https://media.istockphoto.com/id/2158155744/photo/beautiful-young-woman-trying-on-shoes.jpg?s=612x612&w=0&k=20&c=_beFGQxQKayGhEUdPK-CwV1pTSE1VIUZIXV4m7MQMrk=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      imageSrc:
        "https://media.istockphoto.com/id/1366475366/photo/business-woman-at-office.jpg?s=612x612&w=0&k=20&c=AeXxpYtRJPM85ZNNLrWKD_K_Y5sLfGd1xUQNQsQWwM8=",
      imageAlt: "Women's fashion collection",
      featured: [
        {
          name: "New Arrivals",
          href: "/shopping/men/collections/new_arrivals",
          imageSrc:
            "https://media.istockphoto.com/id/2066301960/photo/man-with-eyeglasses-stand-at-home-use-mobile-phone-sms-texting.jpg?s=612x612&w=0&k=20&c=6WBKuAaKy43cColcv9TaSIN1gu_rIF_q-o0WtPBZ3Z8=",
          imageAlt: "New men's fashion trends for every occasion.",
        },
        {
          name: "Shoes",
          href: "/shopping/men/shoes",
          imageSrc:
            "https://media.istockphoto.com/id/1201660255/photo/genuine-leather-sneakers-shoes-for-mens-fashions.jpg?s=612x612&w=0&k=20&c=OGxmUYPA6oFdi04IppLadAhY2tRdLlQ5uWMsx8a9W6c=",
          imageAlt: "Hats, watches, and accessories to complete your look.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/men/collections/latest_drops",
          imageSrc:
            "https://media.istockphoto.com/id/1293366109/photo/this-one-match-perfect-with-me.jpg?s=612x612&w=0&k=20&c=wJ6yYbRrDfdmoViuQkX39s2z_0lCiNQYgEtLU--0EbY=",
          imageAlt: "Comfortable and stylish t-shirts and shirts for men.",
        },
      ],
      sections: [
        [
          {
            id: "clothing",
            name: "Clothing",
            href: "/shopping/men/clothing",
            imageSrc:
              "https://media.istockphoto.com/id/1368390738/photo/young-businessman-shopping-in-clothes-store.jpg?s=612x612&w=0&k=20&c=INTPQsKXscd94xwZJ5lCE-knp_JmWVbvEw_EFWutxx8=",
            imageAlt: "",
            items: [
              {
                name: "Tops",
                href: "/shopping/men/clothing/tops",
                imageSrc:
                  "https://media.istockphoto.com/id/876424182/photo/classic-mens-shirts-stacked-on-white-background.jpg?s=612x612&w=0&k=20&c=oNZHUUeVply_VbGFsOMq8SRnjlT7nKHYaCxtRFF_kbc=",
              },
              {
                name: "Pants",
                href: "/shopping/men/clothing/pants",
                imageSrc:
                  "https://media.istockphoto.com/id/1154077427/photo/stack-of-blue-jeans-on-wooden-shelf-beauty-and-fashion-clothing-concept.jpg?s=612x612&w=0&k=20&c=loFBJmT62zi0ubdBlZmp0YRU2SeRcX336sgixZ-mfvw=",
              },
              {
                name: "Swimwear",
                href: "/shopping/men/clothing/swimwear",
                imageSrc:
                  "https://media.istockphoto.com/id/102285130/photo/man-on-inflatable-ring-in-pool.jpg?s=612x612&w=0&k=20&c=XnDBHybgASz9wqCtvEQzDW3lAZHkWmN0q0HfZ8_oImU=",
              },
              {
                name: "Activewear",
                href: "/shopping/men/clothing/activewear",
                imageSrc:
                  "https://media.istockphoto.com/id/882815206/photo/man-running-at-the-gym.jpg?s=612x612&w=0&k=20&c=hYl2UlySVqc6wRDWFEAal4mXEY_5CzQCsiKAGhef4z0=",
              },
              {
                name: "Formal Wear",
                href: "/shopping/men/clothing/formal_wear",
                imageSrc:
                  "https://media.istockphoto.com/id/833606920/photo/business-mans-hand-in-pocket-wearing-a-watch.jpg?s=612x612&w=0&k=20&c=mFRdgwyQrQmZ2VblBPUNFTjsPXHYKLoAa4yL-vBgD-M=",
              },
              {
                name: "Underwear",
                href: "/shopping/men/clothing/underwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1319086313/photo/male-wearing-underwear-drinking-coffee-in-home-living-room.jpg?s=612x612&w=0&k=20&c=i09VOTVj_Yddg3g3vBDJ6q98oiW0y0ElJDmFdXCnzlA=",
              },
              {
                name: "Outerwear",
                href: "/shopping/men/clothing/outerwear",
                imageSrc:
                  "https://media.istockphoto.com/id/643902794/photo/modern-man-in-winter-coat.jpg?s=612x612&w=0&k=20&c=lbx_OvqzEqThcSXaQKtcDKSvdvMyrIvPFUYrslHznxk=",
              },
            ],
          },
          {
            id: "shoes",
            name: "Shoes",
            href: "/shopping/men/shoes",
            imageSrc:
              "https://media.istockphoto.com/id/1292262414/photo/online-shop.jpg?s=612x612&w=0&k=20&c=I3DP6vI3wBFfcW5J80IL0XU9IiasoVcTaP-zVH-aH3Q=",
            imageAlt: "",
            items: [
              {
                name: "Formal Shoes",
                href: "/shopping/men/shoes/formal",
                imageSrc:
                  "https://media.istockphoto.com/id/518526532/photo/mens-luxury-shoes.jpg?s=612x612&w=0&k=20&c=cAymTa7RD92v9_-8Lqt1zpM3iXRGAIFnl4WXYbq1wBE=",
              },

              {
                name: "Sneakers",
                href: "/shopping/men/shoes/sneakers",
                imageSrc:
                  "https://media.istockphoto.com/id/542197824/photo/portrait-of-a-man-tying-shoelaces.jpg?s=612x612&w=0&k=20&c=wTvXbrDo3lNdnJV2vFUyqh--ZmhNlIxeOPaFWnE3my0=",
              },

              {
                name: "Sandals",
                href: "/shopping/men/shoes/sandals",
                imageSrc:
                  "https://media.istockphoto.com/id/537333186/photo/mans-legs-sitting-on-the-rocks.jpg?s=612x612&w=0&k=20&c=FM15PO14BJm16k7_789Crn-77vWyCOUhM-p0lvGXTHA=",
              },
              {
                name: "Boots",
                href: "/shopping/men/shoes/boots",
                imageSrc:
                  "https://media.istockphoto.com/id/1191174327/photo/fashion-model-wearing-jeans-and-brown-boots-with-zipper.jpg?s=612x612&w=0&k=20&c=oSPZltRJ6J1mGVFHHoUevqha47n0Ipaucr341OS7gRs=",
              },
            ],
          },
        ],
        [
          {
            id: "accessories",
            name: "Accessories",
            href: "/shopping/men/accessories",
            imageSrc:
              "https://media.istockphoto.com/id/909883316/photo/businessman-cleaning-his-shoes.jpg?s=612x612&w=0&k=20&c=YB9YHYRfTmHVaCxhvupk9-hYp67WmzxueccxWdcQ2Yk=",
            imageAlt: "",
            items: [
              {
                name: "Sunglasses",
                href: "/shopping/men/accessories/sunglasses",
                imageSrc:
                  "https://media.istockphoto.com/id/984011410/photo/handsome-smiling-man-looking-away.jpg?s=612x612&w=0&k=20&c=TBebboy2N0FvXjtoB7UlcTfCLuRitNdVtzRnDhKLnXQ=",
              },
              {
                name: "Necklaces & Bracelets",
                href: "/shopping/men/accessories/necklaces_and_braceslets",
                imageSrc:
                  "https://media.istockphoto.com/id/855839820/photo/gold-jewelry.jpg?s=612x612&w=0&k=20&c=wW8-gOBtB-x67QKguQAurBrh-zGOwl9pha0pL2d5PkY=",
              },
              {
                name: "Watches",
                href: "/shopping/men/accessories/watches",
                imageSrc:
                  "https://media.istockphoto.com/id/533714204/photo/businessman-checking-time-from-watch.jpg?s=612x612&w=0&k=20&c=bJN94WW68Rw8uEogp3GKtBYnhcrNFNnf1SkWb0KDvGo=",
              },
              {
                name: "Wallets",
                href: "/shopping/men/accessories/wallets",
                imageSrc:
                  "https://media.istockphoto.com/id/688230458/photo/payment.jpg?s=612x612&w=0&k=20&c=cpp8_ExawAac0vR5X3L2KJeyWdOgGmE5pwTkEJjYq44=",
              },
              {
                name: "Bags",
                href: "/shopping/men/accessories/bags",
                imageSrc:
                  "https://media.istockphoto.com/id/1201027967/photo/caucasian-businessman-with-tattoo-taking-out-tablet-from-his-leather-bag.jpg?s=612x612&w=0&k=20&c=kVODVGNsrtt3hu183IXiPUf0jmGhHYbcRqYaj4I307s=",
              },
              {
                name: "Belts",
                href: "/shopping/men/accessories/belts",
                imageSrc:
                  "https://media.istockphoto.com/id/1045053646/photo/successful-man.jpg?s=612x612&w=0&k=20&c=XH2y_E6aTCWymYh5c45QGf1XlSMvCs0NaCgF0t2ybPU=",
              },
              {
                name: "Scarves",
                href: "/shopping/men/accessories/scarves",
                imageSrc:
                  "https://media.istockphoto.com/id/1288189469/photo/one-handosme-man-dressed-in-warm-winter-clothing-walking-outdoors-in-the-city.jpg?s=612x612&w=0&k=20&c=HcKQwj_B2VMG8zDTxUuy3vlhYzM5WmsbqS2SkZpkVkk=",
              },
              {
                name: "Hats",
                href: "/shopping/men/accessories/hats",
                imageSrc:
                  "https://media.istockphoto.com/id/858160872/photo/hipster-handsome-male-model-with-beard-wearing-black-blank-baseball-cap-with-space-for-your.jpg?s=612x612&w=0&k=20&c=FPNExCl2yoVKK0kSX0V9SoPnBy3hjkJ57RGWLTxsIvk=",
              },
            ],
          },
        ],
        [
          {
            id: "shop-collection",
            name: "Shop by Collection",
            href: "/shopping/men/collections",
            imageSrc:
              "https://media.istockphoto.com/id/1216428594/photo/young-lady-grabbing-cup-of-coffee-and-using-smartphone.jpg?s=612x612&w=0&k=20&c=_Dqv3MAjDpx_pJRXD8IglC3I2_bXs2A5K2UVVNayLWA=",
            imageAlt: "",
            items: [
              {
                name: "New Arrivals",
                href: "/shopping/men/collections/new_arrivals",
                imageSrc:
                  "https://media.istockphoto.com/id/1144491656/photo/mens-summer-casual-clothes-flat-lay.jpg?s=612x612&w=0&k=20&c=Icwk_UY2_wpRcpwP9Sk_IznIKhuNJmQh_rlWz0JCTVE=",
              },
              {
                name: "Latest Drops",
                href: "/shopping/men/collections/latest_drops",
                imageSrc:
                  "https://media.istockphoto.com/id/1300966679/photo/young-handsome-man-in-classic-suit-over-the-lake-background.jpg?s=612x612&w=0&k=20&c=SiGc4kc1L8mK-LIGSuRzPj-UHtBY2ov5knFuzDy9hzc=",
              },
              {
                name: "Best Sellers",
                href: "/shopping/men/collections/best_sellers",
                imageSrc:
                  "https://media.istockphoto.com/id/494349086/photo/confident-and-handsome.jpg?s=612x612&w=0&k=20&c=980_nP-60-8zxhA1AputWa-0ZULEbXcIVDZe0uX_H_M=",
              },
              {
                name: "Sale",
                href: "/shopping/men/collections/sale",
                imageSrc:
                  "https://media.istockphoto.com/id/870572130/photo/man-enjoyig-shopping.jpg?s=612x612&w=0&k=20&c=aC7aNJV3WBVAaPmRCg4yF6ItrBJ3CLOmq8yP3bzIKPA=",
              },
            ],
          },
        ],
      ],
      collections: [
        {
          name: "New Arrivals",
          href: "/shopping/men/collections/new_arrivals",
          imageSrc:
            "https://media.istockphoto.com/id/950927830/photo/young-man-holding-paper-bags-and-walking-in-mall.jpg?s=612x612&w=0&k=20&c=Hle9P1wiD_4_QLleea0-NbbbJHz20e7i5EKPWmTjB8k=",
          imageAlt:
            "Latest arrivals in women's fashion, from dresses to casual wear.",
        },
        {
          name: "Best Sellers",
          href: "/shopping/men/collections//best_sellers",
          imageSrc:
            "https://media.istockphoto.com/id/1199957153/photo/man-shopping-in-central-rome.jpg?s=612x612&w=0&k=20&c=xFZw5KUja2ZRfFzIE2qPw40sCJ6pqJmvlUj49OoCW2E=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/men/collections/latest_drops",
          imageSrc:
            "https://media.istockphoto.com/id/620972806/photo/man-texting-in-the-shopping-mall.jpg?s=612x612&w=0&k=20&c=c9ByRTLwKrXzlPSBag2QzjU0pDS7P_SR07AjxqMlcU8=",
          imageAlt: "Elegant accessories to complement your outfits.",
        },
        {
          name: "Sale",
          href: "/shopping/men/collections/sale",
          imageSrc:
            "https://media.istockphoto.com/id/1464367016/photo/a-happy-man-is-using-mobile-phone-for-cashless-purchase-in-boutique.jpg?s=612x612&w=0&k=20&c=ScRwM6HJsyeLcWjf8Q7oyOLEo5oNMLX-lDLB7HMPsiw=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
      ],
    },
    {
      id: "kids",
      name: "Kids",
      imageSrc:
        "https://media.istockphoto.com/id/1366475366/photo/business-woman-at-office.jpg?s=612x612&w=0&k=20&c=AeXxpYtRJPM85ZNNLrWKD_K_Y5sLfGd1xUQNQsQWwM8=",
      imageAlt: "Women's fashion collection",
      featured: [
        {
          name: "New Arrivals",
          href: "/shopping/kids/collections/new_arrivals",
          imageSrc:
            "https://media.istockphoto.com/id/1662857795/photo/happy-family-relaxing-in-the-park.jpg?s=612x612&w=0&k=20&c=MQ8HBA5tE0HmlsFuvXxf3aIohKJRgDsB_DanOPu-i6o=",
          imageAlt: "New kids's fashion trends for every occasion.",
        },
        {
          name: "Shoes",
          href: "/shopping/kids/shoes",
          imageSrc:
            "https://media.istockphoto.com/id/902867422/photo/i-have-to-get-ready-for-school.jpg?s=612x612&w=0&k=20&c=Spsuu5AiCO8l0sYblU3iV7D9iBrw1NA2SyKkTMbguGA=",
          imageAlt: "Hats, watches, and accessories to complete your look.",
        },
        {
          name: "Sale",
          href: "/shopping/kids/collections/sale",
          imageSrc:
            "https://media.istockphoto.com/id/839295596/photo/six-pre-teen-friends-piggybacking-in-a-park-close-up-portrait.jpg?s=612x612&w=0&k=20&c=MWkFYzpRSvO1dRql3trV4k6ECO-rTy4HgF8OxrtUkH8=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
      ],
      sections: [
        [
          {
            id: "clothing",
            name: "Clothing",
            href: "/shopping/kids/clothing",
            imageSrc:
              "https://media.istockphoto.com/id/1396160859/photo/baby-and-child-clothes-toys-in-box-second-hand-apparel-idea-circular-fashion-donation-charity.jpg?s=612x612&w=0&k=20&c=cjKWIeNfmEPVdQUBABIWSdGAvm5SUoEdQYB02XOI35c=",
            imageAlt: "",
            items: [
              {
                name: "Tops",
                href: "/shopping/kids/clothing/tops",
                imageSrc:
                  "https://media.istockphoto.com/id/884387672/photo/part-of-being-a-kid.jpg?s=612x612&w=0&k=20&c=Sy3KhZfFaFg_dJCrk2jXtlvTi3OWWOxx0Uepa4Dvi7o=",
              },
              {
                name: "Pants",
                href: "/shopping/kids/clothing/pants",
                imageSrc:
                  "https://media.istockphoto.com/id/173036462/photo/dirty-legs-and-feet-of-children-sitting-on-a-bench.jpg?s=612x612&w=0&k=20&c=kWuhkTixsS-2JntrEgu7jDdjluJc4tGCfGbT0buOL9E=",
              },
              {
                name: "Swimwear",
                href: "/shopping/kids/clothing/swimwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1475279034/photo/toddler-boy-enjoying-a-day-at-the-swimming-pool.jpg?s=612x612&w=0&k=20&c=bxIDN7Cxgo-DBJckIuC49hNRlMDM9De3eulC_OLODsg=",
              },
              {
                name: "Sleepwear",
                href: "/shopping/kids/clothing/sleepwear",
                imageSrc:
                  "https://media.istockphoto.com/id/656169078/photo/brothers-and-sister-on-bed.jpg?s=612x612&w=0&k=20&c=f0euDJbP7jOpFlxHe40fqDvHdxG_Z3kJPN1FvWhwNtI=",
              },
              {
                name: "Activewear",
                href: "/shopping/kids/clothing/activewear",
                imageSrc:
                  "https://media.istockphoto.com/id/1271183777/photo/kids-in-bright-sportswear-playing-basketball-and-running-after-the-ball.jpg?s=612x612&w=0&k=20&c=8KcdZaWIpwxcJ4s8INeZjaoLGk7xR6QYw_eal166m0M=",
              },
              {
                name: "Formal Wear",
                href: "/shopping/kids/clothing/formal_wear",
                imageSrc:
                  "https://media.istockphoto.com/id/530558281/photo/four-happy-little-flower-girls-laughing-together-in-formal-dresses.jpg?s=612x612&w=0&k=20&c=hzAWdLXtTp1Azu6bLe1DBuQW_1ynUw3q1jE7qRiKuFw=",
              },
              {
                name: "Underwear",
                href: "/shopping/kids/clothing/underwear",
                imageSrc:
                  "https://media.istockphoto.com/id/1222947627/photo/cute-little-girl-having-fun-time-jumping-on-bed-on-background-of-window-with-a-painted-rainbow.jpg?s=612x612&w=0&k=20&c=3VBvPHaePfG06MvcICSXAlFGtESC0nXxWBmQug4ZP50=",
              },
              {
                name: "Outerwear",
                href: "/shopping/kids/clothing/outerwear",
                imageSrc:
                  "https://media.istockphoto.com/id/459320471/photo/playing-outside.jpg?s=612x612&w=0&k=20&c=PwzwMSLXYQaKCSKeok0WMNjugg7c-OSJmhILANRn0gY=",
              },
            ],
          },
          {
            id: "shoes",
            name: "Shoes",
            href: "/shopping/kids/shoes",
            imageSrc:
              "https://media.istockphoto.com/id/1158747485/photo/mature-woman-shopping-for-shoes-for-her-son.jpg?s=612x612&w=0&k=20&c=BJ2Do8SK2c3888scyqBxVPhdBAMcxluSwrOy9vQECro=",
            imageAlt: "",
            items: [
              {
                name: "Formal Shoes",
                href: "/shopping/kids/shoes/formal",
                imageSrc:
                  "https://media.istockphoto.com/id/472224340/photo/new-pair-of-childs-blue-shoes-on-a-white-background.jpg?s=612x612&w=0&k=20&c=g-Dpkrl-azMpRLOClYkQepFpjCbdp2TIi4BZVRFTjXE=",
              },

              {
                name: "Sneakers",
                href: "/shopping/kids/shoes/sneakers",
                imageSrc:
                  "https://media.istockphoto.com/id/518868426/photo/new-sneakers-on-boys-feet.jpg?s=612x612&w=0&k=20&c=GSlpksRijdwFfVRvIL8LZkkwmlKUgLPduQ8Y8HTzQIo=",
              },

              {
                name: "Sandals",
                href: "/shopping/kids/shoes/sandals",
                imageSrc:
                  "https://media.istockphoto.com/id/1125795420/photo/close-up-image-of-new-beautiful-kids-shoes-on-childs-feet.jpg?s=612x612&w=0&k=20&c=rARbrwcp91d1t5gjGVOqNPa7diBCDjLh-IquljSpVOw=",
              },
              {
                name: "Boots",
                href: "/shopping/kids/shoes/boots",
                imageSrc:
                  "https://media.istockphoto.com/id/835991656/photo/feet-of-child-in-yellow-rubber-boots-jumping-over-puddle-in-rain.jpg?s=612x612&w=0&k=20&c=lq_QfbFoUU2f4Fb1RHsaEUMdUOLZvgBONneAzCnlJaU=",
              },
            ],
          },
        ],
        [
          {
            id: "accessories",
            name: "Accessories",
            href: "/shopping/kids/accessories",
            imageSrc:
              "https://media.istockphoto.com/id/1031376168/photo/multi-ethnic-group-of-kids-lying-on-each-other-in-a-park.jpg?s=612x612&w=0&k=20&c=xCx115gov3tjkSNBxuE__xrlBF1XpNYLi6MHxl0yZeY=",
            imageAlt: "",
            items: [
              {
                name: "Sunglasses",
                href: "/shopping/kids/accessories/sunglasses",
                imageSrc:
                  "https://media.istockphoto.com/id/1355723349/photo/funny-kid-girl-playing-outdoor-surprised-emotional-child-in-sunglasses-3-years-old-baby.jpg?s=612x612&w=0&k=20&c=DyH_Cl0wOy8Nz-XtxjXTsT0kUbgVfhcFwEX5KPgS-pM=",
              },
              {
                name: "Toys",
                href: "/shopping/kids/accessories/toys",
                imageSrc:
                  "https://media.istockphoto.com/id/589961490/photo/children-playing-with-colorful-blocks-building-a-block-tower.jpg?s=612x612&w=0&k=20&c=65mogYttliQ54CD7JElf6Y9DvfktYnE-qRGdsu65HwQ=",
              },
              {
                name: "Necklaces & Bracelets",
                href: "/shopping/kids/accessories/necklaces_and_braceslets",
                imageSrc:
                  "https://media.istockphoto.com/id/893143942/photo/look-im-all-grown-up.jpg?s=612x612&w=0&k=20&c=LiJuydvlBBGO99PRDUtWhAc6XLS3xGDfogIocG7r6CQ=",
              },
              {
                name: "Watches",
                href: "/shopping/kids/accessories/watches",
                imageSrc:
                  "https://media.istockphoto.com/id/1182506881/photo/a-cute-boy-wearing-stylish-shirt-stay-near-school-looking-at-his-smart-watch-touching-the.jpg?s=612x612&w=0&k=20&c=UPhkGjCZ-6m4yxtxGyIsNRQAJB33z1LFjajzPsJxsoM=",
              },
              {
                name: "Bags",
                href: "/shopping/kids/accessories/bags",
                imageSrc:
                  "https://media.istockphoto.com/id/1016971486/photo/cute-asian-child-girl-with-backpack-running-and-going-to-school.jpg?s=612x612&w=0&k=20&c=eQTxFjEY7ZUi1q-DzJTHVKMeqEA1vXlwZ3oSntQvMPI=",
              },
              {
                name: "Belts",
                href: "/shopping/kids/accessories/belts",
                imageSrc:
                  "https://media.istockphoto.com/id/1029383076/photo/collection-of-leather-belts-on-a-wooden-table.jpg?s=612x612&w=0&k=20&c=wmTnklWIPJyRxpiooEVlwCewGGBq9LdxYbE8ijdxCkc=",
              },
              {
                name: "Scarves",
                href: "/shopping/kids/accessories/scarves",
                imageSrc:
                  "https://media.istockphoto.com/id/497534880/photo/cozy-outdoor-portrait-of-happy-toddler-child-girl-in-winter.jpg?s=612x612&w=0&k=20&c=AvOngNYY_CKXnSGHlfRhMZbRG-qHGvcXK30G0uLK0xo=",
              },
              {
                name: "Hats",
                href: "/shopping/kids/accessories/hats",
                imageSrc:
                  "https://media.istockphoto.com/id/175622348/photo/boy-in-sunglasses-and-hat-eating-popsicle-outdoors.jpg?s=612x612&w=0&k=20&c=qV8o1QnJdsU39-VFv-vxamiCvJj1Yc0PuPx1EVKI3Cs=",
              },
            ],
          },
        ],
        [
          {
            id: "shop-collection",
            name: "Shop by Collection",
            href: "/shopping/kids/collections",
            imageSrc:
              "https://media.istockphoto.com/id/489803256/photo/below-view-of-young-cheerful-family-in-shopping.jpg?s=612x612&w=0&k=20&c=KcmaBiURs_ChPFCdvNKhmTD5AVEiUxM4MmANitqioz4=",
            imageAlt: "",
            items: [
              {
                name: "New Arrivals",
                href: "/shopping/kids/collections/new_arrivals",
                imageSrc:
                  "https://media.istockphoto.com/id/1026632588/photo/funny-child-girl-draws-laughing-shows-hands-dirty-with-paint.jpg?s=612x612&w=0&k=20&c=7JCNEfWqx9VfnkzQs-jFwbVpk_S7X5xT8mnVE8WK3R0=",
              },
              {
                name: "Latest Drops",
                href: "/shopping/kids/collections/latest_drops",
                imageSrc:
                  "https://media.istockphoto.com/id/1302266351/photo/young-boy-having-fun-in-garden-chasing-and-bursting-bubbles.jpg?s=612x612&w=0&k=20&c=iil5Zt3zBHnqyVLxuDHLxvW_YGnSkjyPNzY0DTHOMW8=",
              },
              {
                name: "Best Sellers",
                href: "/shopping/kids/collections/best_sellers",
                imageSrc:
                  "https://media.istockphoto.com/id/537424502/photo/the-best-friends-playing-together.jpg?s=612x612&w=0&k=20&c=b6kpIttyqrbnJ9T_p4QtxNoWhx8hwSscYAgoZzXgGRk=",
              },
              {
                name: "Sale",
                href: "/shopping/kids/collections/sale",
                imageSrc:
                  "https://media.istockphoto.com/id/664966806/photo/superheroes-cheerful-kids-expressing-positivity-concept.jpg?s=612x612&w=0&k=20&c=72nkiK5d_Te_v-7cnda4qy-4Vb188JjpgpwmE4s3GF8=",
              },
            ],
          },
        ],
      ],
      collections: [
        {
          name: "New Arrivals",
          href: "/shopping/kids/collections/new_arrivals",
          imageSrc:
            "https://media.istockphoto.com/id/947959208/photo/little-kids-having-fun-outdoors.jpg?s=612x612&w=0&k=20&c=rylGvuenIxeOJQA_pckTA6MCmlHY9GZj-S9DJrreC14=",
          imageAlt:
            "Latest arrivals in women's fashion, from dresses to casual wear.",
        },
        {
          name: "Best Sellers",
          href: "/shopping/kids/collections/best_sellers",
          imageSrc:
            "https://media.istockphoto.com/id/1676220225/photo/children-learning-in-a-school-classroom.jpg?s=612x612&w=0&k=20&c=rBAKsscZJRWgFQmkBKJIltnhzQXUnuICCtGUbdMCcag=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
        {
          name: "Latest Drops",
          href: "/shopping/kids/collections/latest_drops",
          imageSrc:
            "https://media.istockphoto.com/id/2096480418/photo/group-of-multi-cultural-children-friends-linking-arms-looking-down-into-camera.jpg?s=612x612&w=0&k=20&c=H0-_W5BfzoBd8VqKwsj353-25GCwsF5XRHVzitJ4ffQ=",
          imageAlt: "Elegant accessories to complement your outfits.",
        },
        {
          name: "Sale",
          href: "/shopping/kids/collections/sale",
          imageSrc:
            "https://media.istockphoto.com/id/1500076821/photo/happy-black-teenage-girl-in-high-school-hallway-looking-at-camera.jpg?s=612x612&w=0&k=20&c=Kc1x5IRZz7dqtUNt8k3zFB6ZKJz4CIiT-tbB0FFmAww=",
          imageAlt: "Stylish dresses for all occasions, from formal to casual.",
        },
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

export const navigationSections = [
  { title: "Shop", items: footerNavigation.shop },
  { title: "Company", items: footerNavigation.company },
  { title: "Account", items: footerNavigation.account },
  { title: "Connect", items: footerNavigation.connect },
];

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
