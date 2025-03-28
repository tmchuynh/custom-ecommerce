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
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";

/**
 * The `CategoryPage` component for rendering a shopping category page.
 */
const CategoryPage = (): JSX.Element => {
  const { gender, category } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [uniqueItemTypes, setUniqueItemTypes] = useState<string[]>([]);
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
    if (gender && category) {
      const fetchItemsData = async (): Promise<void> => {
        try {
          const categoryData = (mockProductData as any)[gender as string]?.[
            category as string
          ];

          if (categoryData) {
            const enhancedProducts: any[] = [];
            const enhancedCategories: any[] = [];
            const itemTypes: Set<string> = new Set();

            // Iterate through each item type (boots, formal, etc.)
            Object.entries(categoryData).forEach(
              ([itemType, subCategory]: [string, any]) => {
                enhancedCategories.push({
                  ...subCategory,
                  itemType: itemType,
                });
                itemTypes.add(itemType);
              }
            );

            Object.entries(categoryData).forEach(
              ([itemType, subCategory]: [string, any]) => {
                // Add each product with its item type
                Object.values(subCategory).forEach((product: any) => {
                  enhancedProducts.push({
                    ...product,
                    itemType: itemType,
                    id: `${itemType}-${product.name
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`,
                  });
                });
              }
            );

            setUniqueItemTypes(Array.from(itemTypes));
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

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((product) => product.itemType === activeFilter);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (products.length === 0) {
    return <CannotFind />;
  }

  const formatItemType = (itemType: string) => {
    return itemType
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
            's{" "}
            {typeof category === "string" &&
              category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Shop our wide selection of {category} designed for quality and
            style.
          </p>
        </div>

        {/* Category Filters */}
        {uniqueItemTypes.length > 1 && (
          <div className="flex justify-center flex-wrap gap-2 mb-12">
            <Button
              onClick={() => setActiveFilter("all")}
              variant={activeFilter === "all" ? "default" : "outline"}
              className={`capitalize ${
                activeFilter === "all"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              <Filter className="h-4 w-4 mr-2" /> All Items
            </Button>

            {uniqueItemTypes.map((itemType) => (
              <Button
                key={itemType}
                onClick={() => setActiveFilter(itemType)}
                variant={activeFilter === itemType ? "default" : "outline"}
                className={`capitalize ${
                  activeFilter === itemType
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {formatItemType(itemType)}
              </Button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Link
              key={product.id || index}
              href={`/shopping/${gender}/${category}/${product.itemType}`}
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
                  <button
                    className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <Eye className="h-5 w-5 text-gray-600" />
                  </button>
                </div>

                {/* Item Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded">
                    {formatItemType(product.itemType)}
                  </span>
                </div>

                {/* Add to Cart Button - Appears on Hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    className="w-full bg-white text-gray-900 py-2 rounded-full font-medium flex items-center justify-center hover:bg-gray-100 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-gray-800 font-medium text-lg mb-1 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between">
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
                  <span className="text-lg font-semibold text-blue-600">
                    {formatPrice(product.price || 99.99)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Browse More Link */}
        <div className="mt-12 text-center">
          <Link
            href={`/shopping/${gender}`}
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
          >
            Browse More Categories
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
