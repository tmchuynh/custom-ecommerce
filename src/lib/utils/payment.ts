import {
  CARD_PATTERNS,
  CARD_TYPE_PATTERNS,
  EXPIRY_PATTERNS,
  PAYMENT_ERROR_MESSAGES,
  SECURITY_CONSTANTS,
  CardType,
} from "../constants/validate/payment";
import {
  PaymentValidationError,
  PaymentValidationResult,
  ValidatedPaymentMethod,
  CardDetectionResult,
  ExpiryValidationResult,
} from "../interfaces/payment";

/**
 * Validates a credit card number using the Luhn algorithm
 */
export function validateLuhnAlgorithm(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\s+/g, "");
  
  if (!/^\d+$/.test(cleaned)) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i));

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Detects the credit card type and validates format
 */
export function detectCardType(cardNumber: string): CardDetectionResult {
  const cleaned = cardNumber.replace(/\s+/g, "");
  
  for (const [type, pattern] of Object.entries(CARD_TYPE_PATTERNS)) {
    if (pattern.test(cleaned)) {
      const cardInfo = CARD_PATTERNS[type as CardType];
      const isValidLength = cardInfo.lengths.includes(cleaned.length);
      const isValidLuhn = validateLuhnAlgorithm(cleaned);
      
      return {
        type,
        isValid: isValidLength && isValidLuhn,
        brand: cardInfo.name,
        maxLength: Math.max(...cardInfo.lengths),
        cvvLength: cardInfo.cvvLength,
      };
    }
  }

  return {
    type: "UNKNOWN",
    isValid: false,
    brand: "Unknown",
    maxLength: 19,
    cvvLength: 3,
  };
}

/**
 * Validates card expiry date
 */
export function validateExpiryDate(expiry: string): ExpiryValidationResult {
  const trimmed = expiry.trim();
  
  // Check format
  const match = trimmed.match(EXPIRY_PATTERNS.MM_YY);
  if (!match) {
    return {
      isValid: false,
      isExpired: false,
      isTooFarFuture: false,
    };
  }

  const month = parseInt(match[1]);
  const year = parseInt(match[2]) + 2000; // Convert YY to YYYY

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  // Check if expired
  const isExpired = year < currentYear || (year === currentYear && month < currentMonth);
  
  // Check if too far in the future
  const isTooFarFuture = year > currentYear + SECURITY_CONSTANTS.MAX_EXPIRY_YEARS_FUTURE;

  return {
    isValid: !isExpired && !isTooFarFuture,
    isExpired,
    isTooFarFuture,
    month,
    year,
  };
}

/**
 * Validates CVV code
 */
export function validateCVV(cvv: string, cardType?: string): boolean {
  const trimmed = cvv.trim();
  
  if (!/^\d+$/.test(trimmed)) {
    return false;
  }

  if (cardType && CARD_PATTERNS[cardType as CardType]) {
    const expectedLength = CARD_PATTERNS[cardType as CardType].cvvLength;
    return trimmed.length === expectedLength;
  }

  // Default validation for unknown card types
  return trimmed.length >= SECURITY_CONSTANTS.CVV_MIN_LENGTH && 
         trimmed.length <= SECURITY_CONSTANTS.CVV_MAX_LENGTH;
}

/**
 * Validates cardholder name
 */
