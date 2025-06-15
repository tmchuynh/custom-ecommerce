"use client";

import { fetchProducts } from "@/api";
import FilterSidebar from "@/components/filters/FilterSidebar";
import ProductGrid from "@/components/products/ProductGrid";
import { ProductItem } from "@/lib/interfaces";
import { useCallback, useEffect, useState } from "react";

interface CategoryClientProps {
  categorySlug: string;
}

interface Filters {
  priceRange?: { min?: number; max?: number };
  sortBy?: string;
  searchQuery?: string;
}

function formatCategoryName(slug: string): string {
  if (!slug) return "Category";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function CategoryClient({ categorySlug }: CategoryClientProps) {
  const [allFetchedProducts, setAllFetchedProducts] = useState<ProductItem[]>(
    []
  ); // Products as fetched from API
  const [displayedProducts, setDisplayedProducts] = useState<ProductItem[]>([]); // Products after all filtering/sorting
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Filters>({});

  useEffect(() => {
    async function loadData() {
      // Use categorySlug from params for initial load or when searchQuery is cleared
      const currentSearchQuery = activeFilters.searchQuery;

      // Determine if we should fetch by category or by search query
      // If searchQuery exists, prioritize search. Otherwise, use categorySlug.
      const slugForFetching = currentSearchQuery ? categorySlug : categorySlug; // If searching, categorySlug is for client-side filter
      const queryForFetching = currentSearchQuery;

      if (!slugForFetching && !queryForFetching) {
        setError("Category or search query not specified.");
        setLoading(false);
        setAllFetchedProducts([]);
        setDisplayedProducts([]);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const fetchedProducts = await fetchProducts(
          slugForFetching,
          queryForFetching
        );
        setAllFetchedProducts(fetchedProducts);
        // Initial application of filters will happen in the next useEffect
      } catch (e) {
        console.error("Error in loadData:", e);
        setError(
          e instanceof Error
            ? e.message
            : "An unknown error occurred while fetching products."
        );
        setAllFetchedProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [categorySlug, activeFilters.searchQuery]); // Re-fetch if categorySlug or searchQuery changes

  const handleFilterChange = useCallback((filters: Filters) => {
    setActiveFilters(filters);
  }, []);

  // Client-side filtering (for price) and sorting
  useEffect(() => {
    let productsToProcess = [...allFetchedProducts];

    // Apply price range filter (prices in USD from API)
    if (activeFilters.priceRange) {
      productsToProcess = productsToProcess.filter((product) => {
        const price = product.price;
        const min = activeFilters.priceRange?.min;
        const max = activeFilters.priceRange?.max;
        if (min !== undefined && price < min) return false;
        if (max !== undefined && price > max) return false;
        return true;
      });
    }

    // Apply sorting
    if (activeFilters.sortBy) {
      productsToProcess.sort((a, b) => {
        const [sortField, sortDirection] = activeFilters.sortBy!.split(":");

        let valA: string | number | undefined;
        let valB: string | number | undefined;

        switch (sortField) {
          case "price":
            valA = a.price;
            valB = b.price;
            break;
          case "rating":
            valA = a.rating ?? 0;
            valB = b.rating ?? 0;
            break;
          case "title":
            valA = a.title.toLowerCase();
            valB = b.title.toLowerCase();
            break;
          default: // Should not happen with current sort options
            valA = a.title.toLowerCase();
            valB = b.title.toLowerCase();
        }

        if (typeof valA === "number" && typeof valB === "number") {
          return sortDirection === "asc" ? valA - valB : valB - valA;
        }
        if (typeof valA === "string" && typeof valB === "string") {
          return sortDirection === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return 0;
      });
    }

    setDisplayedProducts(productsToProcess);
  }, [allFetchedProducts, activeFilters.priceRange, activeFilters.sortBy]); // Re-apply these filters if fetched products or these specific filters change

  const displayCategoryName = formatCategoryName(categorySlug);

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
        <h1 className="flex justify-center items-center gap-2 mb-4 font-bold text-4xl">
          {activeFilters.searchQuery
            ? `Search results for "${activeFilters.searchQuery}" in ${displayCategoryName}`
            : displayCategoryName}
        </h1>
        <div className="flex md:flex-row flex-col gap-8">
          <FilterSidebar onFilterChange={handleFilterChange} />
          <main className="md:flex-1 w-full">
            {loading && <p className="text-center">Loading products...</p>}
            {error && (
              <p className="text-center text-red-500">Error: {error}</p>
            )}
            {!loading &&
              !error &&
              displayedProducts.length === 0 &&
              allFetchedProducts.length > 0 && (
                <p className="text-center">
                  No products found matching your current filters.
                </p>
              )}
            {!loading &&
              !error &&
              displayedProducts.length === 0 &&
              !activeFilters.searchQuery && (
                <p className="text-center">
                  No products found in this category.
                </p>
              )}
            {!loading &&
              !error &&
              displayedProducts.length === 0 &&
              activeFilters.searchQuery && (
                <p className="text-center">
                  No products found for your search query in this category.
                </p>
              )}
            {!loading && !error && displayedProducts.length > 0 && (
              <ProductGrid products={displayedProducts} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
