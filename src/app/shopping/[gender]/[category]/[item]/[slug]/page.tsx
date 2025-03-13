"use client";

import { useEffect, useState } from "react";
import ProductDetails from "@/components/ProductDetails";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import RelatedProducts from "@/components/RelatedProducts";
import { useParams, useRouter } from "next/navigation";

const ProductPage = () => {
  const router = useRouter();
  const { gender, category, item, slug } = useParams();

  const [product, setProduct] = useState<any | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    // Simulating fetching data based on the dynamic route
    const fetchProduct = async () => {
      try {
        // This is a mock function to simulate fetching the product by gender, category, item, and slug.
        const response = await fetch(
          `/api/shopping/${gender}/${category}/${item}/${slug}`
        );
        const data = await response.json();
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (gender && category && item && slug) {
      fetchProduct();
    }
  }, [gender, category, item, slug]);

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
