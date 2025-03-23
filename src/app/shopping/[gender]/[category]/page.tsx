"use client";
import ProductCard from "@/components/ProductCard";
import { mockProductData } from "@/lib/mockProductData";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

/**
 * Component representing a category page for displaying products based on gender and category.
 *
 * This component fetches and displays a list of products filtered by the selected gender and category.
 * It uses mock data to simulate product retrieval and organizes the products into a grid layout.
 *
 * @component
 * @returns {JSX.Element} The rendered category page component.
 *
 * @remarks
 * - The component uses `useParams` to extract `gender` and `category` from the URL.
 * - It fetches product data from a mock data source and processes it to include additional metadata (e.g., item type).
 * - The component displays a loading state while fetching data and handles cases where no products are found.
 *
 * @example
 * ```tsx
 * // Example usage in a route
 * <Route path="/shopping/:gender/:category" element={<CategoryPage />} />
 * ```
 *
 * @throws Logs an error to the console if the product data cannot be found or processed.
 *
 * @state
 * - `products` (`any[]`): The list of products to display.
 * - `loading` (`boolean`): Indicates whether the product data is being loaded.
 * - `selectedGender` (`string`): The currently selected gender.
 * - `selectedCategory` (`string`): The currently selected category.
 *
 * @dependencies
 * - `useParams`: To extract `gender` and `category` from the URL.
 * - `useState`: To manage component state.
 * - `useEffect`: To fetch product data when `gender` or `category` changes.
 *
 * @children
 * - Renders a grid of `ProductCard` components for each product.
 * - Displays a loading message or a "no items found" message when appropriate.
 */
const CategoryPage = (): JSX.Element => {
  const { gender, category } = useParams();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (gender && category) {
      /**
       * Fetches and processes product data based on the selected gender and category.
       *
       * This function retrieves mock product data, organizes it by item type, and updates
       * the state with the processed product list. It also handles errors and ensures
       * the loading state is properly managed.
       *
       * @async
       * @function fetchItemsData
       * @returns {Promise<void>} A promise that resolves when the product data has been fetched and processed.
       *
       * @throws Will log an error to the console if there is an issue fetching or processing the product data.
       *
       * @remarks
       * - The function assumes the existence of a `mockProductData` object containing the product data.
       * - The `gender` and `category` parameters are used to locate the relevant data within `mockProductData`.
       * - Each product is enhanced with an `itemType` property to indicate its type (e.g., boots, formal).
       *
       * @example
       * // Example usage:
       * fetchItemsData();
       */
      const fetchItemsData = async (): Promise<void> => {
        try {
          // Flatten the mock data to make it easier to work with
          const categoryData = (mockProductData as any)[gender as string]?.[
            category as string
          ];

          // Check if the category data exists and flatten it
          if (categoryData) {
            // Modified to retain item type information
            const enhancedProducts: any[] = [];

            // Iterate through each item type (boots, formal, etc.)
            Object.entries(categoryData).forEach(
              ([itemType, subCategory]: [string, any]) => {
                // Add each product with its item type
                Object.values(subCategory).forEach((product: any) => {
                  enhancedProducts.push({
                    ...product,
                    itemType: itemType, // Store the item type with each product
                  });
                });
              }
            );

            setProducts(enhancedProducts);
          } else {
            console.error("Product data not found");
          }
        } catch (error) {
          console.error("Error fetching product data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchItemsData();
    }
  }, [gender, category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No items found in this category.</div>;
  }

  return (
    <main className="mx-auto sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {gender && category && (
          <h1 className="text-4xl font-extrabold text-center mb-8">
            {typeof gender === "string" &&
              gender.charAt(0).toUpperCase() + gender.slice(1)}
            's{" "}
            {typeof category === "string" &&
              category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-10/12 md:w-11/12 mx-auto">
        {products.map((product, index) => {
          return (
            <ProductCard
              key={index}
              product={product}
              page={true}
              index={product.name}
            />
          );
        })}
      </div>
    </main>
  );
};

export default CategoryPage;
