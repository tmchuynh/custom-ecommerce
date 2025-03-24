import { badgeData } from "@/lib/badgeConstant";
import { ProductBadgesProps } from "@/lib/interfaces";
import { JSX } from "react";

/**
 * ProductHighlights Component
 *
 * A component that displays up to two product highlights/badges with SVG icons.
 * Each badge consists of an SVG icon and text.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Array<string>} [props.highlights=[]] - Array of highlight IDs to display
 * @returns {JSX.Element} A list of product badges with icons and text
 *
 * @example
 * ```tsx
 * <ProductHighlights highlights={["organic", "free-shipping"]} />
 * ```
 *
 * @remarks
 * The component will only show up to two badges even if more are provided.
 * Each highlight ID must correspond to an item in the badgeData array.
 */
export default function ProductHighlights({
  highlights = [],
}: ProductBadgesProps): JSX.Element {
  // Limit to only one or two highlights
  const selectedHighlights = highlights.slice(0, 2);

  return (
    <ul className="flex items-center gap-4">
      {selectedHighlights.map((highlightId, index) => {
        const badge = badgeData.find((b) => b.id === highlightId);
        // Get corresponding badge objects and sort by text
        const orderedHighlights = selectedHighlights
          .map((highlightId) => badgeData.find((b) => b.id === highlightId))
          .filter((badge) => badge !== undefined)
          .sort((a, b) => a!.text.localeCompare(b!.text));

        // Now find the badge based on the current highlight in the loop
        const orderedBadges = orderedHighlights[index];
        if (!badge) return null;
        return (
          <li key={`${badge.id}_${index}`} className="flex items-center gap-2">
            <svg
              className="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox={badge.svg.viewBox}
              fill="none"
              stroke="currentColor"
              strokeLinecap={
                orderedBadges.svg.strokeLinecap as
                  | "round"
                  | "butt"
                  | "square"
                  | "inherit"
              }
              strokeLinejoin={
                orderedBadges.svg.strokeLinejoin as
                  | "round"
                  | "inherit"
                  | "miter"
                  | "bevel"
              }
              strokeWidth={orderedBadges.svg.strokeWidth}
            >
              <path d={orderedBadges.svg.path} />
            </svg>
            <p className="text-sm font-medium">{orderedBadges.text}</p>
          </li>
        );
      })}
    </ul>
  );
}
