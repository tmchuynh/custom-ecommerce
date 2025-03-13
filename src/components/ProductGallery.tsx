// components/ProductGallery.tsx
import { Tab, TabList, TabPanels, TabPanel, TabGroup } from "@headlessui/react";
import React from "react";
import Image from "next/image";

const ProductGallery = ({ images }: { images: any[] }) => {
  return (
    <TabGroup className={"space-y-8"}>
      <TabList className="grid grid-cols-4 gap-6">
        {images.map((image) => (
          <Tab
            key={image.id}
            className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-indigo-500/50 focus:ring-offset-4 focus:outline-hidden"
          >
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <Image
                alt={image.alt}
                src={image.src}
                fill
                sizes="100%"
                width={1920}
                height={1080}
                className="object-cover"
              />
            </span>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-selected:ring-indigo-500"
            />
          </Tab>
        ))}
      </TabList>

      <TabPanels>
        {images.map((image) => (
          <TabPanel key={image.id} className="relative aspect-square">
            <Image
              alt={image.alt}
              src={image.src}
              width={1920}
              height={1080}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover sm:rounded-lg"
            />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default ProductGallery;
