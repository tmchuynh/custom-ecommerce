"use client";

import { useState } from "react";
import { useAuth } from "@/app/context/authContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold">User Dashboard</h1>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl shadow-md overflow-hidden border">
            <div className="p-6">
              <h2 className="text-2xl font-semibold">Your Information</h2>
              <p className="mt-4">
                <strong>Email:</strong> {user?.email || "Not provided"}
              </p>
              <p>
                <strong>Username:</strong> {user?.username || "Not provided"}
              </p>
              <p>
                <strong>First Name:</strong> {user?.firstName || "Not provided"}
              </p>
              <p>
                <strong>Last Name:</strong> {user?.lastName || "Not provided"}
              </p>
              <p>
                <strong>Phone:</strong> {user?.phone || "Not provided"}
              </p>
              <p>
                <strong>Default Address:</strong>{" "}
                {user?.addresses?.[0]?.addressLine1 || "Not provided"}
              </p>
            </div>
          </div>

          <div className="rounded-xl shadow-md overflow-hidden border">
            <div className="p-6">
              <h2 className="text-2xl font-semibold">Loyalty Program</h2>
              {user?.loyaltyProgram?.isEnrolled ? (
                <div className="mt-4">
                  <p>
                    <strong>Points:</strong> {user.loyaltyProgram.points}
                  </p>
                  <p>
                    <strong>Tier:</strong> {user.loyaltyProgram.tier}
                  </p>
                  <p>
                    <strong>Points to Next Tier:</strong>{" "}
                    {user.loyaltyProgram.pointsToNextTier}
                  </p>
                  <Button
                    variant={"secondary"}
                    onClick={() => router.push("/user/program_benefits")}
                  >
                    View Your Benefits
                  </Button>
                </div>
              ) : (
                <p className="mt-4">
                  Join our loyalty program to earn points and unlock rewards!
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant={"teritary"}
              onClick={() => router.push("/user/orders")}
            >
              View Your Orders
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
