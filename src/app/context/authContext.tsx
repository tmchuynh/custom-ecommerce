"use client";

import { AuthContextType } from "@/lib/contextTypes";
import {
  AuthUser,
  SignUpCredentials,
  LoginCredentials,
  ResetPasswordData,
} from "@/lib/interfaces";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return password.length >= minLength && hasNumber && hasSymbol;
  };

  const signUp = async (credentials: SignUpCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      if (!validatePassword(credentials.password)) {
        throw new Error(
          "Password must be at least 8 characters and contain a number and symbol"
        );
      }

      // Add your API call here
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("authToken", userData.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const requestLoginCode = async (identifier: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier }),
      });

      if (!response.ok) {
        throw new Error("Failed to send login code");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send login code"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = credentials.loginCode
        ? "/api/auth/login-with-code"
        : "/api/auth/login";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("authToken", userData.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPasswordRequest = async (email: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/reset-password-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset code");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset code"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const validateResetCode = async (
    email: string,
    code: string
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/validate-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      return response.ok;
    } catch {
      return false;
    }
  };

  const resetPassword = async (data: ResetPasswordData) => {
    setIsLoading(true);
    setError(null);

    try {
      if (data.newPassword && !validatePassword(data.newPassword)) {
        throw new Error(
          "New password must be at least 8 characters and contain a number and symbol"
        );
      }

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to reset password");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Add your API call here
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      setUser(null);
      localStorage.removeItem("authToken");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        signUp,
        login,
        logout,
        requestLoginCode,
        resetPasswordRequest,
        validateResetCode,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
