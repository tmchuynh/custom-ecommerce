import {
  Cart,
  CartProduct,
  getOrderHistory,
  getPreviouslyPurchased,
  getUserPurchaseStats,
} from "@/api/carts";
import { useAuth } from "@/app/context/authContext";
import { useEffect, useState } from "react";

interface UsePurchaseHistoryReturn {
  previouslyPurchased: CartProduct[];
  orderHistory: Cart[];
  purchaseStats: {
    totalOrders: number;
    totalSpent: number;
    totalItems: number;
    totalSavings: number;
  } | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Custom hook to fetch and manage user's purchase history
 * Automatically fetches data when user logs in or user ID changes
 */
export function usePurchaseHistory(): UsePurchaseHistoryReturn {
  const { user } = useAuth();
  const [previouslyPurchased, setPreviouslyPurchased] = useState<CartProduct[]>(
    []
  );
  const [orderHistory, setOrderHistory] = useState<Cart[]>([]);
  const [purchaseStats, setPurchaseStats] = useState<{
    totalOrders: number;
    totalSpent: number;
    totalItems: number;
    totalSavings: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!user || !user.id) {
      // Clear data if no user
      setPreviouslyPurchased([]);
      setOrderHistory([]);
      setPurchaseStats(null);
      return;
    }

    // Extract numeric user ID (remove "demo-" prefix if present)
    const numericUserId = user.id.startsWith("demo-")
      ? parseInt(user.id.replace("demo-", ""))
      : parseInt(user.id);

    if (isNaN(numericUserId)) {
      setError("Invalid user ID format");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch all data concurrently
      const [purchased, history, stats] = await Promise.all([
        getPreviouslyPurchased(numericUserId),
        getOrderHistory(numericUserId),
        getUserPurchaseStats(numericUserId),
      ]);

      setPreviouslyPurchased(purchased);
      setOrderHistory(history);
      setPurchaseStats(stats);
    } catch (err) {
      console.error("Error fetching purchase history:", err);
      setError("Failed to load purchase history");
      // Set empty data on error
      setPreviouslyPurchased([]);
      setOrderHistory([]);
      setPurchaseStats(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when user changes
  useEffect(() => {
    fetchData();
  }, [user?.id]);

  return {
    previouslyPurchased,
    orderHistory,
    purchaseStats,
    isLoading,
    error,
    refetch: fetchData,
  };
}
