"use client";
import CategoryCard from "@/components/CategoryCard";
import { mockProductData } from "@/lib/mockProductData";
import { CategoryCardData } from "@/lib/types";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

// Wrapper for CategoryCard to handle the component's unusual parameter structure
const CategoryCardWrapper = ({
  category,
  gender,
}: {
  category: CategoryCardData;
  gender: string;
  [key: string]: any;
}) => {
  return CategoryCard({ category }, gender);
};

const GenderPage = (): JSX.Element => {
  const { gender } = useParams(); // gender is string | string[]
  const [categories, setCategories] = useState<CategoryCardData[]>([]);
  const [genderCategory, setGenderCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    /**
     * Fetches and processes product data based on the gender parameter.
     *
     * This function validates the gender parameter, retrieves the corresponding
     * product data, and generates category cards for display. It also handles
     * errors and ensures proper state updates.
     *
     * @async
     * @function fetchItemsData
     * @throws Will log an error if the gender parameter is invalid or if there is an issue fetching product data.
     *
     * @remarks
     * - The `gender` parameter must be one of the following values: "men", "women", or "kids".
     * - The function uses mock product data to generate category cards.
     * - Each category card includes a slug, name, description, and image source.
     * - If no representative product is found for a category, default values are used for the description and image source.
     *
     * @example
     * // Example usage:
     * fetchItemsData();
     *
     * @see {@link setGenderCategory} for setting the gender category state.
     * @see {@link setCategories} for updating the category cards state.
     * @see {@link setLoading} for managing the loading state.
     */
    const fetchItemsData = async () => {
      try {
        // Ensure we have a valid string value for gender
        const validGender = Array.isArray(gender) ? gender[0] : gender;
        if (!validGender || !["men", "women", "kids"].includes(validGender)) {
          console.error("Invalid or missing gender parameter");
          return;
        }
        setGenderCategory(validGender);

        // After validation, we know validGender is one of the allowed values
        const categoryData =
          mockProductData[validGender as "men" | "women" | "kids"];
        if (categoryData) {
          // The keys represent top-level categories (e.g. "shoes", "accessories", etc.)
          const categoryKeys = Object.keys(categoryData);
          const categoryCards: CategoryCardData[] = categoryKeys.map(
            (catKey) => {
              // Get all subcategories for the current category key
              const subCategories =
                categoryData[catKey as keyof typeof categoryData];
              // Flatten the subcategories to get an array of products for this category
              const productsInCategory = Object.values(subCategories).flatMap(
                (subCategory: any) => Object.values(subCategory)
              );
              // Pick the first product as a representative (if available)
              const representativeProduct = productsInCategory[0] as {
                description?: string;
                imageSrc?: string;
              };
              return {
                slug: catKey,
                name: catKey.charAt(0).toUpperCase() + catKey.slice(1),
                description:
                  representativeProduct?.description || `Explore our ${catKey}`,
                imageSrc: representativeProduct?.imageSrc || "/default.jpg",
              };
            }
          );
          setCategories(categoryCards);
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
  }, [gender]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (categories.length === 0) {
    return <div>No categories found for this gender.</div>;
  }

  return (
    <main className="mx-auto sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {gender && (
          <h1 className="text-4xl font-extrabold text-center mb-8">
            {typeof gender === "string" &&
              gender.charAt(0).toUpperCase() + gender.slice(1)}
          </h1>
        )}

        <div className="mx-auto max-w-7xl">
          {gender && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {categories.map((category) => (
                  <CategoryCardWrapper
                    key={category.slug}
                    category={category}
                    gender={genderCategory}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default GenderPage;
