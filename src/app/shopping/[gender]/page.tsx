"use client";
import { useProduct } from "@/app/context/productContext";
import CannotFind from "@/components/CannotFind";
import LoadingIndicator from "@/components/Loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockProductData } from "@/lib/mockProductData";
import { ArrowRight, Filter, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { JSX, useEffect, useState } from "react";

const GenderPage = (): JSX.Element => {
  const { gender } = useParams(); // gender is string | string[]
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [items, setItems] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [subcategories, setSubCategories] = useState<string[] | null>(null);
  const [uniqueItemTypes, setUniqueItemTypes] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
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

        // Fetch all products for the gender
        const genderProducts = await getProductsByGender(validGender);

        if (!genderProducts || genderProducts.length === 0) {
          setProducts([]);
          setLoading(false);
          return;
        }

        // Extract unique categories and items
        const uniqueCategories = [
          ...new Set(
            genderProducts.map((product: { category: any }) => product.category)
          ),
        ];
        setCategories(uniqueCategories);

        setProducts(genderProducts);
      } catch (error) {
        console.error("Error fetching products", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchItemsData = async (): Promise<void> => {
      try {
        const categoryData = (mockProductData as any)[gender as string]?.[
          selectedCategory as string
        ];

        if (categoryData) {
          const enhancedProducts: any[] = [];
          const itemTypes: Set<string> = new Set();
          const subCategories =
            selectedCategory === "shoes"
              ? [
                  ...new Set(
                    Object.values(categoryData.shoes)
                      .flatMap((product: any) => product.subCategory)
                      .filter(Boolean)
                  ),
                ]
              : [];

          Object.entries(categoryData).forEach(
            ([itemType, subCategory]: [string, any]) => {
              // Add each product with its item type and subcategory
              Object.values(subCategory).forEach((product: any) => {
                const productData = {
                  ...product,
                  itemType: itemType,
                  id: `${itemType}-${product.name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`,
                  subCategory:
                    itemType === "shoes"
                      ? product.subCategory || "Casual"
                      : null, // Add subcategory for shoes
                };
                enhancedProducts.push(productData);
              });
              itemTypes.add(itemType);
            }
          );

          setUniqueItemTypes(Array.from(itemTypes));
          setProducts(enhancedProducts);

          // Add shoe subcategories to state if shoes is selected
          setSubCategories(subCategories);
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
    fetchProducts();
  }, [gender, getProductsByGender, selectedCategory]);

  useEffect(() => {
    // Update items when a category is selected
    if (selectedCategory) {
      const categoryItems = products
        .filter((product) => product.category === selectedCategory)
        .map((product) => product.itemType);
      setItems([...new Set(categoryItems)]);
    } else {
      setItems([]);
    }
    setSelectedItem(null); // Reset selected item when category changes
  }, [selectedCategory, products]);

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
    const filtered = products.filter((product) => {
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }
      // If filters exist, ensure the product's itemType is included
      if (activeFilters.size > 0 && !activeFilters.has(product.itemType)) {
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
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() =>
                        setSelectedCategory(
                          selectedCategory === category ? null : category
                        )
                      }
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="capitalize">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Items (converted to checkboxes) */}
            {selectedCategory && items.length > 0 && (
              <div className="mb-6">
                <h3 className="text-md font-medium mb-2">Items</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={activeFilters.has(item)}
                        onChange={() => handleFilterChange(item)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="capitalize">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Products Section */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getFilteredAndSortedProducts().map((product) => (
                <div
                  key={product.id}
                  className="group rounded-xl border shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative overflow-hidden aspect-square">
                    <Image
                      src={product.imageSrc}
                      alt={product.name}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Product Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge variant={"secondary"}>{product.itemType}</Badge>
                    </div>

                    {/* Shop Now Button - Appears on Hover */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <Button>
                        <ShoppingBag className="h-4 w-4 mr-2" /> Shop Now
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1 group-hover:text-teritary transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href={`/shopping`}
            className="inline-flex items-center font-medium"
          >
            View All Collections
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GenderPage;
