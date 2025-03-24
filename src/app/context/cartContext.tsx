// cartContext.tsx
"use client";

import { CartContextType, CartItem } from "@/lib/interfaces";
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
