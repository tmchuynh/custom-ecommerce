"use client";

import { getAllProducts } from "@/api/products";
import ProductGrid from "@/components/products/ProductGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductItem } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { Grid3X3, List, Package, Search } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

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
            name: category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
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

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto px-4 py-8 container">
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
        <div className="mx-auto px-4 py-8 container">
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
      <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl text-foreground">
            Shop by Categories
          </h1>
          <p className="text-muted-foreground">
            Browse our products organized by category
          </p>
        </div>

        {/* Category Selection or Product Display */}
        {!selectedCategory ? (
          <>
            {/* Category Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Package className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Categories</p>
                      <p className="text-2xl font-bold">{categories.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Grid3X3 className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Total Products</p>
                      <p className="text-2xl font-bold">{products.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <Search className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Largest Category</p>
                      <p className="text-2xl font-bold">
                        {Math.max(...categories.map(cat => cat.count))} items
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <Badge variant="secondary" className="text-xs">
                        {category.count} products
                      </Badge>
                      <Package className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    
                    {/* Sample products preview */}
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Sample items:</p>
                      <div className="space-y-1">
                        {category.products.slice(0, 3).map((product) => (
                          <p key={product.id} className="text-xs text-muted-foreground truncate">
                            • {product.title}
                          </p>
                        ))}
                        {category.count > 3 && (
                          <p className="text-xs text-muted-foreground italic">
                            +{category.count - 3} more items
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Category Products View */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedCategory(null)}
                    className="mb-2 p-0 h-auto text-primary hover:text-primary/80"
                  >
                    ← Back to Categories
                  </Button>
                  <h2 className="text-2xl font-bold">
                    {selectedCategoryData?.name}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedCategoryData?.count} products in this category
                  </p>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-3">
                  <div className="flex border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
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
        <div className="mt-12 text-center">
          <h3 className="mb-4 font-semibold text-lg">Looking for something specific?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/shopping">Browse All Products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/shopping/sale-items">View Sale Items</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/shopping/new-arrivals">New Arrivals</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
