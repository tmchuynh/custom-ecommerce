import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useMemo, useState } from "react";
import { JSX } from "react";
import { Skeleton } from "./ui/skeleton";
import { generateRandomNumberArray } from "@/lib/utils";
import { Button } from "./ui/button";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const ProductGallery = ({ images }: { images: any[] }): JSX.Element => {
  // For demo purposes, we generate an array of numbers (you can replace this with your actual image array)
  const randomArray = useMemo(() => {
    const randomLength = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
    const randomMin = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    const randomMax = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
    return generateRandomNumberArray(randomLength, randomMin, randomMax);
  }, []);
  const total = randomArray.length;
  const [selectedIndex, setSelectedIndex] = useState(0);

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
      <TabList className="grid grid-cols-3 gap-6">
        {randomArray.map((_, index) => (
          <Tab
            key={index}
            className={`group relative flex items-center justify-center text-center h-36 cursor-pointer rounded-md bg-muted/40 text-sm font-medium text-foreground/50 uppercase hover:bg-muted/75 focus:ring-3 focus:ring/50 focus:ring-offset-4 focus:outline-hidden ${
              visibleIndices().includes(index) ? "" : "hidden"
            }`}
          >
            <span className="absolute inset-0 overflow-hidden rounded-md">
              {/* Pass the index as text to the Skeleton */}
              <Skeleton
                text={(index + 1).toString()}
                className="h-full w-full rounded-xl hidden md:flex"
              />
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring"
            />
          </Tab>
        ))}
      </TabList>

      {/* TabPanels (all panels remain rendered) */}
      <div className="relative">
        <TabPanels>
          {randomArray.map((_, index) => (
            <TabPanel
              key={index}
              className="relative aspect-square border rounded-2xl overflow-hidden"
            >
              <Skeleton
                text={(selectedIndex + 1).toString()}
                className="h-full w-full rounded-xl hidden md:flex"
              />
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
