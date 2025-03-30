"use client";

import { mockProductData } from "@/lib/constants/mockProductData";
import { Currency, ProductFilters, ProductType, SortOption } from "@/lib/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCurrency } from "./currencyContext";
import { ProductContextType } from "@/lib/contextTypes";
import { currencyCountries } from "@/lib/constants/countriesConstant";

const ProductContext = createContext<ProductContextType | undefined>(undefined);

/**
 * Provider component that manages product-related state and functionality for an e-commerce application.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the product context
 *
 * @provides Context functions including:
 * - Product retrieval and filtering
 * - Price conversion and formatting
 * - Inventory management
 * - Analytics tracking
 * - Price history and statistics
 *
 * Features:
 * - Automatic view count updates
 * - Random price adjustments every two weeks
 * - Weekly stock replenishment
 * - Currency conversion support
 * - Product search and filtering
 * - Related products suggestions
 * - Featured and new arrival products
 * - Price tracking and history
 * - Stock level management
 * - Sales and popularity metrics
 * - Ratings and reviews tracking
 *
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <ProductProvider>
 *       <YourComponent />
 *     </ProductProvider>
 *   );
 * }
 * ```
 *
 * @remarks
 * The provider includes automatic background processes:
 * - Updates random product view counts every 48 hours
 * - Restocks products every Saturday at 11 PM
 * - Adjusts prices for random products every two weeks
 *
 * @returns {React.ReactNode} A Provider component that makes product functionality available to its children
 */
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  // Get the current currency from the CurrencyContext
  const { selectedCurrency } = useCurrency();
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    setForceUpdate((prev) => prev + 1);
  }, [selectedCurrency]);

  useEffect(() => {
    /**
     * Randomly updates view counts for a subset of products.
     * Selects between 25-100 products at random and increments their view counts.
     *
     * The function:
     * 1. Generates a random number between 25-100 for how many products to update
     * 2. Randomly shuffles the full product list
     * 3. Takes the first n random products from the shuffled list
     * 4. Increments the view count for each selected product
     *
     * @remarks
     * This is used to simulate random product views by users
     *
     * @example
     * ```tsx
     * updateRandomViewCounts(); // Updates between 25-100 random product view counts
     * ```
     */
    const updateRandomViewCounts = () => {
      // Get random number of products to update (between 25-100)
      const numProductsToUpdate =
        Math.floor(Math.random() * (100 - 25 + 1)) + 25;

      // Shuffle products array and take first n items
      const shuffledProducts = [...allProducts].sort(() => 0.5 - Math.random());
      const selectedProducts = shuffledProducts.slice(0, numProductsToUpdate);

      // Increment view count for each selected product
      selectedProducts.forEach((product) => {
        incrementViewCount(product.name);
      });

      console.log(`Updated view counts for ${numProductsToUpdate} products`);
    };

    // Run every other day (48 hours)
    const interval = setInterval(updateRandomViewCounts, 48 * 60 * 60 * 1000);

    // Run initial update
    updateRandomViewCounts();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    /**
     * Checks if it's Saturday night after 11 PM and restocks all products by adding 500 units to their stock levels.
     * This function serves as a weekly automated inventory replenishment system.
     *
     * The function:
     * 1. Gets the current date and time
     * 2. Checks if it's Saturday (day 6) and after 11 PM
     * 3. If conditions are met, adds 500 units to each product's stock level
     * 4. Logs completion message to console
     *
     * @remarks
     * Stock levels are increased by a fixed amount of 500 units for all products.
     * Products with undefined stock levels will be set to 500.
     */
    const checkAndRestock = () => {
      const now = new Date();
      if (now.getDay() === 6 && now.getHours() >= 23) {
        // Saturday night after 11 PM
        allProducts.forEach((product, index) => {
          allProducts[index] = {
            ...product,
            stockLevel: (product.stockLevel || 0) + 500,
          };
        });
        console.log("Weekly restock completed");
      }
    };

    // Check every hour
    const interval = setInterval(checkAndRestock, 1000 * 60 * 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    /**
     * Adjusts prices for a random selection of products on a biweekly basis.
     * Randomly selects between 5-25 products from the total product pool and
     * applies either a price increase or decrease with equal probability.
     *
     * The function:
     * 1. Determines a random number of products to adjust (5-25)
     * 2. Randomly shuffles the product list
     * 3. Selects the determined number of products
     * 4. For each selected product, randomly applies either a price increase or decrease
     *
     * @remarks
     * This function relies on the existence of an `allProducts` array and
     * an `adjustProductPrice` function to perform the actual price modifications.
     *
     * @example
     * ```typescript
     * adjustPrices(); // Adjusts prices for random products
     * ```
     */
    const adjustPrices = () => {
      // Randomly select between 5-25 products
      const numProductsToAdjust = Math.floor(Math.random() * (25 - 5 + 1)) + 5;
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      const selectedProducts = shuffled.slice(0, numProductsToAdjust);

      selectedProducts.forEach((product) => {
        // 50/50 chance for increase or decrease
        const isIncrease = Math.random() > 0.5;
        adjustProductPrice(product.name, isIncrease);
      });

      console.log(
        `Biweekly price adjustments completed for ${numProductsToAdjust} products`
      );
    };

    // Run price adjustments every two weeks
    const msUntilNextAdjustment = 14 * 24 * 60 * 60 * 1000; // 14 days in milliseconds
    const interval = setInterval(adjustPrices, msUntilNextAdjustment);

    // Run initial adjustment if we haven't done one in the last two weeks
    adjustPrices();

    return () => clearInterval(interval);
  }, []);

  /**
   * Converts a price from USD to the specified or selected currency.
   *
   * @param priceInUSD - The price in USD to convert. Can be a number or string.
   * @param currencyOverride - Optional currency to override the context's selected currency.
   * @returns A formatted string representing the price in the target currency.
   *
   * @example
   * // Convert 19.99 USD to EUR
   * convertPrice(19.99, { code: 'EUR', rate: 0.85 })
   * // Returns "€16.99"
   *
   * @example
   * // Convert "$29.99" to current selected currency
   * convertPrice("$29.99")
   * // Returns price in selected currency format
   *
   * @throws Logs error to console if currency or rate is invalid
   * @defaultValue Returns USD format if conversion fails
   */
  const convertPrice = (
    priceInUSD: number | string,
    currencyOverride?: Currency
  ): string => {
    // If the price is a string, extract the numeric value
    const numericPrice =
      typeof priceInUSD === "string"
        ? parseFloat(priceInUSD.replace(/[^0-9.-]+/g, ""))
        : priceInUSD || 0;

    // Use overridden currency if provided, otherwise use the context's selectedCurrency
    const currencyToUse = currencyOverride || selectedCurrency;

    // Ensure currency and rate are valid
    if (!currencyToUse || typeof currencyToUse.rate !== "number") {
      console.error("Invalid currency or rate");
      return `$${numericPrice.toFixed(2)}`; // Return formatted USD as fallback
    }

    // Get the conversion rate for the currency
    const conversionRate = currencyToUse.rate;

    // Convert the price
    const convertedPrice = numericPrice * conversionRate;

    // Find the symbol for the current currency
    const currencySymbol =
      currencyCountries.find((c) => c.code === currencyToUse.code)?.symbol ||
      currencyToUse.code;

    // Format the price with the currency symbol
    return formatPriceWithCurrency(
      convertedPrice,
      currencyToUse.code,
      currencySymbol
    );
  };

  /**
   * Formats a numeric price with a currency symbol.
   *
   * @param price - The numeric price value to format
   * @param currencyCode - The ISO currency code (e.g., 'USD', 'EUR')
   * @param symbol - Optional custom currency symbol to use instead of looking up from currencyCountries
   * @returns A string with the formatted price including currency symbol
   *
   * @example
   * formatPriceWithCurrency(19.99, 'USD') // Returns '$19.99'
   * formatPriceWithCurrency(29.99, 'EUR', '€') // Returns '€29.99'
   */
  const formatPriceWithCurrency = (
    price: number,
    currencyCode: string,
    symbol?: string
  ): string => {
    // Ensure price is a number and currency is a string
    const numericPrice = Number(price) || 0;

    // Look up the symbol for this currency if not provided
    const currencySymbol =
      symbol ||
      currencyCountries.find((c) => c.code === currencyCode)?.symbol ||
      currencyCode;

    return `${currencySymbol}${numericPrice.toFixed(2)}`;
  };

  /**
   * Memoized array of all products with enhanced metadata.
   * Transforms the nested mockProductData structure into a flat array of products,
   * adding additional metadata like gender, category, subcategory, stock level and view count.
   *
   * @returns {ProductType[]} An array of product objects with the following properties:
   * - All original product properties from mockProductData
   * - gender: The product's gender category
   * - category: The product's main category
   * - subcategory: The product's subcategory
   * - stockLevel: Initial stock level (default: 100)
   * - viewCount: Product view counter (default: 0)
   *
   * @memoized The result is memoized to prevent unnecessary recalculations
   */
  const allProducts = useMemo(() => {
    const products: ProductType[] = [];

    for (const [gender, categoryData] of Object.entries(mockProductData)) {
      for (const [category, subCategoryData] of Object.entries(categoryData)) {
        for (const [subcategory, productsData] of Object.entries(
          subCategoryData
        )) {
          for (const product of Object.values(
            productsData as Record<string, ProductType>
          )) {
            // Add metadata and initial stock level to each product
            products.push({
              ...(product as ProductType),
              gender,
              category,
              subcategory,
              stockLevel: 100, // Initialize stock level to 100
              viewCount: 0, // Initialize view count
            });
          }
        }
      }
    }

    return products;
  }, []);

  /**
   * Adjusts the price of a product either up or down by a random percentage.
   *
   * @param productName - The name of the product to adjust the price for
   * @param isIncrease - Boolean flag indicating whether to increase (true) or decrease (false) the price
   *
   * For price increases:
   * - Random adjustment between 10% to 25%
   *
   * For price decreases:
   * - Random adjustment between 5% to 80%
   *
   * The function will:
   * 1. Find the product by name
   * 2. Parse the current price if it's a string
   * 3. Calculate a random adjustment percentage
   * 4. Apply the adjustment to get the new price
   * 5. Update the product with the new price
   * 6. Add the new price to the product's price history
   *
   * @returns void
   */
  const adjustProductPrice = (productName: string, isIncrease: boolean) => {
    const productIndex = allProducts.findIndex((p) => p.name === productName);
    if (productIndex === -1) return;

    const product = allProducts[productIndex];
    const currentPrice =
      typeof product.price === "string"
        ? parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
        : product.price || 0;

    // Calculate adjustment percentage
    const adjustmentPercent = isIncrease
      ? Math.random() * (0.25 - 0.1) + 0.1 // 10% to 25% increase
      : Math.random() * (0.8 - 0.05) + 0.05; // 5% to 80% decrease

    // Calculate new price
    const newPrice = isIncrease
      ? currentPrice * (1 + adjustmentPercent)
      : currentPrice * (1 - adjustmentPercent);

    // Update product price and price history
    allProducts[productIndex] = {
      ...product,
      price: newPrice.toFixed(2),
      priceHistory: [
        ...(product.priceHistory || []),
        { date: new Date().toISOString(), price: newPrice },
      ],
    };
  };

  /**
   * Retrieves a product by its name and increments its view count.
   *
   * @param name - The name of the product to search for
   * @returns A ProductType object with all fields defaulted if undefined, or undefined if product not found
   *
   * @example
   * ```typescript
   * const product = getProductByName("Blue Jeans");
   * if (product) {
   *   console.log(product.price); // Accesses price with guaranteed string value
   * }
   * ```
   *
   * @remarks
   * - All product properties are defaulted to empty/zero values if undefined
   * - View count is automatically incremented when product is accessed
   * - Price is converted to display format if available
   */
  const getProductByName = (name: string): ProductType | undefined => {
    const product = allProducts.find((p) => p.name === name);
    if (!product) return undefined;

    // Increment view count when product is accessed
    incrementViewCount(name);

    return {
      ...product,
      name: product.name || "",
      gender: product.gender || "",
      category: product.category || "",
      itemType: product.itemType || "",
      description: product.description || "",
      badge: product.badge || "",
      price: product.price || "",
      displayPrice: product.price ? convertPrice(product.price) : "",
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
      subcategory: product.subcategory || "",
      highlights: product.highlights || [],
      images: product.images || [],
      details: product.details || [],
      colors: product.colors || [],
      imageSrc: product.imageSrc || "",
      quantity: product.quantity || 0,
      discountPrice: product.discountPrice || 0,
      originalPrice: product.originalPrice || 0,
      priceHistory: product.priceHistory || [],
      viewCount: product.viewCount || 0,
      stockLevel: product.stockLevel || 0,
    };
  };

  /**
   * Retrieves the first product from the first subcategory of a given category object.
   *
   * @param categoryObj - A record representing the category object, where keys are subcategory names
   * and values are arrays of products or other data.
   *
   * @returns The first product from the first subcategory if available. If the subcategory has no products,
   * returns a default product object with a placeholder description and image. Returns `undefined` if the
   * category object has no subcategories.
   */
  const getProductsByCategory = (categoryObj: Record<string, any>) => {
    // Find the first subcategory
    const firstSubcategoryKey = Object.keys(categoryObj)[0];

    if (!firstSubcategoryKey) return undefined;

    // Get products from the first subcategory
    const subcategoryProducts = categoryObj[firstSubcategoryKey];

    // If the subcategory has products and the first product is an array, get the first item
    if (Array.isArray(subcategoryProducts) && subcategoryProducts.length > 0) {
      return subcategoryProducts[0];
    }

    // Default return if no product is found
    return {
      description: "",
      imageSrc: "/default.jpg",
    };
  };

  /**
   * Retrieves a list of unique subcategories based on the specified gender and optional category filter.
   *
   * @param gender - The gender to filter the subcategories by (e.g., "male", "female").
   * @param category - (Optional) A specific category to further filter the subcategories. If not provided, all categories for the given gender are considered.
   * @returns An array of unique subcategory names that match the specified gender and optional category filter.
   */
  const getSubcategoriesByGender = (
    gender: string,
    category?: string
  ): string[] => {
    const results: string[] = [];

    if (!(gender in mockProductData)) return results;

    for (const [productCategory, subCategoryData] of Object.entries(
      mockProductData[gender as keyof typeof mockProductData]
    )) {
      // Skip this category if a category filter is provided and doesn't match
      if (category && category !== productCategory) continue;

      for (const subcategory of Object.keys(subCategoryData)) {
        if (!results.includes(subcategory)) {
          results.push(subcategory);
        }
      }
    }

    return results;
  };

  /**
   * Searches for products that match the given query string.
   *
   * This function filters the list of all products by checking if the query string
   * is included in the product's name or description. The search is case-insensitive
   * and trims any leading or trailing whitespace from the query.
   *
   * @param query - The search term to filter products by. If the query is empty or only whitespace, an empty array is returned.
   * @returns An array of products that match the search term in their name or description.
   */
  const searchProducts = (query: string): ProductType[] => {
    if (!query.trim()) return [];

    const searchTerm = query.toLowerCase().trim();

    return allProducts.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(searchTerm);
      const descriptionMatch = product.description
        ?.toLowerCase()
        .includes(searchTerm);
      return nameMatch || descriptionMatch;
    });
  };

  /**
   * Filters a list of products based on the provided filter criteria.
   *
   * @param {ProductFilters} filters - The filter criteria to apply to the products.
   *   - `gender` (optional): Filters products by gender (e.g., "male", "female").
   *   - `category` (optional): Filters products by category (e.g., "clothing", "accessories").
   *   - `subcategory` (optional): Filters products by subcategory (e.g., "shirts", "shoes").
   *   - `priceRange` (optional): Filters products within a specific price range.
   *     - `min`: The minimum price.
   *     - `max`: The maximum price.
   *   - `colors` (optional): Filters products by available colors. Matches color names (case-insensitive).
   *   - `onSale` (optional): Filters products that are on sale. Matches products with a "sale" badge.
   *
   * @returns {ProductType[]} An array of products that match the specified filter criteria.
   */
  const filterProducts = (filters: ProductFilters): ProductType[] => {
    const filteredProducts = allProducts.filter((product) => {
      // Gender filter
      if (filters.gender && product.gender !== filters.gender) {
        return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Subcategory filter
      if (filters.subcategory && product.subcategory !== filters.subcategory) {
        return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const price =
          typeof product.price === "string"
            ? parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
            : product.price || 0;

        if (price < filters.priceRange.min || price > filters.priceRange.max) {
          return false;
        }
      }

      // Colors filter
      if (filters.colors && filters.colors.length > 0) {
        if (
          !product.colors ||
          !product.colors.some((color) =>
            filters.colors?.includes(color.name.toLowerCase())
          )
        ) {
          return false;
        }
      }

      // On sale filter
      if (filters.onSale) {
        if (!product.badge || !product.badge.toLowerCase().includes("sale")) {
          return false;
        }
      }

      return true;
    });

    // Convert prices of filtered products to selected currency
    return filteredProducts.map((product) => ({
      ...product,
      price: product.price ? convertPrice(product.price) : "",
    }));
  };

  /**
   * Retrieves a list of related products based on the given product name.
   * The related products are determined by matching the category and subcategory
   * of the specified product, excluding the product itself. The results are shuffled
   * to provide randomness and limited to a specified number.
   *
   * @param productName - The name of the product to find related products for.
   * @param limit - The maximum number of related products to return (default is 4).
   * @returns An array of related products of type `ProductType`. Returns an empty array
   *          if the product is not found or no related products exist.
   */
  const getRelatedProducts = (
    productName: string,
    limit = 4
  ): ProductType[] => {
    const product = allProducts.find((p) => p.name === productName);

    if (!product) return [];

    // Find products in the same category and subcategory
    const relatedProducts = allProducts.filter(
      (p) =>
        p.name !== productName &&
        p.category === product.category &&
        p.subcategory === product.subcategory
    );

    // Shuffle the array to get random related products
    const shuffled = [...relatedProducts].sort(() => 0.5 - Math.random());

    // Return products with converted prices
    return shuffled.slice(0, limit).map((product) => ({
      ...product,
      price: product.price ? convertPrice(product.price) : "",
    }));
  };

  /**
   * Retrieves a list of featured products, either explicitly marked with a "featured" badge
   * or randomly selected if no featured products are found.
   *
   * @param {number} [limit=8] - The maximum number of products to return. Defaults to 8.
   * @returns {ProductType[]} An array of featured products, limited to the specified number.
   */
  const getFeaturedProducts = (limit: number = 8): ProductType[] => {
    // Get products with 'featured' badge or tag
    const featured = allProducts.filter((product) =>
      product.badge?.toLowerCase().includes("featured")
    );

    // If no products explicitly marked as featured, return some random products
    if (featured.length === 0) {
      const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, limit);
    }

    // Return products with converted prices
    return featured.slice(0, limit).map((product) => ({
      ...product,
      price: product.price ? convertPrice(product.price) : "",
    }));
  };

  /**
   * Retrieves a list of new arrival products, limited to a specified number.
   *
   * This function filters the products that have a "new" badge (case-insensitive),
   * sorts them (currently no specific sorting logic is applied beyond filtering),
   * and returns a subset of the products based on the provided limit.
   *
   * @param {number} [limit=8] - The maximum number of products to return. Defaults to 8.
   * @returns {ProductType[]} An array of products marked as "new", limited to the specified count.
   */
  const getNewArrivals = (limit: number = 8): ProductType[] => {
    // Get products with 'new' badge
    const newProducts = allProducts.filter((product) =>
      product.badge?.toLowerCase().includes("new")
    );

    // Sort by newest first (in a real app, you'd sort by date added)
    const sorted = [...newProducts];

    // Return products with converted prices
    return sorted.slice(0, limit).map((product) => ({
      ...product,
      price: product.price ? convertPrice(product.price) : "",
    }));
  };

  /**
   * Sorts an array of products based on the specified sorting option.
   *
   * @param products - An array of products to be sorted. Each product should conform to the `ProductType` interface.
   * @param sortBy - The sorting option to determine the order of the products.
   *                 Possible values:
   *                 - `"price-low-to-high"`: Sorts products by price in ascending order.
   *                 - `"price-high-to-low"`: Sorts products by price in descending order.
   *                 - `"newest"`: Sorts products by their "new" badge, prioritizing products marked as new.
   *                 - `"popular"`: Returns the products as-is (no sorting applied).
   *                 - Any other value will return the products as-is.
   *
   * @returns A new array of products sorted based on the specified sorting option.
   */
  const sortProducts = (
    products: ProductType[],
    sortBy: SortOption
  ): ProductType[] => {
    const sorted = [...products];

    switch (sortBy) {
      case "price-low-to-high":
        return sorted.sort((a, b) => {
          const priceA =
            typeof a.price === "string"
              ? parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
              : a.price || 0;
          const priceB =
            typeof b.price === "string"
              ? parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
              : b.price || 0;
          return priceA - priceB;
        });

      case "price-high-to-low":
        return sorted.sort((a, b) => {
          const priceA =
            typeof a.price === "string"
              ? parseFloat(a.price.replace(/[^0-9.-]+/g, ""))
              : a.price || 0;
          const priceB =
            typeof b.price === "string"
              ? parseFloat(b.price.replace(/[^0-9.-]+/g, ""))
              : b.price || 0;
          return priceB - priceA;
        });

      case "newest":
        // In a real app, you'd sort by date added
        return sorted.sort((a, b) => {
          if (a.badge?.includes("new") && !b.badge?.includes("new")) return -1;
          if (!a.badge?.includes("new") && b.badge?.includes("new")) return 1;
          return 0;
        });

      case "popular":
        // In a real app, you'd sort by popularity metrics
        return sorted;

      default:
        return sorted;
    }
  };

  /**
   * Filters the list of products to return only those within the specified price range.
   *
   * @param min - The minimum price (inclusive) of the range.
   * @param max - The maximum price (inclusive) of the range.
   * @returns An array of products whose prices fall within the specified range.
   *
   * @remarks
   * - If the product price is a string, it will be parsed into a number by removing any non-numeric characters.
   * - If the product price is undefined or invalid, it defaults to 0.
   */
  const getProductsByPriceRange = (min: number, max: number): ProductType[] => {
    return allProducts
      .filter((product) => {
        const price =
          typeof product.price === "string"
            ? parseFloat(product.price.replace(/[^0-9.-]+/g, ""))
            : product.price || 0;

        return price >= min && price <= max;
      })
      .map((product) => ({
        ...product,
        price: product.price ? convertPrice(product.price) : "",
      }));
  };

  /**
   * Filters and transforms products based on gender, converting prices in the process.
   * @param {string} gender - The gender to filter products by ('men', 'women', etc.)
   * @returns {ProductType[]} An array of products filtered by gender with converted prices
   */
  const getProductsByGender = (gender: string): ProductType[] => {
    return allProducts
      .filter((product) => product.gender === gender)
      .map((product) => ({
        ...product,
        price: product.price ? convertPrice(product.price) : "",
      }));
  };

  /**
   * Checks if a product has a valid discount price.
   * @param id - The name/identifier of the product to check
   * @returns {boolean} True if the product exists and has a discount price lower than the regular price, false otherwise
   */
  const hasDiscount = (id: string): boolean => {
    const product = allProducts.find((item) => item.name === id);
    return product
      ? product.discountPrice !== undefined &&
          Number(product.discountPrice) < Number(product.price)
      : false;
  };

  /**
   * Determines if a product has had a price drop in the last month
   * @param id - The name identifier of the product to check
   * @returns {boolean} True if the product's current price is lower than any price in its history from the last month, false otherwise
   *
   * @remarks
   * This function:
   * - Searches for a product by name in allProducts array
   * - Checks the price history for the last month
   * - Compares current price against historical prices
   * - Returns false if product not found or has no price history
   */
  const hasPriceDrop = (id: string): boolean => {
    const product = allProducts.find((item) => item.name === id);
    if (!product || !product.priceHistory) return false;

    const today = new Date();
    const lastMonth = new Date(today.setMonth(today.getMonth() - 1));
    const currentPrice = Number(product.price);

    return product.priceHistory.some(
      (history) =>
        new Date(history.date) >= lastMonth && history.price > currentPrice
    );
  };

  /**
   * Updates the price history of a product by adding a new price entry with the current date
   * @param id - The name identifier of the product to update
   * @param newPrice - The new price to add to the product's price history
   * @returns void
   * @remarks In a real application, this would update the product in a database
   */
  const updatePriceHistory = (id: string, newPrice: number) => {
    // In a real application, this would update the product in a database
    const productIndex = allProducts.findIndex((item) => item.name === id);
    if (productIndex === -1) return;

    const product = allProducts[productIndex];
    const newHistory = product.priceHistory || [];
    allProducts[productIndex] = {
      ...product,
      priceHistory: [
        ...newHistory,
        { date: new Date().toISOString(), price: newPrice },
      ],
    };
  };

  // Inventory management
  /**
   * Retrieves the current stock level for a specified product
   * @param productName - The name of the product to look up
   * @returns The stock level of the product, or 0 if the product is not found
   */
  const getStockLevel = (productName: string): number => {
    const product = allProducts.find((p) => p.name === productName);
    return product?.stockLevel || 0;
  };

  /**
   * Checks if a product is currently in stock
   * @param productName - The name of the product to check
   * @returns True if the product has stock greater than 0, false otherwise
   */
  const isInStock = (productName: string): boolean => {
    return getStockLevel(productName) > 0;
  };

  /**
   * Determines if a product's stock level is at or below a specified threshold
   * @param {string} productName - The name of the product to check stock level for
   * @param {number} [threshold=5] - The threshold value to compare against (defaults to 5)
   * @returns {boolean} True if stock level is at or below threshold, false otherwise
   */
  const isLowStock = (productName: string, threshold: number = 5): boolean => {
    return getStockLevel(productName) <= threshold;
  };

  /**
   * Updates the stock level of a product by reducing its quantity
   * @param productName - The name of the product to update
   * @param quantity - The amount to reduce from the current stock level
   * @returns void
   * @remarks
   * - If the product is not found, the function returns without making any changes
   * - The stock level cannot go below 0
   * - If the product's current stock level is undefined, it is treated as 0
   */
  const updateStockLevel = (productName: string, quantity: number) => {
    const productIndex = allProducts.findIndex((p) => p.name === productName);
    if (productIndex === -1) return;

    const currentStock = allProducts[productIndex].stockLevel || 0;
    allProducts[productIndex] = {
      ...allProducts[productIndex],
      stockLevel: Math.max(0, currentStock - quantity), // Prevent negative stock
    };
  };

  // Ratings and reviews
  /**
   * Retrieves the rating for a specified product by its name.
   *
   * @param productName - The name of the product to look up
   * @returns The rating value of the product if found, or 0 if the product doesn't exist
   */
  const getProductRating = (productName: string): number => {
    const product = allProducts.find((p) => p.name === productName);
    return product?.rating || 0;
  };

  /**
   * Retrieves the review count for a specific product by its name.
   * @param {string} productName - The name of the product to look up
   * @returns {number} The number of reviews for the product, or 0 if the product is not found
   */
  const getProductReviewCount = (productName: string): number => {
    const product = allProducts.find((p) => p.name === productName);
    return product?.reviewCount || 0;
  };

  // Analytics
  /**
   * Retrieves the sales count for a specific product from localStorage
   * @param productName - The name of the product to get sales count for
   * @returns The number of sales for the product, returns 0 if no sales data exists
   */
  const getSalesCount = (productName: string): number => {
    const salesData = localStorage.getItem(`sales_${productName}`);
    if (!salesData) return 0;
    return JSON.parse(salesData).count || 0;
  };

  /**
   * Calculates a popularity score for a product based on view count and sales data.
   * The score is weighted with 30% from views and 70% from sales.
   *
   * @param productName - The name of the product to calculate score for
   * @returns A numerical score representing the product's popularity
   * @example
   * ```typescript
   * const score = getPopularityScore("Sample Product"); // Returns weighted score
   * ```
   */
  const getPopularityScore = (productName: string): number => {
    const product = allProducts.find((p) => p.name === productName);
    const views = product?.viewCount || 0;
    const sales = getSalesCount(productName);
    return views * 0.3 + sales * 0.7;
  };

  /**
   * Retrieves a list of products sorted by view count in descending order
   *
   * @param limit - Maximum number of products to return (defaults to 10)
   * @returns Array of products sorted by view count, limited to specified size
   *
   * @example
   * // Get top 5 most viewed products
   * const topProducts = getMostViewedProducts(5);
   */
  const getMostViewedProducts = (limit = 10): ProductType[] => {
    return [...allProducts]
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, limit);
  };

  /**
   * Retrieves a sorted array of best-selling products based on their sales count.
   *
   * @param limit - Maximum number of products to return (defaults to 10)
   * @returns Array of products sorted by sales count in descending order, limited to specified amount
   *
   * @example
   * const topSellers = getBestSellingProducts(5); // Returns top 5 best-selling products
   */
  const getBestSellingProducts = (limit = 10): ProductType[] => {
    return [...allProducts]
      .sort((a, b) => {
        const aSales = getSalesCount(a.name);
        const bSales = getSalesCount(b.name);
        return bSales - aSales;
      })
      .slice(0, limit);
  };

  // Price history stats
  /**
   * Retrieves the price history for a specific product within a given time period
   * @param productName - The name of the product to get price history for
   * @param days - Number of days to look back in history (defaults to 30)
   * @returns An array of price history records filtered by the specified time period
   * @remarks
   * - Returns an empty array if the product is not found or has no price history
   * - Filters price history entries newer than the cutoff date (current date minus specified days)
   */
  const getPriceHistory = (productName: string, days = 30) => {
    const product = allProducts.find((p) => p.name === productName);
    if (!product?.priceHistory) return [];

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return product.priceHistory.filter(
      (record) => new Date(record.date) >= cutoffDate
    );
  };

  /**
   * Retrieves the lowest price for a given product within a specified time period
   * @param productName - The name of the product to check prices for
   * @param days - Number of days to look back in price history (defaults to 30)
   * @returns The lowest price found for the product in the specified time period
   */
  const getLowestPrice = (productName: string, days = 30): number => {
    const history = getPriceHistory(productName, days);
    return Math.min(...history.map((record) => record.price));
  };

  /**
   * Gets the highest price for a product within a specified time period.
   *
   * @param productName - The name of the product to check prices for
   * @param days - Number of days to look back in price history (defaults to 30)
   * @returns The highest price found within the specified time period
   */
  const getHighestPrice = (productName: string, days = 30): number => {
    const history = getPriceHistory(productName, days);
    return Math.max(...history.map((record) => record.price));
  };

  /**
   * Calculates the average price of a product over a specified period.
   *
   * @param {string} productName - The name of the product to calculate average price for
   * @param {number} [days=30] - The number of days to look back for price history (defaults to 30)
   * @returns {number} The average price over the specified period, or 0 if no price history exists
   */
  const getAveragePrice = (productName: string, days: number = 30): number => {
    const history = getPriceHistory(productName, days);
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, record) => acc + record.price, 0);
    return sum / history.length;
  };

  /**
   * Calculates the percentage drop in price for a given product from its highest recorded price
   * @param productName - The name of the product to calculate price drop for
   * @returns The percentage drop in price (0-100). Returns 0 if product not found or has no price history
   */
  const getPriceDropPercentage = (productName: string): number => {
    const product = allProducts.find((p) => p.name === productName);
    if (!product || !product.priceHistory || product.priceHistory.length === 0)
      return 0;

    const currentPrice = Number(product.price);
    const highestPrice = getHighestPrice(productName);

    return ((highestPrice - currentPrice) / highestPrice) * 100;
  };

  /**
   * Increments the view count of a product by one.
   *
   * @param productName - The name of the product to increment the view count for
   * @returns void
   * @throws None
   *
   * @remarks
   * If the product is not found (productIndex === -1), the function will return early
   * without making any changes. The view count starts at 0 if not previously set.
   */
  const incrementViewCount = (productName: string): void => {
    const productIndex = allProducts.findIndex((p) => p.name === productName);
    if (productIndex === -1) return;

    allProducts[productIndex] = {
      ...allProducts[productIndex],
      viewCount: (allProducts[productIndex].viewCount || 0) + 1,
    };
  };

  return (
    <ProductContext.Provider
      value={{
        getProductByName,
        getProductsByCategory,
        getSubcategoriesByGender,
        searchProducts,
        filterProducts,
        getRelatedProducts,
        getFeaturedProducts,
        getNewArrivals,
        sortProducts,
        getProductsByPriceRange,
        convertPrice,
        formatPrice: formatPriceWithCurrency,
        getProductsByGender,
        hasDiscount,
        hasPriceDrop,
        updatePriceHistory,
        getStockLevel,
        isInStock,
        isLowStock,
        updateStockLevel,
        getProductRating,
        getProductReviewCount,
        getPopularityScore,
        getMostViewedProducts,
        getBestSellingProducts,
        getPriceHistory,
        getLowestPrice,
        getHighestPrice,
        getAveragePrice,
        getPriceDropPercentage,
        getSalesCount,
        incrementViewCount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

/**
 * Custom hook to access the ProductContext.
 *
 * This hook provides access to the ProductContext, allowing components
 * to consume the context's values. It ensures that the hook is used
 * within a valid `ProductProvider` by throwing an error if the context
 * is not available.
 *
 * @returns {ProductContextType} The current value of the ProductContext.
 * @throws {Error} If the hook is used outside of a `ProductProvider`.
 */
export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
