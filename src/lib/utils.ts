import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const IV_LENGTH = 16; // AES requires a 128-bit initialization vector

// Utility function to generate a random initialization vector (IV)
function generateIV() {
  return window.crypto.getRandomValues(new Uint8Array(IV_LENGTH));
}

// Utility function to generate a secure encryption key
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

// Encrypt the key (passkey) using AES-GCM algorithm
export async function encryptKey(passkey: string): Promise<string> {
  const iv = generateIV();
  const encoder = new TextEncoder();
  const data = encoder.encode(passkey);
  const key = await generateEncryptionKey();

  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    data
  );

  const encryptedBuffer = new Uint8Array(encryptedData);
  const ivBuffer = new Uint8Array(iv.buffer);
  // Combine the IV and encrypted data into one array and encode as base64
  const combined = new Uint8Array(ivBuffer.length + encryptedBuffer.length);
  combined.set(ivBuffer);
  combined.set(encryptedBuffer, ivBuffer.length);

  return btoa(String.fromCharCode(...combined)); // Base64 encoded
}

// Decrypt the key (passkey) using AES-GCM algorithm
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

export const formatCurrency = (value: number) => {
  if (isNaN(value)) return "$0.00";

  return "$" + value.toLocaleString(undefined);
};

export const capitalize = (str: string) => {
  return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export function setSlug(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[!@#$?%,:/^&*]/g, "")
    .replace(/[\s-]+/g, "-");
  return slug;
}
