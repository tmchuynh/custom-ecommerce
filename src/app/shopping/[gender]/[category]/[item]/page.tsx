"use client";
import { useCart } from "@/app/context/cartContext";
import ComingSoonMessage from "@/components/ComingSoon";
import QuantityButtons from "@/components/Quantity";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { mockProductData } from "@/lib/constants";
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
       * Fetches product data based on the current gender, category, and item parameters.
       *
       * This asynchronous function attempts to retrieve product data from the mock data
       * store using the route parameters. If data is found, it updates the products state
       * with an array of the products. If no data is found or an error occurs, it logs
       * the error to the console. In all cases, it sets the loading state to false when
       * the operation completes.
       *
       * @async
       * @throws {Error} Logs any errors that occur during data fetching to the console
       * @example
       * // Call inside useEffect or event handler
       * await fetchProductData();
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-10/12 md:w-11/12 mx-auto">
        {products.map((product, index) => {
          const foundItem = cartItems.find((item) => item.id === index);
          return (
            <Card
              key={index}
              className="p-4 rounded-lg shadow-lg flex flex-col justify-around"
            >
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
                <div className="w-full h-[175]" />
              )}
              <CardContent className="flex flex-col justify-between h-1/2">
                <div>
                  <h3 className="text-lg font-semibold mt-4">
                    <a
                      href={`/shopping/${selectedGender}/${selectedCategory}/${selectedItem}/${product.name
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {product.name}
                    </a>
                  </h3>
                  <p className="text-sm mt-2">{product.description}</p>
                </div>
                <p className="text-md mt-2">{product.price}</p>
              </CardContent>
              <CardFooter>
                {foundItem && foundItem.quantity > 0 ? (
                  <QuantityButtons itemId={index} />
                ) : (
                  <Button onClick={() => handleAddToCart(product, index)}>
                    Add to Cart
                    <span className="sr-only">, {product.name}</span>
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default CategoryPage;
