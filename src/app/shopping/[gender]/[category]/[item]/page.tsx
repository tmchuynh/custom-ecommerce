"use client";
import { useCart } from "@/app/context/cartContext";
import ComingSoonMessage from "@/components/ComingSoon";
import QuantityButtons from "@/components/Quantity";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { mockProductData } from "@/lib/constants";
import { GenderCategories } from "@/lib/types";
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
  const section = item as string;
  const overhead = gender as string;
  const { addToCart, updateQuantity, itemExistsInCart } = useCart();

  useEffect(() => {
    if (gender && category && item) {
      const fetchProductData = async () => {
        try {
          // Access the product data from the mock data
          const categoryData = (mockProductData as GenderCategories)[
            gender as string
          ]?.[category as string]?.[item as string];

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-10/12 md:w-11/12 mx-auto">
        {products.map((product, index) => (
          <div key={index} className="p-4 rounded-lg shadow-lg">
            {product.imageSrc ? (
              // <Image
              //   src={product.imageSrc}
              //   alt={product.name} // Use a meaningful alt description
              //   width={400}
              //   height={400}
              //   className="w-full h-64 object-cover"
              // />
              <Skeleton className="h-[175] w-full rounded-xl" />
            ) : (
              <div className="w-full h-[175] bg-gray-200" />
            )}
            <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
            <p className="text-sm mt-2">{product.description}</p>
            <p className="text-md mt-2">{product.price}</p>
            {itemExistsInCart(index) ? (
              <QuantityButtons itemId={index} />
            ) : (
              <Button onClick={() => handleAddToCart(product, index)}>
                Add to Cart
              </Button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default CategoryPage;
