import { cn } from "@/lib/utils";
import Image from "next/image";
import DynamicButton from "../ui/button-dynamic";
import { FeaturedCategoryProps } from "@/lib/interfaces";

export default function FeaturedCategory({
  item,
  index,
  closePopovers,
}: FeaturedCategoryProps) {
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
      <div className="absolute inset-0 flex flex-col justify-end overflow-hidden">
        <div className="bg-white/55 px-4 py-8 text-sm h-96 absolute w-full top-[50%] transition-transform duration-700 ease-in-out transform group-hover:-translate-y-2/12">
          <div className="flex items-center gap-5 text-2xl font-bold">
            <a
              href={item.href}
              className="font-bold tracking-wider uppercase text-teritary"
              onClick={closePopovers}
            >
              <span aria-hidden="true" className="absolute inset-0" />
              {item.name}
            </a>
            <DynamicButton
              variant="link"
              text="Shop Now"
              className="w-fit p-0 text-background m-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
