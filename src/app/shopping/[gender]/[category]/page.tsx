"use client";
import ProductCard from "@/components/ProductCard";
import { mockProductData } from "@/lib/mockProductData";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

/**
 * `CategoryPage` is a functional component that renders a page displaying products based on the specified gender and category.
 * It fetches product data based on the `gender` and `category` route parameters using the `useParams` hook from 'next/navigation'.
 * The component manages its state using `useState` for storing the products and a loading flag.
 * It uses `useEffect` to fetch the product data when the `gender` or `category` parameters change.
 * The component displays a loading message while fetching data, a "no items found" message if no products are available,
 * and a grid of `ProductCard` components to display the products.
 *
 * @returns {JSX.Element} A JSX element representing the category page.
 */
const CategoryPage = (): JSX.Element => {
  const { gender, category } = useParams();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (gender && category) {
      console.log("Gender", gender);
      console.log("Category", category);
      /**
       * Fetches and processes product data based on the current gender and category.
       *
       * This function retrieves product information from the mock data store, organizing it by:
       * 1. Finding the appropriate gender section
       * 2. Finding the specified category within that gender
       * 3. Flattening the nested subcategories into a single product array
       *
       * The function does not directly return values but updates component state:
       * - Sets the products state with the flattened array of products
       * - Sets the loading state to false when complete, regardless of success or failure
       *
       * @throws Logs error to console if the data cannot be found or processed
       */
      const fetchItemsData = async () => {
        try {
          // Flatten the mock data to make it easier to work with
          const categoryData = (mockProductData as any)[gender as string]?.[
            category as string
          ];
          console.log(Object.keys(categoryData));

          setSelectedGender(gender as string);
          setSelectedCategory(category as string);

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
          <h1 className="text-3xl font-bold tracking-tight">
            {typeof gender === "string" &&
              gender.charAt(0).toUpperCase() + gender.slice(1)}{" "}
            {typeof category === "string" &&
              category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {products.map((product, index) => {
            return (
              <ProductCard
                key={index}
                product={product}
                selectedGender={selectedGender}
                selectedCategory={selectedCategory}
                selectedItem={product.itemType} // Use the item type instead of product name
                index={index}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
