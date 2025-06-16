import {
  DummyJSONProductsResponse,
  ProductItem,
} from "@/lib/interfaces/product";
import { toTitleCase } from "@/lib/utils/format";
import { API_BASE_URL } from ".";

/**
 * Fetch products by category or search query
 * @param categorySlug - The category slug to fetch products from
 * @param searchQuery - Optional search query to filter products
 * @returns Promise<ProductItem[]> - Array of products
 */
export async function fetchProducts(
  categorySlug: string,
  searchQuery?: string
): Promise<ProductItem[]> {
  try {
    let url: string;

    if (searchQuery) {
      // If a search query is provided, use the search endpoint with limit=0 to get all results
      url = `${API_BASE_URL}/products/search?q=${encodeURIComponent(
        searchQuery
      )}&limit=0`;
    } else {
      // Otherwise, fetch by category with limit=0 to get all products in the category
      url = `${API_BASE_URL}/products/category/${encodeURIComponent(
        categorySlug
      )}?limit=0`;
    }

    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(
          `Category '${categorySlug}' not found or has no products.`
        );
      }
      throw new Error(
        `Failed to fetch products for category '${categorySlug}': ${res.status}`
      );
    }

    const data: DummyJSONProductsResponse = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    throw error;
  }
}

/**
 * Search for a specific product by title (slug format)
 * @param productTitle - The product title in slug format (e.g., "essence-mascara-lash-princess")
 * @returns Promise<ProductItem | null> - The found product or null
 */
export async function getProductBySlug(
  productTitle: string
): Promise<ProductItem | null> {
  if (!productTitle) {
    console.warn("Product title is missing.");
    return null;
  }

  try {
    const url = `${API_BASE_URL}/products/search?q=${toTitleCase(
      productTitle
    )}&limit=0`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch product '${productTitle}': ${res.status}`
      );
    }

    const data: { products: ProductItem[] } = await res.json();

    // Convert productTitle (slug format) to title format for comparison
    const normalizedProductTitle = productTitle
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    // Search returns an array, so we need to find the exact match
    const product = data.products.find((p) => {
      // Convert product title to slug format for comparison
      const productSlug = p.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");

      const titleMatch =
        p.title.toLowerCase() === normalizedProductTitle.toLowerCase();
      const slugMatch = productSlug === productTitle.toLowerCase();

      return titleMatch || slugMatch;
    });

    return product || null;
  } catch (error) {
    console.error("Error in getProductBySlug:", error);
    return null;
  }
}

/**
 * Get a single product by its ID
 * @param productId - The product ID
 * @returns Promise<ProductItem | null> - The product or null
 */
export async function getProductById(
  productId: number
): Promise<ProductItem | null> {
  try {
    const url = `${API_BASE_URL}/products/${productId}`;
    const res = await fetch(url);

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(
        `Failed to fetch product with ID ${productId}: ${res.status}`
      );
    }

    const product: ProductItem = await res.json();
    return product;
  } catch (error) {
    console.error("Error in getProductById:", error);
    return null;
  }
}

/**
 * Get all products (useful for general browsing or when category is not specified)
 * @returns Promise<ProductItem[]> - Array of all products
 */
export async function getAllProducts(): Promise<ProductItem[]> {
  try {
    const url = `${API_BASE_URL}/products?limit=0`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch all products: ${res.status}`);
    }

    const data: DummyJSONProductsResponse = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    throw error;
  }
}

/**
 * Get all available product categories
 * @returns Promise<Array<{slug: string, name: string, url: string}>> - Array of categories
 */
export async function getProductCategories(): Promise<
  Array<{ slug: string; name: string; url: string }>
> {
  try {
    const url = `${API_BASE_URL}/products/categories`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const categories = await res.json();
    return categories;
  } catch (error) {
    console.error("Error in getProductCategories:", error);
    throw error;
  }
}

/**
 * Get category list (just the slugs)
 * @returns Promise<string[]> - Array of category slugs
 */
export async function getProductCategoryList(): Promise<string[]> {
  try {
    const url = `${API_BASE_URL}/products/category-list`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch category list: ${res.status}`);
    }

    const categoryList = await res.json();
    return categoryList;
  } catch (error) {
    console.error("Error in getProductCategoryList:", error);
    throw error;
  }
}
