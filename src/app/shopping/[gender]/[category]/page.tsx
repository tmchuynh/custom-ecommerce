"use client";
import ProductCard from "@/components/ProductCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { mockProductData } from "@/lib/mockProductData";
import { useParams, useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * The `CategoryPage` component is responsible for rendering a shopping category page
 * based on the selected gender and category. It fetches and displays products and
 * categories dynamically, providing a user-friendly interface for browsing items.
 *
 * @component
 * @returns {JSX.Element} The rendered category page component.
 *
 * @remarks
 * - This component uses `useParams` to extract `gender` and `category` from the URL.
 * - It fetches mock product data asynchronously and processes it to enhance categories
 *   and products with additional metadata.
 * - The component displays a loading state while fetching data and handles cases where
 *   no products are found.
 * - Includes a dropdown menu for category navigation and a radio group for layout preferences.
 *
 * @example
 * ```tsx
 * <CategoryPage />
 * ```
 *
 * @dependencies
 * - `useParams` and `useRouter` from `next/navigation` for routing.
 * - `useState` and `useEffect` from React for state management and side effects.
 * - Custom components like `DropdownMenu`, `DropdownMenuItem`, `RadioGroup`, and `ProductCard`.
 *
 * @state
 * - `products` (`any[]`): Stores the list of products for the selected category.
 * - `categories` (`any[]`): Stores the list of categories for the selected gender.
 * - `loading` (`boolean`): Indicates whether the data is still being fetched.
 *
 * @hooks
 * - `useEffect`: Fetches and processes product data when `gender` or `category` changes.
 *
 * @errors
 * - Logs an error to the console if there is an issue fetching or processing product data.
 *
 * @loading
 * - Displays a "Loading..." message while data is being fetched.
 *
 * @emptyState
 * - Displays a "No items found in this category." message if no products are available.
 */
const CategoryPage = (): JSX.Element => {
  const { gender, category } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (gender && category) {
      /**
       * Asynchronously fetches and processes product data based on the provided gender and category.
       *
       * This function retrieves mock product data, organizes it into enhanced categories and products,
       * and updates the state with the processed data. It also handles errors and ensures the loading
       * state is updated appropriately.
       *
       * @async
       * @function fetchItemsData
       * @returns {Promise<void>} A promise that resolves when the data fetching and processing is complete.
       *
       * @throws Will log an error to the console if there is an issue fetching or processing the product data.
       *
       * @remarks
       * - The function assumes the existence of `mockProductData` as a data source.
       * - The `gender` and `category` variables are used to access specific subsets of the data.
       * - The processed data includes enhanced categories, products, and general categories, each retaining
       *   additional metadata such as the item type.
       *
       * @example
       * // Example usage:
       * fetchItemsData()
       *   .then(() => console.log("Data fetched successfully"))
       *   .catch((error) => console.error("Error fetching data", error));
       */
      const fetchItemsData = async (): Promise<void> => {
        try {
          // Flatten the mock data to make it easier to work with
          const categoryData = (mockProductData as any)[gender as string]?.[
            category as string
          ];

          if (categoryData) {
            // Modified to retain item type information
            const enhancedProducts: any[] = [];
            const enhancedCategories: any[] = [];
            const enhancedGeneralCategories: any[] = [];

            // Iterate through each item type (boots, formal, etc.)
            Object.entries(categoryData).forEach(
              ([itemType, subCategory]: [string, any]) => {
                enhancedCategories.push({
                  ...subCategory,
                  itemType: itemType, // Store the item type with each product
                });
              }
            );

            Object.entries(categoryData).forEach(
              ([itemType, subCategory]: [string, any]) => {
                // Add each product with its item type
                Object.values(subCategory).forEach((product: any) => {
                  enhancedProducts.push({
                    ...product,
                    itemType: itemType, // Store the item type with each product
                  });
                });
              }
            );

            // Iterate through each item type (boots, formal, etc.)
            Object.entries((mockProductData as any)[gender as string]).forEach(
              ([itemType, subCategory]: [string, any]) => {
                enhancedGeneralCategories.push({
                  ...subCategory,
                  itemType: itemType, // Store the item type with each product
                });
              }
            );

            setCategories(enhancedCategories);

            setProducts(enhancedProducts);
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
          <h1 className="text-4xl font-extrabold text-center mb-8">
            {typeof gender === "string" &&
              gender.charAt(0).toUpperCase() + gender.slice(1)}
            's{" "}
            {typeof category === "string" &&
              category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 absolute -left-8">
          <DropdownMenuGroup>
            {categories.map((category, index) => {
              interface FormattedItem {
                name: string;
                url: string;
              }

              const formattedItems: FormattedItem[] = category.itemType
                .split("_")
                .map((n: string, index: number) => {
                  return {
                    name: n.charAt(0).toUpperCase() + n.slice(1),
                    url: `/shopping/${gender}/clothing/${category.itemType}`,
                  } as FormattedItem;
                });

              return (
                <DropdownMenuItem
                  key={category.itemType}
                  onClick={() => {
                    router.push(formattedItems[0].url); // Example: using the first item's URL
                  }}
                >
                  {formattedItems
                    .map((item: { name: string; url: string }) => item.name)
                    .join(" ")}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8 w-10/12 md:w-11/12 mx-auto">
        {products.map((product, index) => {
          return (
            <ProductCard
              key={index}
              product={product}
              page={true}
              index={product.name}
            />
          );
        })}
      </div>
    </main>
  );
};

export default CategoryPage;
