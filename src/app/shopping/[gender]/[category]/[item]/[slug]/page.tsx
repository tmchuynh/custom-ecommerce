"use client";

import ProductDetails from "@/components/ProductDetails";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import RelatedProducts from "@/components/RelatedProducts";
import { mockProductData } from "@/lib/mockProductData";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

/**
 * ProductPage Component
 *
 * This component is responsible for rendering the product details page based on dynamic route parameters.
 * It fetches product data and related products using the parameters provided in the URL.
 *
 * @returns {JSX.Element} The rendered product page.
 *
 * @remarks
 * - The component uses `useParams` to extract dynamic route parameters (`gender`, `category`, `item`, `slug`).
 * - It fetches product data from a mock data source and sets the state for the product and related products.
 * - Displays a loading state while fetching data.
 * - If no product data is found, it shows a fallback loading message.
 *
 * @component
 * @example
 * ```tsx
 * <ProductPage />
 * ```
 *
 * @dependencies
 * - `useParams` from React Router for accessing route parameters.
 * - `useState` and `useEffect` from React for managing state and side effects.
 * - Custom components:
 *   - `ProductGallery` for displaying product images.
 *   - `ProductInfo` for showing product information and handling color selection.
 *   - `ProductDetails` for displaying detailed product descriptions.
 *   - `RelatedProducts` for rendering a list of related products.
 *
 * @state
 * - `loading` (`boolean`): Indicates whether the product data is being fetched.
 * - `product` (`any | null`): Stores the fetched product data.
 * - `relatedProducts` (`any[]`): Stores the list of related products.
 *
 * @hooks
 * - `useEffect`: Fetches product data when route parameters change.
 * - `useParams`: Extracts dynamic route parameters from the URL.
 */
const ProductPage = (): JSX.Element => {
  const { gender, category, item, slug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);

  const [product, setProduct] = useState<any | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    /**
     * Asynchronously fetches product data based on the provided parameters
     * and updates the component's state with the fetched data.
     *
     * This function retrieves product details from a mock data source
     * using the `gender`, `category`, `item`, and `slug` parameters.
     * It sets the product and related products state if the data is found,
     * or logs an error if the data is not available.
     *
     * @async
     * @function fetchProduct
     * @throws Will log an error if there is an issue fetching the product data.
     * @remarks
     * - The function assumes the existence of a `mockProductData` object
     *   containing the product information.
     * - The `setProduct` and `setRelatedProducts` functions are used to
     *   update the component's state.
     * - The `setLoading` function is called in the `finally` block to
     *   indicate that the loading process has completed.
     */
    const fetchProduct = async () => {
      try {
        // Flatten the mock data to make it easier to work with
        const categoryData = (mockProductData as any)[gender as string]?.[
          category as string
        ]?.[item as string]?.[slug as string];

        // Check if the category data exists and flatten it
        if (categoryData) {
          setProduct(categoryData); // Set the products state to the array
          setRelatedProducts(categoryData.relatedProducts); // Set the related products state to the array
          console.log(categoryData);
        } else {
          console.error("Product data not found");
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      } finally {
        setLoading(false);
      }
    };

    if (gender && category && item && slug) {
      fetchProduct();
    }
  }, [gender, category, item, slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className="mx-auto sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        {/* Product Section */}
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <ProductGallery images={product.images} />
          <div>
            <ProductInfo product={product} />
            <ProductDetails details={product.details} />
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
    </main>
  );
};

export default ProductPage;
