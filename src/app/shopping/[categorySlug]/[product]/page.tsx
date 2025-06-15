\
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ProductItem } from "@/lib/interfaces";
import { useCurrency } from "@/app/context/currencyContext";
import Link from "next/link";

interface ProductDetailPageProps {
  params: {
    categorySlug: string;
    product: string; // This will be the productId
  };
}

async function getProductById(productId: string): Promise<ProductItem | null> {
  if (!productId) {
    console.warn("Product ID is missing.");
    return null;
  }
  try {
    const res = await fetch(`https://dummyjson.com/products/${productId}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch product '${productId}': ${res.status}`);
    }
    const product: ProductItem = await res.json();
    return product;
  } catch (error) {
    console.error("Error in getProductById:", error);
    return null;
  }
}

// Helper to display star ratings
const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount?: number }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.25 && rating % 1 < 0.75; // Adjust for more intuitive half star
  const nearlyFullStar = rating % 1 >= 0.75; // If close to full, show full
  const actualFullStars = fullStars + (nearlyFullStar ? 1 : 0);
  const displayHalfStar = halfStar && !nearlyFullStar;
  const emptyStars = totalStars - actualFullStars - (displayHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(actualFullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
      ))}
      {displayHalfStar && (
        <svg key="half" className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0v15z"/> {/* Half star */}
        </svg>
      )}
      {[...Array(Math.max(0, emptyStars))].map((_, i) => (
         <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300 dark:text-gray-600 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
      ))}
      <span className="ml-2 text-gray-600 text-sm dark:text-gray-400">
        {rating.toFixed(1)}
        {reviewCount !== undefined && ` (${reviewCount} reviews)`}
      </span>
    </div>
  );
};


export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { categorySlug, product: productId } = params;
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { formatPrice } = useCurrency();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!productId) {
        setError("Product ID not specified.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const fetchedProduct = await getProductById(productId);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          if (fetchedProduct.images && fetchedProduct.images.length > 0) {
            setSelectedImage(fetchedProduct.images[0]);
          } else if (fetchedProduct.thumbnail) {
            setSelectedImage(fetchedProduct.thumbnail);
          }
        } else {
          setError(`Product with ID ${productId} not found or failed to load.`);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : "An unknown error occurred while fetching product details.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [productId]);

  if (loading) {
    return <div className="mx-auto px-4 py-8 min-h-screen text-center container">Loading product details...</div>;
  }

  if (error) {
    return <div className="mx-auto px-4 py-8 min-h-screen text-center text-red-500 container">Error: {error}</div>;
  }

  if (!product) {
    return <div className="mx-auto px-4 py-8 min-h-screen text-center container">Product not found.</div>;
  }

  const originalPrice = product.price / (1 - (product.discountPercentage || 0) / 100);

  return (
    <div className="mx-auto px-4 py-8 container">
      <div className="mb-6 text-gray-600 text-sm dark:text-gray-400">
        <Link href="/shopping" className="text-blue-600 dark:text-blue-400 hover:underline">Shopping</Link>
        <Link href={`/shopping/${categorySlug}`} className="text-blue-600 dark:text-blue-400 hover:underline capitalize">
          {categorySlug.replace(/-/g, ' ')}
        </Link>
        <span className="text-gray-800 dark:text-gray-200">{product.title}</span>
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
                  className={`border rounded-md overflow-hidden aspect-square hover:opacity-80 transition-opacity bg-white dark:bg-gray-700 ${selectedImage === img ? 'ring-2 ring-blue-500' : 'border-gray-300 dark:border-gray-600'}`}
                  aria-label={`Select image ${index + 1} for ${product.title}`}
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
          <h1 className="mb-2 font-bold text-3xl text-gray-900 lg:text-4xl dark:text-white">{product.title}</h1>
          {product.brand && <p className="mb-3 text-gray-500 text-md dark:text-gray-400">Brand: <span className="font-medium text-gray-700 dark:text-gray-300">{product.brand}</span></p>}
          
          {typeof product.rating === 'number' && (
            <div className="mb-4">
              <StarRating rating={product.rating} reviewCount={product.reviews?.length} />
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
            <h3 className="mb-2 font-semibold text-gray-700 text-lg dark:text-gray-300">Description</h3>
            <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{product.description}</p>
          </div>
          
          <div className="mb-4">
            {product.availabilityStatus === "In Stock" || (product.stock && product.stock > 0) ? (
              <p className="font-semibold text-green-600 dark:text-green-400">
                {product.availabilityStatus || "In Stock"}
                {product.stock && ` (${product.stock} available)`}
              </p>
            ) : (
              <p className="font-semibold text-red-500 dark:text-red-400">
                {product.availabilityStatus || "Out of Stock"}
              </p>
            )}
            {product.minimumOrderQuantity && product.minimumOrderQuantity > 1 && (
              <p className="mt-1 text-gray-500 text-sm dark:text-gray-400">Minimum order quantity: {product.minimumOrderQuantity}</p>
            )}
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 mt-auto mb-6 px-6 py-3 rounded-lg w-full font-bold text-lg text-white transition duration-150 ease-in-out">
            Add to Cart
          </button>

          <div className="space-y-3 text-sm">
             {product.shippingInformation && (
                <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Shipping:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{product.shippingInformation}</p>
                </div>
             )}
             {product.warrantyInformation && (
                <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Warranty:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{product.warrantyInformation}</p>
                </div>
             )}
             {product.returnPolicy && (
                <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300">Return Policy:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{product.returnPolicy}</p>
                </div>
             )}
          </div>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-12 pt-8 dark:border-gray-700 border-t">
          <h2 className="mb-6 font-bold text-2xl text-gray-900 dark:text-white">Customer Reviews ({product.reviews.length})</h2>
          <div className="space-y-6">
            {product.reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 shadow-sm p-4 border dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{review.reviewerName}</p>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-gray-500 text-xs dark:text-gray-400 whitespace-nowrap">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-gray-600 text-sm dark:text-gray-400">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
