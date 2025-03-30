// cartContext.tsx
"use client";

import { currencyCountries } from "@/lib/countriesConstant";
import { CartContextType, CartItem, CountryTaxInfo } from "@/lib/interfaces";
import { ShippingMethod } from "@/lib/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  JSX,
} from "react";
import { formatDate } from "@/lib/utils";
import { useCurrency } from "./currencyContext";
import { useWishlist } from "./wishlistContext";
import { useProduct } from "./productContext";

const CartContext = createContext<CartContextType | undefined>(undefined);

// -------------------
// Helper Functions
// -------------------

/**
 * Adds a specified number of business days to a given date.
 * Note: This implementation currently treats all days as business days.
 *
 * @param date - The starting date to add business days to
 * @param businessDays - The number of business days to add
 * @returns A new Date object representing the date after adding the specified business days
 *
 * @example
 * const startDate = new Date('2023-01-01');
 * const newDate = addBusinessDays(startDate, 5);
 * // Returns: 2023-01-06
 */
const addBusinessDays = (date: Date, businessDays: number): Date => {
  const result = new Date(date);
  let addedDays = 0;
  while (addedDays < businessDays) {
    result.setDate(result.getDate() + 1);
    addedDays++;
  }
  return result;
};

/**
 * Searches for a country in the currencyCountries array and returns its currency information
 * @param targetValue - The country value to search for (case-insensitive)
 * @returns An object containing the currency code, country value, and distance factor if found, null otherwise
 * @returns {Object} result
 * @returns {string} result.currencyCode - The currency code associated with the country
 * @returns {string} result.value - The original country value
 * @returns {number} result.distanceFactor - The distance factor for shipping calculations
 * @returns {null} When no matching country is found
 */
const findCountryByValue = (
  targetValue: string
): { currencyCode: string; value: string; distanceFactor: number } | null => {
  const normalizedTarget = targetValue.toUpperCase();
  for (const currency of currencyCountries) {
    const countryData = currency.countries.find(
      (country) => country.value.toUpperCase() === normalizedTarget
    );
    if (countryData) {
      return {
        currencyCode: currency.code,
        value: countryData.value,
        distanceFactor: countryData.distanceFactor,
      };
    }
  }
  return null;
};

/**
 * Calculates delivery window dates based on shipping method, start date, and destination country.
 *
 * @param method - The shipping method selected ("standard", "economy", "expedited", "twoDay", "sameDay", "overnight")
 * @param startDate - The date when shipping begins
 * @param country - The destination country code/value
 *
 * @returns An object containing:
 *  - windowStart: Date when the delivery window begins
 *  - windowEnd: Date when the delivery window ends
 *
 * @remarks
 * The function factors in:
 * - Base delays specific to each shipping method
 * - Distance factors based on destination country
 * - Business days calculations
 * - Additional delays and window adjustments based on distance
 *
 * The delivery window is calculated using:
 * 1. Base delay for the shipping method
 * 2. Additional delay based on distance factor
 * 3. Window length specific to shipping method
 * 4. Window adjustment based on distance factor
 */
