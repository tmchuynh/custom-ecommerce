"use client";

import {
  ProductContextType,
  ProductFilters,
  SortOption,
} from "@/lib/interfaces";
import { mockProductData } from "@/lib/mockProductData";
import { Color, DetailItem, ProductType } from "@/lib/types";
import React, { createContext, useContext, useMemo } from "react";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

/**
 * Product Provider Component
 *
 * A React Context Provider that manages product-related functionality across the application.
 * It provides methods for retrieving product information, categories, and other product-related data.
 *
 * @component
 * @example
 * ```tsx
 * <ProductProvider>
 *   <App />
 * </ProductProvider>
 * ```
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the product context
 * @returns {React.ReactNode} The provider component with the product context
 */
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  // Convert mockProductData into a flat array for easier manipulation
  const allProducts = useMemo(() => {
    const products: ProductType[] = [];

    for (const [gender, categoryData] of Object.entries(mockProductData)) {
      for (const [category, subCategoryData] of Object.entries(categoryData)) {
        for (const [subcategory, productsData] of Object.entries(
          subCategoryData
        )) {
          for (const product of Object.values(
            productsData as Record<string, ProductType>
          )) {
            // Add metadata to each product
            products.push({
              ...(product as ProductType),
              gender,
              category,
              subcategory,
            });
          }
        }
      }
    }

    return products;
  }, []);

  /**
   * Retrieves a product from the mockProductData based on its name and returns its complete information.
   *
   * @param name - The name of the product to retrieve.
   * @returns {object | undefined} An object containing the complete product information if found, otherwise undefined.
   */
  const getProductByName = (name: string): ProductType | undefined => {
    // Use the flattened products array for more efficient lookup
    const product = allProducts.find((p) => p.name === name);

    if (!product) return undefined;

    return {
      name: product.name,
      description: product.description,
      gender: product.gender,
      category: product.category,
      highlights: product.highlights || [],
      subcategory: product.subcategory,
      images: product.images || [],
      details: product.details || [],
      colors: product.colors || [],
      imageSrc: product.imageSrc || "",
      quantity: product.quantity,
      price: product.price || "",
      badge: product.badge,
    };
  };

  const getProductsByCategory = (categoryObj: Record<string, any>) => {
    // Find the first subcategory
    const firstSubcategoryKey = Object.keys(categoryObj)[0];

    if (!firstSubcategoryKey) return undefined;

    // Get products from the first subcategory
    const subcategoryProducts = categoryObj[firstSubcategoryKey];

    // If the subcategory has products and the first product is an array, get the first item
    if (Array.isArray(subcategoryProducts) && subcategoryProducts.length > 0) {
      return subcategoryProducts[0];
    }

    // Default return if no product is found
    return {
      description: "",
      imageSrc: "/default.jpg",
    };
  };

  /**
   * Retrieves all subcategories that belong to a specific gender.
   *
   * @param gender - The gender to get subcategories for.
   * @param category - Optional parameter to filter by category.
   * @returns {string[]} An array of subcategory names.
   */
  const getSubcategoriesByGender = (
    gender: string,
    category?: string
  ): string[] => {
    const results: string[] = [];

    if (!(gender in mockProductData)) return results;

    for (const [productCategory, subCategoryData] of Object.entries(
      mockProductData[gender as keyof typeof mockProductData]
    )) {
      // Skip this category if a category filter is provided and doesn't match
      if (category && category !== productCategory) continue;

      for (const subcategory of Object.keys(subCategoryData)) {
        if (!results.includes(subcategory)) {
          results.push(subcategory);
        }
      }
    }

    return results;
  };

  /**
   * Searches products based on a query string.
   *
   * @param query - The search query to match against product names and descriptions
   * @returns An array of products that match the search query
   */
  const searchProducts = (query: string): ProductType[] => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase().trim();

    return allProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const descriptionMatch = product.description
        ?.toLowerCase()
        .includes(searchTerm);
      return nameMatch || descriptionMatch;
    });
  };

  /**
   * Filters products based on various criteria.
   *
   * @param filters - The filter criteria to apply
   * @returns An array of products that match the filter criteria
   */
  const filterProducts = (filters: ProductFilters): ProductType[] => {
    return allProducts.filter((product) => {
      // Gender filter
      if (filters.gender && product.gender !== filters.gender) {
        return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Subcategory filter
      if (filters.subcategory && product.subcategory !== filters.subcategory) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const price =
          typeof product.price === "string"
            ? parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
            : product.price || 0;

        if (price < filters.priceRange.min || price > filters.priceRange.max) {
          return false;
        }
      }

      // Colors filter
      if (filters.colors && filters.colors.length > 0) {
        if (
          !product.colors ||
          !product.colors.some((color) =>
            filters.colors?.includes(color.name.toLowerCase())
          )
        ) {
          return false;
        }
      }

      // On sale filter
      if (filters.onSale) {
        if (!product.badge || !product.badge.toLowerCase().includes("sale")) {
          return false;
        }
      }

      return true;
    });
  };

  /**
   * Gets related products based on a product name.
   *
   * @param productName - The name of the product to find related items for
   * @param limit - Optional maximum number of related products to return
   * @returns An array of related products
   */
  const getRelatedProducts = (
    productName: string,
    limit = 4
  ): ProductType[] => {
    const product = allProducts.find((p) => p.name === productName);

    if (!product) return [];

    // Find products in the same category and subcategory
    const relatedProducts = allProducts.filter(
      (p) =>
        p.name !== productName &&
        p.category === product.category &&
        p.subcategory === product.subcategory
    );

    // Shuffle the array to get random related products
    const shuffled = [...relatedProducts].sort(() => 0.5 - Math.random());

    // Return limited number of products
    return shuffled.slice(0, limit);
  };

  /**
   * Gets featured products.
   *
   * @param limit - Optional maximum number of featured products to return
   * @returns An array of featured products
   */
  const getFeaturedProducts = (limit = 8): ProductType[] => {
    // Get products with 'featured' badge or tag
    const featured = allProducts.filter((product) =>
      product.badge?.toLowerCase().includes("featured")
    );

    // If no products explicitly marked as featured, return some random products
    if (featured.length === 0) {
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    }

    return featured.slice(0, limit);
  };

  /**
   * Gets the newest products in the store.
   *
   * @param limit - Optional maximum number of new arrivals to return
   * @returns An array of the newest products
   */
  const getNewArrivals = (limit = 8): ProductType[] => {
    // Get products with 'new' badge
    const newProducts = allProducts.filter((product) =>
      product.badge?.toLowerCase().includes("new")
    );

    // Sort by newest first (in a real app, you'd sort by date added)
    const sorted = [...newProducts];

    return sorted.slice(0, limit);
  };

  /**
   * Sorts an array of products based on the specified sort option.
   *
   * @param products - The array of products to sort
   * @param sortBy - The sorting criteria
   * @returns A sorted array of products
   */
  const sortProducts = (
    products: ProductType[],
    sortBy: SortOption
  ): ProductType[] => {
    const sorted = [...products];

    switch (sortBy) {
      case "price-low-to-high":
        return sorted.sort((a, b) => {
          const priceA =
            typeof a.price === "string"
              ? parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
              : a.price || 0;
          const priceB =
            typeof b.price === "string"
              ? parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
              : b.price || 0;
          return priceA - priceB;
        });

      case "price-high-to-low":
        return sorted.sort((a, b) => {
          const priceA =
            typeof a.price === "string"
              ? parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
              : a.price || 0;
          const priceB =
            typeof b.price === "string"
              ? parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
              : b.price || 0;
          return priceB - priceA;
        });

      case "newest":
        // In a real app, you'd sort by date added
        return sorted.sort((a, b) => {
          if (a.badge?.includes("new") && !b.badge?.includes("new")) return -1;
          if (!a.badge?.includes("new") && b.badge?.includes("new")) return 1;
          return 0;
        });

      case "popular":
        // In a real app, you'd sort by popularity metrics
        return sorted;

      default:
        return sorted;
    }
  };

  /**
   * Gets products within a specific price range.
   *
   * @param min - Minimum price
   * @param max - Maximum price
   * @returns An array of products within the specified price range
   */
  const getProductsByPriceRange = (min: number, max: number): ProductType[] => {
    return allProducts.filter((product) => {
      const price =
        typeof product.price === "string"
          ? parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
          : product.price || 0;

      return price >= min && price <= max;
    });
  };

  return (
    <ProductContext.Provider
      value={{
        getProductByName,
        getProductsByCategory,
        getSubcategoriesByGender,
        searchProducts,
        filterProducts,
        getRelatedProducts,
        getFeaturedProducts,
        getNewArrivals,
        sortProducts,
        getProductsByPriceRange,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

/**
 * @returns {ProductContextType} The product context.
 * @throws {Error} If the hook is used outside of a ProductProvider.
 */
export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
