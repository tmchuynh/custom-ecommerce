"use client";
import { Button } from "@/components/ui/button";
import { JSX, useEffect, useState } from "react";
import { mockProductData } from "@/lib/constants/mockProductData";
import ProductCard from "./ProductCard";
import { FaFilter } from "react-icons/fa";

/**
 * A component that displays a grid of trending products with filtering capabilities.
 *
 * @component
 * @returns {JSX.Element} A section containing trending products with category filters
 *
 * @state {string} activeFilter - Currently selected category filter
 * @state {Set<string>} wishlist - Set of product IDs that are in the wishlist
 * @state {any[]} products - Array of all products fetched from mock data
 * @state {boolean} loading - Loading state while fetching products
 * @state {string[]} categories - Available category filters including "all"
 *
 * @example
 * ```tsx
 * <TrendingProducts />
 * ```
 *
 * Features:
 * - Displays featured products from men's, women's, and kids' categories
 * - Category filtering system
 * - Responsive grid layout
 * - Product cards with images, prices, and ratings
 * - Wishlist functionality
 * - Loading state handling
 */
export default function TrendingProducts(): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>(["all"]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const genders = ["men", "women", "kids"];
        const allProducts: any[] = [];

        // Fetch products for each gender
        for (const gender of genders) {
          const genderData = (mockProductData as any)[gender];

          if (genderData) {
            Object.entries(genderData).forEach(
              ([itemType, subCategory]: [string, any]) => {
                Object.values(subCategory).forEach((items: any) => {
                  Object.values(items).forEach((product: any) => {
                    if (product.featured) {
                      allProducts.push({
                        ...product,
                        gender,
                        category: itemType,
                        id: product.id || Math.random().toString(),
                      });
                    }
                  });
                });
              }
            );
          }
        }

        // Get unique categories from products
        const uniqueCategories = [
          "all",
          ...new Set(allProducts.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((product) => product.category === activeFilter);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-4">Trending Products</h2>
          <p className="text-xlborder max-w-2xl mx-auto">
            Discover our most popular products that are making waves this
            season.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveFilter(category)}
              variant={activeFilter === category ? "default" : "outline"}
              className={`capitalize ${
                activeFilter === category
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary hover:text-secondary-foreground"
              }`}
            >
              {category === "all" && <FaFilter className="h-4 w-4 mr-2" />}
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              gender={product.gender}
              category={product.category}
              item={product.itemType}
              page={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
