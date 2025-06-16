// Credit card validation constants and patterns

// Credit card type patterns with validation rules
export const CARD_PATTERNS = {
  VISA: {
    pattern: /^4[0-9]{12}(?:[0-9]{3})?$/,
    lengths: [13, 16, 19],
    cvvLength: 3,
    name: "Visa",
    icon: "visa",
  },
  MASTERCARD: {
    pattern: /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/,
    lengths: [16],
    cvvLength: 3,
    name: "Mastercard",
    icon: "mastercard",
  },
  AMERICAN_EXPRESS: {
    pattern: /^3[47][0-9]{13}$/,
    lengths: [15],
    cvvLength: 4,
    name: "American Express",
    icon: "amex",
  },
  DISCOVER: {
    pattern: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    lengths: [16],
    cvvLength: 3,
    name: "Discover",
    icon: "discover",
  },
  JCB: {
    pattern: /^(?:2131|1800|35\d{3})\d{11}$/,
    lengths: [16],
    cvvLength: 3,
    name: "JCB",
    icon: "jcb",
  },
  DINERS_CLUB: {
    pattern: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    lengths: [14],
    cvvLength: 3,
    name: "Diners Club",
    icon: "diners",
  },
  MAESTRO: {
    pattern: /^(?:5[0678]\d\d|6304|6390|67\d\d)\d{8,15}$/,
    lengths: [12, 13, 14, 15, 16, 17, 18, 19],
    cvvLength: 3,
    name: "Maestro",
    icon: "maestro",
  },
  UNIONPAY: {
    pattern: /^(62|88)\d{14,17}$/,
    lengths: [16, 17, 18, 19],
    cvvLength: 3,
    name: "UnionPay",
    icon: "unionpay",
  },
};

// Card type detection patterns (simpler patterns for initial detection)
export const CARD_TYPE_PATTERNS = {
  VISA: /^4/,
  MASTERCARD: /^5[1-5]|^2[2-7]/,
  AMERICAN_EXPRESS: /^3[47]/,
  DISCOVER: /^6011|^644|^645|^646|^647|^648|^649|^65/,
  JCB: /^35/,
  DINERS_CLUB: /^30[0-5]|^36|^38/,
  MAESTRO: /^5018|^5020|^5038|^5893|^6304|^6759|^6761|^6762|^6763/,
  UNIONPAY: /^62|^88/,
};

// Expiry date validation constants
export const EXPIRY_PATTERNS = {
  MM_YY: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
  MM_YYYY: /^(0[1-9]|1[0-2])\/([0-9]{4})$/,
  MMYY: /^(0[1-9]|1[0-2])([0-9]{2})$/,
  MMYYYY: /^(0[1-9]|1[0-2])([0-9]{4})$/,
};

// Valid card types for different use cases
export const ACCEPTED_CARD_TYPES = [
  "VISA",
  "MASTERCARD", 
  "AMERICAN_EXPRESS",
  "DISCOVER",
  "JCB",
  "DINERS_CLUB",
  "MAESTRO",
  "UNIONPAY",
] as const;

export type CardType = keyof typeof CARD_PATTERNS;
export type AcceptedCardType = (typeof ACCEPTED_CARD_TYPES)[number];

// Common validation error messages
export const PAYMENT_ERROR_MESSAGES = {
  CARD_NUMBER_REQUIRED: "Card number is required",
  CARD_NUMBER_INVALID: "Invalid card number",
  CARD_NUMBER_LUHN_FAILED: "Card number failed security check",
  CARD_TYPE_UNSUPPORTED: "Card type is not supported",
  CARDHOLDER_NAME_REQUIRED: "Cardholder name is required",
  CARDHOLDER_NAME_TOO_SHORT: "Cardholder name must be at least 2 characters",
  CARDHOLDER_NAME_TOO_LONG: "Cardholder name must not exceed 50 characters",
  CARDHOLDER_NAME_INVALID: "Cardholder name contains invalid characters",
  EXPIRY_DATE_REQUIRED: "Expiry date is required",
  EXPIRY_DATE_INVALID_FORMAT: "Expiry date must be in MM/YY format",
  EXPIRY_DATE_EXPIRED: "Card has expired",
  EXPIRY_DATE_TOO_FAR: "Expiry date cannot be more than 20 years in the future",
  CVV_REQUIRED: "CVV is required",
  CVV_INVALID_LENGTH: "CVV must be 3-4 digits",
  CVV_INVALID_FORMAT: "CVV must contain only numbers",
  BILLING_ADDRESS_REQUIRED: "Billing address is required for this card type",
} as const;

// Security constants
export const SECURITY_CONSTANTS = {
  MAX_EXPIRY_YEARS_FUTURE: 20,
  MIN_CARDHOLDER_NAME_LENGTH: 2,
  MAX_CARDHOLDER_NAME_LENGTH: 50,
  CVV_MIN_LENGTH: 3,
  CVV_MAX_LENGTH: 4,
} as const;
