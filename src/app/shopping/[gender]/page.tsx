"use client";
import CategoryCard from "@/components/CategoryCard";
import { mockProductData } from "@/lib/constants";
import { GenderCategories } from "@/lib/types";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

/**
 * @description A page component that displays categories based on the gender parameter.
 * It fetches category data based on the gender specified in the route parameters.
 * It handles loading states and displays a message when no categories are found.
 *
 * @returns {JSX.Element} A React component that renders the categories for a given gender.
 */
const GenderPage = (): JSX.Element => {
  const { gender } = useParams(); // gender will be either a string or an array
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if gender is available and is a string (if it's an array, handle accordingly)
    // Ensure gender is a string
    if (typeof gender === "string") {
      try {
        // Flatten the mock data to make it easier to work with
        const categoryData = (mockProductData as GenderCategories)[gender];

        // Check if the category data exists and flatten it
        if (categoryData) {
          const productsArray = Array.isArray(categoryData)
            ? categoryData
            : Object.values(categoryData); // Extract values as an array if not already an array
          console.log("Products Array from the page", productsArray);
          setCategories(productsArray); // Set the products state to the array
        } else {
          console.warn("Product data not found");
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false); // If gender is not a valid string, stop loading
    }
  }, [gender]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle case where no categories are found
  if (categories.length === 0) {
    return <div>No categories found for this gender.</div>;
  }

  // Render the categories if data is available
  return (
    <main className="mx-auto sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {gender && (
          <h1 className="text-3xl font-bold tracking-tight">
            {typeof gender === "string" &&
              `${gender.charAt(0).toUpperCase()}${gender.slice(1)} Categories`}
          </h1>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={`${category.slug}-${index}`}
              category={category}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default GenderPage;
