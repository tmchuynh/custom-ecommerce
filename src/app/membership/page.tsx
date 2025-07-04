"use client";

import { membershipTiers, useAuth } from "@/app/context/authContext";
import { useCurrency } from "@/app/context/currencyContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTierBadgeVariant, getTierIcon } from "@/lib/utils/membership";
import { Check, Crown, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function MembershipPage() {
  const { user, isLoggedIn, purchaseMembership, hasMembership } = useAuth();
  const { formatPrice } = useCurrency();
  const router = useRouter();
  const [purchasingTier, setPurchasingTier] = useState<string | null>(null);

  const handlePurchase = async (tierName: string) => {
    if (!isLoggedIn) {
      toast.error("Please log in to purchase a membership");
      router.push("/login");
      return;
    }

    setPurchasingTier(tierName);
    const result = await purchaseMembership(tierName);

    if (result.success) {
      toast.success(result.message);
      router.push("/dashboard");
    } else {
      toast.error(result.message);
    }

    setPurchasingTier(null);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold text-4xl">Choose Your Membership</h1>
          <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
            Unlock exclusive benefits, discounts, and premium features with our
            membership tiers.
          </p>
          {!isLoggedIn && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 mt-6 p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-200">
                Please{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-yellow-800 dark:text-yellow-200"
                  onClick={() => router.push("/login")}
                >
                  sign in
                </Button>{" "}
                or{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto text-yellow-800 dark:text-yellow-200"
                  onClick={() => router.push("/register")}
                >
                  create an account
                </Button>{" "}
                to purchase a membership.
              </p>
            </div>
          )}
          {hasMembership && (
            <div className="bg-green-50 dark:bg-green-900/20 mt-6 p-4 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-green-800 dark:text-green-200">
                You currently have an active {user?.membershipTier?.name}{" "}
                membership!
              </p>
            </div>
          )}
        </div>

        <div className="gap-8 grid md:grid-cols-3 mx-auto max-w-6xl">
          {membershipTiers.map((tier) => {
            const isCurrentTier = user?.membershipTier?.id === tier.id;
            const isPurchasing = purchasingTier === tier.name;

            return (
              <Card
                key={tier.id}
                className={`relative overflow-hidden transition-all flex flex-col justify-between duration-300 hover:shadow-lg ${
                  tier.name === "Premium"
                    ? "border-primary shadow-md scale-105"
                    : ""
                } ${isCurrentTier ? "border-4 border-green-500" : ""}`}
              >
                {tier.name === "Premium" && (
                  <div className="top-0 right-0 left-0 absolute bg-primary py-2 text-center text-primary-foreground">
                    <span className="font-medium text-sm">Most Popular</span>
                  </div>
                )}
                {isCurrentTier && (
                  <div className="top-0 right-0 left-0 absolute bg-green-500 py-2 text-center text-white">
                    <span className="font-medium text-sm">Current Plan</span>
                  </div>
                )}

                <CardHeader
                  className={
                    tier.name === "Premium" || isCurrentTier ? "pt-12" : ""
                  }
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${tier.color} text-white`}
                      >
                        {getTierIcon(tier.name)}
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{tier.name}</CardTitle>
                        <Badge
                          variant={getTierBadgeVariant(tier.name)}
                          className="mt-1"
                        >
                          {tier.discountPercentage}% off purchases
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-baseline gap-1">
                      <span className="font-bold text-3xl">
                        {formatPrice(tier.price)}
                      </span>
                      <span className="text-muted-foreground">/ month</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col h-full">
                  <ul className="space-y-3 mb-6 h-full">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="mt-0.5 w-5 h-5 text-green-500 shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={tier.name === "Premium" ? "modern" : "classic"}
                    onClick={() => handlePurchase(tier.name)}
                    disabled={!isLoggedIn || isPurchasing || isCurrentTier}
                  >
                    {isPurchasing
                      ? "Processing..."
                      : isCurrentTier
                      ? "Current Plan"
                      : !isLoggedIn
                      ? "Sign In Required"
                      : `Choose ${tier.name}`}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <h2 className="mb-4 font-bold text-2xl">Membership Benefits</h2>
          <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-4 mx-auto max-w-4xl">
            <div className="text-center">
              <div className="flex justify-center items-center bg-blue-100 dark:bg-blue-900 mx-auto mb-3 rounded-full w-12 h-12">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 font-semibold">Instant Discounts</h3>
              <p className="text-muted-foreground text-sm">
                Get immediate savings on every purchase
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center bg-green-100 dark:bg-green-900 mx-auto mb-3 rounded-full w-12 h-12">
                <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="mb-2 font-semibold">Priority Support</h3>
              <p className="text-muted-foreground text-sm">
                Get help faster with dedicated support
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center bg-purple-100 dark:bg-purple-900 mx-auto mb-3 rounded-full w-12 h-12">
                <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-2 font-semibold">Exclusive Access</h3>
              <p className="text-muted-foreground text-sm">
                Early access to new products and sales
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center bg-orange-100 dark:bg-orange-900 mx-auto mb-3 rounded-full w-12 h-12">
                <Crown className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="mb-2 font-semibold">VIP Treatment</h3>
              <p className="text-muted-foreground text-sm">
                Special perks and personalized service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
