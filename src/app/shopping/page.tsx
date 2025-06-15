import Link from "next/link";

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
    <div className="mx-auto px-4 py-8 container">
      <h1 className="mb-8 font-bold text-3xl text-center">Shop by Category</h1>
      {categories.length > 0 ? (
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {categories.map((categorySlug) => (
            <Link href={`/shopping/${categorySlug}`} key={categorySlug} legacyBehavior>
              <h2 className="font-semibold text-gray-800 text-lg dark:text-gray-200">
                {formatCategoryName(categorySlug)}
              </h2>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Could not load categories at this time. Please try again later.
        </p>
      )}
    </div>
  );
}
