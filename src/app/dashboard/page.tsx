"use client";

import { useAuth } from "@/app/context/authContext";
import { useCart } from "@/app/context/cartContext";
import { useCurrency } from "@/app/context/currencyContext";
import { useWishlist } from "@/app/context/wishlistContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  Crown,
  Heart,
  LogOut,
  Mail,
  Phone,
  Settings,
  ShoppingBag,
  Star,
  User,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, isLoggedIn, logout, hasMembership } = useAuth();
  const { totalItems } = useCart();
  const { wishlistCount, purchasedItems } = useWishlist();
  const { formatPrice } = useCurrency();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return (
      <div className="flex justify-center items-center bg-background min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-2xl">Access Denied</h1>
          <p className="mb-4 text-muted-foreground">
            Please log in to access your dashboard.
          </p>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getTierIcon = (tierName?: string) => {
    switch (tierName?.toLowerCase()) {
      case "basic":
        return <Star className="w-5 h-5" />;
      case "premium":
        return <Zap className="w-5 h-5" />;
      case "vip":
        return <Crown className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getTierColor = (tierName?: string) => {
    switch (tierName?.toLowerCase()) {
      case "basic":
        return "bg-blue-500";
      case "premium":
        return "bg-purple-500";
      case "vip":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const membershipExpiry = user.membershipExpiry
    ? new Date(user.membershipExpiry)
    : null;
  const daysUntilExpiry = membershipExpiry
    ? Math.ceil(
        (membershipExpiry.getTime() - new Date().getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto px-4 py-8 container">
        {/* Header */}
        <div className="flex sm:flex-row flex-col justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="mb-2 font-bold text-3xl">
              Welcome back, {user.username}!
            </h1>
            <p className="text-muted-foreground">
              Manage your account and membership from your dashboard.
            </p>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button variant="outline" size="sm">
              <Settings className="mr-2 w-4 h-4" />
              Settings
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>

        <div className="gap-6 grid lg:grid-cols-3">
          {/* User Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center bg-primary rounded-full w-12 h-12">
                  <User className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-muted-foreground text-sm">
                    Member since{" "}
                    {new Date(user.joinedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{user.phoneNumber}</span>
                </div>
                {user.email && (
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Membership Status Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Membership Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hasMembership && user.membershipTier ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${getTierColor(
                        user.membershipTier.name
                      )} rounded-full flex items-center justify-center text-white`}
                    >
                      {getTierIcon(user.membershipTier.name)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {user.membershipTier.name}
                        </span>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {user.membershipTier.discountPercentage}% discount on
                        all purchases
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Expires:</span>
                      <span>{membershipExpiry?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Days remaining:</span>
                      <span
                        className={
                          daysUntilExpiry <= 7
                            ? "text-red-600"
                            : "text-green-600"
                        }
                      >
                        {daysUntilExpiry} days
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Benefits:</h4>
                    <ul className="space-y-1 text-xs">
                      {user.membershipTier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="bg-primary mt-2 rounded-full w-1 h-1 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {daysUntilExpiry <= 7 && (
                    <Button size="sm" className="w-full" asChild>
                      <Link href="/membership">Renew Membership</Link>
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="flex justify-center items-center bg-muted mx-auto rounded-full w-12 h-12">
                    <Crown className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">No Active Membership</p>
                    <p className="text-muted-foreground text-sm">
                      Upgrade to unlock exclusive benefits and discounts
                    </p>
                  </div>
                  <Button size="sm" className="w-full" asChild>
                    <Link href="/membership">Browse Memberships</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Shopping Overview Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Shopping Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Items in Cart:</span>
                <Badge variant="outline">{totalItems}</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Wishlist Items:</span>
                <Badge variant="outline">{wishlistCount}</Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Previously Purchased:</span>
                <Badge variant="outline">{purchasedItems.length}</Badge>
              </div>

              {hasMembership && (
                <div className="bg-green-50 dark:bg-green-900/20 p-3 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-800 text-sm dark:text-green-200">
                    🎉 You're saving {user.membershipTier?.discountPercentage}%
                    on all purchases!
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/shopping">Continue Shopping</Link>
                </Button>
                {wishlistCount > 0 && (
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link href="/wishlist">
                      <Heart className="mr-2 w-4 h-4" />
                      View Wishlist ({wishlistCount})
                    </Link>
                  </Button>
                )}
                {totalItems > 0 && (
                  <Button size="sm" className="w-full" asChild>
                    <Link href="/cart">View Cart ({totalItems})</Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="mb-4 font-semibold text-xl">Quick Actions</h2>
          <div className="gap-4 grid sm:grid-cols-2 md:grid-cols-4">
            <Link href="/shopping">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <ShoppingBag className="mb-3 w-8 h-8 text-primary" />
                  <h3 className="font-medium">Shop Products</h3>
                  <p className="text-muted-foreground text-sm">
                    Browse our catalog
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/membership">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Crown className="mb-3 w-8 h-8 text-primary" />
                  <h3 className="font-medium">Memberships</h3>
                  <p className="text-muted-foreground text-sm">
                    Upgrade your plan
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/cart">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="relative">
                    <ShoppingBag className="mb-3 w-8 h-8 text-primary" />
                    {totalItems > 0 && (
                      <Badge className="-top-2 -right-2 absolute flex justify-center items-center p-0 w-5 h-5 text-xs">
                        {totalItems}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-medium">Shopping Cart</h3>
                  <p className="text-muted-foreground text-sm">
                    Review your items
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/wishlist">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="relative">
                    <Heart className="mb-3 w-8 h-8 text-primary" />
                    {wishlistCount > 0 && (
                      <Badge className="-top-2 -right-2 absolute flex justify-center items-center p-0 w-5 h-5 text-xs">
                        {wishlistCount}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-medium">Wishlist</h3>
                  <p className="text-muted-foreground text-sm">
                    Saved for later
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <Settings className="mb-3 w-8 h-8 text-primary" />
                <h3 className="font-medium">Account Settings</h3>
                <p className="text-muted-foreground text-sm">
                  Manage preferences
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
