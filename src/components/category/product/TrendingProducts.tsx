"use client";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import ProductRate from "./ProductRate";
import { mockProductData } from "@/lib/mockProductData";
import { useProduct } from "@/app/context/productContext";
import ProductCard from "./ProductCard";

// Convert nested object structure into array of products
const flattenProducts = (data: any) => {
  const products: any[] = [];
  Object.keys(data).forEach((category) => {
    Object.values(data[category]).forEach((subcategory: any) => {
      Object.values(subcategory).forEach((items: any) => {
        Object.values(items).forEach((item: any) => {
          products.push({ ...item, id: Math.random().toString() });
        });
      });
    });
  });
  return products;
};

export default function TrendingProducts() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>(["all"]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const genders = ["men", "women", "kids"];
        const allProducts: any[] = [];

        // Fetch products for each gender
        for (const gender of genders) {
          const genderData = (mockProductData as any)[gender];

          if (genderData) {
            Object.entries(genderData).forEach(
              ([itemType, subCategory]: [string, any]) => {
                Object.values(subCategory).forEach((items: any) => {
                  Object.values(items).forEach((product: any) => {
                    if (product.featured) {
                      allProducts.push({
                        ...product,
                        gender,
                        category: itemType,
                        id: product.id || Math.random().toString(),
                      });
                    }
                  });
                });
              }
            );
          }
        }

        // Get unique categories from products
        const uniqueCategories = [
          "all",
          ...new Set(allProducts.map((p) => p.category)),
        ];
        setCategories(uniqueCategories);
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      ? products
      : products.filter((product) => product.category === activeFilter);

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
        <ProductRate page={true} />
      </div>
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-4">Trending Products</h2>
          <p className="text-xlborder max-w-2xl mx-auto">
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
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              gender={product.gender}
              category={product.category}
              item={product.itemType}
              page={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
