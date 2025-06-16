/**
 * Capitalizes the first letter of a string and converts the rest to lowercase.
 * @param str - The string to capitalize
 * @returns The capitalized string
 */
export function capitalize(str: string | string[]): string {
  if (!str) return str;

  if (Array.isArray(str)) {
    return str.map((s) => capitalize(s)).join(" ");
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts a string from kebab-case or camelCase to Title Case.
 * @param str - The string to convert to title case
 * @returns The title case string
 */
export function toTitleCase(str: string): string {
  if (!str) return str;

  return str
    .replace(/[-_]/g, " ") // Replace hyphens and underscores with spaces
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters in camelCase
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

/**
 * Formats a number as currency with proper formatting.
 * @param amount - The amount to format
 * @param currency - The currency code (default: 'USD')
 * @param locale - The locale for formatting (default: 'en-US')
 * @returns The formatted currency string
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}

/**
 * Formats a date string or Date object to a readable format.
 * @param date - The date to format
 * @param locale - The locale for formatting (default: 'en-US')
 * @returns The formatted date string
 */
export function formatDate(
  date: string | Date,
  locale: string = "en-US"
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Truncates a string to a specified length and adds ellipsis if needed.
 * @param str - The string to truncate
 * @param maxLength - The maximum length before truncation
 * @returns The truncated string
 */
export function truncate(str: string, maxLength: number): string {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength).trim() + "...";
}

/**
 * Converts a string to a URL-friendly slug format.
 * @param str - The string to convert to a slug
 * @returns The slug string
 */
export function formatToSlug(str: string): string {
  if (!str) return str;

  return str
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

export function kebabToTitle(str: string): string {
  if (!str) return str;

  return str
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
}

export function convertTo12HourFormat(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const adjustedHours = hours % 12 || 12; // Convert 0 to 12 for midnight
  return `${adjustedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}


/**
 * Format postal code according to country conventions
 */
export function formatPostalCode(postalCode: string, country: string): string {
  const trimmed = postalCode.trim().toUpperCase();
  const countryCode = country.toUpperCase();

  switch (countryCode) {
    case "CA":
      // Format Canadian postal codes as A1A 1A1
      if (/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(trimmed)) {
        return `${trimmed.slice(0, 3)} ${trimmed.slice(3)}`;
      }
      return trimmed;

    case "US":
      // Format US ZIP codes as 12345 or 12345-6789
      if (/^\d{9}$/.test(trimmed)) {
        return `${trimmed.slice(0, 5)}-${trimmed.slice(5)}`;
      }
      return trimmed;

    case "GB":
      // Format UK postcodes with proper spacing
      if (/^[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2}$/.test(trimmed)) {
        const match = trimmed.match(/^([A-Z]{1,2}\d[A-Z\d]?)(\d[A-Z]{2})$/);
        if (match) {
          return `${match[1]} ${match[2]}`;
        }
      }
      return trimmed;

    default:
      return trimmed;
  }
}