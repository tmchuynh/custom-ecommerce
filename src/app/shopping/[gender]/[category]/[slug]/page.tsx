"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { mockProductData } from "@/lib/mockProductData";
import LoadingIndicator from "@/components/Loading";
import CannotFind from "@/components/CannotFind";
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  Check,
  Truck,
  ArrowLeft,
  Clock,
  Minus,
  Plus,
} from "lucide-react";
import Link from "next/link";

export default function ProductPage() {
  const { gender, category, item, slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [inWishlist, setInWishlist] = useState(false);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // In a real app, you'd fetch this from an API using the slug
        // For now, we'll simulate finding the product by looking in our mock data

        // This is a simplistic approach - in a real app, you'd use a database query
        const productData = (mockProductData as any)[gender as string]?.[
          category as string
        ]?.[item as string];

        if (productData) {
          // Find the product that matches the slug
          const foundProduct = Object.values(productData).find((prod: any) => {
            // Create a slug from the product name for comparison
            const productSlug = prod.name.toLowerCase().replace(/\s+/g, "-");
            return productSlug === slug;
          });

          if (foundProduct) {
            setProduct({
              ...foundProduct,
              // Add additional product details for the full product page
              id: slug,
              description:
                "This premium product features exceptional quality and craftsmanship. Perfect for everyday use or special occasions, it combines style with functionality.",
              features: [
                "Made with high-quality materials",
                "Designed for durability and comfort",
                "Versatile design for multiple occasions",
                "Easy to clean and maintain",
              ],
              availableSizes: ["XS", "S", "M", "L", "XL"],
              availableColors: ["Black", "Navy", "Red", "White"],
              gallery: [
                "https://via.placeholder.com/400",
                "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1974&auto=format&fit=crop",
              ],
              inStock: true,
              sku: `${gender}-${category}-${item}-${Math.floor(
                Math.random() * 10000
              )}`,
              reviews: {
                count: 24,
                averageRating: 4.5,
              },
            });
          }
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (gender && category && item && slug) {
      fetchProductData();
    }
  }, [gender, category, item, slug]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!product) {
    return <CannotFind />;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const toggleWishlist = () => {
    setInWishlist(!inWishlist);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="">
                Home
              </Link>
            </li>
            <li className="">/</li>
            <li>
              <Link href={`/shopping/${gender}`} className=" capitalize">
                {gender}
              </Link>
            </li>
            <li className="">/</li>
            <li>
              <Link
                href={`/shopping/${gender}/${category}`}
                className=" capitalize"
              >
                {category}
              </Link>
            </li>
            <li className="">/</li>
            <li>
              <Link
                href={`/shopping/${gender}/${category}/${item}`}
                className=" capitalize"
              >
                {item}
              </Link>
            </li>
            <li className="">/</li>
            <li className="text-gray-900 font-medium truncate">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 border">
              <Image
                src={product.gallery[selectedImage]}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.gallery.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden ${
                    selectedImage === index
                      ? "ring-2 ring-blue-600"
                      : "ring-1 ring-gray-200"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    width={150}
                    height={150}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="mt-2 flex items-center">
                <div className="flex items-center gap-1">
                  {renderStars(product.reviews.averageRating)}
                  <span className="text-sm ml-2">
                    {product.reviews.count} reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                <p className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </p>
                {product.originalPrice && (
                  <p className="ml-3 text-lg line-through">
                    {formatPrice(product.originalPrice)}
                  </p>
                )}
                {product.originalPrice && (
                  <span className="ml-3 bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    Save{" "}
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    %
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm">
                Tax included. Shipping calculated at checkout.
              </p>
            </div>

            <div className="border-t border-gray-200 pt-5">
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Product Options */}
            <div className="space-y-6">
              {/* Size Selector */}
              {product.availableSizes && (
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                    <Link
                      href="/size_guides"
                      className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                      Size guide
                    </Link>
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-3">
                    {product.availableSizes.map((size: string) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`flex items-center justify-center rounded-md border p-3 text-sm font-medium ${
                          selectedSize === size
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.availableColors && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>
                  <div className="mt-2 grid grid-cols-4 gap-3">
                    {product.availableColors.map((color: string) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center justify-center rounded-md border p-3 text-sm font-medium ${
                          selectedColor === color
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                <div className="mt-2 flex items-center border border-gray-300 rounded-md">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="p-2 text-gray-600 hover:text-gray-700"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-gray-900">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="p-2 text-gray-600 hover:text-gray-700"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
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
            <div className="mt-6 border-t border-gray-200 pt-6 space-y-4">
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
            </div>

            {/* Product Features */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900">Features</h3>
              <ul className="mt-2 space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Back to collection link */}
        <div className="mt-16 border-t border-gray-200 pt-8">
          <Link
            href={`/shopping/${gender}/${category}/${item}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to{" "}
            {item
              ? item
                  .toString()
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
              : "collection"}
          </Link>
        </div>
      </div>
    </div>
  );
}
