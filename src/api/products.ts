import {
  DummyJSONProductsResponse,
  ProductItem,
} from "@/lib/interfaces/product";
import { toTitleCase } from "@/lib/utils/format";
import { API_BASE_URL } from ".";

/**
 * Fetches a list of products from the API based on the provided category slug or search query.
 *
 * - If a `searchQuery` is provided, it fetches products matching the search term using the search endpoint.
 * - If no `searchQuery` is provided, it fetches all products within the specified category.
 * - Both fetches use `limit=0` to retrieve all matching products.
 *
 * @param categorySlug - The slug of the category to fetch products from.
 * @param searchQuery - (Optional) The search query to filter products.
 * @returns A promise that resolves to an array of `ProductItem` objects.
 * @throws Will throw an error if the fetch fails or if the category is not found.
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
 * Retrieves a product by its slug or title from the API.
 *
 * This function searches for a product using the provided `productTitle`, which can be in slug format
 * (e.g., "my-product-title") or title format (e.g., "My Product Title"). It fetches products from the API,
 * normalizes the input and product titles, and returns the product that matches either by slug or by title.
 *
 * @param productTitle - The slug or title of the product to search for.
 * @returns A promise that resolves to the matching `ProductItem` if found, or `null` if not found or on error.
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
 * Fetches all products from the API.
 *
 * @returns {Promise<ProductItem[]>} A promise that resolves to an array of `ProductItem` objects.
 * @throws Will throw an error if the fetch operation fails or the response is not OK.
 *
 * @example
 * const products = await getAllProducts();
 * console.log(products);
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
 * Fetches the list of product categories from the API.
 *
 * @returns A promise that resolves to an array of category objects, each containing a `slug`, `name`, and `url`.
 * @throws Will throw an error if the network request fails or the response is not OK.
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
 * Fetches the list of product categories from the API.
 *
 * @returns {Promise<string[]>} A promise that resolves to an array of category names.
 * @throws Will throw an error if the network request fails or the response is not OK.
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
