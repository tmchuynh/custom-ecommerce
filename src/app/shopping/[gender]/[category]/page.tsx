"use client";

import { useEffect, useState } from "react";
import { mockProductData } from "@/lib/constants";
import ProductCard from "@/components/ProductCard"; // Assuming you have a ProductCard component
import { useParams, useRouter } from "next/navigation";
import { GenderCategories } from "@/lib/types";

const CategoryPage = () => {
  const router = useRouter();
  const { gender, category } = useParams();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (gender && category) {
      console.log("gender", gender);
      console.log("category", category);
      const fetchItemsData = async () => {
        try {
          // Flatten the mock data to make it easier to work with
          const categoryData = (mockProductData as GenderCategories)[
            gender as string
          ]?.[category as string];

          // Check if the category data exists and flatten it
          if (categoryData) {
            const productsArray = Object.values(categoryData).flatMap(
              (subCategory: any) => Object.values(subCategory)
            ); // Flatten all products
            setProducts(productsArray); // Set the products state to the flattened array
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
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
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
                key={index} // Use a unique identifier
                product={product}
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
