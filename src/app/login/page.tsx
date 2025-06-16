"use client";

import { fetchDemoCredentials } from "@/api/users";
import { useAuth } from "@/app/context/authContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn, Shuffle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAutofill, setIsLoadingAutofill] = useState(false);

  // Autofill demo credentials
  const autofillCredentials = async () => {
    setIsLoadingAutofill(true);
    try {
      const credentials = await fetchDemoCredentials();

      setFormData({
        username: credentials.username,
        password: credentials.password,
      });

      toast.success(
        `Demo credentials filled for ${credentials.fullName}! (Note: This is fake data for testing purposes)`
      );
    } catch (error) {
      toast.error("Failed to load demo credentials");
    } finally {
      setIsLoadingAutofill(false);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    const result = await login(formData.username.trim(), formData.password);

    if (result.success) {
      toast.success(result.message);
      router.push("/dashboard");
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center bg-background p-4 min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 rounded-full w-fit">
            <LogIn className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account to access your dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="top-0 right-0 absolute hover:bg-transparent px-3 py-2 h-full"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Demo Autofill Section */}
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center mb-2">
                <p className="text-muted-foreground text-xs">
                  Quick demo login:
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={autofillCredentials}
                  disabled={isLoadingAutofill || isLoading}
                  className="text-xs"
                >
                  <Shuffle className="mr-1 w-3 h-3" />
                  {isLoadingAutofill ? "Loading..." : "Fill Demo Login"}
                </Button>
              </div>
              <p className="text-muted-foreground text-xs">
                Uses fake credentials from DummyJSON for testing purposes
              </p>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
