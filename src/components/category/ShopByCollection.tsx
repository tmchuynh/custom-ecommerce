"use client";

import { navigations } from "@/lib/constants/navigation";
import { useRouter } from "next/navigation";
import { JSX } from "react";
import DynamicButton from "../buttons/button-dynamic";

/**
 * A component that displays shopping collections organized by categories.
 *
 * @component
 * @example
 * ```tsx
 * <ShopByCollection />
 * ```
 *
 * @description
 * This component renders a section displaying different shopping collections organized by categories.
 * Each category contains multiple collections displayed in a grid layout with images and titles.
 * Features include:
 * - Heading and descriptive text for the overall collections section
 * - Categories with individual headings and "View All" buttons
 * - Collection cards with hover effects, images, and titles
 * - Responsive grid layout
 *
 * @returns {JSX.Element} A section containing categorized shopping collections
 */
export default function ShopByCollection(): JSX.Element {
  const router = useRouter();
  return (
    <section aria-labelledby="collection-heading" className="py-12">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 id="collection-heading" className="mb-4 font-extrabold text-3xl">
            Shop by Collection
          </h2>
          <p className="mx-auto max-w-2xl text-xl">
            Each season, we collaborate with world-class designers to create a
            collection inspired by the natural world.
          </p>
        </div>

        <div className="space-y-16">
          {navigations.categories.map((category, index) => (
            <div key={index} className="relative">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-2xl">{category.name}</h2>
                <div className="flex-grow ml-4 border-t"></div>
                <DynamicButton
                  onClick={() =>
                    router.push(`/shopping/${category.name.toLowerCase()}`)
                  }
                  text="View All"
                  className="ml-4 w-fit"
                  variant="outline"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
