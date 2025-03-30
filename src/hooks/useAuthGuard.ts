import { useState } from "react";
import { useAuth } from "@/app/context/authContext";

export function useAuthGuard() {
  const { user } = useAuth();
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  const guardedAction = async <T>(
    action: () => Promise<T>
  ): Promise<T | void> => {
    if (!user) {
      setShowAuthAlert(true);
      return;
    }
    return action();
  };

  return {
    isAuthenticated: !!user,
    showAuthAlert,
    closeAuthAlert: () => setShowAuthAlert(false),
    guardedAction,
  };
}