const getDeliveryWindowDates = (
  method: ShippingMethod,
  startDate: Date,
  country: string
): { windowStart: Date; windowEnd: Date } => {
  const countryData = findCountryByValue(country);
  const distanceFactor = countryData ? countryData.distanceFactor : 0;

  // Define base delays (in business days) and window lengths
  let baseDelay: number, baseWindowStart: number, baseWindowEnd: number;

  // Use multipliers that scale the distance factor into additional days
  const multiplierStart = 0.1; // Adds extra delay based on distance
  const multiplierWindow = 0.2; // Adds extra window length based on distance

  switch (method) {
    case "standard":
      baseDelay = 9; // Base delay before delivery starts
      baseWindowStart = 50; // Minimum delivery window (5 days)
      baseWindowEnd = 55; // Maximum delivery window (7 days)
      break;
    case "economy":
      baseDelay = 4; // Base delay before delivery starts
      baseWindowStart = 10; // Minimum delivery window (5 days)
      baseWindowEnd = 15; // Maximum delivery window (7 days)
      break;
    case "expedited":
      baseDelay = 0; // Base delay before delivery starts
      baseWindowStart = 1; // Minimum delivery window (2 days)
      baseWindowEnd = 5; // Maximum delivery window (4 days)
      break;
    case "twoDay":
      baseDelay = 0; // Base delay before delivery starts
      baseWindowStart = 2; // Minimum delivery window (5 days)
      baseWindowEnd = 2; // Maximum delivery window (7 days)
      break;
    case "sameDay":
      baseDelay = -1; // Base delay before delivery starts
      baseWindowStart = 0; // Minimum delivery window (5 days)
      baseWindowEnd = 0; // Maximum delivery window (7 days)
      break;
    case "overnight":
      baseDelay = 0; // No delay for overnight shipping
      baseWindowStart = 1; // Single-day delivery
      baseWindowEnd = 1; // Single-day delivery
      break;
    default:
      baseDelay = 2; // Default to standard shipping
      baseWindowStart = 5;
      baseWindowEnd = 7;
  }

  // Calculate additional delays and window adjustments based on distance factor
  const additionalStartDelay = Math.round(distanceFactor * multiplierStart);
  const additionalWindowAdjustment = Math.round(
    distanceFactor * multiplierWindow
  );

  // Calculate the start of the delivery window
  const windowStart = addBusinessDays(
    startDate,
    baseDelay + additionalStartDelay
  );

  // Calculate the end of the delivery window
  const windowEnd = addBusinessDays(
    windowStart,
    baseWindowEnd - baseWindowStart + additionalWindowAdjustment
  );

  return { windowStart, windowEnd };
};

/**
 * Generates a human-readable delivery time description based on shipping method and dates.
 *
 * @param method - The shipping method selected for delivery
 * @param startDate - The starting date for calculating the delivery window
 * @param country - The destination country for delivery
 * @returns A formatted string describing when the delivery will arrive (e.g., "arriving in 2 weeks" or "arriving in 3 days to 5 days")
 *
 * @example
 * ```typescript
 * const description = getDeliveryDescription(
 *   ShippingMethod.EXPRESS,
 *   new Date(),
 *   "US"
 * ); // Returns "arriving in 2 days"
 * ```
 *
 * The function handles various time ranges and formats them appropriately:
 * - Same day deliveries show as "today"
 * - Next day deliveries show as "tomorrow"
 * - Deliveries within a week show as "X days"
 * - Deliveries within a month show as "X weeks and Y days"
 * - Longer deliveries show as "X months and Y weeks"
 */
