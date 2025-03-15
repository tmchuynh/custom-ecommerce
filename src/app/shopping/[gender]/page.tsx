"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CategoryCard from "@/components/CategoryCard";
import { useParams } from "next/navigation";
import { mockProductData } from "@/lib/constants";
import { GenderCategories } from "@/lib/types";

const GenderPage = () => {
  const { gender } = useParams(); // gender will be either a string or an array

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if gender is available and is a string (if it's an array, handle accordingly)
    if (typeof gender === "string") {
      const fetchCategoryData = async () => {
        try {
          // Flatten the mock data to make it easier to work with
          const categoryData = (mockProductData as GenderCategories)[
            gender as string
          ];

          // Check if the category data exists and flatten it
          if (categoryData) {
            const productsArray = Object.values(categoryData); // Extract values as an array
            setCategories(productsArray); // Set the products state to the array
          } else {
            console.error("Product data not found");
          }
        } catch (error) {
          console.error("Error fetching product data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchCategoryData();
    } else {
      setLoading(false); // If gender is not a valid string, stop loading
    }
  }, [gender]); // Re-run if gender changes

  // Handle loading state
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {typeof gender === "string" &&
              gender.charAt(0).toUpperCase() + gender.slice(1)}
            Categories
          </h1>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {categories.map((category: any) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default GenderPage;
