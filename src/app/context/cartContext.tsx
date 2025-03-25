// cartContext.tsx
"use client";

import { currencyCountries } from "@/lib/constants";
import { CartContextType, CartItem } from "@/lib/interfaces";
import { ShippingMethod } from "@/lib/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  JSX,
} from "react";
import { useCurrency } from "./CurrencyContext";
import { formatDate } from "@/lib/utils";

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
    const day = result.getDay();
    if (day !== 0 && day !== 6) {
      addedDays++;
    }
  }
  return result;
};

// Finds country data by its code (case-insensitive)
const findCountryByValue = (
  targetValue: string
): { currencyCode: string; value: string; distanceFactor: number } | null => {
  const normalizedTarget = targetValue.toLowerCase();
  for (const currency of currencyCountries) {
    const countryData = currency.countries.find(
      (country) => country.value.toLowerCase() === normalizedTarget
    );
    if (countryData) {
      console.log("Found country data:", countryData);
      return {
        currencyCode: currency.code,
        value: countryData.value,
        distanceFactor: countryData.distanceFactor,
      };
    }
  }
  console.log("No country match found for:", targetValue);
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
  console.log("Country:", country, "Distance Factor:", distanceFactor);

  // Define base delays (in business days) and window lengths
  let baseDelay: number, baseWindow: number;
  // Use multipliers that scale the distance factor into additional days
  const multiplierStart = 2; // for example, a factor of 0.4 produces about 1 day extra delay
  const multiplierWindow = 2;

  switch (method) {
    case "standard":
      baseDelay = 2;
      baseWindow = 3;
      break;
    case "express":
      baseDelay = 1;
      baseWindow = 2;
      break;
    case "overnight":
      baseDelay = 1;
      baseWindow = 0;
      break;
    default:
      baseDelay = 2;
      baseWindow = 3;
  }

  // Instead of Math.ceil, try Math.round so that the additional days vary more gradually.
  const additionalStartDelay = Math.round(distanceFactor * multiplierStart);
  const additionalWindow = Math.round(distanceFactor * multiplierWindow);

  const windowStart = addBusinessDays(
    startDate,
    baseDelay + additionalStartDelay
  );
  const windowEnd = addBusinessDays(windowStart, baseWindow + additionalWindow);

  console.log("Calculated window start:", formatDate(windowStart));
  console.log("Calculated window end:", formatDate(windowEnd));

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

  const diffInDays = (from: Date, to: Date) =>
    Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));

  const daysStart = diffInDays(today, windowStart);
  const daysEnd = diffInDays(today, windowEnd);

  if (daysStart === daysEnd) {
    return `arriving in ${daysStart} day(s)`;
  }
  return `arriving in ${daysStart} to ${daysEnd} days`;
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
    standard: 5.99,
    express: 12.99,
    overnight: 24.99,
  };

  // International shipping fee rates
  const internationalShippingFees: Record<ShippingMethod, number> = {
    standard: 15.99,
    express: 27.99,
    overnight: 49.99,
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

  const calculateTaxAmount = (
    total: number,
    taxRate: number = 0.08
  ): number => {
    return total * taxRate;
  };

  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Returns total price (domestic version; modify if you want to pass a country)
  const getTotalPrice = (): number => {
    const total = cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );
    const shippingMethod = getShippingMethod(getTotalItems());
    const shipping = calculateShippingCost(shippingMethod);
    const taxAmount = calculateTaxAmount(total);
    // For domestic, default country is assumed as "USA"
    const internationalFee = calculateInternationalShippingFee(
      "USA",
      shippingMethod
    );
    return (
      total + taxAmount + (internationalFee > 0 ? internationalFee : shipping)
    );
  };

  const getShippingMethod = (totalItems: number): ShippingMethod => {
    if (totalItems >= 6) return "standard";
    if (totalItems < 4) return "overnight";
    return "express";
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

  const getDiscountedTotal = (): number => {
    const subtotal = getTotalPrice();
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
    if (!countryData || countryData.distanceFactor === 0) {
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
      case "express":
        daysToAdd = 2;
        break;
      case "overnight":
        daysToAdd = 1;
        break;
      default:
        daysToAdd = 5;
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

  // Returns a delivery estimate text (e.g. "Jun 15 - Jun 18")
  const getDeliveryEstimateText = (shippingCountry: string): string => {
    const deliveryDate = getEstimatedDeliveryDate(selectedShippingMethod);
    const { windowStart, windowEnd } = getDeliveryWindowDates(
      selectedShippingMethod,
      deliveryDate,
      shippingCountry
    );
    return `${formatDate(windowStart)} - ${formatDate(windowEnd)}`;
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
