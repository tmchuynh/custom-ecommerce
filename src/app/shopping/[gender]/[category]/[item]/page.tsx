"use client";
import CannotFind from "@/components/CannotFind";
import LoadingIndicator from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { mockProductData } from "@/lib/mockProductData";
import {
  ArrowRight,
  Filter,
  Heart,
  ShoppingCart,
  Star,
  Eye,
  TrendingUp,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

/**
 * Component representing a category section page for displaying products.
 */
const CategorySectionPage = (): JSX.Element => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { gender, category, item } = useParams();
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("featured");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(id)) {
        newWishlist.delete(id);
      } else {
        newWishlist.add(id);
      }
      return newWishlist;
    });
  };

  useEffect(() => {
    if (gender && category && item) {
      const fetchProductData = async () => {
        try {
          // Access the product data from the mock data
          const categoryData = (mockProductData as any)[gender as string]?.[
            category as string
          ]?.[item as string];

          if (categoryData) {
            // Convert object to array and add IDs
            const productsArray = Object.values(categoryData).map(
              (product: any, index) => ({
                ...product,
                id: `${item}-${index}`,
                isNew: Math.random() > 0.7,
                isSale: Math.random() > 0.7,
                isLimited: Math.random() > 0.85,
                originalPrice: Math.random() > 0.7 ? product.price * 1.2 : null,
              })
            );
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

  // Apply filters and sorting
  const getFilteredAndSortedProducts = () => {
    const filtered = [...products];

    // Apply active filter if not "all"
    if (activeFilter !== "all") {
      // Example: filter by a product property like color or material
      // filtered = filtered.filter(product => product.color === activeFilter);
    }

    // Apply sorting
    switch (sortOrder) {
      case "price-low-high":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high-low":
        return filtered.sort((a, b) => b.price - a.price);
      case "newest":
        return filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case "featured":
      default:
        return filtered;
    }
  };

  const filteredProducts = getFilteredAndSortedProducts();

  if (loading) {
    return <LoadingIndicator />;
  }

  if (products.length === 0) {
    return <CannotFind />;
  }

  const formatItemName = (itemName: string) => {
    return (itemName as string)
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-800 mb-4">
            {typeof gender === "string" &&
              gender.charAt(0).toUpperCase() + gender.slice(1)}
            's {formatItemName(item as string)}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of {formatItemName(item as string)}{" "}
            designed for style and comfort.
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
            {/* Example filter buttons - you could generate these dynamically */}
            <Button
              onClick={() => setActiveFilter("all")}
              variant={activeFilter === "all" ? "default" : "outline"}
              className={`${
                activeFilter === "all"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Filter className="h-4 w-4 mr-2" /> All Items
            </Button>
            {/* Additional filter buttons would go here */}
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">Sort by:</span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id || index}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-square">
                <Image
                  src={
                    product.imageSrc ||
                    "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1742&auto=format&fit=crop"
                  }
                  alt={product.name}
                  width={400}
                  height={400}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />

                {/* Quick Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
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
                <h3 className="text-gray-800 font-medium text-lg mb-1 hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating || 4)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.reviewCount || 12})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.originalPrice && (
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
                    {category as string}
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

        {/* Browse More Link */}
        <div className="mt-12 text-center">
          <Link
            href={`/shopping/${gender}/${category}`}
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
          >
            Browse More {formatItemName(category as string)}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySectionPage;
