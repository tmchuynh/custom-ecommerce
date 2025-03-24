"use client";

import { ProductContextType } from "@/lib/interfaces";
import { mockProductData } from "@/lib/mockProductData";
import { ProductFilters, ProductType, SortOption } from "@/lib/types";
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
   * Retrieves a product by its name from the list of all products.
   *
   * @param name - The name of the product to search for.
   * @returns The product object if found, or `undefined` if no product matches the given name.
   *
   * The returned product object includes the following properties:
   * - `name`: The name of the product.
   * - `description`: A description of the product.
   * - `gender`: The gender category of the product.
   * - `category`: The main category of the product.
   * - `highlights`: An array of highlight features for the product (default is an empty array).
   * - `subcategory`: The subcategory of the product.
   * - `images`: An array of image URLs for the product (default is an empty array).
   * - `details`: An array of detailed information about the product (default is an empty array).
   * - `colors`: An array of available colors for the product (default is an empty array).
   * - `imageSrc`: The source URL of the main product image (default is an empty string).
   * - `quantity`: The available quantity of the product.
   * - `price`: The price of the product (default is an empty string).
   * - `badge`: Any badge or label associated with the product.
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

  /**
   * Retrieves the first product from the first subcategory of a given category object.
   *
   * @param categoryObj - A record representing the category object, where keys are subcategory names
   * and values are arrays of products or other data.
   *
   * @returns The first product from the first subcategory if available. If the subcategory has no products,
   * returns a default product object with a placeholder description and image. Returns `undefined` if the
   * category object has no subcategories.
   */
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
   * Retrieves a list of unique subcategories based on the specified gender and optional category filter.
   *
   * @param gender - The gender to filter the subcategories by (e.g., "male", "female").
   * @param category - (Optional) A specific category to further filter the subcategories. If not provided, all categories for the given gender are considered.
   * @returns An array of unique subcategory names that match the specified gender and optional category filter.
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
   * Searches for products that match the given query string.
   *
   * This function filters the list of all products by checking if the query string
   * is included in the product's name or description. The search is case-insensitive
   * and trims any leading or trailing whitespace from the query.
   *
   * @param query - The search term to filter products by. If the query is empty or only whitespace, an empty array is returned.
   * @returns An array of products that match the search term in their name or description.
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
   * Filters a list of products based on the provided filter criteria.
   *
   * @param {ProductFilters} filters - The filter criteria to apply to the products.
   *   - `gender` (optional): Filters products by gender (e.g., "male", "female").
   *   - `category` (optional): Filters products by category (e.g., "clothing", "accessories").
   *   - `subcategory` (optional): Filters products by subcategory (e.g., "shirts", "shoes").
   *   - `priceRange` (optional): Filters products within a specific price range.
   *     - `min`: The minimum price.
   *     - `max`: The maximum price.
   *   - `colors` (optional): Filters products by available colors. Matches color names (case-insensitive).
   *   - `onSale` (optional): Filters products that are on sale. Matches products with a "sale" badge.
   *
   * @returns {ProductType[]} An array of products that match the specified filter criteria.
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
   * Retrieves a list of related products based on the given product name.
   * The related products are determined by matching the category and subcategory
   * of the specified product, excluding the product itself. The results are shuffled
   * to provide randomness and limited to a specified number.
   *
   * @param productName - The name of the product to find related products for.
   * @param limit - The maximum number of related products to return (default is 4).
   * @returns An array of related products of type `ProductType`. Returns an empty array
   *          if the product is not found or no related products exist.
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
   * Retrieves a list of featured products, either explicitly marked with a "featured" badge
   * or randomly selected if no featured products are found.
   *
   * @param {number} [limit=8] - The maximum number of products to return. Defaults to 8.
   * @returns {ProductType[]} An array of featured products, limited to the specified number.
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
   * Retrieves a list of new arrival products, limited to a specified number.
   *
   * This function filters the products that have a "new" badge (case-insensitive),
   * sorts them (currently no specific sorting logic is applied beyond filtering),
   * and returns a subset of the products based on the provided limit.
   *
   * @param {number} [limit=8] - The maximum number of products to return. Defaults to 8.
   * @returns {ProductType[]} An array of products marked as "new", limited to the specified count.
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
   * Sorts an array of products based on the specified sorting option.
   *
   * @param products - An array of products to be sorted. Each product should conform to the `ProductType` interface.
   * @param sortBy - The sorting option to determine the order of the products.
   *                 Possible values:
   *                 - `"price-low-to-high"`: Sorts products by price in ascending order.
   *                 - `"price-high-to-low"`: Sorts products by price in descending order.
   *                 - `"newest"`: Sorts products by their "new" badge, prioritizing products marked as new.
   *                 - `"popular"`: Returns the products as-is (no sorting applied).
   *                 - Any other value will return the products as-is.
   *
   * @returns A new array of products sorted based on the specified sorting option.
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
   * Filters the list of products to return only those within the specified price range.
   *
   * @param min - The minimum price (inclusive) of the range.
   * @param max - The maximum price (inclusive) of the range.
   * @returns An array of products whose prices fall within the specified range.
   *
   * @remarks
   * - If the product price is a string, it will be parsed into a number by removing any non-numeric characters.
   * - If the product price is undefined or invalid, it defaults to 0.
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
 * Custom hook to access the ProductContext.
 *
 * This hook provides access to the ProductContext, allowing components
 * to consume the context's values. It ensures that the hook is used
 * within a valid `ProductProvider` by throwing an error if the context
 * is not available.
 *
 * @returns {ProductContextType} The current value of the ProductContext.
 * @throws {Error} If the hook is used outside of a `ProductProvider`.
 */
export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
