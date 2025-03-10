"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CoolMode } from "./magicui/cool-mode";
import { Sonner } from "./Sonner";
import Link from "next/link";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [toastMessage, setToastMessage] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("reloaded")) {
      sessionStorage.setItem("reloaded", "true");
      window.location.reload();
    }
  }, []);

  const showToast = (type: "error" | "success", message: string) => {
    setToastMessage({ type, message });
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);
  };

  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("Login failed");
      }

      // Fetch user data after retrieving token
      const userResponse = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      if (!userResponse.ok) {
        const userErrorData = await userResponse.json().catch(() => null);
        console.error(
          "User data response error:",
          userErrorData || "Failed to fetch user data"
        );
        throw new Error(userErrorData?.message || "Failed to fetch user data");
      }

      const userData = await userResponse.json();
      console.log("User data:", userData);

      showToast("success", "Login successful! Redirecting...");
      router.push("/quiz");
    } catch (error) {
      console.error("Error during login or fetching user data:", error);
      showToast(
        "error",
        (error as Error).message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {toastMessage && (
        <Sonner
          description={toastMessage.message}
          text={toastMessage.type === "error" ? "Error" : "Success"}
          action={() => {}}
          label={toastMessage.type === "error" ? "Error" : "Success"}
        />
      )}
      <div className="grid md:grid-cols-2 md:gap-6 w-11/12 mx-auto">
        {/* Login Form */}
        <div className="p-6 rounded-lg shadow-md border hover:shadow-md">
          <h2 className="text-center">Login</h2>
          <form
            className="mx-auto w-full p-10"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleLogin(
                formData.get("login_username") as string,
                formData.get("login_password") as string
              );
            }}
          >
            {/* Username Input */}
            <div className="relative z-0 w-full mb-5 group">
              <Label htmlFor="login_username">Username</Label>
              <Input
                type="text"
                name="login_username"
                id="login_username"
                placeholder="Enter your username"
                required
                autoComplete="username"
              />
            </div>
            {/* Password Input */}
            <div className="relative z-0 w-full mb-5 group">
              <Label htmlFor="login_password">Password</Label>
              <Input
                type="password"
                name="login_password"
                id="login_password"
                placeholder="Enter your password"
                required
                autoComplete="current-password"
              />
            </div>
            <Link href="#">Forgot Password</Link>
            <CoolMode options={{ particleCount: 50 }}>
              <Button size="lg" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </CoolMode>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
