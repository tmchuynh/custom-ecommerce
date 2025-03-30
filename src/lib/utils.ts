import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RandomNumberArrayOptions } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IV_LENGTH = 16;

/**
 * Generates a random initialization vector (IV) for encryption.
 *
 * @returns A Uint8Array containing the random IV.
 */
function generateIV() {
  return window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
}

/**
 * Generates a new encryption key using the AES-GCM algorithm.
 *
 * The generated key is 256 bits in length and can be used for both encryption
 * and decryption operations. The key is marked as extractable, allowing it to
 * be exported if needed.
 *
 * @returns {Promise<CryptoKey>} A promise that resolves to the generated CryptoKey.
 */
async function generateEncryptionKey(): Promise<CryptoKey> {
  return window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypts a given passkey using the AES-GCM encryption algorithm and returns the result as a Base64-encoded string.
 *
 * The function generates a random initialization vector (IV) and a cryptographic key for encryption.
 * The IV and the encrypted data are combined into a single buffer, which is then Base64-encoded for storage or transmission.
 *
 * @param {string} passkey - The plaintext passkey to be encrypted.
 * @returns {Promise<string>} A promise that resolves to the Base64-encoded encrypted passkey.
 *
 * @throws {Error} Throws an error if encryption fails.
 */
export async function encryptKey(passkey: string): Promise<string> {
  const iv = generateIV();
  const encoder = new TextEncoder();
  const data = encoder.encode(passkey);
  const key = await generateEncryptionKey();

  /**
   * Encrypts the provided data using the AES-GCM algorithm.
   *
   * @param {AesGcmParams} { name: "AES-GCM", iv } - The encryption algorithm and initialization vector.
   * @param {CryptoKey} key - The cryptographic key used for encryption.
   * @param {BufferSource} data - The data to be encrypted.
   * @returns {Promise<ArrayBuffer>} A promise that resolves to the encrypted data as an ArrayBuffer.
   */
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  const encryptedBuffer = new Uint8Array(encryptedData);
  const ivBuffer = new Uint8Array(iv.buffer);

  const combined = new Uint8Array(ivBuffer.length + encryptedBuffer.length);
  combined.set(ivBuffer);
  combined.set(encryptedBuffer, ivBuffer.length);

  return btoa(String.fromCharCode(...combined));
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

/**
 * Decrypts an encrypted passkey using the AES-GCM algorithm.
 *
 * This function takes an encrypted passkey (as a base64-encoded string) and a cryptographic key,
 * then decrypts the passkey and returns the original string.
 *
 * @param {string} encryptedPasskey - The base64-encoded encrypted passkey.
 * @param {CryptoKey} key - The cryptographic key used for decryption.
 * @returns {Promise<string>} A promise that resolves to the decrypted passkey as a string.
 * @throws {Error} Throws an error if decryption fails.
 */
export async function decryptKey(
  encryptedPasskey: string,
  secretKey: string
): Promise<string> {
  const key = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secretKey),
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  const data = new Uint8Array(
    atob(encryptedPasskey)
      .split("")
      .map((char) => char.charCodeAt(0))
  );
  const iv = data.slice(0, IV_LENGTH);
  const encryptedData = data.slice(IV_LENGTH);

  const decoder = new TextDecoder();

  try {
    /**
     * Decrypts the provided encrypted data using the AES-GCM algorithm.
     *
     * @param {CryptoKey} key - The cryptographic key used for decryption.
     * @param {Uint8Array} iv - The initialization vector used for decryption.
     * @param {ArrayBuffer} encryptedData - The data to be decrypted.
     * @returns {Promise<ArrayBuffer>} A promise that resolves to the decrypted data.
     */
    const decryptedData = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encryptedData
    );

    return decoder.decode(decryptedData);
  } catch (error) {
    throw new Error("Decryption failed");
  }
}

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

/**
 * Determines the type of a credit card based on its number.
 *
 * @param cardNumber - The credit card number as a string, stripped of any non-numeric characters.
 * @returns The card type as a string ("Visa", "MasterCard", "American Express", "Discover"), or `null` if the type cannot be determined.
 *
 * @example
 * ```typescript
 * const cardType = getCardType("4111111111111111");
 * console.log(cardType); // "Visa"
 * ```
 */

