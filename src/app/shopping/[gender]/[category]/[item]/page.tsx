"use client";
import CannotFind from "@/components/CannotFind";
import LoadingIndicator from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { mockProductData } from "@/lib/mockProductData";
import { formatCurrency } from "@/lib/utils";
import {
  ArrowRight,
  Filter,
  Heart,
  ShoppingCart,
  Star,
  Eye,
  TrendingUp,
  Clock,
  ChevronsUpDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * Component representing a category section page for displaying products.
 */
const CategorySectionPage = (): JSX.Element => {
  const { gender, category, item } = useParams();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [uniqueItemTypes, setUniqueItemTypes] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<string>("featured");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);

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

  const updateURL = (itemName: string): string => {
    const url = `/shopping/${gender}/${category}/${itemName.toLowerCase()}`;
    router.push(url);
    return url;
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
            const itemTypes: Set<string> = new Set();
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
            setUniqueItemTypes(Array.from(itemTypes));
            setProducts(productsArray);
          } else {
            console.error("Product data not found for category:", category);
          }

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
    <section className=" py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold mb-4">
            {typeof gender === "string" &&
              gender.charAt(0).toUpperCase() + gender.slice(1)}
            's {formatItemName(item as string)}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Discover our premium collection of {formatItemName(item as string)}{" "}
            designed for style and comfort.
          </p>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-col-reverse lg:flex-row-reverse lg:items-center mb-8 lg:justify-between border-4">
          {/* Category Filters */}
          <div className="flex flex-col md:flex-row gap-2 mb-3 lg:mb-0">
            {isMobile ? (
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="space-y-2"
              >
                <div className="flex items-center justify-between space-x-4">
                  <CollapsibleTrigger asChild>
                    <Button
                      onClick={() => setActiveFilter("all")}
                      variant={activeFilter === "all" ? "default" : "outline"}
                      className={`capitalize w-full ${
                        activeFilter === "all" ? "" : ""
                      }`}
                    >
                      <Filter className="h-4 w-4 mr-2" /> Filter By
                      <ChevronsUpDown className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>

                <CollapsibleContent className="flex flex-col space-y-2">
                  {uniqueItemTypes.map((itemType) => (
                    <Button
                      key={itemType}
                      onClick={() => {
                        setActiveFilter(itemType);
                        updateURL(itemType);
                      }}
                      variant={
                        activeFilter === itemType ? "default" : "outline"
                      }
                      className={`capitalize ${
                        activeFilter === itemType ? "" : ""
                      }`}
                    >
                      {formatItemName(itemType)}
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <>
                <Button
                  onClick={() => setActiveFilter("all")}
                  variant={activeFilter === "all" ? "default" : "outline"}
                  className={`capitalize ${activeFilter === "all" ? "" : ""}`}
                >
                  <Filter className="h-4 w-4 mr-2" /> Filter By
                </Button>
                {uniqueItemTypes.map((itemType) => (
                  <Button
                    key={itemType}
                    onClick={() => {
                      setActiveFilter(itemType);
                      updateURL(itemType);
                    }}
                    variant={activeFilter === itemType ? "default" : "outline"}
                    className={`capitalize ${
                      activeFilter === itemType ? "" : ""
                    }`}
                  >
                    {formatItemName(itemType)}
                  </Button>
                ))}
              </>
            )}
          </div>

          <div className="flex items-center mb-6 lg:mb-0">
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
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id || index}
              className="group rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
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
                    className="p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        wishlist.has(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                  <button className="p-2 rounded-full shadow-md hover:bg-blue-50 transition-colors">
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
                  <button className="w-full text-gray-900 py-2 rounded-full font-medium flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-lg mb-1 transition-colors">
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
                    <span className="text-xs ml-1">
                      ({product.reviewCount || 12})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.originalPrice && (
                      <span className="text-sm line-through">
                        {formatCurrency(product.originalPrice)}
                      </span>
                    )}
                    <span className="text-lg font-semibold">
                      {formatCurrency(product.price)}
                    </span>
                  </div>
                </div>

                <div className="text-sm capitalize flex items-center">
                  <span className="px-2 py-1 rounded text-xs">
                    {category as string}
                  </span>
                  {product.isLimited && (
                    <span className="ml-2 flex items-center text-xs">
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
            className="inline-flex items-center font-medium"
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
