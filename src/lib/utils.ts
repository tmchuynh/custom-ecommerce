import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { RandomNumberArrayOptions } from "./interfaces";

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
 * Generates a new CryptoKey for AES-GCM encryption and decryption.
 *
 * @returns A promise that resolves to the generated CryptoKey.
 * @throws Will throw an error if the key generation fails.
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
 * Encrypts a passkey using AES-GCM encryption.
 *
 * This function generates a random initialization vector (IV), creates an encryption key,
 * encrypts the passkey, and combines the IV with the encrypted data.
 *
 * @param passkey - The string to be encrypted.
 * @returns A promise that resolves to the encrypted passkey as a base64 encoded string.
 *          This string includes both the IV and the encrypted data.
 * @throws Will throw an error if encryption fails.
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

/**
 * Decrypts an encrypted passkey using the provided CryptoKey.
 *
 * @param encryptedPasskey - The encrypted passkey as a base64 encoded string.
 * @param key - The CryptoKey used for decryption.
 * @returns A promise that resolves to the decrypted passkey as a string.
 * @throws Will throw an error if decryption fails.
 */
export async function decryptKey(
  encryptedPasskey: string,
  key: CryptoKey
): Promise<string> {
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
 * Formats a number as a currency string.
 *
 * @param value - The numeric value to format.
 * @returns The formatted currency string. If the value is not a number, returns "$0.00".
 */
export const formatCurrency = (value: number) => {
  if (isNaN(value)) return "$0.00";

  return "$" + value.toLocaleString(undefined);
};

/**
 * Capitalizes the first letter of each word in a string and replaces hyphens with spaces.
 *
 * @param str - The string to be transformed.
 * @returns The transformed string with capitalized words and spaces instead of hyphens.
 */
export const capitalize = (str: string) => {
  function replaceChar(char: string): string {
    return char === "-" ? " " : char.toUpperCase();
  }
  return str.replace(/-|\b\w/g, replaceChar);
};

/**
 * Converts a given title string into a URL-friendly slug.
 *
 * This function performs the following transformations:
 * - Converts the string to lowercase.
 * - Removes special characters such as !, @, #, $, ?, %, ,, :, /, ^, &, *.
 * - Replaces spaces and hyphens with a single hyphen.
 *
 * @param title - The title string to be converted into a slug.
 * @returns The URL-friendly slug.
 */
export function setSlug(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[!@#$?%,:/^&*]/g, "")
    .replace(/[\s-]+/g, "-");
  return slug;
}

/**
 * Converts a given string to title case. It replaces underscores with spaces,
 * splits the string into words, capitalizes the first letter of each word,
 * and converts the rest of the letters to lowercase.
 *
 * @param issuer - The string to be converted to title case.
 * @returns The converted string in title case.
 */
export function toTitle(issuer: string): string {
  return issuer
    .replace("_", " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

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
 * Calculates the relative luminance of a color following WCAG 2.0 formula.
 *
 * @param hexColor - The hex color string (with or without # prefix)
 * @returns The relative luminance value between 0 and 1
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
 * @param color1 - First hex color
 * @param color2 - Second hex color
 * @returns The contrast ratio (a number between 1 and 21)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Returns a color that meets the specified WCAG contrast standard when paired with the input color.
 *
 * @param hexColor - The base hex color to contrast against
 * @param standard - The WCAG standard to meet ('AA' or 'AAA')
 * @param isLargeText - Whether the text is large (defaults to false)
 * @returns A hex color string that meets the required contrast ratio
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
