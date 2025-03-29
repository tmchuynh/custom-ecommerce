"use client";
import { useProduct } from "@/app/context/productContext";
import CannotFind from "@/components/CannotFind";
import LoadingIndicator from "@/components/Loading";
import components from "@/components/ProductDetails";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import RelatedProducts from "@/components/RelatedProducts";
import { Button } from "@/components/ui/button";
import { mockProductData } from "@/lib/mockProductData";
import { ProductType } from "@/lib/types";
import { formatURL } from "@/lib/utils";
import { ArrowLeft, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { gender, category, slug } = useParams();

  const { getRelatedProducts } = useProduct();
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        if (!gender || !category) {
          throw new Error("Missing gender or category parameters");
        }

        const genderData =
          mockProductData[gender as keyof typeof mockProductData];
        const productData = genderData?.[category as keyof typeof genderData];

        if (productData) {
          const enhancedProducts: any[] = [];
          const itemTypes: Set<string> = new Set();

          Object.entries(productData).forEach(
            ([itemType, subCategory]: [string, any]) => {
              // Add each product with its item type
              Object.values(subCategory).forEach((product: any) => {
                const url = formatURL(`${product.name}`);
                if (url === slug) {
                  setProduct(product);
                  setRelatedProducts(getRelatedProducts(product.name));

                  enhancedProducts.push({
                    ...product,
                    itemType: itemType,
                    id: formatURL(`${product.name}`),
                  });
                }
              });
              itemTypes.add(itemType);
            }
          );
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (gender && category && slug) {
      fetchProductData();
    }
  }, [gender, category, slug]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!product) {
    return <CannotFind />;
  }

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  return (
    <div className="border-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <ProductGallery product={product} page={false} />

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              {/* <div className="mt-2 flex items-center">
                <div className="flex items-center gap-1">
                  {renderStars(product.reviews.averageRating)}
                  <span className="text-sm ml-2">
                    {product.reviews.reviewCount} reviews
                  </span>
                </div>
              </div> */}
            </div>

            <ProductInfo
              titleSize="text-4xl"
              product={product}
              page={false}
              relatedProduct={false}
            />

            {/* Product Options */}
            <div className="space-y-6">
              <components.ProductDetails details={product.details} />
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                onClick={toggleWishlist}
                className={`flex-1 flex items-center justify-center ${
                  inWishlist ? "bg-pink-50 border-pink-200 text-pink-700" : ""
                }`}
              >
                <Heart
                  className={`h-5 w-5 mr-2 ${
                    inWishlist ? "fill-pink-500 text-pink-500" : ""
                  }`}
                />
                {inWishlist ? "Added to Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Product Meta Info */}
            {/* <div className="mt-6 border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center text-sm">
                <Truck className="h-5 w-5 mr-2 text-green-500" />
                {product.inStock ? (
                  <span>In stock and ready to ship</span>
                ) : (
                  <span className="text-red-500">Out of stock</span>
                )}
              </div>
              <div className="flex items-center text-sm">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                <span>Ships in 1-2 business days</span>
              </div>
              <div className="flex items-center text-sm">
                <Share2 className="h-5 w-5 mr-2" />
                <span>Share this product</span>
              </div>
            </div> */}

            {/* Product Features */}
            {/* <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Features</h3>
              <ul className="mt-2 space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Related Products */}
            <RelatedProducts
              gender={gender as string}
              category={category as string}
              toggleWishlist={toggleWishlist}
              relatedProducts={relatedProducts}
              wishlist={new Set()}
            />
          </div>
        </div>

        {/* Back to collection link */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <Link
            href={`/shopping/${gender}/${category}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}
