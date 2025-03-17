"use client";

"use client";

import React from "react";
import { CategoryCardProps } from "@/lib/types";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
import DynamicButton from "./ui/button-dynamic";

const CategoryCard = ({ category }: CategoryCardProps, gender: string) => {
  const router = useRouter();
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border shadow-md hover:shadow-lg">
      <div className="relative aspect-w-16 aspect-h-9">
        {/* <Image
          src={category.imageSrc}
          alt={category.name}
          width={1920}
          height={1080}
          objectFit="cover"
          className="rounded-t-lg"
        /> */}
        <Skeleton className="h-[145] w-full rounded-xl" />
      </div>
      <div className="h-[200] flex flex-col justify-between">
        {category.name || (category.name && category.description) ? (
          <div className="flex flex-col justify-between p-4 h-fit-content">
            <h3 className="text-lg font-semibold text-foreground">
              {category.name}
            </h3>
            {category.description && (
              <p className="mt-2 text-sm">{category.description}</p>
            )}
          </div>
        ) : (
          <Skeleton className="h-24 w-full" />
        )}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <DynamicButton
            text="Shop now"
            onClick={() =>
              router.push(`/shopping/${gender}/${category.name.toLowerCase()}`)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
