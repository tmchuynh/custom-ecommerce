"use client";
import { useCart } from "@/app/context/cartContext";
import ComingSoonMessage from "@/components/ComingSoon";
import ProductCard from "@/components/ProductCard";
import QuantityButtons from "@/components/Quantity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { mockProductData } from "@/lib/mockProductData";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { toast } from "sonner"; // Import the toast function

/**
 * @description CategoryPage is a functional component that fetches and displays products based on the provided gender, category, and item parameters from the URL.
 * It utilizes the `useParams` hook from 'next/navigation' to extract these parameters and then fetches the corresponding product data from a mock data source.
 * The component manages loading state and displays a loading indicator while fetching data. If no products are found, it renders a `ComingSoonMessage` component.
 * Otherwise, it displays the products in a grid layout, allowing users to add products to their cart using the `useCart` hook.
 *
 * @returns {JSX.Element} - A JSX element representing the category page with products or a loading/coming soon message.
 */
const CategoryPage = (): JSX.Element => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { gender, category, item } = useParams();
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const section = item as string;
  const overhead = gender as string;
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    if (gender && category && item) {
      /**
       * Asynchronously fetches product data based on the provided gender, category, and item.
       *
       * This function retrieves product data from a mock data source and updates the state
       * variables for the selected gender, category, and item. If the product data for the
       * specified category is found, it converts the data into an array and updates the
       * products state. If the data is not found, it logs an error to the console.
       *
       * @async
       * @function fetchProductData
       * @throws Will log an error to the console if there is an issue fetching the product data.
       *
       * @remarks
       * - This function assumes the existence of `mockProductData` as a data source.
       * - The function also updates the loading state to `false` once the operation is complete.
       *
       * @example
       * // Example usage:
       * fetchProductData();
       */
      const fetchProductData = async () => {
        try {
          // Access the product data from the mock data
          const categoryData = (mockProductData as any)[gender as string]?.[
            category as string
          ]?.[item as string];

          setSelectedGender(gender as string);

          setSelectedCategory(category as string);

          setSelectedItem(item as string);

          if (categoryData) {
            const productsArray = Object.values(categoryData);
            setProducts(productsArray);
          } else {
            console.error("Product data not found for category:", category);
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

  const handleAddToCart = (product: any, id: number) => {
    const price =
      typeof product.price === "string"
        ? parseFloat(product.price.replace("$", ""))
        : product.price;

    const cartItem = {
      id: id,
      name: product.name,
      description: product.description,
      price: price,
      quantity: 1,
      imageSrc: product.imageSrc,
    };

    // Directly call addToCart. The cart context will update quantity if it already exists.
    addToCart(cartItem);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return <div>Loading...</div>;

  if (products.length === 0) {
    return (
      <ComingSoonMessage
        gender={overhead.charAt(0).toUpperCase() + overhead.slice(1)}
        sectionName={section.charAt(0).toUpperCase() + section.slice(1)}
      />
    );
  }

  return (
    <main className="mx-auto sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {gender && category && item && (
          <h1 className="text-3xl font-bold tracking-tight">
            {typeof gender === "string" &&
              gender.charAt(0).toUpperCase() + gender.slice(1)}
            's{" "}
            {typeof item === "string" &&
              item.charAt(0).toUpperCase() + item.slice(1)}{" "}
            {typeof category === "string" &&
              category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-10/12 md:w-11/12 mx-auto">
        {products.map((product, index) => {
          return (
            <ProductCard
              key={index}
              product={product}
              selectedGender={selectedGender}
              selectedCategory={selectedCategory}
              selectedItem={product.itemType} // Use the item type instead of product name
              index={index}
            />
          );
        })}
      </div>
    </main>
  );
};

export default CategoryPage;
