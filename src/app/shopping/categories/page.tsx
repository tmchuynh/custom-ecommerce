"use client";

import { getAllProducts } from "@/api/products";
import ProductGrid from "@/components/products/ProductGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductItem } from "@/lib/interfaces";
import {
  ArrowLeft,
  Grid3X3,
  List,
  Package,
  Search,
  ShoppingBag,
  Star,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CategoryData {
  id: string;
  name: string;
  count: number;
  products: ProductItem[];
}

export default function CategoriesPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Fetch all products and organize by categories
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getAllProducts();
        setProducts(allProducts);

        // Group products by category
        const categoryMap = new Map<string, ProductItem[]>();
        allProducts.forEach((product) => {
          if (!categoryMap.has(product.category)) {
            categoryMap.set(product.category, []);
          }
          categoryMap.get(product.category)!.push(product);
        });

        // Create category data with counts
        const categoryData: CategoryData[] = Array.from(categoryMap.entries())
          .map(([category, categoryProducts]) => ({
            id: category,
            name: category
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase()),
            count: categoryProducts.length,
            products: categoryProducts,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        setCategories(categoryData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load categories"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const selectedCategoryData = categories.find(
    (cat) => cat.id === selectedCategory
  );

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="mx-auto mb-4 border-primary border-b-2 rounded-full w-12 h-12 animate-spin"></div>
              <p className="text-muted-foreground">Loading categories...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="mb-4 text-red-500">
                <Search className="mx-auto w-12 h-12" />
              </div>
              <h2 className="mb-2 font-semibold text-xl">
                Failed to load categories
              </h2>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20">
        <div className="absolute inset-0"></div>
        <div className="relative z-10 mx-auto px-6 lg:px-8 max-w-7xl text-center">
          <h1 className="mb-4 font-extrabold text-5xl md:text-6xl">
            Shop by Categories
          </h1>
          <p className="opacity-90 text-xl md:text-2xl">
            Discover amazing products organized just for you
          </p>
        </div>
      </div>

      <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
        {/* Category Selection or Product Display */}
        {!selectedCategory ? (
          <>
            {/* Category Overview Stats */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3 -mt-8 mb-12">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg border-blue-200">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-blue-500 p-3 rounded-xl">
                      <Package className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-blue-700">
                        Total Categories
                      </p>
                      <p className="font-bold text-3xl text-blue-900">
                        {categories.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-50 to-green-100 shadow-lg border-green-200">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-500 p-3 rounded-xl">
                      <ShoppingBag className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-green-700">
                        Total Products
                      </p>
                      <p className="font-bold text-3xl text-green-900">
                        {products.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg border-purple-200">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-purple-500 p-3 rounded-xl">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-purple-700">
                        Largest Category
                      </p>
                      <p className="font-bold text-3xl text-purple-900">
                        {Math.max(...categories.map((cat) => cat.count))} items
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Grid */}
            <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categories.map((category, index) => {
                // Get a sample product image for the category
                const sampleProduct = category.products[0];
                const categoryImage =
                  sampleProduct?.thumbnail ||
                  sampleProduct?.images?.[0] ||
                  `https://images.unsplash.com/photo-${
                    1560472354 + index
                  }?w=400&h=300&fit=crop`;

                return (
                  <Card
                    key={category.id}
                    className="group flex flex-col justify-between shadow-lg hover:shadow-2xl border transition-all hover:-translate-y-1 duration-300 cursor-pointer overflow-hidden"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {/* Category Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={categoryImage}
                        alt={category.name}
                        fill
                        className="transition-transform duration-500 object-cover group-hover:scale-110"
                      />

                      <Badge className="top-3 right-3 absolute bg-white/90 font-semibold text-gray-800">
                        {category.count} items
                      </Badge>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                        {category.name}
                      </CardTitle>
                      {/* Category Stats */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium text-sm">
                            {(
                              category.products.reduce(
                                (sum, p) => sum + (p.rating || 0),
                                0
                              ) / category.products.length || 0
                            ).toFixed(1)}
                          </span>
                        </div>
                        <div className="text-sm">
                          $
                          {Math.min(
                            ...category.products.map((p) => p.price)
                          ).toFixed(0)}{" "}
                          - $
                          {Math.max(
                            ...category.products.map((p) => p.price)
                          ).toFixed(0)}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Sample products preview */}
                      <div className="space-y-2">
                        <p className="font-medium text-sm">Popular items:</p>
                        <div className="space-y-1">
                          {category.products.slice(0, 3).map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center gap-2"
                            >
                              <div className="bg-purple-400 rounded-full w-1.5 h-1.5"></div>
                              <p className="text-xs truncate">
                                {product.title}
                              </p>
                            </div>
                          ))}
                          {category.count > 3 && (
                            <p className="pl-3.5 text-gray-500 text-xs italic">
                              +{category.count - 3} more items
                            </p>
                          )}
                        </div>
                      </div>

                      {/* View Category Button */}
                      <Button
                        variant={"classic"}
                        className="mt-4 w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCategory(category.id);
                        }}
                      >
                        Explore Category
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Category Products View */}
            <div className="mb-6">
              <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4">
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedCategory(null)}
                    className="mb-4"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" /> Back to Categories
                  </Button>
                  <h2 className="font-bold text-2xl">
                    {selectedCategoryData?.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedCategoryData?.count} products in this category
                  </p>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-3">
                  <div className="flex border border-border rounded-lg overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="border-0 rounded-none"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="border-0 rounded-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Display */}
            {selectedCategoryData && (
              <ProductGrid
                products={selectedCategoryData.products}
                viewMode={viewMode}
              />
            )}
          </>
        )}

        {/* Quick Actions */}
        <div className="mt-16 p-12 rounded-2xl text-center">
          <h3 className="mb-6 font-bold text-2xl">
            Looking for something specific?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl">
            Can't find what you're looking for? Try browsing all products,
            checking our latest deals, or exploring new arrivals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="classic" size="lg">
              <Link href="/shopping">
                <ShoppingBag className="mr-2 w-4 h-4" />
                Browse All Products
              </Link>
            </Button>
            <Button asChild variant="tertiary" size="lg">
              <Link href="/shopping/sale-items">
                <Star className="mr-2 w-4 h-4" />
                View Sale Items
              </Link>
            </Button>
            <Button asChild variant="tertiary" size="lg">
              <Link href="/shopping/new-arrivals">
                <TrendingUp className="mr-2 w-4 h-4" />
                New Arrivals
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
