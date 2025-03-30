"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { ProductType } from "@/lib/types";
import { WishlistContextType } from "@/lib/contextTypes";
import { useAuth } from "./authContext";

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
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<ProductType[]>([]);

  // Load wishlist from backend when user logs in
  useEffect(() => {
    const loadWishlist = async () => {
      if (user) {
        try {
          const response = await fetch("/api/user/wishlist", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setWishlistItems(data.wishlist);
          }
        } catch (error) {
          console.error("Failed to load wishlist:", error);
        }
      } else {
        setWishlistItems([]); // Clear wishlist when logged out
      }
    };

    loadWishlist();
  }, [user]);

  const addToWishlist = async (item: ProductType) => {
    if (!user) {
      throw new Error("Must be logged in to add to wishlist");
    }

    try {
      const response = await fetch("/api/user/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({ item }),
      });

      if (response.ok) {
        setWishlistItems((prev) => {
          if (prev.find((i) => i.name === item.name)) {
            return prev;
          }
          return [...prev, item];
        });
      }
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      throw error;
    }
  };

  const removeFromWishlist = async (id: string) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/user/wishlist/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.ok) {
        setWishlistItems((prev) => prev.filter((item) => item.name !== id));
      }
    } catch (error) {
      console.error("Failed to remove from wishlist:", error);
      throw error;
    }
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
        isAuthenticated: !!user,
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
