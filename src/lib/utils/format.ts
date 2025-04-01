import { SectionDetails } from "../types";

export const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

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
  return str
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
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
 * Sorts an array of strings alphabetically.
 *
 * @param arr - The array of strings to sort.
 * @returns A new array sorted alphabetically.
 */
export const sortAlphabetically = (arr: string[]): string[] => {
  return [...arr].sort((a, b) => a.localeCompare(b));
};

/**
 * Sorts an array of strings alphabetically.
 *
 * @param arr - The array of strings to sort.
 * @returns A new array sorted alphabetically.
 */
export const sortSectionsAlphabetically = (
  arr: SectionDetails[]
): SectionDetails[] => {
  return [...arr].sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Sorts an array of strings by the length of each string.
 *
 * @param arr - The array of strings to sort.
 * @returns A new array sorted by string length.
 */
export const sortByLength = (arr: string[]): string[] => {
  return [...arr].sort((a, b) => a.length - b.length);
};

/**
 * Sorts an array of objects alphabetically by a specified key.
 *
 * @param arr - The array of objects to sort.
 * @param key - The key to sort the objects by.
 * @returns A new array sorted alphabetically by the specified key.
 */
export const sortObjectsByKey = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T
): T[] => {
  return [...arr].sort((a, b) => String(a[key]).localeCompare(String(b[key])));
};

/**
 * Sorts an array of objects by the length of a specified key's value.
 *
 * @param arr - The array of objects to sort.
 * @param key - The key to sort the objects by the length of its value.
 * @returns A new array sorted by the length of the specified key's value.
 */
export const sortObjectsByKeyLength = <T extends Record<string, any>>(
  arr: T[],
  key: keyof T
): T[] => {
  return [...arr].sort((a, b) => String(a[key]).length - String(b[key]).length);
};