export function validateCardholderName(name: string): string | null {
  const trimmed = name.trim();
  
  if (!trimmed) {
    return PAYMENT_ERROR_MESSAGES.CARDHOLDER_NAME_REQUIRED;
  }
  
  if (trimmed.length < SECURITY_CONSTANTS.MIN_CARDHOLDER_NAME_LENGTH) {
    return PAYMENT_ERROR_MESSAGES.CARDHOLDER_NAME_TOO_SHORT;
  }
  
  if (trimmed.length > SECURITY_CONSTANTS.MAX_CARDHOLDER_NAME_LENGTH) {
    return PAYMENT_ERROR_MESSAGES.CARDHOLDER_NAME_TOO_LONG;
  }
  
  // Allow letters, spaces, hyphens, apostrophes, and periods
  if (!/^[a-zA-Z\s\-'\.]+$/.test(trimmed)) {
    return PAYMENT_ERROR_MESSAGES.CARDHOLDER_NAME_INVALID;
  }
  
  return null;
}

/**
 * Comprehensive payment method validation
 */
export function validatePaymentMethodEnhanced(
  payment: Partial<ValidatedPaymentMethod>
): PaymentValidationResult {
  const errors: PaymentValidationError[] = [];

  // Validate card number
  if (!payment.cardNumber?.trim()) {
    errors.push({
      field: "cardNumber",
      message: PAYMENT_ERROR_MESSAGES.CARD_NUMBER_REQUIRED,
    });
  } else {
    const cardDetection = detectCardType(payment.cardNumber);
    
    if (cardDetection.type === "UNKNOWN") {
      errors.push({
        field: "cardNumber",
        message: PAYMENT_ERROR_MESSAGES.CARD_TYPE_UNSUPPORTED,
      });
    } else if (!cardDetection.isValid) {
      if (!validateLuhnAlgorithm(payment.cardNumber)) {
        errors.push({
          field: "cardNumber",
          message: PAYMENT_ERROR_MESSAGES.CARD_NUMBER_LUHN_FAILED,
        });
      } else {
        errors.push({
          field: "cardNumber",
          message: PAYMENT_ERROR_MESSAGES.CARD_NUMBER_INVALID,
        });
      }
    }
  }

  // Validate cardholder name
  const nameError = validateCardholderName(payment.cardHolderName || "");
  if (nameError) {
    errors.push({
      field: "cardHolderName",
      message: nameError,
    });
  }

  // Validate expiry date
  if (!payment.cardExpire?.trim()) {
    errors.push({
      field: "cardExpire",
      message: PAYMENT_ERROR_MESSAGES.EXPIRY_DATE_REQUIRED,
    });
  } else {
    const expiryValidation = validateExpiryDate(payment.cardExpire);
    
    if (!expiryValidation.isValid) {
      if (expiryValidation.isExpired) {
        errors.push({
          field: "cardExpire",
          message: PAYMENT_ERROR_MESSAGES.EXPIRY_DATE_EXPIRED,
        });
      } else if (expiryValidation.isTooFarFuture) {
        errors.push({
          field: "cardExpire",
          message: PAYMENT_ERROR_MESSAGES.EXPIRY_DATE_TOO_FAR,
        });
      } else {
        errors.push({
          field: "cardExpire",
          message: PAYMENT_ERROR_MESSAGES.EXPIRY_DATE_INVALID_FORMAT,
        });
      }
    }
  }

  // Validate CVV if provided
  if (payment.cvv) {
    const cardDetection = detectCardType(payment.cardNumber || "");
    if (!validateCVV(payment.cvv, cardDetection.type)) {
      errors.push({
        field: "cvv",
        message: `CVV must be ${cardDetection.cvvLength} digits`,
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Real-time field validation for payment forms
 */
export function validatePaymentField(
  field: keyof ValidatedPaymentMethod,
  value: string,
  payment?: Partial<ValidatedPaymentMethod>
): string | null {
  const trimmedValue = value.trim();

  switch (field) {
    case "cardNumber":
      if (!trimmedValue) return PAYMENT_ERROR_MESSAGES.CARD_NUMBER_REQUIRED;
      
      const cardDetection = detectCardType(trimmedValue);
      if (cardDetection.type === "UNKNOWN") {
        return PAYMENT_ERROR_MESSAGES.CARD_TYPE_UNSUPPORTED;
      }
      
      if (!cardDetection.isValid) {
        if (!validateLuhnAlgorithm(trimmedValue)) {
          return PAYMENT_ERROR_MESSAGES.CARD_NUMBER_LUHN_FAILED;
        } else {
          return PAYMENT_ERROR_MESSAGES.CARD_NUMBER_INVALID;
        }
      }
      break;

    case "cardHolderName":
      return validateCardholderName(trimmedValue);

    case "cardExpire":
      if (!trimmedValue) return PAYMENT_ERROR_MESSAGES.EXPIRY_DATE_REQUIRED;
      
      const expiryValidation = validateExpiryDate(trimmedValue);
      if (!expiryValidation.isValid) {
        if (expiryValidation.isExpired) {
          return PAYMENT_ERROR_MESSAGES.EXPIRY_DATE_EXPIRED;
        } else if (expiryValidation.isTooFarFuture) {
          return PAYMENT_ERROR_MESSAGES.EXPIRY_DATE_TOO_FAR;
        } else {
          return PAYMENT_ERROR_MESSAGES.EXPIRY_DATE_INVALID_FORMAT;
        }
      }
      break;

    case "cvv":
      if (!trimmedValue) return PAYMENT_ERROR_MESSAGES.CVV_REQUIRED;
      
      const cardType = payment?.cardType || detectCardType(payment?.cardNumber || "").type;
      if (!validateCVV(trimmedValue, cardType)) {
        const expectedLength = cardType && CARD_PATTERNS[cardType as CardType] 
          ? CARD_PATTERNS[cardType as CardType].cvvLength 
          : 3;
        return `CVV must be ${expectedLength} digits`;
      }
      break;

    default:
      return null;
  }

  return null;
}

/**
 * Formats card number with appropriate spacing
 */
export function formatCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s+/g, "");
  const cardType = detectCardType(cleaned);
  
  // American Express uses different formatting
  if (cardType.type === "AMERICAN_EXPRESS") {
    return cleaned.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3");
  }
  
  // Most other cards use 4-4-4-4 format
  return cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
}

/**
 * Masks card number for display
 */
export function maskCardNumber(cardNumber: string): string {
  const cleaned = cardNumber.replace(/\s+/g, "");
  if (cleaned.length < 4) return cleaned;
  
  const lastFour = cleaned.slice(-4);
  const masked = "•".repeat(cleaned.length - 4);
  
  return formatCardNumber(masked + lastFour);
}

/**
 * Validates and normalizes a payment method
 */
export function validateAndNormalizePaymentMethod(
  payment: Partial<ValidatedPaymentMethod>
): {
  isValid: boolean;
  errors: PaymentValidationError[];
  normalizedPayment?: ValidatedPaymentMethod;
} {
  const validation = validatePaymentMethodEnhanced(payment);
  
  if (!validation.isValid) {
    return validation;
  }

  const cardDetection = detectCardType(payment.cardNumber!);
  
  // Normalize the payment method
  const normalizedPayment: ValidatedPaymentMethod = {
    cardNumber: payment.cardNumber!.replace(/\s+/g, ""),
    cardType: cardDetection.brand,
    cardExpire: payment.cardExpire!.trim(),
    cardHolderName: payment.cardHolderName!.trim().replace(/\s+/g, " "), // Normalize spaces
    cvv: payment.cvv?.trim(),
    billingAddress: payment.billingAddress,
  };

  return {
    isValid: true,
    errors: [],
    normalizedPayment,
  };
}

/**
 * Format expiry date as MM/YY
 */
export function formatExpiryDate(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  
  if (cleaned.length >= 2) {
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
  }
  
  return cleaned;
}
