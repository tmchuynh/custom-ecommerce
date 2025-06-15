import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";

// Helper function to fetch categories - typically this would be in a separate utils/api file
async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(
      "https://dummyjson.com/products/category-list"
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    const categories = await response.json();
    // Ensure the response is an array of strings
    if (
      Array.isArray(categories) &&
      categories.every((cat) => typeof cat === "string")
    ) {
      return categories;
    }
    console.error(
      "Fetched categories are not in the expected format:",
      categories
    );
    return []; // Return empty or handle error appropriately
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return empty or handle error appropriately
  }
}

// Helper function to format category names (e.g., "mens-shirts" -> "Men's Shirts")
function formatCategoryName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default async function ShoppingPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
        <h1 className="flex justify-center items-center gap-2 mb-4 font-bold text-4xl">
          Shop by Category
        </h1>
        {categories.length > 0 ? (
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((categorySlug) => (
              <Link href={`/shopping/${categorySlug}`} key={categorySlug}>
                <Card>
                  <CardHeader>
                    <h2 className="mb-6 font-bold text-2xl">
                      {formatCategoryName(categorySlug)}
                    </h2>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="min-h-screen">
            <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
              <FaShoppingBag className="mx-auto mb-4 w-16 h-16 text-muted-foreground" />
              <h1 className="mb-2 font-semibold text-2xl">
                Could not load categories at this time. Please try again later.
              </h1>
              <Button asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
