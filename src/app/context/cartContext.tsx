// cartContext.tsx
"use client";

import { CartContextType, CartItem } from "@/lib/interfaces";
import { ShippingMethod } from "@/lib/types";
import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider component that manages shopping cart state and functionality.
 *
 * This provider encapsulates all cart-related state and operations including:
 * - Managing cart items (add, remove, update quantity)
 * - Discount code application and calculation
 * - Shipping cost calculation
 * - Estimated delivery date calculation
 * - Checkout process management
 * - Cart persistence (save/load from localStorage)
 *
 * @component
 * @example
 * ```tsx
 * function App() {
 *   return (
 *     <CartProvider>
 *       <YourShopComponent />
 *     </CartProvider>
 *   );
 * }
 * ```
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the cart context
 * @returns {React.ReactNode} The provider component with its children
 */
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [checkoutActive, setCheckoutActive] = useState<boolean>(false);

  // Discount codes table (in a real app this would come from a database)
  const discountCodes: Record<string, number> = {
    WELCOME10: 0.1, // 10% off
    SUMMER25: 0.25, // 25% off
    FREESHIP: 0.15, // 15% off
  };

  // Shipping rates table
  const shippingRates: Record<ShippingMethod, number> = {
    standard: 5.99,
    express: 12.99,
    overnight: 24.99,
  };

  // Rehydrate cart items from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Persist cartItems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Adds an item to the cart. If the item already exists in the cart, its quantity is updated.
   * If the item does not exist, it is added to the cart.
   *
   * @param {CartItem} item - The item to add to the cart.
   *                        If the item already exists in the cart, its quantity is updated.
   *                        If the item does not exist, it is added to the cart.
   *
   * @returns {void}
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
  };

  /**
   * Removes an item from the cart based on its unique identifier.
   *
   * @param id - The unique identifier of the item to be removed from the cart.
   */
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  /**
   * Clears all items from the cart by setting the cart items state to an empty array.
   * This function is typically used to reset the cart to its initial state.
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * Updates the quantity of a specific item in the cart.
   * If the new quantity is below 1, the item is removed from the cart.
   *
   * @param id The ID of the item to update.
   * @param quantity The new quantity for the item.
   */
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  /**
   * Retrieves a cart item based on its name.
   *
   * @param name - The name of the item to retrieve.
   * @returns {CartItem | undefined} The cart item if found, otherwise undefined.
   */
  const getCartItem = (name: string): CartItem | undefined => {
    return cartItems.find((item) => item.name === name);
  };

  /**
   * Calculates the subtotal of all items in the cart.
   *
   * The subtotal is calculated by summing the product of each item's price
   * and quantity for all items in the cart.
   *
   * @returns {number} The total price of all items in the cart.
   */
  const getSubTotal = (): number => {
    const total = cartItems.reduce(
      (total: number, item) => total + Number(item.price) * item.quantity,
      0
    );

    return total;
  };

  /**
   * Calculates the total price of all items in the cart including tax and shipping.
   *
   * The total price is calculated in the following steps:
   * 1. Sum the price of all items in the cart (price * quantity)
   * 2. Calculate shipping cost based on the shipping method determined by the total number of items
   * 3. Calculate tax amount based on the subtotal
   * 4. Return the sum of subtotal, tax, and shipping
   *
   * @returns The total price including items, tax, and shipping as a number
   */
  const getTotalPrice = (): number => {
    const total = cartItems.reduce(
      (total: number, item) => total + Number(item.price) * item.quantity,
      0
    );

    const shipping = calculateShippingCost(getShippingMethod(getTotalItems()));
    const taxAmount = calculateTaxAmount(total);

    return total + taxAmount + shipping;
  };

  /**
   * Calculates the tax amount based on a total and tax rate.
   *
   * @param total - The total amount to calculate tax on
   * @param taxRate - The tax rate to apply (default: 0.08 or 8%)
   * @returns The calculated tax amount
   */
  const calculateTaxAmount = (
    total: number,
    taxRate: number = 0.08
  ): number => {
    const taxAmount = total * taxRate;
    return taxAmount;
  };

  /**
   * Gets the total number of items in the cart.
   *
   * @returns {number} The total number of items in the cart.
   */
  const getTotalItems = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  /**
   * Checks if an item with the specified name exists in the cart.
   *
   * @param name - The name of the item to check for in the cart.
   * @returns A boolean indicating whether the item exists in the cart.
   */
  const itemExistsInCart = (name: string): boolean => {
    return cartItems.some((item) => item.name === name);
  };

  /**
   * Applies a discount code to the cart if valid.
   *
   * @param code - The discount code entered by the user
   * @returns A boolean indicating whether the discount code was valid and applied successfully
   *
   * @example
   * // Returns true if "SUMMER20" is a valid code
   * applyDiscount("SUMMER20");
   *
   * // Returns false for invalid codes
   * applyDiscount("INVALID");
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
   * Calculates the total price after applying any discount.
   *
   * @returns {number} The discounted total price if a discount is applied, otherwise the original subtotal.
   *
   * @example
   * // If subtotal is $100 and discountAmount is 0.2 (20%)
   * // Returns $80
   * const discountedTotal = getDiscountedTotal();
   */
  const getDiscountedTotal = (): number => {
    const subtotal = getTotalPrice();

    if (discountAmount > 0) {
      return subtotal * (1 - discountAmount);
    }

    return subtotal;
  };

  /**
   * Saves the current cart state to local storage for later retrieval.
   *
   * This function creates an object containing the current cart items,
   * applied discount code, discount amount, and the current timestamp.
   * The data is then saved to localStorage under the key "savedCart".
   *
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
   * Loads the user's saved cart data from localStorage
   *
   * Retrieves the "savedCart" item from localStorage, parses the JSON data,
   * and updates the cart state with the retrieved values:
   * - Sets cart items from the parsed data, defaulting to an empty array if not present
   * - Sets discount code from the parsed data, defaulting to null if not present
   * - Sets discount amount from the parsed data, defaulting to 0 if not present
   *
   * If no saved cart is found in localStorage, the function does nothing.
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
   * Determines the shipping method based on the total number of items.
   *
   * @param getTotalItems - The total number of items in the cart.
   * @returns The shipping method as a string:
   * - "standard" if the total number of items is 6 or more.
   * - "overnight" if the total number of items is less than 4.
   * - "express" for all other cases.
   */
  const getShippingMethod = (getTotalItems: number): ShippingMethod => {
    if (getTotalItems >= 6) {
      return "standard";
    } else if (getTotalItems < 4) {
      return "overnight";
    } else {
      return "express";
    }
  };

  /**
   * Calculates the shipping cost based on the selected shipping method.
   *
   * @param method - The shipping method to calculate the cost for
   * @returns The shipping cost for the specified method, or 0 if the method is not found
   */
  const calculateShippingCost = (method: ShippingMethod): number => {
    return shippingRates[method] || 0;
  };

  /**
   * Calculates the estimated delivery date based on the shipping method.
   *
   * @param method - The shipping method to calculate delivery date for
   * @returns A Date object representing the estimated delivery date
   *
   * @remarks
   * This function calculates delivery dates based on the shipping method:
   * - standard: 5 business days (minimum of 5-7 range)
   * - express: 2 business days (minimum of 2-4 range)
   * - overnight: next business day
   *
   * It also accounts for weekends by adjusting the date to skip Saturday and Sunday
   * deliveries, making the estimation more realistic.
   */
  const getEstimatedDeliveryDate = (method: ShippingMethod): Date => {
    const today = new Date();
    let daysToAdd = 0;

    switch (method) {
      case "standard":
        daysToAdd = 5; // 5 business days (minimum of the 5-7 range)
        break;
      case "express":
        daysToAdd = 2; // 2 business days (minimum of the 2-4 range)
        break;
      case "overnight":
        daysToAdd = 1; // Next business day
        break;
      default:
        daysToAdd = 5;
    }

    const deliveryDate = new Date(today);

    // Add the base number of days
    deliveryDate.setDate(today.getDate() + daysToAdd);

    // Adjust for weekends to ensure business days
    let businessDaysAdded = 0;
    const targetBusinessDays = daysToAdd;
    const iterationDate = new Date(today);

    // Reset to today
    while (businessDaysAdded < targetBusinessDays) {
      // Move to next day
      iterationDate.setDate(iterationDate.getDate() + 1);

      // Check if it's a business day (not Saturday or Sunday)
      const dayOfWeek = iterationDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // 0 = Sunday, 6 = Saturday
        businessDaysAdded++;
      }
    }

    // Return the date after adding the correct number of business days
    return iterationDate;
  };

  /**
   * Calculates the end date of the delivery window based on shipping method
   *
   * @param method - The shipping method
   * @param startDate - The estimated delivery start date
   * @returns A Date object representing the end of the delivery window
   */
  const getDeliveryWindowEndDate = (
    method: ShippingMethod,
    startDate: Date
  ): Date => {
    const endDate = new Date(startDate);

    if (method === "standard") {
      // For standard shipping, the window is 5-7 business days
      // So add 2 business days to the start date (which is already at 5 business days)
      let businessDaysAdded = 0;
      while (businessDaysAdded < 2) {
        endDate.setDate(endDate.getDate() + 1);
        const dayOfWeek = endDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          businessDaysAdded++;
        }
      }
    } else if (method === "express") {
      // For express shipping, the window is 2-4 business days
      // So add 2 business days to the start date (which is already at 2 business days)
      let businessDaysAdded = 0;
      while (businessDaysAdded < 2) {
        endDate.setDate(endDate.getDate() + 1);
        const dayOfWeek = endDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          businessDaysAdded++;
        }
      }
    }
    // For overnight, there's no window (single day delivery)

    return endDate;
  };

  /**
   * Initiates the checkout process if the cart contains items.
   *
   * This function performs the following actions:
   * - Prevents checkout if the cart is empty.
   * - Activates the checkout state by setting `checkoutActive` to `true`.
   *
   * In a real-world application, this function could also handle additional
   * tasks such as:
   * - Calculating taxes.
   * - Verifying inventory availability.
   * - Reserving items in the cart.
   * - Initializing the payment gateway.
   *
   * @returns {void} This function does not return a value.
   */
  const startCheckout = (): void => {
    if (cartItems.length === 0) {
      // Don't start checkout with empty cart
      return;
    }

    setCheckoutActive(true);

    // In a real app, you might:
    // - Calculate taxes
    // - Verify inventory
    // - Reserve items
    // - Initialize payment gateway

    // Calculate tax based on the total price
    const taxRate = 0.08; // Example: 8% tax rate
    const taxAmount = getSubTotal() * taxRate;
    console.log("Tax Amount:", taxAmount);

    console.log("Checkout process started");
    // Example: Log the total price and items in the cart
    console.log("Cart Items:", cartItems);

    // Example: Simulate a checkout process
    setTimeout(() => {
      console.log("Checkout completed successfully!");
      // Clear the cart after successful checkout
      clearCart();
      setCheckoutActive(false);
    }, 2000); // Simulate a 2-second delay for the checkout process
  };

  /**
   * Moves an item from the cart to the wishlist.
   *
   * @param itemId - The unique identifier of the item to be moved.
   *
   * This function performs the following steps:
   * 1. Finds the item in the cart using the provided `itemId`.
   * 2. If the item exists, it logs a message indicating the item has been added to the wishlist.
   *    (In a real application, this would involve interacting with a wishlist context or API.)
   * 3. Removes the item from the cart by calling the `removeFromCart` function.
   */
  const moveToWishlist = (itemId: string): void => {
    // Find the item in the cart
    const item = cartItems.find((item) => item.id === itemId);

    if (item) {
      // Add to wishlist (this would communicate with a wishlist context in a real app)
      // For now, we'll just log a message
      console.log(`Added ${item.name} to wishlist`);

      // Remove from cart
      removeFromCart(itemId);
    }
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
        getShippingMethod,
        getSubTotal,
        getTotalPrice,
        getTotalItems,
        itemExistsInCart,
        applyDiscount,
        getDiscountedTotal,
        saveCartForLater,
        loadSavedCart,
        calculateShippingCost,
        getEstimatedDeliveryDate,
        getDeliveryWindowEndDate,
        startCheckout,
        moveToWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * Custom hook to access the cart context.
 *
 * This hook provides access to the cart context, allowing components
 * to interact with the cart state and actions. It ensures that the
 * hook is used within a `CartProvider` by throwing an error if the
 * context is not available.
 *
 * @returns {CartContextType} The current cart context value.
 * @throws {Error} If the hook is used outside of a `CartProvider`.
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
