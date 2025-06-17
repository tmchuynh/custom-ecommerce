"use client";

import { useAuth } from "@/app/context/authContext";
import { useCart } from "@/app/context/cartContext";
import { useCurrency } from "@/app/context/currencyContext";
import { useWishlist } from "@/app/context/wishlistContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useOrderManagement from "@/hooks/useOrderManagement";
import { usePurchaseHistory } from "@/hooks/usePurchaseHistory";
import {
  Calendar,
  CreditCard,
  Crown,
  Heart,
  History,
  LogOut,
  Mail,
  Package,
  Phone,
  RefreshCw,
  Settings,
  ShoppingBag,
  Star,
  TrendingUp,
  Truck,
  User,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function DashboardPage() {
  const { user, isLoggedIn, logout, hasMembership } = useAuth();
  const { totalItems } = useCart();
  const { wishlistCount, purchasedItems } = useWishlist();
  const { formatPrice } = useCurrency();
  const { orderStats, orders } = useOrderManagement(user?.email);
  const {
    previouslyPurchased,
    orderHistory,
    purchaseStats,
    isLoading: isPurchaseHistoryLoading,
    error: purchaseHistoryError,
    refetch: refetchPurchaseHistory,
  } = usePurchaseHistory();
  const router = useRouter();

  // Combine user orders with demo purchase history for display
  const combinedOrderStats = useMemo(() => {
    if (!purchaseStats) {
      return {
        totalOrders: orderStats.totalOrders,
        totalSpent: orderStats.totalSpent,
        averageOrderValue: orderStats.averageOrderValue,
        recentOrders: orderStats.recentOrders.length,
        userOrders: orderStats.totalOrders,
        demoOrders: 0,
      };
    }

    console.log("Order History (Demo Data):", orderHistory);
    console.log("User Orders (Real Data):", orders);

    const combinedTotal = orderStats.totalOrders + purchaseStats.totalOrders;
    const combinedSpent = orderStats.totalSpent + purchaseStats.totalSpent;
    const combinedAverage =
      combinedTotal > 0 ? combinedSpent / combinedTotal : 0;

    return {
      totalOrders: combinedTotal,
      totalSpent: combinedSpent,
      averageOrderValue: combinedAverage,
      recentOrders: orderStats.recentOrders.length,
      userOrders: orderStats.totalOrders,
      demoOrders: purchaseStats.totalOrders,
    };
  }, [orderStats, purchaseStats, orderHistory, orders]);

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
    <div className="min-h-screen">
      <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard/settings")}
            >
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    asChild
                  >
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

        {/* Order Statistics */}
        <div className="mt-8">
          <h2 className="mb-4 font-semibold text-xl">Order Overview</h2>
          <div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Total Orders
                    </p>
                    <p className="font-bold text-2xl">
                      {combinedOrderStats.totalOrders}
                    </p>
                    {combinedOrderStats.userOrders > 0 &&
                      combinedOrderStats.demoOrders > 0 && (
                        <p className="text-muted-foreground text-xs">
                          {combinedOrderStats.userOrders} real +{" "}
                          {combinedOrderStats.demoOrders} demo
                        </p>
                      )}
                  </div>
                  <Package className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Spent</p>
                    <p className="font-bold text-2xl">
                      {formatPrice(combinedOrderStats.totalSpent)}
                    </p>
                    {combinedOrderStats.userOrders > 0 &&
                      combinedOrderStats.demoOrders > 0 && (
                        <p className="text-muted-foreground text-xs">
                          Combined real + demo
                        </p>
                      )}
                  </div>
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Average Order
                    </p>
                    <p className="font-bold text-2xl">
                      {formatPrice(combinedOrderStats.averageOrderValue)}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Recent Orders
                    </p>
                    <p className="font-bold text-2xl">
                      {combinedOrderStats.recentOrders}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Orders */}
        {orderStats.recentOrders.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-xl">Your Recent Orders</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/orders">View All Orders</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/track-order">Track Order</Link>
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              {orderStats.recentOrders.slice(0, 3).map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">Order #{order.id}</p>
                          <Badge
                            variant={
                              order.status === "delivered"
                                ? "default"
                                : order.status === "shipped"
                                ? "secondary"
                                : order.status === "processing"
                                ? "outline"
                                : "destructive"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">
                          {new Date(order.orderDate).toLocaleDateString()} •{" "}
                          {order.items.length} items
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Tracking: {order.trackingNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatPrice(order.grandTotal)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="mt-1"
                        >
                          <Link
                            href={`/track-order?tracking=${order.trackingNumber}`}
                          >
                            <Truck className="mr-1 w-4 h-4" />
                            Track
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

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

            <Link href={"/dashboard/settings"}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Settings className="mb-3 w-8 h-8 text-primary" />
                  <h3 className="font-medium">Account Settings</h3>
                  <p className="text-muted-foreground text-sm">
                    Manage preferences
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Purchase History from DummyJSON */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl">Demo Purchase History</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={refetchPurchaseHistory}
                disabled={isPurchaseHistoryLoading}
              >
                <RefreshCw
                  className={`mr-1 w-4 h-4 ${
                    isPurchaseHistoryLoading ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </Button>
              {purchaseStats && (
                <Badge variant="secondary">
                  {purchaseStats.totalOrders} demo orders
                </Badge>
              )}
            </div>
          </div>

          {isPurchaseHistoryLoading ? (
            <Card>
              <CardContent className="flex justify-center items-center p-8">
                <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
                Loading purchase history...
              </CardContent>
            </Card>
          ) : purchaseHistoryError ? (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-muted-foreground">
                  <Package className="mx-auto mb-2 w-8 h-8" />
                  <p>Unable to load purchase history</p>
                  <p className="text-sm">{purchaseHistoryError}</p>
                </div>
              </CardContent>
            </Card>
          ) : purchaseStats ? (
            <>
              {/* Purchase Statistics */}
              <div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-4 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Demo Orders
                        </p>
                        <p className="font-bold text-2xl">
                          {purchaseStats.totalOrders}
                        </p>
                      </div>
                      <History className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Demo Spent
                        </p>
                        <p className="font-bold text-2xl">
                          {formatPrice(purchaseStats.totalSpent)}
                        </p>
                      </div>
                      <CreditCard className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Demo Items
                        </p>
                        <p className="font-bold text-2xl">
                          {purchaseStats.totalItems}
                        </p>
                      </div>
                      <Package className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-muted-foreground text-sm">
                          Demo Savings
                        </p>
                        <p className="font-bold text-2xl">
                          {formatPrice(purchaseStats.totalSavings)}
                        </p>
                      </div>
                      <Zap className="w-8 h-8 text-orange-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Previously Purchased Items */}
              {previouslyPurchased.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-3 font-medium text-lg">
                    Previously Purchased Items
                  </h3>
                  <div className="gap-4 grid sm:grid-cols-2 lg:grid-cols-3">
                    {previouslyPurchased.slice(0, 6).map((product) => (
                      <Card key={product.id}>
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <Image
                              src={product.thumbnail}
                              alt={product.title}
                              className="rounded w-16 h-16 object-cover"
                              width={64}
                              height={64}
                              loading="lazy"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm line-clamp-2">
                                {product.title}
                              </h4>
                              <p className="text-muted-foreground text-xs">
                                Qty: {product.quantity} •{" "}
                                {formatPrice(product.total)}
                              </p>
                              {product.discountPercentage > 0 && (
                                <Badge
                                  variant="secondary"
                                  className="mt-1 text-xs"
                                >
                                  {product.discountPercentage}% off
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {previouslyPurchased.length > 6 && (
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm">
                        View All {previouslyPurchased.length} Items
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Demo Notice */}
              <Card className="border-dashed">
                <CardContent className="p-4 text-center">
                  <div className="text-muted-foreground text-sm">
                    <Star className="mx-auto mb-2 w-5 h-5" />
                    <p>This purchase history is demo data from DummyJSON API</p>
                    <p>Used for testing and demonstration purposes only</p>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-muted-foreground">
                  <Package className="mx-auto mb-2 w-8 h-8" />
                  <p>No purchase history available</p>
                  <p className="text-sm">
                    Demo data will appear here when available
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
