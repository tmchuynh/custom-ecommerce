"use client";

import { useEffect, useState } from "react";
import { GenderCategories } from "@/lib/types";
import ProductCard from "@/components/ProductCard"; // Assuming you have a ProductCard component
import { useParams, useRouter } from "next/navigation";

const CategoryPage = () => {
  const router = useRouter();
  const { gender, category } = useParams();

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (gender && category) {
      const fetchItemsData = async () => {
        try {
          // Fetch items data based on gender and category
          const response = await fetch(`/api/shopping/${gender}/${category}`);
          const data = await response.json();

          if (response.ok) {
            setItems(data); // Assuming the API returns an array of items in the category
            setLoading(false);
          } else {
            console.error("Items not found");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching items data", error);
          setLoading(false);
        }
      };

      fetchItemsData();
    }
  }, [gender, category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (items.length === 0) {
    return <div>No items found in this category.</div>;
  }

  return (
    <main className="mx-auto sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {category.charAt(0).toUpperCase() + category.slice(1)} for{" "}
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {items.map((item: any) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;
