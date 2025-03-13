"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CategoryCard from "@/components/CategoryCard";
import { useParams } from "next/navigation";

const GenderPage = () => {
  const router = useRouter();
  const { gender } = useParams(); // gender will be either a string or an array

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if gender is available and is a string (if it's an array, handle accordingly)
    if (typeof gender === "string") {
      const fetchCategoryData = async () => {
        try {
          // Fetch categories data based on gender
          const response = await fetch(`/api/categories/${gender}`);
          const data = await response.json();

          if (response.ok) {
            setCategories(data); // Assuming the API returns a list of categories for the gender
          } else {
            console.error("Categories not found for gender:", gender);
          }
        } catch (error) {
          console.error("Error fetching categories data", error);
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
