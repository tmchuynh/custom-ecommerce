import { navigations } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Categories() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 mb-4">
            Browse Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
              {/* Using a placeholder image - replace with actual category image */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-indigo-800/30 opacity-70 z-10 transition-opacity group-hover:opacity-80"></div>
              <Image
                src={
                  category.collections[0]?.imageSrc ||
                  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070"
                }
                alt={category.name}
                width={600}
                height={400}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="relative flex flex-col justify-end h-full p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/90 mb-4 line-clamp-2">
                  {`Explore our ${category.name.toLowerCase()} collection with ${
                    category.collections.length
                  } different styles.`}
                </p>
                <div className="flex items-center text-white mt-auto">
                  <span className="text-sm font-medium">Shop Collection</span>
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-white/90 rounded-full px-3 py-1 text-xs font-medium text-gray-700 z-20">
                {category.collections.length} Collections
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/shopping"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
          >
            View All Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
