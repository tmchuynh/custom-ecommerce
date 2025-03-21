"use client";
import CategoryCard from "@/components/CategoryCard";
import { mockProductData } from "@/lib/mockProductData";
import { CategoryCardData } from "@/lib/types";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

/**
 * A wrapper component for rendering a `CategoryCard` with additional props.
 *
 * @param category - The data for the category card, adhering to the `CategoryCardData` type.
 * @param gender - A string representing the gender category (e.g., "men", "women").
 * @param [key: string] - Additional optional properties that can be passed to the component.
 *
 * @returns The rendered `CategoryCard` component with the provided category and gender.
 */
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
     * This function validates the `gender` parameter to ensure it matches one of the
     * allowed values ("men", "women", "kids"). It then retrieves the corresponding
     * product data, processes it to generate category cards, and updates the state
     * with the resulting data.
     *
     * The category cards include a representative product's description and image
     * for each top-level category. If no representative product is available, default
     * values are used.
     *
     * @async
     * @function fetchItemsData
     * @throws Will log an error if there is an issue fetching or processing the product data.
     *
     * @remarks
     * - This function assumes the presence of a `mockProductData` object containing
     *   product data categorized by gender.
     * - The function updates the following states:
     *   - `setGenderCategory` with the validated gender.
     *   - `setCategories` with the generated category cards.
     *   - `setLoading` to indicate the loading state.
     *
     * @example
     * // Example usage:
     * fetchItemsData();
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
