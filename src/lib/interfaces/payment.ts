// Payment validation interfaces and types

export interface PaymentValidationError {
  field: string;
  message: string;
}

export interface PaymentValidationResult {
  isValid: boolean;
  errors: PaymentValidationError[];
}

export interface ValidatedPaymentMethod {
  cardNumber: string;
  cardType: string;
  cardExpire: string;
  cardHolderName: string;
  cvv?: string;
  billingAddress?: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface CardDetectionResult {
  type: string;
  isValid: boolean;
  brand: string;
  maxLength: number;
  cvvLength: number;
}

export interface ExpiryValidationResult {
  isValid: boolean;
  isExpired: boolean;
  isTooFarFuture: boolean;
  month?: number;
  year?: number;
}

// Enhanced payment method interface for the settings page
export interface PaymentMethodWithValidation extends ValidatedPaymentMethod {
  id: string;
  isDefault: boolean;
  isFromAPI: boolean;
  lastFourDigits?: string;
  maskedNumber?: string;
}
