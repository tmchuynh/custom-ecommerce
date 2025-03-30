import { RandomNumberArrayOptions } from "../types";

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
