import Link from "next/link";
import Image from "next/image";
import { navigations } from "@/lib/constants/navigation";
import { FaArrowRight } from "react-icons/fa";
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
    <section className=" py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-4">Browse Categories</h2>
          <p className="text-xl max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're
            looking for
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {navigations.categories.map((category, index) => (
            <Link
              key={index}
              href={`/shopping/${category.name.toLowerCase()}`}
              className="group relative flex flex-col rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-80"
            >
              <Image
                src={
                  category.collections[0]?.imageSrc ||
                  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070"
                }
                alt={category.name}
                width={600}
                height={400}
                className="absolute inset-1.5 object-center w-full object-cover h-full opacity-75"
              />

              <div className="relative flex flex-col justify-end h-full p-6 z-20">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="mb-4 line-clamp-2">
                  {`Explore our ${category.name.toLowerCase()} collection with ${
                    category.collections.length
                  } different styles.`}
                </p>

                <DynamicButton
                  text="Shop Now"
                  className="w-fit p-0 text-background my-2"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
