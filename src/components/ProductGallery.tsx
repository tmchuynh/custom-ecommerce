// components/ProductGallery.tsx
import { Tab, TabList, TabPanels, TabPanel, TabGroup } from "@headlessui/react";
import React from "react";

const ProductGallery = ({ images }: { images: any[] }) => {
  return (
    <TabGroup className={"space-y-8"}>
      <TabList className="grid grid-cols-4 gap-6">
        {images.map((image) => (
          <Tab
            key={image.id}
            className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-indigo-500/50 focus:ring-offset-4 focus:outline-hidden"
          >
            <span className="sr-only">{image.name}</span>
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <img alt="" src={image.src} className="size-full object-cover" />
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
          <TabPanel key={image.id}>
            <img
              alt={image.alt}
              src={image.src}
              className="aspect-square w-full object-cover sm:rounded-lg"
            />
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default ProductGallery;
