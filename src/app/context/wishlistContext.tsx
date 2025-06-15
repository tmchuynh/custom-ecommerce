"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductItem } from "@/lib/interfaces";
import { useAuth } from "./authContext";

export interface WishlistItem {
  id: number;
  product: ProductItem;
  addedAt: Date;
  isPurchased?: boolean;
  purchasedAt?: Date;
}

export interface WishlistContextType {
  wishlistItems: WishlistItem[];
  isLoading: boolean;
  addToWishlist: (product: ProductItem) => Promise<{ success: boolean; message: string }>;
  removeFromWishlist: (productId: number) => Promise<{ success: boolean; message: string }>;
  moveToCart: (productId: number) => Promise<{ success: boolean; message: string }>;
  markAsPurchased: (productIds: number[]) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
  purchasedItems: WishlistItem[];
  activeWishlistItems: WishlistItem[];
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

interface WishlistProviderProps {
  children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoggedIn } = useAuth();

  // Load wishlist from localStorage when user logs in
  useEffect(() => {
    if (isLoggedIn && user) {
      loadWishlistFromStorage();
    } else {
      // Clear wishlist when user logs out
      setWishlistItems([]);
    }
  }, [isLoggedIn, user?.id]);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    if (isLoggedIn && user && wishlistItems.length >= 0) {
      saveWishlistToStorage();
    }
  }, [wishlistItems, isLoggedIn, user?.id]);

  // Listen for checkout events to mark wishlist items as purchased
  useEffect(() => {
    const handleCheckout = (event: CustomEvent) => {
      const { productIds } = event.detail;
      if (productIds && Array.isArray(productIds)) {
        markAsPurchased(productIds);
      }
    };

    window.addEventListener("cart-checkout", handleCheckout as EventListener);
    
    return () => {
      window.removeEventListener("cart-checkout", handleCheckout as EventListener);
    };
  }, []);

  const getStorageKey = () => {
    return user ? `wishlist_${user.id}` : null;
  };

  const loadWishlistFromStorage = () => {
    const storageKey = getStorageKey();
    if (!storageKey) return;

    try {
      const storedWishlist = localStorage.getItem(storageKey);
      if (storedWishlist) {
        const parsedWishlist = JSON.parse(storedWishlist);
        // Convert date strings back to Date objects
        const wishlistWithDates = parsedWishlist.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
          purchasedAt: item.purchasedAt ? new Date(item.purchasedAt) : undefined,
        }));
        setWishlistItems(wishlistWithDates);
      }
    } catch (error) {
      console.error("Error loading wishlist from storage:", error);
    }
  };

  const saveWishlistToStorage = () => {
    const storageKey = getStorageKey();
    if (!storageKey) return;

    try {
      localStorage.setItem(storageKey, JSON.stringify(wishlistItems));
    } catch (error) {
      console.error("Error saving wishlist to storage:", error);
    }
  };

  const addToWishlist = async (product: ProductItem): Promise<{ success: boolean; message: string }> => {
    if (!isLoggedIn) {
      return { success: false, message: "Please log in to add items to your wishlist" };
    }

    if (isInWishlist(product.id)) {
      return { success: false, message: "Item is already in your wishlist" };
    }

    setIsLoading(true);
    try {
      const newWishlistItem: WishlistItem = {
        id: product.id,
        product,
        addedAt: new Date(),
        isPurchased: false,
      };

      setWishlistItems(prev => [...prev, newWishlistItem]);
      return { success: true, message: "Item added to wishlist" };
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return { success: false, message: "Failed to add item to wishlist" };
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (productId: number): Promise<{ success: boolean; message: string }> => {
    if (!isLoggedIn) {
      return { success: false, message: "Please log in to manage your wishlist" };
    }

    setIsLoading(true);
    try {
      setWishlistItems(prev => prev.filter(item => item.id !== productId));
      return { success: true, message: "Item removed from wishlist" };
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return { success: false, message: "Failed to remove item from wishlist" };
    } finally {
      setIsLoading(false);
    }
  };

  const moveToCart = async (productId: number): Promise<{ success: boolean; message: string }> => {
    if (!isLoggedIn) {
      return { success: false, message: "Please log in to move items to cart" };
    }

    const wishlistItem = wishlistItems.find(item => item.id === productId);
    if (!wishlistItem) {
      return { success: false, message: "Item not found in wishlist" };
    }

    try {
      // Import cart context dynamically to avoid circular dependency
      const { useCart } = await import("./cartContext");
      // Note: We'll need to handle this in the component level
      return { success: true, message: "Ready to move to cart" };
    } catch (error) {
      console.error("Error moving to cart:", error);
      return { success: false, message: "Failed to move item to cart" };
    }
  };

  const markAsPurchased = (productIds: number[]) => {
    if (!isLoggedIn) return;

    setWishlistItems(prev => 
      prev.map(item => 
        productIds.includes(item.id) 
          ? { ...item, isPurchased: true, purchasedAt: new Date() }
          : item
      )
    );
  };

  const isInWishlist = (productId: number): boolean => {
    return wishlistItems.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // Computed values
  const activeWishlistItems = wishlistItems.filter(item => !item.isPurchased);
  const purchasedItems = wishlistItems.filter(item => item.isPurchased);
  const wishlistCount = activeWishlistItems.length;

  const value: WishlistContextType = {
    wishlistItems,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    moveToCart,
    markAsPurchased,
    isInWishlist,
    clearWishlist,
    wishlistCount,
    purchasedItems,
    activeWishlistItems,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
