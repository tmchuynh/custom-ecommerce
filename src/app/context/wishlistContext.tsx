"use client";

import { WishlistContextType, WishlistItem } from "@/lib/interfaces";
import React, { createContext, useState, useContext } from "react";

/**
 * Context for managing the wishlist.
 *
 * Provides a way to access and update the wishlist state throughout the application.
 */
const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

/**
 * Provides the Wishlist context to its children.
 * It manages the wishlist items, allowing to add and remove items from the wishlist.
 *
 * @param {React.ReactNode} children - The children to be wrapped with the Wishlist context.
 * @returns {JSX.Element} A provider component that supplies the wishlist context to its children.
 */
export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find((i) => i.id === item.id)) {
        return prevItems; // Prevent adding duplicate items
      }
      return [...prevItems, item];
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

/**
 * @returns {WishlistContextType} The wishlist context.
 * @throws {Error} If the hook is used outside of a WishlistProvider.
 */
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
