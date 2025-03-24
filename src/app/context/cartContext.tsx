// cartContext.tsx
"use client";

import { CartContextType, CartItem, ShippingMethod } from "@/lib/interfaces";
import React, { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Cart Provider Component
 *
 * A React Context Provider that manages the shopping cart state and functionality
 * across the application. It handles cart operations such as adding, removing, and
 * updating items, as well as persisting the cart state to localStorage.
 *
 * @component
 * @example
 * ```tsx
 * <CartProvider>
 *   <App />
 * </CartProvider>
 * ```
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to the cart context
 * @returns {React.ReactNode} The provider component with the cart context
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
   * Removes an item from the cart based on its ID.
   *
   * @param id - The ID of the item to remove.
   */
  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  /**
   * Removes all items from the cart.
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
   * Calculates the total price of all items in the cart.
   *
   * @returns {number} The total price of the items in the cart.
   */
  const getTotalPrice = (): number => {
    return cartItems.reduce(
      (total: number, item) => total + Number(item.price) * item.quantity,
      0
    );
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
   * Checks if an item exists in the cart based on its name.
   *
   * @param name - The name of the item to check.
   * @returns {boolean} True if the item exists in the cart, false otherwise.
   */
  const itemExistsInCart = (name: string): boolean => {
    return cartItems.some((item) => item.name === name);
  };

  /**
   * Applies a discount code to the cart.
   *
   * @param code - The discount code to apply
   * @returns A boolean indicating whether the code was valid and applied
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
   * Gets the total price after applying any active discount.
   *
   * @returns The discounted total price
   */
  const getDiscountedTotal = (): number => {
    const subtotal = getTotalPrice();

    if (discountAmount > 0) {
      return subtotal * (1 - discountAmount);
    }

    return subtotal;
  };

  /**
   * Saves the current cart to localStorage for later retrieval.
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
   * Loads a previously saved cart from localStorage.
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
   * @param method - The shipping method
   * @returns The shipping cost
   */
  const calculateShippingCost = (method: ShippingMethod): number => {
    return shippingRates[method] || 0;
  };

  /**
   * Calculates the estimated delivery date based on the shipping method.
   *
   * @param method - The shipping method
   * @returns The estimated delivery date
   */
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

    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + daysToAdd);

    // Skip weekends for more realistic delivery dates
    const dayOfWeek = deliveryDate.getDay();
    if (dayOfWeek === 0) {
      // Sunday
      deliveryDate.setDate(deliveryDate.getDate() + 1);
    } else if (dayOfWeek === 6) {
      // Saturday
      deliveryDate.setDate(deliveryDate.getDate() + 2);
    }

    return deliveryDate;
  };

  /**
   * Begins the checkout process.
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
  };

  /**
   * Moves an item from the cart to the wishlist.
   *
   * @param itemId - The ID of the item to move
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
        getTotalPrice,
        getTotalItems,
        itemExistsInCart,
        applyDiscount,
        getDiscountedTotal,
        saveCartForLater,
        loadSavedCart,
        calculateShippingCost,
        getEstimatedDeliveryDate,
        startCheckout,
        moveToWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * @returns {CartContextType} The cart context.
 * @throws {Error} If the hook is used outside of a CartProvider.
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
