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
import { countryTaxRates } from "@/lib/taxRatesConstant";

const CartContext = createContext<CartContextType | undefined>(undefined);

// -------------------
// Helper Functions
// -------------------

// Adds a specified number of business days to a date (skipping weekends)
const addBusinessDays = (date: Date, businessDays: number): Date => {
  const result = new Date(date);
  let addedDays = 0;
  while (addedDays < businessDays) {
    result.setDate(result.getDate() + 1);
    addedDays++;
  }
  return result;
};

// Finds country data by its code (case-insensitive)
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

// Calculates the delivery window dates based on shipping method, a start date, and the destination country code.
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

// Returns a delivery description string (in days from today) based on the shipping method, start date, and country code.
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

  // Calculate the exact number of milliseconds between dates
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

/**
 * Get tax info for a country by its code
 * @param countryCode The country code to look up
 * @returns The tax information for the country, or a default tax structure
 */
export const getTaxInfoByCountryCode = (
  countryCode: string
): CountryTaxInfo => {
  // Default to US tax info for safety
  const defaultTaxInfo = countryTaxRates.find(
    (country) => country.code === "USA"
  ) || {
    country: "Unknown",
    code: "UNKNOWN",
    vatRate: 0.0,
    dutyRate: 0.0,
    deMinimisDuty: 0,
    deMinimisVAT: 0,
    hasImportFees: false,
  };

  // Normalize the country code for comparison
  const normalizedCode = countryCode.toUpperCase();

  const taxInfo = countryTaxRates.find(
    (country) => country.code.toUpperCase() === normalizedCode
  ) || {
    country: "Unknown",
    code: "UNKNOWN",
    vatRate: 0.0,
    dutyRate: 0.0,
    deMinimisDuty: 0,
    deMinimisVAT: 0,
    hasImportFees: false,
  };

  console.log("taxInfo", taxInfo);

  // Find the country tax info
  return taxInfo;
};

// Calculate import taxes for international orders
const calculateImportTaxes = (
  subtotal: number,
  country: string
): {
  dutyAmount: number;
  vatAmount: number;
  totalImportCharges: number;
  appliedDuty: boolean;
  appliedVAT: boolean;
} => {
  // Get country tax info
  const countryInfo = getTaxInfoByCountryCode(country);

  // Default values
  const result = {
    dutyAmount: 0,
    vatAmount: 0,
    totalImportCharges: 0,
    appliedDuty: false,
    appliedVAT: false,
  };

  // If USA or unknown country, return default (no import taxes)
  if (countryInfo.code === "USA" || countryInfo.code === "UNKNOWN") {
    return result;
  }

  // Calculate duty if above de minimis threshold
  if (subtotal > countryInfo.deMinimisDuty) {
    result.dutyAmount = subtotal * countryInfo.dutyRate;
    result.appliedDuty = true;
  }

  // Calculate VAT/GST if above de minimis threshold
  if (subtotal > countryInfo.deMinimisVAT) {
    // VAT is typically applied to (subtotal + duty)
    result.vatAmount = subtotal * countryInfo.vatRate;
    result.appliedVAT = true;
  }

  // Calculate total import charges
  result.totalImportCharges = result.dutyAmount + result.vatAmount;

  return result;
};

// -------------------
// CartProvider Component
// -------------------

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): JSX.Element => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [checkoutActive, setCheckoutActive] = useState<boolean>(false);
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod>("standard");

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
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const getCartItem = (name: string): CartItem | undefined => {
    return cartItems.find((item) => item.name === name);
  };

  const getSubTotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
  };

  // Enhanced tax calculation with support for international rates
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

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Enhanced total price calculation with import taxes
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

  const itemExistsInCart = (name: string): boolean => {
    return cartItems.some((item) => item.name === name);
  };

  const applyDiscount = (code: string): boolean => {
    const normalizedCode = code.trim().toUpperCase();
    if (discountCodes[normalizedCode]) {
      setDiscountCode(normalizedCode);
      setDiscountAmount(discountCodes[normalizedCode]);
      return true;
    }
    return false;
  };

  const getDiscountedTotal = (shippingCountry: string): number => {
    const subtotal = getTotalPrice(shippingCountry);
    return discountAmount > 0 ? subtotal * (1 - discountAmount) : subtotal;
  };

  const saveCartForLater = (): void => {
    const savedCartData = {
      items: cartItems,
      discountCode,
      discountAmount,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem("savedCart", JSON.stringify(savedCartData));
  };

  const loadSavedCart = (): void => {
    const savedCart = localStorage.getItem("savedCart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart.items || []);
      setDiscountCode(parsedCart.discountCode || null);
      setDiscountAmount(parsedCart.discountAmount || 0);
    }
  };

  const calculateShippingCost = (method: ShippingMethod): number => {
    return shippingRates[method] || 0;
  };

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

  const startCheckout = (): void => {
    if (cartItems.length === 0) return;
    setCheckoutActive(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setCheckoutActive(false);
    }, 2000);
  };

  const moveToWishlist = (itemId: string): void => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item) {
      console.log(`Moved ${item.name} to wishlist.`);
      removeFromCart(itemId);
    }
  };

  const updateShippingMethod = (method: ShippingMethod): void => {
    setSelectedShippingMethod(method);
  };

  const getShippingMethod = (): ShippingMethod => {
    return selectedShippingMethod;
  };

  // Returns a delivery estimate text (e.g. "Jun 15 - Jun 18")
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

  const calculateImportFee = (value: number, countryCode: string): number => {
    // Find the country object from the array
    console.log("Country Code Passed:", countryCode);
    const defaultCountryData = {
      country: "Unknown",
      code: "UNKNOWN",
      vatRate: 0.0,
      dutyRate: 0.0,
      deMinimisDuty: 0,
      deMinimisVAT: 0,
      hasImportFees: false,
    };

    const country =
      countryTaxRates.find((rate) => rate.code === countryCode) ||
      defaultCountryData;

    if (!country) {
      console.error("Country not found in countryTaxRates:", countryCode);
      throw new Error("Country not found");
    }

    if (!country) {
      throw new Error("Country not found");
    }

    // If the country doesn't apply import fees, return 0
    if (!country.hasImportFees) {
      return 0;
    }

    // Check if value is below the de minimis thresholds
    if (value <= country.deMinimisVAT) {
      return 0; // No VAT if value is below the VAT threshold
    }

    // Calculate VAT (GST)
    const gst = value * country.vatRate;

    // Calculate customs duty if applicable
    const customsDuty =
      value > country.deMinimisDuty ? value * country.dutyRate : 0;

    // Total import fee is the sum of VAT and customs duty
    return gst + customsDuty;
  };

  // Get detailed import tax breakdown
  const getImportTaxBreakdown = (
    country: string
  ): {
    duty: number;
    vat: number;
    total: number;
    subtotal: number;
    shipping: number;
    grandTotal: number;
  } => {
    const subtotal = getSubTotal();
    const { dutyAmount, vatAmount, totalImportCharges } = calculateImportTaxes(
      subtotal,
      country
    );
    const shippingMethod = getShippingMethod();
    const shipping = calculateInternationalShippingFee(country, shippingMethod);

    return {
      duty: dutyAmount,
      vat: vatAmount,
      total: totalImportCharges,
      subtotal: subtotal,
      shipping: shipping,
      grandTotal: subtotal + shipping + totalImportCharges,
    };
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
        startCheckout,
        moveToWishlist,
        selectedShippingMethod,
        updateShippingMethod,
        getDeliveryWindowDates,
        getDeliveryDescription,
        getDeliveryEstimateText,
        getImportTaxBreakdown,
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
