"use client";
import CannotFind from "@/components/CannotFind";
import LoadingIndicator from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import { mockProductData } from "@/lib/mockProductData";
import { formatURL } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

const CategoryPage = (): JSX.Element => {
  const { gender, category } = useParams();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any[]>([]);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [uniqueItemTypes, setUniqueItemTypes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("name-a-z");

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
                    id: formatURL(`${product.name}`),
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

  useEffect(() => {
    const paramFilter = searchParams.get("filter");
    if (!loading && paramFilter && uniqueItemTypes.includes(paramFilter)) {
      setActiveFilters(new Set([paramFilter]));
    }
  }, [loading, uniqueItemTypes]);

  const handleFilterChange = (itemType: string) => {
    setActiveFilters((prevFilters) => {
      const newFilters = new Set(prevFilters);
      if (newFilters.has(itemType)) {
        newFilters.delete(itemType);
      } else {
        newFilters.add(itemType);
      }
      return newFilters;
    });
  };

  const getFilteredAndSortedProducts = () => {
    let filtered = [...products];

    // Apply active filters
    if (activeFilters.size > 0) {
      filtered = filtered.filter((product) =>
        activeFilters.has(product.itemType)
      );
    }

    // Apply sorting
    switch (sortOrder) {
      case "price-low-high":
        return filtered.sort((a, b) => a.price - b.price);
      case "price-high-low":
        return filtered.sort((a, b) => b.price - a.price);
      case "name-a-z":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "name-z-a":
        return filtered.sort((a, b) => b.name.localeCompare(a.name));
      case "rating":
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
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

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold mb-4">
            {typeof gender === "string" &&
              gender.charAt(0).toUpperCase() + gender.slice(1)}
            's{" "}
            {typeof category === "string" &&
              category.charAt(0).toUpperCase() + category.slice(1)}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Shop our wide selection of {category} designed for quality and
            style.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <aside className="w-full lg:w-1/4">
            <div className="mb-6">
              <span className="text-sm mr-2">Sort by:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border rounded-md p-2"
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

            <h2 className="text-lg font-semibold mb-4">Filter by:</h2>
            <div className="space-y-2">
              {uniqueItemTypes.map((itemType) => (
                <label key={itemType} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={activeFilters.has(itemType)}
                    onChange={() => handleFilterChange(itemType)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="capitalize">{formatItemName(itemType)}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* Products Section */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => {
                return (
                  <ProductCard
                    key={`${product.id}-${index}`}
                    product={product}
                    gender={gender as string}
                    category={product.itemType}
                    toggleWishlist={() => {}}
                    wishlist={new Set()}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Browse More Link */}
        <div className="mt-12 text-center">
          <Link
            href={`/shopping/${gender}`}
            className="inline-flex items-center font-medium"
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
