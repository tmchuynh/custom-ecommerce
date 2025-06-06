"use client";
import ProductCard from "@/components/category/product/ProductCard";
import CannotFind from "@/components/states/CannotFind";
import LoadingIndicator from "@/components/states/Loading";
import { mockProductData } from "@/lib/constants/mockProductData";
import { formatURL, formatItemName } from "@/lib/utils/format";
import { useParams, useSearchParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

/**
 * A component that displays a category page with filterable and sortable products.
 *
 * @component
 * @returns {JSX.Element} A section containing:
 * - Page title and description
 * - Sidebar with:
 *   - Sort dropdown (by featured, newest, price, name, rating)
 *   - Filter checkboxes by item types
 * - Product grid showing filtered/sorted products
 *
 * @example
 * ```tsx
 * <CategoryPage />
 * ```
 *
 * @remarks
 * - Uses URL parameters for gender and category
 * - Loads product data based on gender/category combination
 * - Supports URL query parameter 'filter' for initial filter state
 * - Handles loading state with LoadingIndicator
 * - Shows CannotFind component when no products available
 * - Maintains filter state in activeFilters Set
 * - Supports multiple sort orders including price, name, rating etc.
 */
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
                console.log("subCategory", subCategory);
                console.log("itemType", itemType);
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
              {uniqueItemTypes.map((itemType) => {
                const formattedItemType = formatItemName(
                  itemType.toLowerCase()
                );

                return (
                  <label key={itemType} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={activeFilters.has(itemType)}
                      onChange={() => handleFilterChange(itemType)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>{formattedItemType}</span> {/* No capitalize class */}
                  </label>
                );
              })}
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
                    category={category as string}
                    item={product.itemType}
                    page={true}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
