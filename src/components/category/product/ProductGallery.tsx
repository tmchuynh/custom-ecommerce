import { Button } from "@/components/ui/button";
import { Color, ProductType } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getAccessibleColor } from "@/lib/utils/accessibility";
import { generateRandomNumberArray } from "@/lib/utils/generate";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { JSX, useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

/**
 * A component that displays a gallery of product images or numbered panels with navigation controls.
 *
 * @component
 * @param {Object} props - The component props
 * @param {ProductType} props.product - The product object containing image and details
 * @param {number} [props.index] - Optional index for keying multiple galleries
 * @param {Color} [props.selectedColor] - Selected color object with bgColor and name properties, defaults to grey
 * @param {boolean} [props.panelsVisibility=true] - Controls visibility of the tab panel navigation
 * @param {boolean} props.page - Determines if component is rendered in page or preview mode
 *
 * @returns {JSX.Element} A tab group containing either product images or numbered panels with navigation
 *
 * Features:
 * - Responsive grid layout of 3 visible panels at a time
 * - Circular navigation through panels using arrow buttons (in preview mode)
 * - Dynamic color theming based on selectedColor
 * - Accessible color contrast handling
 * - Different styling for page vs preview modes
 * - Random panel generation for demo/placeholder purposes
 */
const ProductGallery = ({
  product,
  index,
  selectedColor = { bgColor: "#919191", name: "Grey" },
  panelsVisibility = true,
  page = true,
}: {
  product: ProductType;
  index?: number;
  selectedColor?: Color;
  panelsVisibility?: boolean;
  page: boolean;
}): JSX.Element => {
  /**
   * A memoized array of random numbers generated using the `generateRandomNumberArray` function.
   *
   * The array is created with the following parameters:
   * - `randomLength`: A random integer between 3 and 10 (inclusive), representing the length of the array.
   * - `randomMin`: A random integer between 1 and 4 (inclusive), representing the minimum value for the numbers in the array.
   * - `randomMax`: A random integer between 3 and 10 (inclusive), representing the maximum value for the numbers in the array.
   *
   * The values are recalculated only when the component is re-rendered.
   */
  const randomArray = useMemo(() => {
    const randomLength = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
    const randomMin = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    const randomMax = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
    return generateRandomNumberArray(randomLength, randomMin, randomMax);
  }, []);
  const total = randomArray.length;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const accessibleColor = getAccessibleColor(
    `${selectedColor.bgColor}`,
    "AAA",
    true
  );

  /**
   * Determines the indices of items to be displayed in a gallery based on the total number of items
   * and the currently selected index.
   *
   * - If the total number of items is less than or equal to 3, all indices are returned.
   * - If the selected index is near the beginning (index 0 or 1), the first three indices are returned.
   * - If the selected index is near the end (within the last two indices), the last three indices are returned.
   * - Otherwise, the indices surrounding the selected index (one before, the selected index, and one after) are returned.
   *
   * @returns An array of indices representing the visible items in the gallery.
   */
  const visibleIndices = () => {
    if (total <= 3) {
      return Array.from({ length: total }, (_, i) => i);
    } else if (selectedIndex <= 1) {
      return [0, 1, 2];
    } else if (selectedIndex >= total - 2) {
      return [total - 3, total - 2, total - 1];
    } else {
      return [selectedIndex - 1, selectedIndex, selectedIndex + 1];
    }
  };

  const pathname = usePathname();

  const pathSegments = useMemo(
    () => pathname.split("/").filter(Boolean),
    [pathname]
  );

  // Functions to navigate with looping behavior.
  const goToPrevious = () => {
    setSelectedIndex((prev) => (prev - 1 + total) % total);
  };

  const goToNext = () => {
    setSelectedIndex((prev) => (prev + 1) % total);
  };

  return (
    <TabGroup
      selectedIndex={selectedIndex}
      onChange={setSelectedIndex}
      className="space-y-8"
      key={index}
    >
      {/* TabList: render all tabs but hide those not in our visible window */}
      {panelsVisibility && (
        <TabList className="gap-6 grid grid-cols-3">
          {randomArray.map((_, index) => (
            <Tab
              key={index}
              className={`group relative flex items-center justify-center text-center h-36 cursor-pointer rounded-xl bg-dynamic opacity-50 text-dynamic text-sm font-medium uppercase hover:bg-muted/75 focus:ring-3 focus:ring/50 focus:outline-hidden ${
                visibleIndices().includes(index) ? "" : "hidden"
              }`}
              style={
                {
                  "--bg-color": selectedColor.bgColor,
                  "--text-color": accessibleColor,
                } as React.CSSProperties
              }
            >
              <span className="absolute inset-0 border rounded-xl overflow-hidden">
                {/* Pass the index as text to the Skeleton */}
                <div
                  className={cn(
                    "h-full w-full opacity-90 flex justify-center items-center text-5xl",
                    {
                      "opacity-100": page,
                    }
                  )}
                >
                  {(index + 1).toString()}
                </div>
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 group-data-selected:ring ring-2 ring-transparent ring-offset-2 pointer-events-none"
              />
            </Tab>
          ))}
        </TabList>
      )}

      {/* TabPanels (all panels remain rendered) */}
      <div className="relative">
        <TabPanels className={"w-full"}>
          {randomArray.map((_, index) => (
            <TabPanel
              key={index}
              className={cn(
                "relative aspect-square text-dynamic shadow-lg overflow-clip",
                {
                  "rounded-3xl": !page,
                  " h-[15em] w-full": pathSegments.length === 2,
                }
              )}
              style={
                {
                  "--bg-color": selectedColor.bgColor,
                  "--text-color": accessibleColor,
                  "--border-color": getAccessibleColor(
                    `${selectedColor.bgColor}`,
                    "AAA",
                    true
                  ),
                } as React.CSSProperties
              }
            >
              {pathSegments.length === 2 ? (
                <div>
                  <Image
                    src={product.imageSrc}
                    alt={product.name || product.gender || "female"}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ) : (
                <div
                  className={cn(
                    "h-full w-full flex bg-dynamic opacity-80 justify-center items-center text-5xl",
                    {
                      "border border-dynamic": !page,
                    }
                  )}
                  style={
                    {
                      "--bg-color": selectedColor.bgColor,
                      "--text-color": accessibleColor,
                      "--border-color": getAccessibleColor(
                        `${selectedColor.bgColor}`,
                        "AAA",
                        true
                      ),
                    } as React.CSSProperties
                  }
                >
                  {page && index === 0 ? "1" : (index + 1).toString()}
                </div>
              )}
            </TabPanel>
          ))}
        </TabPanels>

        {/* Arrow Navigation Buttons over the TabPanels */}
        {!page ? (
          <>
            <Button
              variant="outline"
              onClick={goToPrevious}
              className="top-1/2 left-5 absolute px-2 py-5 transform -translate-y-1/2"
              aria-label="Previous"
            >
              <IoIosArrowBack
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
            </Button>
            <Button
              variant="outline"
              onClick={goToNext}
              className="top-1/2 right-5 absolute px-2 py-5 transform -translate-y-1/2"
              aria-label="Next"
            >
              <IoIosArrowForward
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
            </Button>
          </>
        ) : null}
      </div>
    </TabGroup>
  );
};

export default ProductGallery;
