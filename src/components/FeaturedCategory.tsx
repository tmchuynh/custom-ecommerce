import { FeaturedCategoryProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function FeaturedCategory({
  item,
  index,
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
          "w-full object-cover group-hover:opacity-75"
        )}
      />
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="bg-white/55 px-4 py-8 text-sm max:h-1/3 flex flex-col justify-start">
          <a href={item.href} className="font-bold tracking-wider uppercase">
            <span aria-hidden="true" className="absolute inset-0" />
            {item.name}
          </a>
          <p aria-hidden="true" className="mt-0.5 sm:mt-5">
            Shop now
          </p>
        </div>
      </div>
    </div>
  );
}
