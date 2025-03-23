import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { badgeData } from "@/lib/badgeConstant";

interface ProductBadgesProps {
  highlights?: string[]; // Make badges optional
}

export default function ProductBadges({ highlights = [] }: ProductBadgesProps) {
  // Limit to only one or two highlights
  const selectedHighlights = highlights.slice(0, 2);

  // 'badges' is an array of strings, e.g., ["Best Seller", "Best Price"]
  const selectedBadges = badgeData
    .filter((option) => highlights.includes(option.id))
    .sort((a, b) => a.text.localeCompare(b.text));

  return (
    <ul className="mt-2 flex items-center gap-4">
      {selectedHighlights.map((highlightId, index) => {
        const badge = badgeData.find((b) => b.id === highlightId);
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
                badge.svg.strokeLinecap as
                  | "round"
                  | "butt"
                  | "square"
                  | "inherit"
              }
              strokeLinejoin={
                badge.svg.strokeLinejoin as
                  | "round"
                  | "inherit"
                  | "miter"
                  | "bevel"
              }
              strokeWidth={badge.svg.strokeWidth}
            >
              <path d={badge.svg.path} />
            </svg>
            <p className="text-sm font-medium">{badge.text}</p>
          </li>
        );
      })}
    </ul>
  );
}
