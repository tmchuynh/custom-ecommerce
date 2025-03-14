"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Use this for app router
import { mockProductData } from "@/lib/constants";
import { GenderCategories } from "@/lib/types";
import Image from "next/image";

const CategoryPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { gender, category, item } = useParams();

  useEffect(() => {
    if (gender && category && item) {
      const fetchProductData = async () => {
        try {
          // Flatten the mock data to make it easier to work with
          const categoryData = (mockProductData as GenderCategories)[
            gender as string
          ]?.[category as string]?.[item as string];

          // Check if the category data exists and flatten it
          if (categoryData) {
            const productsArray = Object.values(categoryData); // Extract values as an array
            setProducts(productsArray); // Set the products state to the array
          } else {
            console.error("Product data not found");
          }
        } catch (error) {
          console.error("Error fetching product data", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProductData();
    }
  }, [gender, category, item]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products found for this category.</div>;
  }

  return (
    <main className="mx-auto sm:px-6 sm:pt-16 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-10/12 md:w-11/12 mx-auto">
        {products.map((product, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <Image
              src={product.imageSrc}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
            <p className="text-sm text-gray-500 mt-2">{product.price}</p>
            <button className="mt-4 text-white bg-indigo-600 px-4 py-2 rounded-lg">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default CategoryPage;
