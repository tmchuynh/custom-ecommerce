// Payment Validation Test Examples
// ================================

import {
  detectCardType,
  formatCardNumber,
  formatExpiryDate,
  maskCardNumber,
  validateLuhnAlgorithm,
  validatePaymentField,
  validatePaymentMethodEnhanced,
} from "../utils/payment";

// Test cases for different credit card types
const testCards = {
  visa: "4532015112830366", // Valid Visa
  mastercard: "5555555555554444", // Valid Mastercard
  amex: "378282246310005", // Valid American Express
  discover: "6011111111111117", // Valid Discover
  invalid: "1234567890123456", // Invalid (fails Luhn)
};

// Test expiry dates
const testExpiries = {
  valid: "12/25",
  expired: "01/20",
  invalidFormat: "13/25",
  tooFar: "12/50",
};

// Test cardholder names
const testNames = {
  valid: "John Doe",
  tooShort: "J",
  tooLong: "A".repeat(60),
  invalidChars: "John123Doe",
};

console.log("=== PAYMENT VALIDATION TEST RESULTS ===");

// Test card type detection
console.log("\n1. CARD TYPE DETECTION:");
Object.entries(testCards).forEach(([type, number]) => {
  const detection = detectCardType(number);
  console.log(
    `${type}: ${detection.brand} (${detection.type}) - Valid: ${detection.isValid}`
  );
});

// Test card number formatting
console.log("\n2. CARD NUMBER FORMATTING:");
Object.entries(testCards).forEach(([type, number]) => {
  const formatted = formatCardNumber(number);
  const masked = maskCardNumber(number);
  console.log(`${type}: ${formatted} → ${masked}`);
});

// Test expiry formatting
console.log("\n3. EXPIRY DATE FORMATTING:");
const expiryInputs = ["1225", "01/25", "0125", "1/25"];
expiryInputs.forEach((input) => {
  const formatted = formatExpiryDate(input);
  console.log(`${input} → ${formatted}`);
});

// Test Luhn algorithm
console.log("\n4. LUHN ALGORITHM VALIDATION:");
Object.entries(testCards).forEach(([type, number]) => {
  const isValid = validateLuhnAlgorithm(number);
  console.log(`${type}: ${number} - Luhn Valid: ${isValid}`);
});

// Test comprehensive validation
console.log("\n5. COMPREHENSIVE PAYMENT VALIDATION:");
const testPayment = {
  cardNumber: testCards.visa,
  cardHolderName: testNames.valid,
  cardExpire: testExpiries.valid,
  cardType: "Visa",
};

const validation = validatePaymentMethodEnhanced(testPayment);
console.log("Test Payment:", testPayment);
console.log("Validation Result:", validation);

// Test field-specific validation
console.log("\n6. FIELD-SPECIFIC VALIDATION:");
const fields = ["cardNumber", "cardHolderName", "cardExpire"];
fields.forEach((field) => {
  const error = validatePaymentField(
    field as keyof typeof testPayment,
    testPayment[field as keyof typeof testPayment],
    testPayment
  );
  console.log(`${field}: ${error || "Valid"}`);
});

export {}; // Make this a module
