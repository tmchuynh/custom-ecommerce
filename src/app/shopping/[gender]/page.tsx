"use client";
import { useCart } from "@/app/context/cartContext";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import { mockProductData } from "@/lib/mockProductData";
import { CategoryCardData, GenderCategories } from "@/lib/types";
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

        const enhancedCategories: any[] = [];

        // Get all top-level categories for this gender (clothing, shoes, accessories, etc.)
        const genderData = (mockProductData as any)[gender as string];

        Object.entries(genderData).forEach(
          ([itemType, subCategory]: [string, any]) => {
            // Add each product with its item type
            Object.values(itemType).forEach((product: any) => {
              enhancedCategories.push({
                ...product,
                itemType: subCategory, // Store the item type with each product
              });
            });
          }
        );

        console.log("genderData: ", genderData);
        console.log("enhancedCategories", enhancedCategories);

        if (!genderData) {
          setCategories([]);
          setLoading(false);
          return;
        }

        console.log(categories);

        // Process each category into a displayable format
        const processedCategories = Object.entries(genderData).map(
          ([categoryName, categoryData]) => {
            console.log("categoryName", categoryName);
            console.log("categoryData", categoryData);

            // Find a representative product image and description for this category
            const subcategories = (mockProductData as any)[gender as string];
            const firstSubcategory = subcategories;

            console.log("subcategories", subcategories);
            console.log("firstSubcategory", firstSubcategory);

            const generalCategories = Object.entries(subcategories).forEach(
              ([itemType, subCategory]: [string, any]) => {
                console.log("itemType", itemType);
                console.log("subCategory", subCategory);
              }
            );
            console.log("generalCategories", generalCategories);

            return {
              name:
                categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
              href: `/shopping/${gender}/${categoryName}`,
              description:
                (genderData as any).description ||
                `Browse our ${categoryName} collection`,
              imageSrc:
                (categoryName as any).imageSrc ||
                "https://media.istockphoto.com/id/2158155744/photo/beautiful-young-woman-trying-on-shoes.jpg?s=612x612&w=0&k=20&c=_beFGQxQKayGhEUdPK-CwV1pTSE1VIUZIXV4m7MQMrk=",
              category: categoryName,
              gender: validGender,
            };
          }
        );

        console.log("genderData", genderData);

        setCategories(processedCategories);

        console.log("processedCategories", processedCategories);
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
