"use client";
import { useCart } from "@/app/context/cartContext";
import CannotFind from "@/components/CannotFind";
import LoadingIndicator from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { navigations } from "@/lib/constants";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

/**
 * A page component that displays product categories based on the gender parameter.
 *
 * The component handles dynamic routing through the gender parameter in the URL path.
 * It fetches and displays relevant product categories for men, women, or kids.
 *
 * Features:
 * - Validates the gender parameter against allowed values (men, women, kids)
 * - Fetches categories specific to the selected gender from navigation data
 * - Transforms category data into a standardized format for display
 * - Renders a grid of product category cards with appropriate metadata
 * - Displays a loading state while fetching data
 * - Shows an appropriate message when no categories are found
 *
 * @returns {JSX.Element} A rendered page with category cards or appropriate status message
 */
const GenderPage = (): JSX.Element => {
  const { gender } = useParams(); // gender is string | string[]
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { getProductsByCategory } = useCart();

  useEffect(() => {
    /**
     * Fetches and processes category data based on the specified gender.
     *
     * This async function performs the following steps:
     * 1. Validates the gender parameter (must be 'men', 'women', or 'kids')
     * 2. Finds the corresponding gender category in the navigations data
     * 3. Processes all sections within the gender category to extract top-level categories
     * 4. Transforms each category into a standardized format with required metadata
     * 5. Updates state with the processed categories
     *
     * @throws {Error} Logs the error to console if category data fetching fails
     * @returns {Promise<void>} No return value, updates state via setCategories and setLoading
     */
    const fetchItemsData = async (): Promise<void> => {
      try {
        // Validate gender
        const validGender = typeof gender === "string" ? gender : "";
        if (!validGender || !["men", "women", "kids"].includes(validGender)) {
          setCategories([]);
          setLoading(false);
          return;
        }

        // Find the specific gender category in navigations
        const genderCategory = navigations.categories.find(
          (cat) => cat.id === validGender
        );

        if (!genderCategory) {
          setCategories([]);
          setLoading(false);
          return;
        }

        // Process the sections to get all top-level categories
        const processedCategories: any[] = [];

        // Each gender has an array of sections, and each section is an array of category objects
        genderCategory.sections.forEach((sectionGroup) => {
          sectionGroup.forEach((section) => {
            // Add this category to our processed list with proper metadata
            processedCategories.push({
              name: section.name,
              description: `Browse our ${section.name} collection`,
              imageSrc: section.imageSrc || "https://via.placeholder.com/400",
              href: section.href,
              id: section.id,
              gender: validGender,
              category: section.id,
              subcategory: "",
            });
          });
        });

        setCategories(processedCategories);
      } catch (error) {
        console.error("Error fetching category data", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItemsData();
  }, [gender, getProductsByCategory]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (categories.length === 0) {
    return <CannotFind />;
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {categories.map((category, index) => (
                <ProductCard
                  key={index}
                  product={category}
                  page={true}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default GenderPage;
