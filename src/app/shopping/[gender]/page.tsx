"use client";
import { useProduct } from "@/app/context/productContext";
import ProductCard from "@/components/category/product/ProductCard";
import CannotFind from "@/components/states/CannotFind";
import LoadingIndicator from "@/components/states/Loading";
import { mockProductData } from "@/lib/mockProductData";
import { formatURL } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

const GenderPage = (): JSX.Element => {
  const { gender } = useParams(); // gender is string | string[]
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [uniqueItemTypes, setUniqueItemTypes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("featured");

  const { getProductsByGender } = useProduct();

  useEffect(() => {
    /**
     * Fetches and processes product data based on the specified gender.
     */
    const fetchProducts = async (): Promise<void> => {
      try {
        // Validate gender
        const validGender = typeof gender === "string" ? gender : "";
        if (!validGender || !["men", "women", "kids"].includes(validGender)) {
          setProducts([]);
          setLoading(false);
          return;
        }

        const genderData = (mockProductData as any)[validGender];

        if (genderData) {
          const enhancedProducts: any[] = [];
          const itemTypes: Set<string> = new Set();

          Object.entries(genderData).forEach(
            ([itemType, subCategory]: [string, any]) => {
              // Add each product with its item type
              Object.values(subCategory).forEach((product: any) => {
                enhancedProducts.push({
                  ...product,
                  category: itemType,
                  id: formatURL(`${product.name}`),
                });
              });
              itemTypes.add(itemType);
            }
          );
          setUniqueItemTypes(Array.from(itemTypes));
          setProducts(enhancedProducts);
        }

        if (genderData) {
          setCategories(Object.keys(genderData));
        } else {
          console.error("No mock data for:", validGender);
        }

        // Fetch all products for the gender
        const genderProducts = await getProductsByGender(validGender);

        if (!genderProducts || genderProducts.length === 0) {
          setProducts([]);
          setLoading(false);
          return;
        }

        setProducts(genderProducts);
      } catch (error) {
        console.error("Error fetching products", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [gender, getProductsByGender]);

  const getFilteredAndSortedProducts = () => {
    const filtered = products.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      return true;
    });

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

  if (loading) {
    return <LoadingIndicator />;
  }

  if (products.length === 0) {
    return <CannotFind />;
  }

  const genderDisplay =
    typeof gender === "string"
      ? gender.charAt(0).toUpperCase() + gender.slice(1)
      : "";

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold mb-4">
            {genderDisplay} Collection
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Explore our latest {genderDisplay.toLowerCase()} products crafted
            with quality and style.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Section */}
          <aside className="w-full lg:w-1/4">
            <h2 className="text-lg font-semibold mb-4">Filter by:</h2>

            {/* Sort dropdown */}
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

            {/* Categories */}
            {categories.length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/shopping/${gender}/${cat}`}
                      className="block text-blue-500 underline"
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Products Section */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getFilteredAndSortedProducts().map((product, index) => (
                <ProductCard
                  key={`${product.id}-${index}`}
                  product={product}
                  page={true}
                  gender={gender as string}
                  category={product.category}
                  item={product.itemType}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderPage;
