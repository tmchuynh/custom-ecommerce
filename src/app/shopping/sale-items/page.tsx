"use client";

import { getAllProducts } from "@/api/products";
import ProductGrid from "@/components/products/ProductGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductItem } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { 
  Grid3X3, 
  List, 
  Percent, 
  Search, 
  Tag, 
  TrendingDown,
  X 
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

interface SaleFilters {
  sortBy?: string;
  minDiscount?: number;
  category?: string;
}

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 48, 96];
const DISCOUNT_RANGES = [
  { label: "All Discounts", value: 0 },
  { label: "10%+ Off", value: 10 },
  { label: "20%+ Off", value: 20 },
  { label: "30%+ Off", value: 30 },
  { label: "40%+ Off", value: 40 },
  { label: "50%+ Off", value: 50 },
];

export default function SaleItemsPage() {
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [saleProducts, setSaleProducts] = useState<ProductItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilters, setActiveFilters] = useState<SaleFilters>({});
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch products and filter for sale items
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await getAllProducts();
        setAllProducts(products);

        // Filter for products with discounts
        const onSale = products.filter(
          (product) => product.discountPercentage && product.discountPercentage > 0
        );
        setSaleProducts(onSale);
        setFilteredProducts(onSale);

        // Extract unique categories from sale products
        const uniqueCategories = Array.from(
          new Set(onSale.map((product) => product.category))
        ).sort();
        setCategories(uniqueCategories);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load sale products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Apply filters
  const applyFilters = useCallback(
    (filters: SaleFilters) => {
      let filtered = [...saleProducts];

      // Minimum discount filter
      if (filters.minDiscount && filters.minDiscount > 0) {
        filtered = filtered.filter(
          (product) =>
            product.discountPercentage &&
            product.discountPercentage >= filters.minDiscount!
        );
      }

      // Category filter
      if (filters.category && filters.category !== "all") {
        filtered = filtered.filter(
          (product) => product.category === filters.category
        );
      }

      // Sort filter
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "discount:desc":
            filtered.sort(
              (a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0)
            );
            break;
          case "discount:asc":
            filtered.sort(
              (a, b) => (a.discountPercentage || 0) - (b.discountPercentage || 0)
            );
            break;
          case "price:asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price:desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "title:asc":
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "title:desc":
            filtered.sort((a, b) => b.title.localeCompare(a.title));
            break;
          default:
            break;
        }
      }

      setFilteredProducts(filtered);
      setCurrentPage(1);
    },
    [saleProducts]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (newFilters: SaleFilters) => {
      const updatedFilters = { ...activeFilters, ...newFilters };
      setActiveFilters(updatedFilters);
      applyFilters(updatedFilters);
    },
    [activeFilters, applyFilters]
  );

  // Clear filters
  const clearFilters = () => {
    setActiveFilters({});
    applyFilters({});
  };

  // Calculate savings statistics
  const savingsStats = useMemo(() => {
    if (saleProducts.length === 0) return { totalSavings: 0, averageDiscount: 0 };

    const totalSavings = saleProducts.reduce((sum, product) => {
      if (product.discountPercentage) {
        const originalPrice = product.price / (1 - product.discountPercentage / 100);
        return sum + (originalPrice - product.price);
      }
      return sum;
    }, 0);

    const averageDiscount =
      saleProducts.reduce((sum, product) => sum + (product.discountPercentage || 0), 0) /
      saleProducts.length;

    return { totalSavings, averageDiscount };
  }, [saleProducts]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Active filter count
  const activeFilterCount = Object.values(activeFilters).filter(
    (value) => value !== undefined && value !== "" && value !== "all" && value !== 0
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto px-4 py-8 container">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="mx-auto mb-4 border-primary border-b-2 rounded-full w-12 h-12 animate-spin"></div>
              <p className="text-muted-foreground">Loading sale items...</p>
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
                <X className="mx-auto w-12 h-12" />
              </div>
              <h2 className="mb-2 font-semibold text-xl">Failed to load sale items</h2>
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
          <div className="flex items-center gap-3 mb-2">
            <Tag className="w-8 h-8 text-red-500" />
            <h1 className="font-bold text-4xl text-foreground">Sale Items</h1>
          </div>
          <p className="text-muted-foreground">
            Don't miss out on these amazing deals and discounts!
          </p>
        </div>

        {/* Sale Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border-red-200 dark:border-red-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Percent className="w-8 h-8 text-red-500" />
                <div>
                  <p className="text-sm text-red-600 dark:text-red-400">Items on Sale</p>
                  <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                    {saleProducts.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">Avg. Discount</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {savingsStats.averageDiscount.toFixed(1)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Tag className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Categories</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {categories.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/20 dark:to-violet-950/20 border-purple-200 dark:border-purple-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Search className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Best Deal</p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {Math.max(...saleProducts.map(p => p.discountPercentage || 0)).toFixed(0)}% Off
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Bar */}
        <div className="shadow-sm mb-8 p-4 border border-border rounded-xl">
          <div className="flex lg:flex-row flex-col justify-between items-start lg:items-center gap-4">
            {/* Left side - Active filters */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-medium text-sm">Filters:</span>
              
              {activeFilters.minDiscount && activeFilters.minDiscount > 0 && (
                <Badge variant="secondary" className="gap-1">
                  {activeFilters.minDiscount}%+ Off
                  <X
                    className="w-3 h-3 hover:text-destructive cursor-pointer"
                    onClick={() => handleFilterChange({ minDiscount: 0 })}
                  />
                </Badge>
              )}
              
              {activeFilters.category && activeFilters.category !== "all" && (
                <Badge variant="secondary" className="gap-1">
                  {activeFilters.category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                  <X
                    className="w-3 h-3 hover:text-destructive cursor-pointer"
                    onClick={() => handleFilterChange({ category: "all" })}
                  />
                </Badge>
              )}

              {activeFilterCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="px-2 h-6 text-xs"
                >
                  Clear all
                </Button>
              )}
            </div>

            {/* Right side - Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-muted-foreground text-sm whitespace-nowrap">
                {filteredProducts.length} sale items
              </span>

              {/* Discount filter */}
              <Select
                value={activeFilters.minDiscount?.toString() || "0"}
                onValueChange={(value) =>
                  handleFilterChange({ minDiscount: Number(value) })
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DISCOUNT_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value.toString()}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Category filter */}
              <Select
                value={activeFilters.category || "all"}
                onValueChange={(value) => handleFilterChange({ category: value })}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Items per page */}
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => setItemsPerPage(Number(value))}
              >
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option.toString()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View mode toggle */}
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

              {/* Sort dropdown */}
              <Select
                value={activeFilters.sortBy || "discount:desc"}
                onValueChange={(value) => handleFilterChange({ sortBy: value })}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="discount:desc">Highest Discount</SelectItem>
                  <SelectItem value="discount:asc">Lowest Discount</SelectItem>
                  <SelectItem value="price:asc">Price: Low to High</SelectItem>
                  <SelectItem value="price:desc">Price: High to Low</SelectItem>
                  <SelectItem value="title:asc">Name: A to Z</SelectItem>
                  <SelectItem value="title:desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products Display */}
        <div className="flex lg:flex-row flex-col gap-8">
          <div className="flex-1">
            {currentProducts.length === 0 ? (
              <div className="shadow-sm p-12 border border-border rounded-xl text-center">
                <div className="mb-4 text-muted-foreground">
                  <Tag className="opacity-50 mx-auto w-12 h-12" />
                </div>
                <h3 className="mb-2 font-medium text-lg">No sale items found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or check back later for new deals
                </p>
                <Button asChild>
                  <Link href="/shopping">Browse All Products</Link>
                </Button>
              </div>
            ) : (
              <>
                <ProductGrid products={currentProducts} viewMode={viewMode} />

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              currentPage > 1 && setCurrentPage(currentPage - 1)
                            }
                            className={
                              currentPage <= 1
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>

                        {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 7) {
                            pageNum = i + 1;
                          } else if (currentPage <= 4) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 3) {
                            pageNum = totalPages - 6 + i;
                          } else {
                            pageNum = currentPage - 3 + i;
                          }

                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                onClick={() => setCurrentPage(pageNum)}
                                isActive={currentPage === pageNum}
                                className="cursor-pointer"
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              currentPage < totalPages &&
                              setCurrentPage(currentPage + 1)
                            }
                            className={
                              currentPage >= totalPages
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h3 className="mb-4 font-semibold text-lg">Looking for more?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/shopping">Browse All Products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/shopping/categories">Shop by Category</Link>
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
