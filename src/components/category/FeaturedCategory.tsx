import { FeaturedCategoryProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { JSX } from "react";
import DynamicButton from "../buttons/button-dynamic";

/**
 * A component that renders a featured category item with an image and overlay content
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.item - The category item data
 * @param {string} props.item.name - Name of the category
 * @param {string} props.item.imageAlt - Alt text for the category image
 * @param {string} props.item.imageSrc - Source URL for the category image
 * @param {string} props.item.href - Link URL for the category
 * @param {number} props.index - Index of the category item in the list
 * @param {() => void} props.closePopovers - Function to close any open popovers
 * @returns {JSX.Element} A featured category card with image and overlay content
 */
export default function FeaturedCategory({
  item,
  index,
  closePopovers,
}: FeaturedCategoryProps): JSX.Element {
  return (
    <div
      key={item.name}
      className={cn(
        index === 0 ? "col-span-2" : "",
        "group relative overflow-hidden rounded-md bg-muted"
      )}
    >
      <Image
        alt={item.imageAlt}
        src={item.imageSrc}
        width={800}
        height={900}
        className={cn(
          index === 0 ? "aspect-9/7" : "aspect-square",
          "w-full object-cover"
        )}
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-white/90 via-white/50 to-white/10 overflow-hidden">
        <div className="top-[50%] absolute px-4 py-8 w-full h-96 text-sm">
          <div className="flex items-center gap-5 font-bold text-2xl">
            <a
              href={item.href}
              className="font-bold text-teritary uppercase tracking-wider"
              onClick={closePopovers}
            >
              <span aria-hidden="true" className="absolute inset-0" />
              {item.name}
            </a>
          </div>
          <DynamicButton
            variant="secondary"
            text="Shop Now"
            className="my-2 p-0 w-fit text-background"
          />
        </div>
      </div>
    </div>
  );
}
