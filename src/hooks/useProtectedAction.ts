import { useState } from "react";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";

export function useProtectedAction() {
  const { user } = useAuth();
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const router = useRouter();

  const protectedAction = async <T>(
    action: () => Promise<T>
  ): Promise<T | void> => {
    if (!user) {
      setShowAuthAlert(true);
      return;
    }
    return action();
  };

  const handleLogin = () => {
    setShowAuthAlert(false);
    router.push("/auth/login");
  };

  return {
    isAuthenticated: !!user,
    showAuthAlert,
    closeAuthAlert: () => setShowAuthAlert(false),
    protectedAction,
    handleLogin,
  };
}
