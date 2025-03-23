import { Color } from "@/lib/types";
import { cn, generateRandomNumberArray, getAccessibleColor } from "@/lib/utils";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { JSX, useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "./ui/button";

/**
 * A React component that renders a product gallery with a tab-based interface.
 * The gallery supports thumbnail navigation, looping behavior, and dynamic styling
 * based on the selected color. It also provides options to toggle visibility of panels
 * and customize the layout for different use cases.
 *
 * @param {Object} props - The props for the ProductGallery component.
 * @param {Color} props.selectedColor - The selected color object containing `bgColor` and `name`.
 * @param {string} props.selectedColor.bgColor - The background color for the gallery.
 * @param {string} props.selectedColor.name - The name of the selected color.
 * @param {boolean} [props.panelsVisibility=true] - Determines whether the tab panels are visible.
 * @param {boolean} props.page - A flag to toggle between single-page and multi-page layouts.
 *
 * @returns {JSX.Element} The rendered ProductGallery component.
 *
 * @example
 * ```tsx
 * <ProductGallery
 *   selectedColor={{ bgColor: "#FF5733", name: "Orange" }}
 *   panelsVisibility={true}
 *   page={false}
 * />
 * ```
 */
const ProductGallery = ({
  selectedColor = { bgColor: "#919191", name: "Grey" },
  panelsVisibility = true,
  page = true,
}: {
  selectedColor: Color;
  panelsVisibility?: boolean;
  page: boolean;
}): JSX.Element => {
  // For demo purposes, we generate an array of numbers (you can replace this with your actual image array)
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

  // Compute the indices for the visible thumbnails.
  // If there are <= 3 images, show them all.
  // Otherwise, if selected is near the start, show [0,1,2],
  // if near the end, show the last three,
  // else show [selectedIndex - 1, selectedIndex, selectedIndex + 1].
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
    >
      {/* TabList: render all tabs but hide those not in our visible window */}
      {panelsVisibility && (
        <TabList className="grid grid-cols-3 gap-6">
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
              <span className="absolute inset-0 overflow-hidden rounded-xl border">
                {/* Pass the index as text to the Skeleton */}
                <div
                  className={cn(
                    "h-full w-full rounded-xl opacity-90 flex justify-center items-center text-5xl",
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
                className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-transparent ring-offset-2 group-data-selected:ring"
              />
            </Tab>
          ))}
        </TabList>
      )}

      {/* TabPanels (all panels remain rendered) */}
      <div className="relative">
        <TabPanels>
          {!page ? (
            randomArray.map((_, index) => {
              const accessibleBorderColor = getAccessibleColor(
                `${selectedColor.bgColor}`,
                "AAA",
                true
              );

              console.log("accessibleBorderColor", accessibleBorderColor);

              return (
                <TabPanel
                  key={index}
                  className="relative aspect-square text-dynamic rounded-3xl shadow-md"
                  style={
                    {
                      "--text-color": accessibleColor,
                    } as React.CSSProperties
                  }
                >
                  <div
                    className="h-full w-full rounded-3xl border border-dynamic flex bg-dynamic opacity-80 justify-center items-center text-5xl bg-muted"
                    style={
                      {
                        "--border-color": accessibleBorderColor,
                      } as React.CSSProperties
                    }
                  >
                    {(index + 1).toString()}
                  </div>
                </TabPanel>
              );
            })
          ) : (
            <TabPanel
              className="relative aspect-square border border-dynamic text-dynamic rounded-t-2xl shadow-2xl"
              style={
                {
                  "--bg-color": selectedColor.bgColor,
                  "--border-color": getAccessibleColor(
                    `${selectedColor.bgColor}`,
                    "AAA",
                    true
                  ),
                  "--text-color": accessibleColor,
                } as React.CSSProperties
              }
            >
              <div className="h-full w-full rounded-t-2xl flex  bg-dynamic opacity-80 justify-center items-center text-5xl bg-muted">
                1
              </div>
            </TabPanel>
          )}
        </TabPanels>

        {/* Arrow Navigation Buttons over the TabPanels */}
        {!page ? (
          <>
            <Button
              variant="outline"
              onClick={goToPrevious}
              className="absolute top-1/2 left-5 px-2 py-5 transform -translate-y-1/2"
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
              className="absolute top-1/2 right-5 px-2 py-5 transform -translate-y-1/2"
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
