"use client";

import { useEffect, useState, useCallback } from "react";
import { ProductItem, DummyJSONProductsResponse } from "@/lib/interfaces";
import ProductGrid from "@/components/products/ProductGrid";
import FilterSidebar from "@/components/filters/FilterSidebar";

interface CategoryPageProps {
  params: {
    categorySlug: string;
  };
}

interface Filters {
  priceRange?: { min?: number; max?: number };
  sortBy?: string; // e.g., 'price-asc', 'price-desc', 'rating-desc', 'title-asc', 'title-desc'
  // Add other potential filters like brand, stock status etc. later
}

// Helper function to format category names (e.g., "mens-shirts" -> "Men's Shirts")
function formatCategoryName(slug: string): string {
  if (!slug) return "Category";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function getProductsByCategory(
  categorySlug: string
): Promise<ProductItem[]> {
  if (!categorySlug) {
    console.warn("Category slug is missing.");
    return [];
  }
  try {
    const res = await fetch(
      `https://dummyjson.com/products/category/${encodeURIComponent(
        categorySlug
      )}`
    );
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary if not caught locally
      throw new Error(
        `Failed to fetch products for category '${categorySlug}': ${res.status}`
      );
    }
    const data: DummyJSONProductsResponse = await res.json();
    return data.products || []; // Ensure products array is returned
  } catch (error) {
    console.error("Error in getProductsByCategory:", error);
    throw error; // Re-throw to be caught by the component
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = params;
  const [allProducts, setAllProducts] = useState<ProductItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Filters>({});

  useEffect(() => {
    async function fetchData() {
      if (!categorySlug) {
        setError("Category not specified.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const fetchedProducts = await getProductsByCategory(categorySlug);
        setAllProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts); // Initially, all products are shown
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "An unknown error occurred while fetching products."
        );
        setAllProducts([]);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [categorySlug]);

  const handleFilterChange = useCallback((filters: Filters) => {
    setActiveFilters(filters);
  }, []);

  useEffect(() => {
    let productsToFilter = [...allProducts];

    // Apply price range filter
    if (activeFilters.priceRange) {
      productsToFilter = productsToFilter.filter((product) => {
        const price = product.price; // Price is already a number from DummyJSON
        const min = activeFilters.priceRange?.min;
        const max = activeFilters.priceRange?.max;
        if (min !== undefined && price < min) return false;
        if (max !== undefined && price > max) return false;
        return true;
      });
    }

    // Apply sorting
    if (activeFilters.sortBy) {
      productsToFilter.sort((a, b) => {
        const priceA = a.price;
        const priceB = b.price;
        const ratingA = a.rating ?? 0;
        const ratingB = b.rating ?? 0;
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        switch (activeFilters.sortBy) {
          case "price-asc":
            return priceA - priceB;
          case "price-desc":
            return priceB - priceA;
          case "rating-desc":
            return ratingB - ratingA;
          case "title-asc":
            return titleA.localeCompare(titleB);
          case "title-desc":
            return titleB.localeCompare(titleA);
          // Add more sorting options if needed (e.g., by discountPercentage)
          default:
            return 0;
        }
      });
    }

    setFilteredProducts(productsToFilter);
  }, [allProducts, activeFilters]);

  const displayCategoryName = formatCategoryName(categorySlug);

  return (
    <div className="mx-auto px-4 py-8 container">
      <h1 className="mb-8 font-bold text-3xl text-center md:text-left">
        {displayCategoryName}
      </h1>
      <div className="flex md:flex-row flex-col gap-8">
        <FilterSidebar onFilterChange={handleFilterChange} />
        <main className="md:flex-1 w-full">
          {loading && <p className="text-center">Loading products...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          {!loading &&
            !error &&
            filteredProducts.length === 0 &&
            allProducts.length > 0 && (
              <p className="text-center">
                No products found matching your current filters.
              </p>
            )}
          {!loading && !error && allProducts.length === 0 && (
            <p className="text-center">No products found in this category.</p>
          )}
          {!loading && !error && filteredProducts.length > 0 && (
            <ProductGrid products={filteredProducts} />
          )}
        </main>
      </div>
    </div>
  );
}
