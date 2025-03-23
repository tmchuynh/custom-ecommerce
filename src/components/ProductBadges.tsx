import { badgeData } from "@/lib/constants";
import { ProductBadgesProps } from "@/lib/interfaces";
import { JSX } from "react";

/**
 * A React component that displays a list of product badges based on the provided highlights.
 * Each badge includes an SVG icon and a descriptive text.
 *
 * @component
 * @param {ProductBadgesProps} props - The props for the ProductBadges component.
 * @param {string[]} [props.highlights=[]] - An optional array of badge IDs to filter and display specific badges.
 * If no highlights are provided, all badges from `badgeData` will be displayed.
 *
 * @returns {JSX.Element} A list of badges rendered as an unordered list (`<ul>`), where each badge is represented
 * as a list item (`<li>`) containing an SVG icon and a text description.
 *
 * @example
 * // Example usage:
 * const highlights = ['badge1', 'badge2'];
 * <ProductBadges highlights={highlights} />
 */
export default function ProductBadges({
  highlights = [],
}: ProductBadgesProps): JSX.Element {
  highlights = Array.isArray(highlights) ? highlights : [];
  const badgesToShow = highlights
    ? badgeData.filter((badge) => highlights.includes(badge.id))
    : badgeData;

  console.log(badgesToShow);

  return (
    <ul className="mt-2 flex items-center gap-4">
      {badgesToShow.map((badge) => (
        <li key={badge.id} className="flex items-center gap-2">
          <svg
            className="h-4 w-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox={badge.svg.viewBox}
          >
            <path
              stroke="currentColor"
              strokeLinecap={
                badge.svg.strokeLinecap as
                  | "round"
                  | "butt"
                  | "square"
                  | "inherit"
                  | undefined
              }
              strokeLinejoin={
                badge.svg.strokeLinejoin as
                  | "round"
                  | "inherit"
                  | "miter"
                  | "bevel"
                  | undefined
              }
              strokeWidth={badge.svg.strokeWidth}
              d={badge.svg.path}
            />
          </svg>
          <p className="text-sm font-medium">{badge.text}</p>
        </li>
      ))}
    </ul>
  );
}
