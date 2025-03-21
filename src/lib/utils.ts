import { useCart } from "@/app/context/cartContext";
import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
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
