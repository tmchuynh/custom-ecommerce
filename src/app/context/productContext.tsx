"use client";

import { ProductContextType } from "@/lib/interfaces";
import { mockProductData } from "@/lib/mockProductData";
import { Color, DetailItem, ProductType } from "@/lib/types";
import React, { createContext, useContext } from "react";

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
  /**
   * Retrieves a product from the mockProductData based on its name and returns its complete information.
   *
   * @param name - The name of the product to retrieve.
   * @returns {object | undefined} An object containing the complete product information if found, otherwise undefined.
   */
  const getProductByName = (
    name: string
  ):
    | {
        gender: string;
        category: string;
        subcategory: string;
        name: string;
        highlights: string[];
        details: DetailItem[];
        images: string[];
        colors: Color[];
        imageSrc: string;
        price: string | number;
        badge?: string;
      }
    | undefined => {
    for (const [gender, categoryData] of Object.entries(mockProductData)) {
      for (const [category, subCategoryData] of Object.entries(categoryData)) {
        for (const [subcategory, products] of Object.entries(subCategoryData)) {
          for (const product of Object.values(
            products as Record<string, ProductType>
          )) {
            if ((product as ProductType).name === name) {
              const productData = product as ProductType;
              return {
                gender,
                category,
                subcategory,
                name: productData.name,
                highlights: productData.highlights || [],
                details: productData.details || [],
                images: productData.images || [],
                colors: productData.colors || [],
                imageSrc: productData.imageSrc || "",
                price: productData.price || 0,
                badge: productData.badge,
              };
            }
          }
        }
      }
    }
    return undefined;
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

  return (
    <ProductContext.Provider
      value={{
        getProductByName,
        getProductsByCategory,
        getSubcategoriesByGender,
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
