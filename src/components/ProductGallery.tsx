import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";
import { JSX } from "react";
import { Skeleton } from "./ui/skeleton";
import { generateRandomNumberArray } from "@/lib/utils";

/**
 * A React component that displays a gallery of product images using tabs.
 *
 * @param {Object} props - The props object.
 * @param {any[]} props.images - An array of image sources to be displayed in the gallery.
 *
 * @returns {JSX.Element} The rendered ProductGallery component.
 *
 * @example
 * ```tsx
 * const images = [
 *   "/images/product1.jpg",
 *   "/images/product2.jpg",
 *   "/images/product3.jpg",
 * ];
 *
 * <ProductGallery images={images} />
 * ```
 *
 * @remarks
 * - The component uses a tab-based layout to display thumbnails and corresponding full-size images.
 * - Each thumbnail is clickable and highlights the selected image.
 * - The `Image` component is used for optimized image rendering.
 * - Ensure that the `images` array contains valid image URLs or paths.
 */
const ProductGallery = ({ images }: { images: any[] }): JSX.Element => {
  return (
    <TabGroup className={"space-y-8"}>
      <TabList className="grid grid-cols-4 gap-6">
        {generateRandomNumberArray(6, 3, 15).map((image, index) => {
          // const segments = image.split("/");
          // const lastSegment = segments[segments.length - 1];
          // const cleanAlt = lastSegment
          //   .split("?")[0]
          //   .replaceAll("_", " ")
          //   .replace(".jpg", "");
          return (
            <Tab
              key={index}
              className="group relative flex text-center align-middle h-36 cursor-pointer items-center justify-center rounded-md bg-muted/40 text-sm font-medium text-foreground/50 uppercase hover:bg-muted/75 focus:ring-3 focus:ring/50 focus:ring-offset-4 focus:outline-hidden"
            >
              <span className="absolute inset-0 overflow-hidden rounded-md">
                {/* <Image
                  alt={cleanAlt}
                  src={image}
                  width={260}
                  height={120}
                  priority
                  className="object-cover object-bottom"
                /> */}
                <Skeleton
                  text={index.toString()}
                  className="h-full w-full rounded-xl hidden md:flex col-span-1 xl:col-span-2"
                />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring"
              />
            </Tab>
          );
        })}
      </TabList>

      <TabPanels>
        {generateRandomNumberArray(6, 3, 15).map((image, index) => {
          // const segments = image.split("/");
          // const lastSegment = segments[segments.length - 1];
          // const cleanAlt = lastSegment
          //   .split("?")[0]
          //   .replaceAll("_", " ")
          //   .replace(".jpg", "");
          return (
            <TabPanel
              key={index}
              className="relative aspect-square border rounded-2xl"
            >
              {/* <Image
                alt={cleanAlt}
                src={image}
                width={1920}
                priority
                height={1080}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover sm:rounded-lg"
              /> */}
              <Skeleton
                text={index.toString()}
                className="h-full w-full rounded-xl hidden md:flex col-span-1 xl:col-span-2"
              />
            </TabPanel>
          );
        })}
      </TabPanels>
    </TabGroup>
  );
};

export default ProductGallery;