export function getCardType(cardNumber: string): string | null {
  // Remove spaces and dashes
  const sanitizedNumber = cardNumber.replace(/[\s-]/g, "");

  // Visa
  if (/^4/.test(sanitizedNumber)) return "Visa";

  // Mastercard
  if (/^(5[1-5]|2[2-7])/.test(sanitizedNumber)) return "MasterCard";

  // American Express
  if (/^3[47]/.test(sanitizedNumber)) return "American Express";

  // Discover
  if (
    /^(6011|65|64[4-9]|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]))/.test(
      sanitizedNumber
    )
  )
    return "Discover";

  // Diners Club
  if (/^3(0[0-5]|[68])/.test(sanitizedNumber)) return "Diners Club";

  // JCB
  if (/^35/.test(sanitizedNumber)) return "JCB";

  // UnionPay
  if (/^62/.test(sanitizedNumber)) return "UnionPay";

  return null;
}

/**
 * Validates whether a given string is a properly formatted email address.
 *
 * @param email - The email address to validate.
 * @returns `true` if the input is a valid email address, otherwise `false`.
 */
export function validateEmail(email: string): boolean {
  if (typeof email !== "string") {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
 * Formats a given phone number string into a standardized format.
 *
 * The function removes all non-numeric characters from the input string
 * and formats it based on the number of digits:
 * - If the input contains fewer than 10 digits, the original input is returned.
 * - If the input contains 0 digits, an empty string is returned.
 * - If the input contains 1-3 digits, it is formatted as "(XXX".
 * - If the input contains 4-6 digits, it is formatted as "(XXX) XXX".
 * - If the input contains 7 or more digits, it is formatted as "(XXX) XXX-XXXX".
 *
 * @param value - The phone number string to format.
 * @returns The formatted phone number string.
 */
export const formatPhoneNumber = (value: string): string => {
  // Strip all non-numeric characters
  const numbers = value.replace(/\D/g, "");

  // Return the input as-is if it contains fewer than 10 digits
  if (numbers.length < 10) {
    return value;
  }

  // Format based on the length of the input
  if (numbers.length === 0) {
    return "";
  } else if (numbers.length <= 3) {
    return `(${numbers}`;
  } else if (numbers.length <= 6) {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
  } else {
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(
      6,
      10
    )}`;
  }
};

/**
 * Formats a credit card number by removing all non-numeric characters
 * and adding a space after every 4 digits.
 *
 * @param value - The input string representing the credit card number.
 * @returns A formatted credit card number with spaces after every 4 digits,
 *          or an empty string if the input is invalid or empty.
 */
export const formatCreditCardNumber = (value: string): string => {
  // Validate input and strip all non-numeric characters
  if (typeof value !== "string" || value.trim() === "") {
    return "";
  }
  const numbers = value.replace(/\D/g, "");

  // Add a space after every 4 digits
  return numbers.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
};

/**
 * Capitalizes the first letter of each word in a string and replaces hyphens with spaces.
 * Also replaces underscores with spaces and trims the result.
 *
 * @param {string} str - The string to capitalize
 * @returns {string} The formatted string with capitalized words
 *
 * @example
 * capitalize("hello-world") // returns "Hello World"
 * capitalize("hello_world") // returns "Hello World"
 * capitalize("hello world") // returns "Hello World"
 */
export const capitalize = (str: string): string => {
  function replaceChar(char: string): string {
    return char === "-" ? " " : char.toUpperCase();
  }
  return str
    .replace(/-|\b\w/g, replaceChar)
    .replaceAll("_", " ")
    .trim();
};

/**
 * Formats an item name by converting underscore-separated words into a properly capitalized string.
 * Follows title case rules where certain common words (articles, conjunctions, prepositions) remain lowercase
 * unless they appear at the start of the string.
 *
 * @param itemName - The string to format, with words separated by underscores
 * @returns A formatted string with proper title case capitalization and spaces between words
 *
 * @example
 * formatItemName("the_quick_brown_fox") // Returns "The Quick Brown Fox"
 * formatItemName("a_tale_of_two_cities") // Returns "A Tale of Two Cities"
 */
export const formatItemName = (itemName: string) => {
  // List of words to not capitalize
  const exceptions = [
    "and",
    "or",
    "a",
    "an",
    "as",
    "at",
    "but",
    "by",
    "for",
    "in",
    "nor",
    "of",
    "on",
    "the",
    "up",
  ];

  return itemName
    .split("_") // Split the item name by underscores
    .map((word, index) => {
      // Capitalize the first word, or any word that's not an exception
      if (index === 0 || !exceptions.includes(word.toLowerCase())) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
      // Keep the word in lowercase if it's in the exceptions list
      return word.toLowerCase();
    })
    .join(" "); // Join the words back into a string
};

export const formatURL = (url: string): string => {
  return url.toLowerCase().replaceAll(" ", "-").replaceAll("'s", "");
};

/**
 * Generates an array of random numbers within a specified range.
 *
 * @param length - The number of random numbers to generate.
 * @param min - The minimum value (inclusive) for the random numbers.
 * @param max - The maximum value (inclusive) for the random numbers.
 * @returns An array of random numbers of the specified length, each within the given range.
 *
 * @example
 * ```typescript
 * const randomNumbers = generateRandomNumberArray(5, 1, 10);
 * console.log(randomNumbers); // Example output: [3, 7, 1, 9, 5]
 * ```
 */
export function generateRandomNumberArray(
  length: RandomNumberArrayOptions["length"],
  min: RandomNumberArrayOptions["min"],
  max: RandomNumberArrayOptions["max"]
): number[] {
  const randomArray: number[] = [];
  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomArray.push(randomNumber);
  }
  return randomArray;
}

/**
 * Calculates the relative luminance of a given hexadecimal color string.
 * The calculation follows the WCAG (Web Content Accessibility Guidelines) formula.
 *
 * @param hexColor - The hexadecimal color string (e.g., "#RRGGBB" or "RRGGBB").
 * @returns The relative luminance as a number between 0 (darkest) and 1 (lightest).
 *
 * @example
 * ```typescript
 * const luminance = getLuminance("#FFFFFF"); // 1 (white)
 * const luminance = getLuminance("#000000"); // 0 (black)
 * const luminance = getLuminance("#FF5733"); // 0.3202 (example value)
 * ```
 */
export function getLuminance(hexColor: string): number {
  // Remove # if present
  const hex = hexColor.startsWith("#") ? hexColor.slice(1) : hexColor;

  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16) / 255;
  const g = parseInt(hex.substr(2, 2), 16) / 255;
  const b = parseInt(hex.substr(4, 2), 16) / 255;

  // Calculate luminance following WCAG formula
  const R = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const G = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const B = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * The contrast ratio is determined using the relative luminance of the two colors.
 * It is calculated as `(brightest + 0.05) / (darkest + 0.05)`, where `brightest` and `darkest`
 * are the higher and lower luminance values of the two colors, respectively.
 *
 * @param color1 - The first color in a valid CSS color format (e.g., hex, rgb, etc.).
 * @param color2 - The second color in a valid CSS color format (e.g., hex, rgb, etc.).
 * @returns The contrast ratio as a number. A higher value indicates greater contrast.
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Determines an accessible color (either black or white) or a calculated shade
 * that meets the required contrast ratio against the given hex color, based on
 * the Web Content Accessibility Guidelines (WCAG) standards.
 *
 * @param hexColor - The input color in hexadecimal format (e.g., `#RRGGBB`).
 * @param standard - The WCAG standard to use for contrast ratio requirements.
 *                   Accepts `"AA"` (default) or `"AAA"`.
 * @param isLargeText - Whether the text is considered large (font size ≥ 18pt
 *                      or bold ≥ 14pt). Defaults to `false`.
 * @returns A hexadecimal color string (`#RRGGBB`) that meets the required
 *          contrast ratio against the input color.
 *
 * @remarks
 * - WCAG contrast ratio requirements:
 *   - AA: Normal text ≥ 4.5, Large text ≥ 3.0
 *   - AAA: Normal text ≥ 7.0, Large text ≥ 4.5
 * - The function uses luminance to determine whether to start with black or
 *   white as the base color and adjusts it using a binary search to find a
 *   shade that meets the contrast requirements.
 *
 * @example
 * ```typescript
 * const accessibleColor = getAccessibleColor("#ff5733", "AA", true);
 * console.log(accessibleColor); // Outputs a color like "#000000" or "#FFFFFF"
 * ```
 */
export function getAccessibleColor(
  hexColor: string,
  standard: "AA" | "AAA" = "AA",
  isLargeText: boolean = false
): string {
  // Required contrast ratios per WCAG standards
  const contrastRequirements = {
    AA: { normal: 4.5, large: 3 },
    AAA: { normal: 7, large: 4.5 },
  };

  const requiredContrast =
    contrastRequirements[standard][isLargeText ? "large" : "normal"];

  // Start with black or white based on luminance
  const luminance = getLuminance(hexColor);
  let contrastColor = luminance > 0.5 ? "#000000" : "#FFFFFF";

  // Check if we already meet the required contrast
  if (getContrastRatio(hexColor, contrastColor) >= requiredContrast) {
    return contrastColor;
  }

  // If not, we need to find a color that does
  // For dark input colors, start from white and darken
  // For light input colors, start from black and lighten
  if (luminance > 0.5) {
    // Darken from white
    let r = 0,
      g = 0,
      b = 0;

    // Binary search to find the right color
    let min = 0;
    let max = 255;

    while (max >= min) {
      const mid = Math.floor((min + max) / 2);
      const testColor = `#${mid.toString(16).padStart(2, "0")}${mid
        .toString(16)
        .padStart(2, "0")}${mid.toString(16).padStart(2, "0")}`;

      if (getContrastRatio(hexColor, testColor) >= requiredContrast) {
        r = g = b = mid;
        min = mid + 1; // Try to find a lighter shade that still meets contrast
      } else {
        max = mid - 1; // Too light, need darker
      }
    }

    contrastColor = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  } else {
    // Lighten from black
    let r = 255,
      g = 255,
      b = 255;

    // Binary search to find the right color
    let min = 0;
    let max = 255;

    while (max >= min) {
      const mid = Math.floor((min + max) / 2);
      const val = 255 - mid;
      const testColor = `#${val.toString(16).padStart(2, "0")}${val
        .toString(16)
        .padStart(2, "0")}${val.toString(16).padStart(2, "0")}`;

      if (getContrastRatio(hexColor, testColor) >= requiredContrast) {
        r = g = b = val;
        max = mid - 1; // Try to find a darker shade that still meets contrast
      } else {
        min = mid + 1; // Too dark, need lighter
      }
    }

    contrastColor = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  }

  return contrastColor;
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
 * Formats a string into a credit card expiry date format (MM/YY)
 * @param value - The input string to format
 * @returns The formatted expiry date string in MM/YY format
 * @example
 * formatExpiryDate("1223") // returns "12/23"
 * formatExpiryDate("12") // returns "12"
 * formatExpiryDate("1") // returns "1"
 */
export function formatExpiryDate(value: string): string {
  const cleaned = value.replace(/\D/g, "");
  if (cleaned.length >= 2) {
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  }
  return cleaned;
}

/**
 * Smoothly scrolls to a specified section of the page and optionally updates the active section state.
 *
 * @param sectionId - The ID of the section to scroll to
 * @param sectionRefs - A React mutable ref object containing references to section elements
 * @param setActiveSection - Optional callback function to update the active section state
 *
 * @example
 * ```typescript
 * scrollToSection('about', sectionRefs, setActiveSection);
 * ```
 */
export const scrollToSection = (
  sectionId: string,
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>,
  setActiveSection?: (sectionId: string) => void
) => {
  if (setActiveSection) {
    setActiveSection(sectionId);
  }
  sectionRefs.current[sectionId]?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

/**
 * Generates an array of month objects for use in form selections.
 * Each object contains a two-digit month number (01-12) as both value and label.
 *
 * @returns {Array<{value: string, label: string}>} An array of 12 month objects
 * @example
 * // Returns [{value: "01", label: "01"}, {value: "02", label: "02"}, ...]
 * generateMonths()
 */
export const generateMonths = (): Array<{ value: string; label: string }> => {
  return Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0");
    return { value: month, label: month };
  });
};

/**
 * Generates an array of year options for the next 10 years starting from the current year
 *
 * @returns An array of objects containing year values and labels
 * @example
 * // Returns array like:
 * // [
 * //   { value: "2024", label: "2024" },
 * //   { value: "2025", label: "2025" },
 * //   ...and so on for 10 years
 * // ]
 * generateYears();
 */
export const generateYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => {
    const year = (currentYear + i).toString();
    return { value: year, label: year };
  });
};

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
 * Toggles an accordion section and scrolls to it if newly opened
 *
 * @param sectionId - The ID of the section to toggle
 * @param activeSection - The currently active section ID
 * @param setActiveSection - Function to update the active section state
 * @param sectionRef - Reference to the section element to scroll to
 */
export const toggleAccordionSection = (
  sectionId: string,
  activeSection: string | null,
  setActiveSection: (sectionId: string | null) => void,
  sectionRef: HTMLElement | null
) => {
  setActiveSection(activeSection === sectionId ? null : sectionId);
  if (activeSection !== sectionId && sectionRef) {
    sectionRef.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

/**
 * Handles the blur event for form fields and marks the field as touched.
 *
 * @param e - The blur event from the input field
 * @param setTouched - The state setter function for the touched fields
 */
export const handleBlur = (
  e: React.FocusEvent<HTMLInputElement>,
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const { name } = e.target;
  setTouched((prev) => ({ ...prev, [name]: true }));
};

/**
 * Validates and applies a discount code.
 *
 * @param discountCode - The discount code to validate and apply.
 * @param applyDiscount - A callback function to apply the discount.
 * @returns An object containing the discount application status and error state.
 *
 * @example
 * ```typescript
 * const { discountApplied, discountError } = handleApplyDiscount("CODE123", applyDiscount);
 * ```
 */
export function handleApplyDiscountUtil(
  discountCode: string,
  applyDiscount: (code: string) => boolean
): { discountApplied: boolean; discountError: boolean } {
  if (!discountCode.trim()) {
    return { discountApplied: false, discountError: true };
  }

  const isValidDiscount = applyDiscount(discountCode);

  return {
    discountApplied: isValidDiscount,
    discountError: !isValidDiscount,
  };
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

/**
 * Handles form input changes and updates the form state accordingly.
 * Also performs validation for non-checkbox fields.
 *
 * @param e - The React change event from the input element.
 * @param setFormData - The state setter function for the form data.
 * @param setErrors - The state setter function for validation errors.
 * @param setCardType - Optional state setter for card type detection (used for payment forms).
 * @param additionalData - Optional additional data for validation (e.g., expiryMonth, expiryYear).
 */
export function handleInputChange<T extends Record<string, any>>(
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setCardType?: React.Dispatch<React.SetStateAction<string>>,
  additionalData?: { [key: string]: any }
): void {
  const { name, value, type, checked } = e.target;

  if (name === "cardNumber" && setCardType) {
    const formattedValue = formatCreditCardNumber(value);
    const detectedType = getCardType(formattedValue);
    setCardType(detectedType || "");

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    const error = validateField(name, formattedValue, {
      cardType: detectedType,
    });
    setErrors((prev) => ({ ...prev, [name]: error }));
  } else {
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (type !== "checkbox") {
      const error = validateField(name, value, additionalData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }
}

/**
 * Handles changes in select input fields by updating form data, validating the field, and marking it as touched.
 *
 * @param name - The name of the select field being changed
 * @param value - The new value selected in the field
 * @param setFormData - The state setter function for the form data
 * @param setErrors - The state setter function for validation errors
 * @param setTouched - The state setter function for touched fields
 */
export function handleSelectChange<T extends Record<string, any>>(
  name: string,
  value: string,
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
): void {
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  const error = validateField(name, value);
  setErrors((prev) => ({ ...prev, [name]: error }));
  setTouched((prev) => ({ ...prev, [name]: true }));
}

/**
 * Handles the submission of forms with validation and optional callbacks.
 *
 * @param formData - The form data object containing field values.
 * @param requiredFields - An array of required field names to validate.
 * @param validateField - A function to validate individual fields.
 * @param setErrors - A state setter function to update the error state.
 * @param setTouched - A state setter function to mark fields as touched.
 * @param onSubmit - A callback function to execute when the form is valid.
 * @param additionalData - Optional additional data for validation or submission.
 * @returns A boolean indicating whether the form submission was successful.
 */
export function handleFormSubmit<T>(
  formData: T,
  requiredFields: Array<keyof T>,
  validateField: (name: string, value: string, additionalData?: any) => string,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  onSubmit: (data: T) => void,
  additionalData?: any
): boolean {
  const formErrors: Record<string, string> = {};
  let isValid = true;

  // Validate required fields
  requiredFields.forEach((field) => {
    const error = validateField(
      field as string,
      formData[field] as string,
      additionalData
    );
    if (error) {
      formErrors[field as string] = error;
      isValid = false;
    }
  });

  setErrors(formErrors);

  // Mark all required fields as touched
  const touchedFields: Record<string, boolean> = {};
  requiredFields.forEach((field) => {
    touchedFields[field as string] = true;
  });
  setTouched(touchedFields);

  if (isValid) {
    onSubmit(formData);
  }

  return isValid;
}
