"use client";
import { getAllProducts } from "@/api/products";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductItem } from "@/lib/interfaces";
import { Package, ShoppingBag, Tag, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch featured products on component mount
  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getAllProducts();

        // Get a selection of featured products (first 8 products with good ratings)
        const featured = allProducts
          .filter((product) => product.price > 100)
          .filter((product) => (product.rating || 0) >= 4.5)
          .filter(
            (product) =>
              product.discountPercentage && product.discountPercentage > 2
          )
          .slice(0, 8);

        setFeaturedProducts(featured);
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedProducts();
  }, []);
  return (
    <div>
      {/* New Hero Section */}
      <section className="relative -mt-15 py-20 md:py-32 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 h-[50em]" />
        <div className="absolute inset-0">
          <Image
            src="https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG9ubGluZSUyMHNob3BwaW5nfGVufDB8fDB8fHww"
            alt="Hero background"
            width={1920}
            height={1080}
            className="opacity-30 h-[50em] object-cover"
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

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl container">
        {/* Featured Products Section */}
        <section aria-labelledby="featured-products-heading" className="py-16">
          <div className="mb-12 text-center">
            <h2
              id="featured-products-heading"
              className="font-bold text-3xl sm:text-4xl tracking-tight"
            >
              Featured Products
            </h2>
            <p className="mt-4 text-lg">
              Check out some of our most popular items.
            </p>
          </div>
          {/* Featured Products */}
          {loading ? (
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="bg-gray-200 mb-4 rounded h-48"></div>
                    <div className="bg-gray-200 mb-2 rounded h-4"></div>
                    <div className="bg-gray-200 rounded w-3/4 h-4"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <ProductGrid products={featuredProducts} />
          )}
        </section>

        {/* Category Showcase Section */}
        <section aria-labelledby="category-showcase-heading" className="py-16">
          <div className="mb-12 text-center">
            <h2
              id="category-showcase-heading"
              className="font-bold text-3xl sm:text-4xl tracking-tight"
            >
              Shop by Category
            </h2>
            <p className="mt-4 text-lg">
              Find what you're looking for with ease.
            </p>
          </div>
          <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Example Categories - Replace with your actual categories and links */}
            {[
              {
                name: "All Products",
                href: "/shopping",
                imageSrc:
                  "https://plus.unsplash.com/premium_photo-1699973055451-c2061752297b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8%3D",
                description: "Browse our complete collection",
              },
              {
                name: "Sale Items",
                href: "/shopping/sale-items",
                imageSrc:
                  "https://plus.unsplash.com/premium_photo-1683121041726-3b192f629fa5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
                description: "Great deals and discounts",
              },
              {
                name: "Categories",
                href: "/shopping/categories",
                imageSrc:
                  "https://plus.unsplash.com/premium_photo-1700056213493-d2a2747c76be?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNhbGVzJTIwc2hvcHBpbmd8ZW58MHx8MHx8fDA%3D",
                description: "Shop by product category",
              },
            ].map((category) => (
              <Link
                href={category.href}
                key={category.name}
                className="group block relative"
              >
                <div className="relative group-hover:opacity-75 rounded-lg w-full sm:aspect-w-2 lg:aspect-w-1 h-80 sm:aspect-h-1 sm:h-64 lg:aspect-h-1 overflow-hidden">
                  <Image
                    src={category.imageSrc}
                    alt={category.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 font-semibold text-base text-center lg:text-xl">
                  {category.name}
                </h3>
                <p className="mt-2 text-center text-sm">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="mb-12 text-center">
            <h2 className="font-bold text-3xl sm:text-4xl tracking-tight">
              Why Shop With Us
            </h2>
            <p className="mt-4 text-lg">
              Experience the best in online shopping with these benefits.
            </p>
          </div>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="flex justify-center mb-4">
                  <ShoppingBag className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-lg">Free Shipping</h3>
                <p className="">Free shipping on orders over $50</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="flex justify-center mb-4">
                  <Package className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-lg">Fast Delivery</h3>
                <p className="">2-3 day delivery nationwide</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="flex justify-center mb-4">
                  <Tag className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-lg">Best Prices</h3>
                <p className="">Competitive prices with regular sales</p>
              </CardContent>
            </Card>
            <Card className="p-6 text-center">
              <CardContent className="p-0">
                <div className="flex justify-center mb-4">
                  <TrendingUp className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold text-lg">Quality Products</h3>
                <p className="">Curated selection of high-quality items</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 text-center">
          <h2 className="mb-6 font-bold text-3xl sm:text-4xl tracking-tight">
            Join Our Community
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg">
            Sign up for our newsletter to get the latest updates on new
            arrivals, special offers, and more.
          </p>
          <form className="sm:flex items-center mx-auto max-w-md">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <Input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter your email"
            />
            <div className="sm:flex-shrink-0 md:mt-2 sm:ml-3">
              <Button type="submit" variant={"classic"} className="m-0 w-full">
                Subscribe
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
