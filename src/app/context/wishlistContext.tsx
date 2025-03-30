"use client";
import { WishlistContextType } from "@/lib/interfaces";
import React, { createContext, useState, useContext } from "react";
import { ProductType } from "@/lib/types";

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
  const [wishlistItems, setWishlistItems] = useState<ProductType[]>([]);

  const addToWishlist = (item: ProductType) => {
    setWishlistItems((prevItems) => {
      if (prevItems.find((i) => i.name === item.name)) {
        return prevItems; // Prevent adding duplicate items
      }
      return [...prevItems, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.name !== id)
    );
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const isInWishlist = (id: string) => {
    return wishlistItems.some((item) => item.name === id);
  };

  const getWishlistItem = (id: string) => {
    return wishlistItems.find((item) => item.name === id);
  };

  const getWishlistItems = () => {
    return wishlistItems;
  };

  const getWishlistCount = () => {
    return wishlistItems.length;
  };

  const getWishlistTotalPrice = () => {
    return wishlistItems.reduce((total, item) => total + Number(item.price), 0);
  };

  const getWishlistItemByName = (name: string) => {
    return wishlistItems.find((item) => item.name === name);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        getWishlistItem,
        getWishlistItems,
        getWishlistCount,
        getWishlistTotalPrice,
        getWishlistItemByName,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

/**
 * @returns {WishlistContextType} The wishlist context.
 * @throws {Error} If the hook is used outside of a WishlistProvider.
 */
export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
