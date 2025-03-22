import { Color } from "@/lib/types";
import { cn, generateRandomNumberArray, getAccessibleColor } from "@/lib/utils";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { JSX, useMemo, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Button } from "./ui/button";

const ProductGallery = ({
  images,
  selectedColor = { bgColor: "#919191", name: "Grey" },
  panelsVisibility = true,
}: {
  images: string[];
  selectedColor: Color;
  panelsVisibility?: boolean;
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
              className={`group relative flex items-center justify-center text-center h-36 cursor-pointer rounded-md bg-dynamic opacity-50 text-dynamic text-sm font-medium uppercase hover:bg-muted/75 focus:ring-3 focus:ring/50 focus:ring-offset-4 focus:outline-hidden ${
                visibleIndices().includes(index) ? "" : "hidden"
              }`}
              style={
                {
                  "--bg-color": selectedColor.bgColor,
                  "--text-color": accessibleColor,
                } as React.CSSProperties
              }
            >
              <span className="absolute inset-0 overflow-hidden rounded-md">
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
                className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring"
              />
            </Tab>
          ))}
        </TabList>
      )}

      {/* TabPanels (all panels remain rendered) */}
      <div className="relative">
        <TabPanels>
          {randomArray.map((_, index) => (
            <TabPanel
              key={index}
              className="relative aspect-square border text-dynamic rounded-2xl overflow-hidden"
              style={
                {
                  "--bg-color": selectedColor.bgColor,
                  "--text-color": accessibleColor,
                } as React.CSSProperties
              }
            >
              <div
                className="h-full w-full rounded-xl flex bg-dynamic opacity-80 justify-center items-center text-5xl bg-muted"
                style={
                  {
                    "--bg-color": selectedColor.bgColor,
                    "--text-color": accessibleColor,
                  } as React.CSSProperties
                }
              >
                {(index + 1).toString()}
              </div>
            </TabPanel>
          ))}
        </TabPanels>

        {/* Arrow Navigation Buttons over the TabPanels */}
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="absolute top-1/2 left-2 transform -translate-y-1/2"
          aria-label="Previous"
        >
          <FiArrowLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2"
          aria-label="Next"
        >
          <FiArrowRight />
        </Button>
      </div>
    </TabGroup>
  );
};

export default ProductGallery;
