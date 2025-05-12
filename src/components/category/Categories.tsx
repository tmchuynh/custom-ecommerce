import { navigations } from "@/lib/constants/navigation";
import Image from "next/image";
import Link from "next/link";
import DynamicButton from "../buttons/button-dynamic";

/**
 * Categories component displays a grid of product categories with visual cards.
 * Each category card includes:
 * - Background image from the first collection or default placeholder
 * - Gradient overlay
 * - Category name
 * - Description showing number of collections
 * - "Shop Collection" link with arrow
 * - Collections count badge
 *
 * The component is responsive:
 * - 1 column on mobile
 * - 2 columns on medium screens
 * - 3 columns on large screens
 *
 * @returns JSX element containing the categories grid section
 */
export default function Categories() {
  return (
    <section className="py-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-extrabold text-3xl">Browse Categories</h2>
          <p className="mx-auto max-w-2xl text-xl">
            Explore our wide range of categories and find exactly what you're
            looking for
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {navigations.categories.map((category, index) => (
            <Link
              key={index}
              href={`/shopping/${category.name.toLowerCase()}`}
              className="group relative flex flex-col shadow-md hover:shadow-lg rounded-2xl h-80 transition-all duration-300 overflow-hidden"
            >
              <Image
                src={
                  category.featured[1]?.imageSrc ||
                  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070"
                }
                alt={category.name}
                width={600}
                height={400}
                className="absolute inset-1.5 opacity-75 w-full h-full object-center object-cover"
              />

              <div className="relative z-20 flex flex-col justify-end p-6 h-full">
                <h3 className="mb-2 font-bold text-2xl text-background">
                  {category.name}
                </h3>

                <DynamicButton
                  text="Shop Now"
                  className="my-2 p-0 w-fit text-background"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
