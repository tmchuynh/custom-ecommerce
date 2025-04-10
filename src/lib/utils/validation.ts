import { getCardType } from "../utils";

/**
 * Validates a credit card number using the Luhn algorithm.
 *
 * This function checks if the provided card number is a valid credit card number
 * by performing the following steps:
 * - Ensures the input is a non-empty string.
 * - Removes spaces and non-digit characters from the input.
 * - Verifies the length of the sanitized number is between 13 and 19 digits.
 * - Determines the card type using a helper function.
 * - Applies the Luhn algorithm to validate the card number.
 *
 * @param cardNumber - The credit card number as a string.
 * @returns `true` if the card number is valid, otherwise `false`.
 */
export function validateCreditCard(cardNumber: string): boolean {
  if (typeof cardNumber !== "string" || cardNumber.trim() === "") {
    return false;
  }
  // Remove spaces and non-digit characters
  const sanitizedNumber = cardNumber.replace(/\D/g, "");

  // Check if the number is of valid length (13-19 digits)
  if (sanitizedNumber.length < 13 || sanitizedNumber.length > 19) {
    return false;
  }

  const cardType = getCardType(sanitizedNumber);
  if (!cardType) {
    return false;
  }

  // Luhn algorithm implementation
  let sum = 0;
  let doubleUp = false;

  // Process digits from right to left
  for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitizedNumber.charAt(i));

    // Double every second digit
    if (doubleUp) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    doubleUp = !doubleUp;
  }

  // Valid card numbers sum to a multiple of 10
  return sum % 10 === 0;
}