const getDeliveryDescription = (
  method: ShippingMethod,
  startDate: Date,
  country: string
): string => {
  const { windowStart, windowEnd } = getDeliveryWindowDates(
    method,
    startDate,
    country
  );
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  /**
   * Calculates the number of days between two dates, ignoring time components.
   * Converts dates to UTC midnight to ensure consistent day calculations across time zones.
   *
   * @param from - The starting date
   * @param to - The ending date
   * @returns The number of days between the two dates, rounded to the nearest integer
   *
   * @example
   * const start = new Date('2023-01-01');
   * const end = new Date('2023-01-05');
   * const days = diffInDays(start, end); // returns 4
   */
  const diffInDays = (from: Date, to: Date): number => {
    // Convert both dates to UTC midnight to avoid time zone issues
    const fromUTC = new Date(
      Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())
    );
    const toUTC = new Date(
      Date.UTC(to.getFullYear(), to.getMonth(), to.getDate())
    );

    // Calculate the difference in days (1000ms * 60s * 60min * 24hr = 86400000ms per day)
    return Math.round((toUTC.getTime() - fromUTC.getTime()) / 86400000);
  };

  const daysStart = diffInDays(today, windowStart);
  const daysEnd = diffInDays(today, windowEnd);

  /**
   * Formats a number of days into a human-readable string representation.
   *
   * @param days - The number of days to format
   * @returns A formatted string describing the time period
   *
   * @example
   * formatDays(0)  // returns "today"
   * formatDays(1)  // returns "tomorrow"
   * formatDays(5)  // returns "5 days"
   * formatDays(14) // returns "2 weeks"
   * formatDays(21) // returns "3 weeks"
   * formatDays(25) // returns "3 weeks and 4 days"
   * formatDays(30) // returns "1 month"
   * formatDays(45) // returns "1 month and 2 weeks"
   */
  const formatDays = (days: number): string => {
    if (days === 0) {
      return "today";
    } else if (days === 1) {
      return "tomorrow";
    } else if (days <= 7) {
      // Simple days if less than or equal to a week
      return `${days} days`;
    } else if (days <= 30) {
      // Calculate full weeks and remaining days
      const weeks = Math.floor(days / 7);
      const remainingDays = days % 7;

      if (remainingDays === 0) {
        return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
      } else {
        return `${weeks} ${
          weeks === 1 ? "week" : "weeks"
        } and ${remainingDays} ${remainingDays === 1 ? "day" : "days"}`;
      }
    } else {
      // Calculate months, weeks for longer periods
      const months = Math.floor(days / 30);
      const remainingDays = days % 30;
      const weeks = Math.floor(remainingDays / 7);

      if (remainingDays === 0) {
        return `${months} ${months === 1 ? "month" : "months"}`;
      } else if (weeks === 0) {
        return `${months} ${
          months === 1 ? "month" : "months"
        } and ${remainingDays} ${remainingDays === 1 ? "day" : "days"}`;
      } else {
        return `${months} ${months === 1 ? "month" : "months"} and ${weeks} ${
          weeks === 1 ? "week" : "weeks"
        }`;
      }
    }
  };

  if (daysStart === daysEnd) {
    return `arriving in ${formatDays(daysStart)}`;
  }
  return `arriving in ${formatDays(daysStart)} to ${formatDays(daysEnd)}`;
};

// -------------------
// CartProvider Component
// -------------------

