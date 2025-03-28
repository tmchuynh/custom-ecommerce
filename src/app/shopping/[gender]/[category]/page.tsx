"use client";
import CannotFind from "@/components/CannotFind";
import LoadingIndicator from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { mockProductData } from "@/lib/mockProductData";
import { ArrowRight, Filter } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

const CategoryPage = (): JSX.Element => {
  const { gender, category } = useParams();
  const [products, setProducts] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("featured");
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
            const itemTypes: Set<string> = new Set();

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
                itemTypes.add(itemType);
              }
            );

            setUniqueItemTypes(Array.from(itemTypes));
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

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case "price-low-high":
        return a.price - b.price;
      case "price-high-low":
        return b.price - a.price;
      case "name-a-z":
        return a.name.localeCompare(b.name);
      case "name-z-a":
        return b.name.localeCompare(a.name);
      case "newest":
        if (a.isNew && !b.isNew) return -1;
        if (!a.isNew && b.isNew) return 1;
        return 0;
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "featured":
      default:
        return 0; // Keep original order for featured
    }
  });

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

        <div className="flex items-center mb-6">
          <span className="text-sm text-gray-600 mr-2">Sort by:</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A to Z</option>
            <option value="name-z-a">Name: Z to A</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={product.id || index}
              product={product}
              gender={gender as string}
              category={category as string}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
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
