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
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

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
