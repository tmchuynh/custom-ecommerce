"use client";
import { useCart } from "@/app/context/cartContext";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { navigations } from "@/lib/constants";
import { mockProductData } from "@/lib/mockProductData";
import {
  CategoryCardData,
  CategoryDetails,
  GenderCategories,
  NavigationDetails,
} from "@/lib/types";
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
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { getProductsByCategory } = useCart();

  useEffect(() => {
    /**
     * Fetches and processes product data based on the gender parameter.
     */
    const fetchItemsData = async () => {
      try {
        // Validate gender and get all top-level categories for this gender
        const validGender = typeof gender === "string" ? gender : "";
        if (!validGender || !["men", "women", "kids"].includes(validGender)) {
          setCategories([]);
          setLoading(false);
          return;
        }

        // Get all top-level categories for this gender (clothing, shoes, accessories, etc.)
        const genderKey = validGender as keyof NavigationDetails;
        const genderData = navigations.categories;

        console.log("genderData: ", genderData);

        const enhancedGeneralCategories: any[] = [];

        const generalCategories = Object.entries(genderData).map(
          ([itemType, subCategory]: [string, any]) => {
            if (itemType === itemType) {
              return subCategory.sections.map((section: CategoryDetails[]) => {
                return section.map((category) => {
                  enhancedGeneralCategories.push({
                    ...category,
                    itemType: itemType,
                  });

                  return {
                    name: category.name,
                    href: category.id || "", // Using id instead of href
                    description: `Browse our ${category.name} collection`,
                    imageSrc: category.imageSrc,
                    category: category.id,
                    gender: validGender,
                  } as ProcessedCategory;
                });

                interface ProcessedCategory {
                  name: string;
                  href: string;
                  description: string;
                  imageSrc: string;
                  category: string;
                  gender: string;
                }
              });
            } else {
              return null;
            }
          }
        );

        if (!genderData) {
          setCategories([]);
          setLoading(false);
          return;
        }

        setCategories(generalCategories);
      } catch (error) {
        console.error("Error fetching product data", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItemsData();
  }, [gender, getProductsByCategory]);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {categories.map((category, index) => {
                console.log("category", category);

                // Define interfaces for the category structure
                interface SubCategory {
                  id?: string;
                  name: string;
                  imageSrc: string;
                  [key: string]: any; // For any additional properties in product object
                }

                // Check if category[index] exists and map through its items
                return Array.isArray(category[index])
                  ? category[index]?.map(
                      (subCat: SubCategory, subIndex: number) => {
                        console.log("subCat", subCat);

                        return (
                          <ProductCard
                            key={`${index}-${subIndex}`}
                            product={{
                              ...subCat,
                              description:
                                subCat.description ||
                                `${subCat.name} description`,
                              gender: typeof gender === "string" ? gender : "",
                              category: subCat.id || "",
                              subcategory: "",
                              price: subCat.price || 0,
                              colors: subCat.colors || [],
                              images: subCat.images || [],
                              imageSrc: subCat.imageSrc,
                              quantity: subCat.quantity || 1,
                            }}
                            page={true}
                            index={subIndex}
                          />
                        );
                      }
                    )
                  : null;
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default GenderPage;
