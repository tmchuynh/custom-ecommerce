"use client";

import { getAllProducts } from "@/api/products";
import ProductGrid from "@/components/products/ProductGrid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { ChevronDown, Filter, Grid3X3, List, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

interface Filters {
  priceRange?: { min?: number; max?: number };
  sortBy?: string;
  searchQuery?: string;
  category?: string;
}

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 48, 96];

export default function ShoppingPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filters>({});
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch all products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const allProducts = await getAllProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(allProducts.map((product) => product.category))
        ).sort();
        setCategories(uniqueCategories);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Apply filters whenever filters or products change
  const applyFilters = useCallback(
    (filters: Filters) => {
      let filtered = [...products];

      // Search filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (product) =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.brand?.toLowerCase().includes(query)
        );
      }

      // Category filter
      if (filters.category && filters.category !== "all") {
        filtered = filtered.filter(
          (product) => product.category === filters.category
        );
      }

      // Price range filter
      if (
        filters.priceRange?.min !== undefined ||
        filters.priceRange?.max !== undefined
      ) {
        filtered = filtered.filter((product) => {
          const price = product.price;
          const minValid =
            filters.priceRange?.min === undefined ||
            price >= filters.priceRange.min;
          const maxValid =
            filters.priceRange?.max === undefined ||
            price <= filters.priceRange.max;
          return minValid && maxValid;
        });
      }

      // Sort filter
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "price:asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price:desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "rating:desc":
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
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
      setCurrentPage(1); // Reset to first page when filters change
    },
    [products]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (newFilters: Filters) => {
      const updatedFilters = { ...activeFilters, ...newFilters };
      setActiveFilters(updatedFilters);
      applyFilters(updatedFilters);
    },
    [activeFilters, applyFilters]
  );

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({});
    applyFilters({});
  };

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Generate pagination items
  const paginationItems = useMemo(() => {
    const items = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 4) {
        items.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        items.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        items.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return items;
  }, [currentPage, totalPages]);

  // Count active filters
  const activeFilterCount = Object.values(activeFilters).filter(
    (value) => value !== undefined && value !== "" && value !== "all"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="mx-auto px-4 py-8 container">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="text-center">
              <div className="mx-auto mb-4 border-primary border-b-2 rounded-full w-12 h-12 animate-spin"></div>
              <p className="text-muted-foreground">Loading products...</p>
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
              <h2 className="mb-2 font-semibold text-xl">
                Failed to load products
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
      <div className="mx-auto px-4 py-8 container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-4xl text-foreground">
            Shop All Products
          </h1>
          <p className="text-muted-foreground">
            Discover our complete collection of premium products
          </p>
        </div>

        {/* Filter and Sort Bar */}
        <div className="shadow-sm mb-8 p-4 border border-border rounded-xl">
          <div className="flex lg:flex-row flex-col justify-between items-start lg:items-center gap-4">
            {/* Left side - Filter toggle and active filters */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="flex justify-center items-center ml-1 p-0 rounded-full w-5 h-5 text-xs"
                  >
                    {activeFilterCount}
                  </Badge>
                )}
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    showFilters && "rotate-180"
                  )}
                />
              </Button>

              {/* Active filters */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  {activeFilters.searchQuery && (
                    <Badge variant="secondary" className="gap-1">
                      Search: {activeFilters.searchQuery}
                      <X
                        className="w-3 h-3 hover:text-destructive cursor-pointer"
                        onClick={() =>
                          handleFilterChange({ searchQuery: undefined })
                        }
                      />
                    </Badge>
                  )}
                  {activeFilters.category &&
                    activeFilters.category !== "all" && (
                      <Badge variant="secondary" className="gap-1">
                        Category: {activeFilters.category}
                        <X
                          className="w-3 h-3 hover:text-destructive cursor-pointer"
                          onClick={() =>
                            handleFilterChange({ category: undefined })
                          }
                        />
                      </Badge>
                    )}
                  {(activeFilters.priceRange?.min ||
                    activeFilters.priceRange?.max) && (
                    <Badge variant="secondary" className="gap-1">
                      Price: ${activeFilters.priceRange?.min || 0} - $
                      {activeFilters.priceRange?.max || "∞"}
                      <X
                        className="w-3 h-3 hover:text-destructive cursor-pointer"
                        onClick={() =>
                          handleFilterChange({ priceRange: undefined })
                        }
                      />
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="px-2 h-6 text-xs"
                  >
                    Clear all
                  </Button>
                </div>
              )}
            </div>

            {/* Right side - View mode, sort, and pagination controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Results count */}
              <span className="text-muted-foreground text-sm whitespace-nowrap">
                {filteredProducts.length} products
              </span>

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
                value={activeFilters.sortBy || "default"}
                onValueChange={(value) =>
                  handleFilterChange({
                    sortBy: value === "default" ? undefined : value,
                  })
                }
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price:asc">Price: Low to High</SelectItem>
                  <SelectItem value="price:desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating:desc">
                    Rating: High to Low
                  </SelectItem>
                  <SelectItem value="title:asc">Name: A to Z</SelectItem>
                  <SelectItem value="title:desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex lg:flex-row flex-col gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="lg:w-80 shrink-0">
              <div className="shadow-sm p-6 border rounded-xl">
                <div className="space-y-6">
                  {/* Search */}
                  <div>
                    <label className="block mb-3 font-medium text-sm">
                      Search Products
                    </label>
                    <div className="relative">
                      <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground transform -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={activeFilters.searchQuery || ""}
                        onChange={(e) =>
                          handleFilterChange({ searchQuery: e.target.value })
                        }
                        className="bg-background py-2 pr-4 pl-10 border border-slate-200 focus:border-primary dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 w-full transition-colors outline-none"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div>
                    <label className="block mb-3 font-medium text-sm">
                      Category
                    </label>
                    <Select
                      value={activeFilters.category || "all"}
                      onValueChange={(value) =>
                        handleFilterChange({ category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="block mb-3 font-medium text-sm">
                      Price Range
                    </label>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <input
                          type="number"
                          placeholder="Min"
                          value={activeFilters.priceRange?.min || ""}
                          onChange={(e) =>
                            handleFilterChange({
                              priceRange: {
                                ...activeFilters.priceRange,
                                min: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              },
                            })
                          }
                          className="bg-background px-3 py-2 border border-slate-200 focus:border-primary dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 w-full transition-colors outline-none"
                        />
                      </div>
                      <span className="text-muted-foreground self-center">
                        —
                      </span>
                      <div className="flex-1">
                        <input
                          type="number"
                          placeholder="Max"
                          value={activeFilters.priceRange?.max || ""}
                          onChange={(e) =>
                            handleFilterChange({
                              priceRange: {
                                ...activeFilters.priceRange,
                                max: e.target.value
                                  ? Number(e.target.value)
                                  : undefined,
                              },
                            })
                          }
                          className="bg-background px-3 py-2 border border-slate-200 focus:border-primary dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 w-full transition-colors outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          <div className="flex-1">
            {currentProducts.length === 0 ? (
              <div className="shadow-sm p-12 border border-border rounded-xl text-center">
                <div className="mb-4 text-muted-foreground">
                  <Search className="opacity-50 mx-auto w-12 h-12" />
                </div>
                <h3 className="mb-2 font-medium text-lg">No products found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search terms
                </p>
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

                        {Array.from(
                          { length: Math.min(7, totalPages) },
                          (_, i) => {
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
                          }
                        )}

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
      </div>
    </div>
  );
}
