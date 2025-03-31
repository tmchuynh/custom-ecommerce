"use client";

import { useAuth } from "@/app/context/authContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ProgramBenefitsPage() {
  const { user } = useAuth();
  const router = useRouter();

  const tierBenefits = {
    Standard: [
      "Earn 1 point per $1 spent",
      "Access to member-only sales and promotions",
      "Birthday reward to celebrate your special day",
    ],
    Silver: [
      "Earn 1.25 points per $1 spent",
      "Free shipping on orders over $35",
      "Early access to new product releases",
      "All Standard benefits, plus extra rewards",
    ],
    Gold: [
      "Earn 1.5 points per $1 spent",
      "Free shipping on all orders, no minimum",
      "Exclusive seasonal gifts as a thank you",
      "Dedicated customer service for a personalized experience",
      "All Silver benefits, plus additional VIP perks",
    ],
  };

  const userTier = (user?.loyaltyProgram?.tier || "Standard") as
    | "Standard"
    | "Silver"
    | "Gold";
  const benefits = tierBenefits[userTier] || [];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold">Your Benefits</h1>
          <p className="text-xl mt-4">
            You are currently in the <strong>{userTier}</strong> tier.
          </p>
        </div>

        <div className="rounded-xl shadow-md overflow-hidden border">
          <div className="p-6">
            <h2 className="text-2xl font-semibold">
              Benefits of {userTier} Tier
            </h2>
            <ul className="mt-4 list-disc list-inside space-y-2">
              {benefits.map((benefit, index) => (
                <li key={index} className="text-lg">
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button onClick={() => router.push("/user/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
