import { cn } from "@/lib/utils";
import Image from "next/image";

interface FeaturedCategoryProps {
  item: any;
  index: number;
  closePopovers?: () => void;
}

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
        <div className="bg-white/55 px-4 py-8 text-sm h-96 absolute w-full top-[50%] transition-transform duration-700 ease-in-out flex flex-col justify-start transform group-hover:-translate-y-2/12">
          <a
            href={item.href}
            className="font-bold tracking-wider uppercase"
            onClick={closePopovers}
          >
            <span aria-hidden="true" className="absolute inset-0" />
            {item.name}
          </a>
          <p
            aria-hidden="true"
            className="mt-0.5 sm:mt-5 group-hover:underline underline-offset-4"
          >
            Shop now
          </p>
        </div>
      </div>
    </div>
  );
}
