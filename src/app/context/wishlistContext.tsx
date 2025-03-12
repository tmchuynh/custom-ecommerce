"use client";

import { WishlistContextType, WishlistItem } from "@/lib/interfaces";
import React, { createContext, useState, useContext } from "react";

// Define types for wishlist item and wishlist context

// Create context
const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

// Create provider to wrap the app
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

// Custom hook to access the wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
