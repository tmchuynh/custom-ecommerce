"use client";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

// Placeholder product data - replace with your actual data fetching logic
const sampleProducts = [
  {
    id: 1, // Changed from string to number
    title: "Classic White Tee",
    price: 25.99,
    images: ["/images/Shopping/Men/classic-white-tee.jpg"], // Replace with actual image path
    thumbnail: "/images/Shopping/Men/classic-white-tee.jpg", // Replace with actual image path
    rating: 4.5,
    category: "Men's Apparel",
    stock: 50,
    description: "A timeless classic, perfect for any occasion.",
  },
  {
    id: 2, // Changed from string to number
    title: "Slim Fit Jeans",
    price: 79.5,
    images: ["/images/Shopping/Women/slim-fit-jeans.jpg"], // Replace with actual image path
    thumbnail: "/images/Shopping/Women/slim-fit-jeans.jpg", // Replace with actual image path
    rating: 4.2,
    category: "Women's Apparel",
    stock: 30,
    description: "Comfortable and stylish slim fit jeans.",
  },
  {
    id: 3, // Changed from string to number
    title: "Summer Floral Dress",
    price: 45.0,
    images: ["/images/Shopping/Women/summer-floral-dress.jpg"], // Replace with actual image path
    thumbnail: "/images/Shopping/Women/summer-floral-dress.jpg", // Replace with actual image path
    rating: 4.8,
    category: "Women's Apparel",
    stock: 25,
    description: "A beautiful dress perfect for sunny days.",
  },
  {
    id: 4, // Changed from string to number
    title: "Leather Backpack",
    price: 120.0,
    images: ["/images/Shopping/Accessories/leather-backpack.jpg"], // Replace with actual image path
    thumbnail: "/images/Shopping/Accessories/leather-backpack.jpg", // Replace with actual image path
    rating: 4.9,
    category: "Accessories",
    stock: 15,
    description: "Durable and stylish leather backpack for everyday use.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* New Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 py-20 md:py-32 text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/yosemite.jpg" // Replace with your desired hero image
            alt="Hero background"
            fill
            className="opacity-30 object-cover"
            priority
          />
        </div>
        <div className="relative z-10 mx-auto px-6 text-center container">
          <h1 className="mb-6 font-bold text-4xl md:text-6xl">
            Discover Your Next Favorite
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg md:text-xl">
            Explore our curated collection of high-quality products, designed to
            inspire and delight.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white hover:bg-gray-100 text-purple-700"
          >
            <Link href="/shopping">Shop Now</Link>
          </Button>
        </div>
      </section>

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12 container">
        {/* Featured Products Section */}
        <section aria-labelledby="featured-products-heading" className="py-16">
          <div className="mb-12 text-center">
            <h2
              id="featured-products-heading"
              className="font-bold text-3xl text-gray-900 sm:text-4xl tracking-tight"
            >
              Featured Products
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Check out some of our most popular items.
            </p>
          </div>
          {/* You'll need to fetch actual product data here */}
          <ProductGrid products={sampleProducts} />
        </section>

        {/* Category Showcase Section */}
        <section
          aria-labelledby="category-showcase-heading"
          className="bg-gray-50 py-16 rounded-lg"
        >
          <div className="mb-12 text-center">
            <h2
              id="category-showcase-heading"
              className="font-bold text-3xl text-gray-900 sm:text-4xl tracking-tight"
            >
              Shop by Category
            </h2>
            <p className="mt-4 text-gray-600 text-lg">
              Find what you're looking for with ease.
            </p>
          </div>
          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Example Categories - Replace with your actual categories and links */}
            {[
              {
                name: "Men's Apparel",
                href: "/shopping/men",
                imageSrc: "/images/Shopping/Men/category-men.jpg",
              }, // Replace with actual image
              {
                name: "Women's Apparel",
                href: "/shopping/women",
                imageSrc: "/images/Shopping/Women/category-women.jpg",
              }, // Replace with actual image
              {
                name: "Accessories",
                href: "/shopping/accessories",
                imageSrc:
                  "/images/Shopping/Accessories/category-accessories.jpg",
              }, // Replace with actual image
            ].map((category) => (
              <Link
                href={category.href}
                key={category.name}
                className="group block relative"
              >
                <div className="relative bg-white group-hover:opacity-75 rounded-lg w-full sm:aspect-w-2 lg:aspect-w-1 h-80 sm:aspect-h-1 sm:h-64 lg:aspect-h-1 overflow-hidden">
                  <Image
                    src={category.imageSrc}
                    alt={category.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 font-semibold text-base text-center text-gray-900">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 text-center">
          <h2 className="mb-6 font-bold text-3xl text-gray-900 sm:text-4xl tracking-tight">
            Join Our Community
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-gray-600 text-lg">
            Sign up for our newsletter to get the latest updates on new
            arrivals, special offers, and more.
          </p>
          <form className="sm:flex mx-auto max-w-md">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="px-5 py-3 border-gray-300 focus:border-indigo-500 rounded-md focus:ring-indigo-500 w-full sm:max-w-xs placeholder-gray-500"
              placeholder="Enter your email"
            />
            <div className="sm:flex-shrink-0 shadow mt-3 sm:mt-0 sm:ml-3 rounded-md">
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
