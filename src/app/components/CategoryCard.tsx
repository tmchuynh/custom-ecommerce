"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CategoryCardProps } from "@/lib/types";

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border shadow-md hover:shadow-lg">
      <div className="relative aspect-w-16 aspect-h-9">
        <Image
          src={category.imageSrc}
          alt={category.name}
          width={1920}
          height={1080}
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <h3 className="text-lg font-semibold">{category.name}</h3>
        <p className="mt-2 text-sm">{category.description}</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <Link
          href={`/shopping/[gender]/[category]/${category.slug}`}
          as={`/shopping/${category.slug}`}
          className="text-indigo-600 hover:text-indigo-800"
        >
          Shop now
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