export function validateEmail(email: string): boolean {
  if (typeof email !== "string") {
    return false;
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  // Extract domain part and check against common TLDs
  const domain = email.split("@")[1];
  const validTLDs =
    /\.(com|net|org|edu|gov|mil|info|biz|co|io|ai|dev|me|app|cloud|tech|design)$/i;

  return validTLDs.test(domain);
}

/**
 * Validates a phone number to ensure it matches the expected format.
 *
 * The phone number can optionally include a country code (starting with `+`)
 * and must contain between 10 to 15 digits. Non-digit characters are ignored
 * during validation.
 *
 * @param phone - The phone number to validate as a string.
 * @returns `true` if the phone number is valid, otherwise `false`.
 */
export function validatePhone(phone: string): boolean {
  // Validate phone numbers with an optional country code and 10-15 digits
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const sanitizedPhone = phone.replace(/\D/g, "");
  return phoneRegex.test(sanitizedPhone);
}

/**
 * Validates if a credit card expiry date is valid and not expired
 * @param expiry - The expiry date in MM/YY format (e.g. "12/25")
 * @returns boolean - True if the expiry date is valid and not expired, false otherwise
 * @example
 * ```typescript
 * validateExpiryDate("12/25") // true
 * validateExpiryDate("13/25") // false (invalid month)
 * validateExpiryDate("12/20") // false (expired)
 * ```
 */
export function validateExpiryDate(expiry: string): boolean {
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  if (!regex.test(expiry)) return false;

  const [month, year] = expiry.split("/").map((num) => parseInt(num));
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  // Check if card is expired
  return year > currentYear || (year === currentYear && month >= currentMonth);
}

/**
 * Validates a CVV (Card Verification Value) string.
 *
 * @param cvv - The CVV string to validate
 * @returns True if the CVV is valid (contains 3-4 digits only), false otherwise
 *
 * @example
 * ```typescript
 * validateCVV("123")  // returns true
 * validateCVV("1234") // returns true
 * validateCVV("12")   // returns false
 * validateCVV("12a")  // returns false
 * ```
 */
export function validateCVV(cvv: string): boolean {
  // CVV should be 3-4 digits
  const regex = /^[0-9]{3,4}$/;
  return regex.test(cvv);
}

/**
 * Validates a payment amount
 */
export function validatePaymentAmount(amount: number): boolean {
  return amount > 0 && Number.isFinite(amount);
}

/**
 * Validates a postal code according to the specified country format.
 * @param postalCode - The postal code string to validate
 * @param countryCode - The two-letter ISO country code (defaults to "US")
 * @returns boolean indicating whether the postal code is valid for the given country
 *
 * @example
 * ```ts
 * validatePostalCode('12345') // returns true
 * validatePostalCode('12345-6789') // returns true
 * validatePostalCode('1234') // returns false
 * validatePostalCode('ABC 123', 'CA') // returns true
 * ```
 */
export function validatePostalCode(
  postalCode: string,
  countryCode: string = "US"
): boolean {
  // US ZIP code pattern
  if (countryCode === "US") {
    return /^\d{5}(-\d{4})?$/.test(postalCode);
  }
  // Default to basic validation for other countries
  return /^[A-Z0-9]{3,10}$/i.test(postalCode.replace(/\s/g, ""));
}

/**
 * Validates form fields based on their name and value.
 *
 * @param name - The name of the field to validate.
 * @param value - The value of the field to validate.
 * @param additionalData - Optional additional data for validation (e.g., card type, expiry date).
 * @returns An error message string if validation fails, or an empty string if validation passes.
 *
 * @example
 * ```typescript
 * validateField("email", "invalid-email"); // returns "Please enter a valid email address"
 * validateField("postalCode", "1234"); // returns "Please enter a valid postal code"
 * validateField("cardNumber", "4111111111111111", { cardType: "visa" }); // returns ""
 * ```
 */
export function validateField(
  name: string,
  value: string,
  additionalData?: { [key: string]: any }
): string {
  switch (name) {
    // Customer Info Validation
    case "firstName":
    case "lastName":
      if (value.trim() === "") {
        return `${name === "firstName" ? "First" : "Last"} name is required`;
      }
      return /^[a-zA-Z\s'-]+$/.test(value)
        ? ""
        : "Please enter a valid name (letters, spaces, hyphens, and apostrophes only)";

    case "email":
      if (value.trim() === "") return "Email is required";
      return validateEmail(value) ? "" : "Please enter a valid email address";

    case "phone":
      if (value.trim() === "") return "Phone number is required";
      return validatePhone(value.replace(/\D/g, ""))
        ? ""
        : "Please enter a valid 10-digit phone number";

    // Shipping Address Validation
    case "addressLine1":
      return value.trim() === "" ? "Address is required" : "";

    case "city":
      return value.trim() === "" ? "City is required" : "";

    case "state":
      return value.trim() === "" ? "State is required" : "";

    case "postalCode":
      if (value.trim() === "") return "Postal code is required";
      return validatePostalCode(value)
        ? ""
        : "Please enter a valid postal code (e.g., 12345 or 12345-6789)";

    // Payment Info Validation
    case "cardNumber":
      if (value.trim() === "") return "Card number is required";
      const cardType = additionalData?.cardType || getCardType(value);
      return validateCreditCard(value)
        ? ""
        : `Invalid card number for ${cardType || "unknown"} card`;

    case "nameOnCard":
      return value.trim() === "" ? "Name on card is required" : "";

    case "expiryMonth":
    case "expiryYear":
      if (value === "")
        return `Expiry ${
          name === "expiryMonth" ? "month" : "year"
        } is required`;

      if (additionalData?.expiryMonth && additionalData?.expiryYear) {
        const expiryDate = new Date();
        expiryDate.setFullYear(
          parseInt(additionalData.expiryYear),
          parseInt(additionalData.expiryMonth) - 1,
          1
        );
        return expiryDate >= new Date()
          ? ""
          : "Card expiration date has passed";
      }
      return "";

    case "cvc":
      if (value.trim() === "") return "CVC is required";
      if (!/^\d+$/.test(value)) return "CVC must contain only digits";
      const isAmex = additionalData?.cardType === "amex";
      return isAmex && value.length === 4
        ? ""
        : !isAmex && value.length === 3
        ? ""
        : `CVC must be ${isAmex ? "4" : "3"} digits`;

    default:
      return "";
  }
}
