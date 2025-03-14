"use client";

import { useEffect, useState } from "react";
import ProductDetails from "@/components/ProductDetails";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import RelatedProducts from "@/components/RelatedProducts";
import { useParams, useRouter } from "next/navigation";
import { mockProductData } from "@/lib/constants";
import { GenderCategories } from "@/lib/types";

const ProductPage = () => {
  const router = useRouter();
  const { gender, category, item, slug } = useParams();
  const [loading, setLoading] = useState<boolean>(true);

  const [product, setProduct] = useState<any | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    // Simulating fetching data based on the dynamic route
    const fetchProduct = async () => {
      try {
        // Flatten the mock data to make it easier to work with
        const categoryData = (mockProductData as GenderCategories)[
          gender as string
        ]?.[category as string]?.[item as string]?.[slug as string];

        // Check if the category data exists and flatten it
        if (categoryData) {
          const productsArray = Object.values(categoryData); // Extract values as an array
          setProduct(productsArray); // Set the products state to the array
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
            <ProductInfo
              product={product}
              selectedColor={product.colors[0]} // Example, you can handle dynamic color selection here
              setSelectedColor={() => {}}
            />
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
