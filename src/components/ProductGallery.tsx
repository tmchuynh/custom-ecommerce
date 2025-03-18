import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";

const ProductGallery = ({ images }: { images: any[] }) => {
  console.log("ProductGallery", images);
  return (
    <TabGroup className={"space-y-8"}>
      <TabList className="grid grid-cols-4 gap-6">
        {images.map((image, index) => (
          <Tab
            key={index}
            className="group relative flex h-36 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium text-gray-900 uppercase hover:bg-gray-50 focus:ring-3 focus:ring-indigo-500/50 focus:ring-offset-4 focus:outline-hidden"
          >
            <span className="absolute inset-0 overflow-hidden rounded-md">
              <Image
                alt={image}
                src={image}
                width={260}
                height={120}
                priority
                className="object-cover object-bottom"
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
        {images.map((image, index) => (
          <TabPanel key={index} className="relative aspect-square">
            <Image
              alt={image}
              src={image}
              width={1920}
              priority
              height={1080}
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
