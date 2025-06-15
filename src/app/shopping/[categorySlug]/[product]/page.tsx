"use client";

import { useCurrency } from "@/app/context/currencyContext";
import { Button } from "@/components/ui/button";
import { displayRatingStars } from "@/lib/displayRatingStars";
import { ProductItem } from "@/lib/interfaces";
import { toTitleCase } from "@/lib/utils/format";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProductDetailPageProps {
  params: {
    categorySlug: string;
    product: string; // This will be the product name
  };
}

async function getProductById(
  productTitle: string
): Promise<ProductItem | null> {
  if (!productTitle) {
    console.warn("Product ID is missing.");
    return null;
  }
  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${toTitleCase(productTitle)}`
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch product '${productTitle}': ${res.status}`
      );
    }
    const product: ProductItem = await res.json();
    return product;
  } catch (error) {
    console.error("Error in getProductById:", error);
    return null;
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { categorySlug, product: productTitle } = params;
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { formatPrice } = useCurrency();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!productTitle) {
        setError("Product ID not specified.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await getProductById(productTitle);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          if (fetchedProduct.images && fetchedProduct.images.length > 0) {
            setSelectedImage(fetchedProduct.images[0]);
          } else if (fetchedProduct.thumbnail) {
            setSelectedImage(fetchedProduct.thumbnail);
          }
        } else {
          setError(
            `Product with ID ${productTitle} not found or failed to load.`
          );
        }
      } catch (e) {
        setError(
          e instanceof Error
            ? e.message
            : "An unknown error occurred while fetching product details."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [productTitle]);

  if (loading) {
    return (
      <div className="mx-auto px-4 py-8 min-h-screen text-center container">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto px-4 py-8 min-h-screen text-center text-red-500 container">
        Error: {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto px-4 py-8 min-h-screen text-center container">
        Product not found.
      </div>
    );
  }

  const originalPrice =
    product.price / (1 - (product.discountPercentage || 0) / 100);

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back
        </Button>

        <div className="mb-6 text-gray-600 text-sm dark:text-gray-400">
          <span className="text-gray-800 dark:text-gray-200">
            {product.title}
          </span>
        </div>
        <div className="gap-8 lg:gap-12 grid md:grid-cols-2">
          <div>
            <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-800 mb-4 border dark:border-gray-700 rounded-lg overflow-hidden aspect-square">
              {selectedImage ? (
                <Image
                  src={selectedImage}
                  alt={`Main image of ${product.title}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                  priority
                />
              ) : product.thumbnail ? (
                <Image
                  src={product.thumbnail}
                  alt={`Thumbnail of ${product.title}`}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain"
                  priority
                />
              ) : (
                <div className="flex justify-center items-center w-full h-full text-gray-500 dark:text-gray-400">
                  No image available
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="gap-2 grid grid-cols-4 sm:grid-cols-5">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    className={`border rounded-md overflow-hidden aspect-square hover:opacity-80 transition-opacity bg-white dark:bg-gray-700 ${
                      selectedImage === img
                        ? "ring-2 ring-blue-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    aria-label={`Select image ${index + 1} for ${
                      product.title
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h1 className="mb-2 font-bold text-3xl text-gray-900 lg:text-4xl dark:text-white">
              {product.title}
            </h1>
            {product.brand && (
              <p className="mb-3 text-gray-500 text-md dark:text-gray-400">
                Brand:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {product.brand}
                </span>
              </p>
            )}

            {typeof product.rating === "number" && (
              <div className="mb-4">
                {displayRatingStars(product.rating, 5, {
                  size: "sm",
                  align: "left",
                  showRatingNumber: true,
                })}
              </div>
            )}

            <div className="mb-4">
              <span className="font-semibold text-3xl text-gray-800 dark:text-gray-100">
                {formatPrice(product.price)}
              </span>
              {product.discountPercentage && product.discountPercentage > 0 && (
                <span className="ml-3 text-gray-500 text-lg dark:text-gray-400 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>

            {product.discountPercentage && product.discountPercentage > 0 && (
              <p className="mb-4 font-semibold text-green-600 text-md dark:text-green-400">
                Save {product.discountPercentage.toFixed(2)}%
              </p>
            )}

            <div className="mb-6">
              <h3 className="mb-2 font-semibold text-gray-700 text-lg dark:text-gray-300">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
                {product.description}
              </p>
            </div>

            <div className="mb-4">
              {product.availabilityStatus === "In Stock" ||
              (product.stock && product.stock > 0) ? (
                <p className="font-semibold text-green-600 dark:text-green-400">
                  {product.availabilityStatus || "In Stock"}
                  {product.stock && ` (${product.stock} available)`}
                </p>
              ) : (
                <p className="font-semibold text-red-500 dark:text-red-400">
                  {product.availabilityStatus || "Out of Stock"}
                </p>
              )}
              {product.minimumOrderQuantity &&
                product.minimumOrderQuantity > 1 && (
                  <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">
                    Minimum order quantity: {product.minimumOrderQuantity}
                  </p>
                )}
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 mt-auto mb-6 px-6 py-3 rounded-lg w-full font-bold text-lg text-white transition duration-150 ease-in-out">
              Add to Cart
            </button>

            <div className="space-y-3 text-sm">
              {product.shippingInformation && (
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Shipping:
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {product.shippingInformation}
                  </p>
                </div>
              )}
              {product.warrantyInformation && (
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Warranty:
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {product.warrantyInformation}
                  </p>
                </div>
              )}
              {product.returnPolicy && (
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300">
                    Return Policy:
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {product.returnPolicy}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12 pt-8 dark:border-gray-700 border-t">
            <h2 className="mb-6 font-bold text-2xl text-gray-900 dark:text-white">
              Customer Reviews ({product.reviews.length})
            </h2>
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 shadow-sm p-4 border dark:border-gray-700 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        {review.reviewerName}
                      </p>
                      {displayRatingStars(review.rating || 4)}
                    </div>
                    <p className="text-gray-500 text-xs dark:text-gray-400 whitespace-nowrap">
                      {new Date(review.date as string).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm dark:text-gray-400">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
