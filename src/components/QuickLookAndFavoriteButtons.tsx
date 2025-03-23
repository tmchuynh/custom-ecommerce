import { Color } from "@/lib/types";
import { cn, getAccessibleColor } from "@/lib/utils";
import { useTheme } from "next-themes";
import { JSX, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Button } from "./ui/button";

/**
 * A React functional component that renders two buttons: "Quick Look" and "Add to Favorites".
 * The component dynamically adjusts its styles based on the current theme and accessibility requirements.
 *
 * @param {Object} props - The props object.
 * @param {boolean} [props.page=true] - Determines the layout of the component. If `true`, the component
 * will have a wider layout; otherwise, it will adjust to a smaller layout.
 *
 * @returns {JSX.Element} The rendered JSX element containing the buttons.
 *
 * @remarks
 * - The "Quick Look" button is conditionally hidden based on the `page` prop.
 * - The "Add to Favorites" button dynamically adjusts its background and text colors to ensure
 *   accessibility compliance using the `getAccessibleColor` utility.
 * - The component listens to the `theme` context and updates the background color accordingly.
 *
 * @example
 * ```tsx
 * <QuickLookAndFavoriteButtons page={true} />
 * ```
 */
const QuickLookAndFavoriteButtons = ({
  page = true,
}: {
  page?: boolean;
}): JSX.Element => {
  const [backgroundColor, setBackgroundColor] = useState<Color>({
    bgColor: "#000000",
    name: "Black",
  });

  const accessibleColor = getAccessibleColor(
    `${backgroundColor.bgColor}`,
    "AAA",
    true
  );

  const { theme } = useTheme();

  useEffect(() => {
    // Only update when theme has a defined value
    if (theme !== undefined) {
      if (theme === "dark") {
        setBackgroundColor({
          bgColor: "#070707",
          name: "Black",
        });
      } else {
        setBackgroundColor({
          bgColor: "#fff",
          name: "White",
        });
      }
    }
  }, [theme]);

  return (
    <div
      className={cn("flex items-center justify-between mx-2 gap-1 p-2 mt-4", {
        "w-full": !page,
      })}
    >
      <Button className={cn("", { hidden: !page })}>
        <span> Quick look </span>
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="1 0 23 20"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
          />
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </Button>

      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        className={cn("mb-0", {
          "mx-3": page,
        })}
        style={
          {
            "--bg-color": accessibleColor,
          } as React.CSSProperties
        }
      >
        <FaHeart
          className="rounded-full"
          aria-hidden="true"
          style={
            {
              "--text-color": accessibleColor,
              width: "25px",
              height: "25px",
            } as React.CSSProperties
          }
        />

        <span className="sr-only">Add to favorites</span>
      </Button>
    </div>
  );
};

export default QuickLookAndFavoriteButtons;