/**
 * Provider component for managing shopping cart functionality in an e-commerce application.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider
 *
 * @remarks
 * Handles cart operations including:
 * - Adding/removing items
 * - Quantity updates
 * - Price calculations
 * - Discount management
 * - Shipping calculations
 * - Tax calculations (domestic & international)
 * - Sales tracking
 * - Cart persistence
 *
 * Features:
 * - Local storage integration for cart persistence
 * - International shipping support
 * - Multiple shipping methods
 * - Discount code system
 * - Sales history tracking
 * - Delivery date estimation
 * - Wishlist integration
 *
 * @example
 * ```tsx
 * <CartProvider>
 *   <App />
 * </CartProvider>
 * ```
 *
 * @returns {JSX.Element} A context provider that wraps child components with cart functionality
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): JSX.Element => {
  const { calculateImportFee, calculateImportTaxes } = useCurrency();
  const { addToWishlist } = useWishlist();
  const { getProductByName, getProductRating } = useProduct();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod>("standard");
  const [salesHistory, setSalesHistory] = useState<
    Array<{
      date: string;
      productName: string;
      quantity: number;
    }>
  >([]);

  // Discount codes table
  const discountCodes: Record<string, number> = {
    WELCOME10: 0.1,
    SUMMER25: 0.25,
    FREESHIP: 0.15,
  };

  // Shipping rates table
  const shippingRates: Record<ShippingMethod, number> = {
    standard: 5.25,
    economy: 8.0,
    expedited: 15.0,
    twoDay: 20.0,
    overnight: 35.0,
    sameDay: 100.0,
  };

  // International shipping fee rates
  const internationalShippingFees: Record<ShippingMethod, number> = {
    standard: 35.0,
    economy: 50.0,
    expedited: 70.0,
    twoDay: 85.0,
    sameDay: 500.0,
    overnight: 150.0,
  };

  // Rehydrate cart items from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Persist cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // -------------------
  // Cart Functions
  // -------------------

  /**
   * Updates the sales history for a specific product and stores the sales count in localStorage.
   *
   * @param productName - The name of the product being sold
   * @param quantity - The quantity of the product being sold
   *
   * @remarks
   * This function performs two main operations:
   * 1. Adds a new sales record to the sales history with current timestamp
   * 2. Updates the total sales count for the product in localStorage
   *
   * @example
   * ```typescript
   * updateProductSales("Product Name", 2);
   * ```
   */
  const updateProductSales = (productName: string, quantity: number) => {
    const date = new Date().toISOString();
    setSalesHistory((prev) => [...prev, { date, productName, quantity }]);

    // No direct product context dependency needed
    localStorage.setItem(
      `sales_${productName}`,
      JSON.stringify({
        count: getProductSalesCount(productName) + quantity,
        lastUpdated: date,
      })
    );
  };

  /**
   * Calculates the total quantity of a specific product sold based on sales history.
   *
   * @param productName - The name of the product to get sales count for
   * @returns The total number of units sold for the specified product
   *
   * @example
   * // Returns total quantity sold for "Product A"
   * const soldCount = getProductSalesCount("Product A");
   */
  const getProductSalesCount = (productName: string): number => {
    return salesHistory
      .filter((sale) => sale.productName === productName)
      .reduce((total, sale) => total + sale.quantity, 0);
  };

  /**
   * Retrieves sales trends for a specified time period.
   * @param days - Number of days to look back (default: 30)
   * @returns An array of sales records filtered to include only those within the specified time period
   *
   * @example
   * // Get sales trends for last 7 days
   * const weekTrends = getSalesTrends(7);
   *
   * // Get default 30 day trends
   * const monthTrends = getSalesTrends();
   */
  const getSalesTrends = (days = 30) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    return salesHistory.filter((sale) => new Date(sale.date) >= cutoffDate);
  };

  /**
   * Adds an item to the shopping cart.
   * If the item already exists in the cart, its quantity will be increased.
   * If the item is new, it will be added as a new entry.
   * Also updates the product sales statistics.
   *
   * @param item - The cart item to be added
   * @param item.name - Name of the product
   * @param item.quantity - Quantity to be added
   * @returns void
   *
   * @example
   * addToCart({ name: "Product", quantity: 1 });
   */
  const addToCart = (item: CartItem): void => {
    if (itemExistsInCart(item.name)) {
      setCartItems((prevItems) =>
        prevItems.map((existingItem) =>
          existingItem.name === item.name
            ? {
                ...existingItem,
                quantity: existingItem.quantity + item.quantity,
              }
            : existingItem
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, item]);
    }
    updateProductSales(item.name, item.quantity);
  };

  /**
   * Removes an item from the cart based on its ID
   * @param id - The unique identifier of the item to be removed
   * @returns void
   */
  const removeFromCart = (productName: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productName)
    );
  };

  /**
   * Clears all items from the shopping cart by setting the cart items array to empty.
   * This function resets the cart state to its initial empty state.
   * @returns {void}
   */
  const clearCart = (): void => {
    setCartItems([]);
  };

  /**
   * Updates the quantity of a specific item in the cart.
   * If the quantity is set to 0, the item is removed from the cart.
   *
   * @param id - The unique identifier of the cart item
   * @param quantity - The new quantity to set for the cart item
   * @returns void
   *
   * @example
   * // To update quantity of item with id "123" to 5
   * updateQuantity("123", 5)
   *
   * // To remove item with id "123" from cart
   * updateQuantity("123", 0)
   */
  const updateQuantity = (productName: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productName);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name === productName ? { ...item, quantity: quantity } : item
      )
    );
  };

  /**
   * Retrieves a cart item by its name from the cart items array.
   * @param name - The name of the cart item to find.
   * @returns The matching CartItem object if found, undefined otherwise.
   */
  const getCartItem = (name: string): CartItem | undefined => {
    return cartItems.find((item) => item.name === name);
  };

  /**
   * Calculates the subtotal of all items in the cart.
   * Multiplies each item's price by its quantity and sums all products.
   *
   * @returns {number} The total price of all items in the cart
   */
  const getSubTotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  /**
   * Calculates the tax amount based on the total price and country.
   *
   * @param total - The total amount to calculate tax on
   * @param country - The country code for tax calculation (defaults to "USA")
   * @returns The calculated tax amount as a number
   *
   * @remarks
   * - For USA, applies a standard 8% domestic tax rate
   * - For other countries, calculates VAT/GST using country-specific rates
   *
   * @example
   * ```typescript
   * // Calculate US tax
   * const usTax = calculateTaxAmount(100); // Returns 8
   *
   * // Calculate international tax
   * const ukTax = calculateTaxAmount(100, "UK");
   * ```
   */
  const calculateTaxAmount = (
    total: number,
    country: string = "USA"
  ): number => {
    // If USA, use standard domestic tax rate
    if (country === "USA") {
      const domesticTaxRate = 0.08; // 8% standard domestic tax rate
      return total * domesticTaxRate;
    }

    // For international, calculate VAT/GST based on country-specific rates
    const { vatAmount } = calculateImportTaxes(total, country);
    return vatAmount;
  };

  /**
   * Calculates the total number of items in the shopping cart.
   * @returns {number} The sum of quantities of all items in the cart.
   */
  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Calculates the total price of the cart including shipping, taxes, and international fees.
   *
   * @param shippingCountry - The country code where the order will be shipped to (defaults to "USA")
   * @returns The total price including all applicable fees, taxes and shipping costs
   *
   * @remarks
   * The total price calculation includes:
   * - Subtotal of all items in cart
   * - Shipping costs based on selected shipping method
   * - International shipping fees if applicable
   * - Import taxes for international orders
   * - Sales tax for domestic (USA) orders
   *
   * If the shipping country is invalid or not found, returns 0.
   *
   * For international orders (non-USA), import taxes are added if applicable.
   * For domestic orders (USA), standard sales tax is applied.
   */
  const getTotalPrice = (shippingCountry: string = "USA"): number => {
    const countryData = findCountryByValue(shippingCountry);
    if (!countryData) {
      return 0;
    }

    // Calculate subtotal
    const subtotal = cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );

    // Get shipping method and costs
    const shippingMethod = getShippingMethod();
    const shipping = calculateShippingCost(shippingMethod);

    // Get international fee if applicable
    const internationalFee = calculateInternationalShippingFee(
      shippingCountry,
      shippingMethod
    );

    // Use appropriate shipping cost (domestic or international)
    const shippingCost = internationalFee > 0 ? internationalFee : shipping;

    // Calculate taxes and import charges
    const isInternational = shippingCountry !== "USA" && shippingCountry !== "";

    if (isInternational) {
      // For international orders, calculate import taxes
      const importTaxes = calculateImportFee(subtotal, shippingCountry);
      if (importTaxes > 0) {
        return subtotal + shippingCost + importTaxes;
      } else {
        return subtotal + shippingCost;
      }
    } else {
      // For domestic orders, calculate normal sales tax
      const taxAmount = calculateTaxAmount(subtotal, "USA");
      return subtotal + shippingCost + taxAmount;
    }
  };

  /**
   * Checks if an item exists in the cart based on its name.
   *
   * @param name - The name of the item to search for in the cart
   * @returns The CartItem object if found, undefined otherwise
   *
   * @example
   * const item = itemExistsInCart("Product Name");
   * if (item) {
   *   console.log("Item found in cart:", item);
   * }
   */
  const itemExistsInCart = (name: string): CartItem | undefined => {
    return cartItems.find((item) => item.name === name);
  };

  /**
   * Validates and applies a discount code to the cart.
   *
   * @param code - The discount code entered by the user
   * @returns {boolean} - Returns true if the discount code is valid and applied successfully, false otherwise
   *
   * @example
   * // Returns true and applies 20% discount
   * applyDiscount("SUMMER20")
   *
   * // Returns false for invalid code
   * applyDiscount("INVALID")
   */
  const applyDiscount = (code: string): boolean => {
    const normalizedCode = code.trim().toUpperCase();
    if (discountCodes[normalizedCode]) {
      setDiscountCode(normalizedCode);
      setDiscountAmount(discountCodes[normalizedCode]);
      return true;
    }
    return false;
  };

  /**
   * Calculates the total price after applying any available discount
   * @param shippingCountry - The country code where items will be shipped to
   * @returns The final price after discount has been applied, or the original subtotal if no discount exists
   */
  const getDiscountedTotal = (shippingCountry: string): number => {
    const subtotal = getTotalPrice(shippingCountry);
    return discountAmount > 0 ? subtotal * (1 - discountAmount) : subtotal;
  };

  /**
   * Saves the current cart state to localStorage.
   * The saved cart data includes cart items, discount code, discount amount, and timestamp.
   * The data is stored in JSON format under the key "savedCart".
   * @returns {void}
   */
  const saveCartForLater = (): void => {
    const savedCartData = {
      items: cartItems,
      discountCode,
      discountAmount,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem("savedCart", JSON.stringify(savedCartData));
  };

  /**
   * Loads the previously saved cart state from localStorage.
   * If a saved cart exists, it restores:
   * - Cart items
   * - Applied discount code
   * - Discount amount
   * If no saved cart is found, the cart state remains unchanged.
   *
   * @returns void
   */
  const loadSavedCart = (): void => {
    const savedCart = localStorage.getItem("savedCart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart.items || []);
      setDiscountCode(parsedCart.discountCode || null);
      setDiscountAmount(parsedCart.discountAmount || 0);
    }
  };

  /**
   * Calculates the shipping cost based on the selected shipping method.
   *
   * @param method - The shipping method selected by the user
   * @returns The shipping cost for the selected method, or 0 if the method is not found
   *
   * @example
   * const cost = calculateShippingCost('express');
   * // Returns the express shipping rate from shippingRates object
   */
  const calculateShippingCost = (method: ShippingMethod): number => {
    return shippingRates[method] || 0;
  };

  /**
   * Calculates the shipping fee for international deliveries based on country and shipping method.
   *
   * @param country - The destination country code/name
   * @param method - The shipping method to use (defaults to "standard")
   * @returns The calculated shipping fee amount
   *
   * @remarks
   * The final fee is calculated using a base fee for the shipping method,
   * adjusted by a distance factor specific to the destination country.
   * Returns 0 if the country is not found in the system.
   */
  const calculateInternationalShippingFee = (
    country: string,
    method: ShippingMethod = "standard"
  ): number => {
    const countryData = findCountryByValue(country);
    if (!countryData) {
      return 0;
    }
    const baseFee = internationalShippingFees[method] || 0;
    const adjustedFactor = countryData.distanceFactor;
    return baseFee + baseFee * adjustedFactor;
  };

  /**
   * Calculates the estimated delivery date based on the selected shipping method.
   * Takes into account business days only.
   *
   * @param method - The shipping method selected by the user
   * @returns A Date object representing the estimated delivery date
   *
   * Delivery timeframes:
   * - standard: 5 business days
   * - economy: 4 business days
   * - expedited: 3 business days
   * - twoDay: 2 business days
   * - sameDay: same business day
   * - overnight: next business day
   */
  const getEstimatedDeliveryDate = (method: ShippingMethod): Date => {
    const today = new Date();
    let daysToAdd = 0;
    switch (method) {
      case "standard":
        daysToAdd = 5;
        break;
      case "economy":
        daysToAdd = 4;
        break;
      case "expedited":
        daysToAdd = 3;
        break;
      case "twoDay":
        daysToAdd = 2;
        break;
      case "sameDay":
        daysToAdd = 0;
        break;
      case "overnight":
        daysToAdd = 1;
        break;
    }
    return addBusinessDays(today, daysToAdd);
  };

  /**
   * Moves an item from the cart to the wishlist.
   *
   * @param productName - The unique identifier of the item to move
   * @returns void
   *
   * @remarks
   * - First checks if the item exists in the cart
   * - If found, adds it to the wishlist
   * - Then removes it from the cart
   * - Logs the action for tracking
   *
   * @example
   * moveToWishlist("123"); // Moves item with ID "123" from cart to wishlist
   */
  const moveToWishlist = (productName: string): void => {
    const item = getProductByName(productName);
    if (item) {
      // Add to wishlist first to ensure successful transfer
      addToWishlist({
        ...item,
        gender: item.gender,
        category: item.category,
        itemType: item.itemType,
        badge: item.badge,
        viewCount: item.viewCount,
        colors: item.colors,
        details: item.details,
        price: item.price,
        quantity: item.quantity,
        originalPrice: item.originalPrice,
        discountPrice: item.discountPrice,
        rating: getProductRating(productName),
      });

      // Remove from cart only after successful wishlist addition
      removeFromCart(productName);

      console.log(`Moved ${item.name} to wishlist`);
    }
  };

  /**
   * Updates the selected shipping method in the cart context.
   * @param method - The shipping method to be set as the current selection
   * @returns void
   */
  const updateShippingMethod = (method: ShippingMethod): void => {
    setSelectedShippingMethod(method);
  };

  /**
   * Retrieves the currently selected shipping method.
   *
   * @returns {ShippingMethod} The currently selected shipping method for the cart
   */
  const getShippingMethod = (): ShippingMethod => {
    return selectedShippingMethod;
  };

  /**
   * Generates a formatted delivery estimate text based on the shipping country and selected shipping method.
   *
   * @param shippingCountry - The destination country for the delivery
   * @returns A string representing either a single delivery date or a delivery window range
   *
   * @example
   * // Returns a single date
   * getDeliveryEstimateText("US") // => "Jun 15"
   *
   * @example
   * // Returns a date range
   * getDeliveryEstimateText("UK") // => "Jun 15 - Jun 18"
   *
   * @remarks
   * The function uses the selected shipping method to calculate delivery dates and
   * formats them into a user-friendly string. If the start and end dates of the
   * delivery window are the same, it returns a single date.
   */
  const getDeliveryEstimateText = (shippingCountry: string): string => {
    // Get the estimated delivery start date based on the selected shipping method
    const deliveryStartDate = getEstimatedDeliveryDate(selectedShippingMethod);

    // Calculate the delivery window dates
    const { windowStart, windowEnd } = getDeliveryWindowDates(
      selectedShippingMethod,
      deliveryStartDate,
      shippingCountry
    );

    // Format the dates into a readable string
    const formattedWindowStart = formatDate(windowStart); // e.g., "Jun 15"
    const formattedWindowEnd = formatDate(windowEnd); // e.g., "Jun 18"

    // Return the delivery estimate text
    if (formattedWindowStart === formattedWindowEnd) {
      return `${formattedWindowStart}`; // Single-day delivery
    }
    return `${formattedWindowStart} - ${formattedWindowEnd}`; // Delivery window
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartItem,
        updateQuantity,
        calculateTaxAmount,
        getTotalPrice,
        getSubTotal,
        getTotalItems,
        getShippingMethod,
        itemExistsInCart,
        applyDiscount,
        getDiscountedTotal,
        saveCartForLater,
        loadSavedCart,
        calculateShippingCost,
        calculateInternationalShippingFee,
        getEstimatedDeliveryDate,
        moveToWishlist,
        selectedShippingMethod,
        updateShippingMethod,
        getDeliveryWindowDates,
        getDeliveryDescription,
        getDeliveryEstimateText,
        getProductSalesCount,
        getSalesTrends,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
