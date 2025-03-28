"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Heart,
  ShoppingCart,
  Eye,
  TrendingUp,
  Clock,
  Filter,
  Star,
  StarHalf,
  ArrowRight,
} from "lucide-react";

// Mock trending product data - replace with your actual data
const trendingProducts = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 32,
    category: "clothing",
    imageSrc:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1480&auto=format&fit=crop",
    isNew: true,
    isSale: true,
    isLimited: false,
  },
  {
    id: "2",
    name: "Leather Crossbody Bag",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviewCount: 64,
    category: "accessories",
    imageSrc:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1438&auto=format&fit=crop",
    isNew: false,
    isSale: true,
    isLimited: false,
  },
  {
    id: "3",
    name: "Smart Watch Pro",
    price: 199.99,
    originalPrice: 249.99,
    rating: 4.7,
    reviewCount: 128,
    category: "electronics",
    imageSrc:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1528&auto=format&fit=crop",
    isNew: true,
    isSale: false,
    isLimited: true,
  },
  {
    id: "4",
    name: "Wireless Noise-Canceling Headphones",
    price: 159.99,
    originalPrice: 199.99,
    rating: 4.6,
    reviewCount: 95,
    category: "electronics",
    imageSrc:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1470&auto=format&fit=crop",
    isNew: false,
    isSale: true,
    isLimited: false,
  },
  {
    id: "5",
    name: "Designer Sunglasses",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.3,
    reviewCount: 47,
    category: "accessories",
    imageSrc:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1480&auto=format&fit=crop",
    isNew: false,
    isSale: false,
    isLimited: false,
  },
  {
    id: "6",
    name: "Athletic Performance Shoes",
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.9,
    reviewCount: 86,
    category: "shoes",
    imageSrc:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1470&auto=format&fit=crop",
    isNew: true,
    isSale: false,
    isLimited: false,
  },
  {
    id: "7",
    name: "Slim Fit Jeans",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.4,
    reviewCount: 53,
    category: "clothing",
    imageSrc:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1374&auto=format&fit=crop",
    isNew: false,
    isSale: true,
    isLimited: false,
  },
  {
    id: "8",
    name: "Smart Home Speaker",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.2,
    reviewCount: 38,
    category: "electronics",
    imageSrc:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1374&auto=format&fit=crop",
    isNew: true,
    isSale: true,
    isLimited: false,
  },
];

export default function TrendingProducts() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const categories = ["all", "clothing", "accessories", "electronics", "shoes"];

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const filteredProducts =
    activeFilter === "all"
      ? trendingProducts
      : trendingProducts.filter((product) => product.category === activeFilter);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star
            key={`full-${index}`}
            className="h-4 w-4 text-yellow-400 fill-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <StarHalf className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        )}
        {Array.from({ length: 5 - fullStars - (hasHalfStar ? 1 : 0) }).map(
          (_, index) => (
            <Star key={`empty-${index}`} className="h-4 w-4 text-gray-300" />
          )
        )}
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 mb-4">
            Trending Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular products that are making waves this
            season.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveFilter(category)}
              variant={activeFilter === category ? "default" : "outline"}
              className={`capitalize ${
                activeFilter === category
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {category === "all" && <Filter className="h-4 w-4 mr-2" />}
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-square">
                <Image
                  src={product.imageSrc}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />

                {/* Quick Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        wishlist.has(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors">
                    <Eye className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {/* Product Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                      New
                    </span>
                  )}
                  {product.isSale && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                      Sale
                    </span>
                  )}
                  {product.isLimited && (
                    <span className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> Limited
                    </span>
                  )}
                </div>

                {/* Add to Cart Button - Appears on Hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button className="w-full bg-white text-gray-900 py-2 rounded-full font-medium flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                  </button>
                </div>
              </div>

              <div className="p-4">
                <Link href={`/product/${product.id}`} className="block">
                  <h3 className="text-gray-800 font-medium text-lg mb-1 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {renderRatingStars(product.rating)}
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    <span className="text-lg font-semibold text-blue-600">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-500 capitalize flex items-center">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                    {product.category}
                  </span>
                  {product.isLimited && (
                    <span className="ml-2 text-amber-600 flex items-center text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" /> Trending
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/products"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
