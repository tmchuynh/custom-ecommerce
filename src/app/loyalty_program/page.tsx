"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // You can use your own button component
import { StarIcon } from "@heroicons/react/24/outline";

const LoyaltyProgram = () => {
  const [points, setPoints] = useState(0);

  const earnPoints = () => {
    setPoints(points + 100); // Example: Add 100 points on button click
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Loyalty Program
      </h1>
      <p className="text-xl text-center text-gray-600 mb-12">
        Join our loyalty program and start earning points for every purchase!
      </p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Section 1: How It Works */}
        <div className="flex flex-col items-center bg-gray-50 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            Earn points for every purchase you make. Redeem your points for
            discounts, exclusive offers, and more! The more you shop, the more
            you earn!
          </p>
          <div className="flex items-center space-x-4 mb-6">
            <StarIcon className="h-8 w-8 text-yellow-500" />
            <p className="text-lg font-semibold text-gray-700">
              Earn 1 point for every $1 spent
            </p>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <StarIcon className="h-8 w-8 text-yellow-500" />
            <p className="text-lg font-semibold text-gray-700">
              Redeem points for discounts
            </p>
          </div>
          <Button onClick={earnPoints} className="w-full mt-4">
            Earn 100 Points
          </Button>
        </div>

        {/* Section 2: Benefits */}
        <div className="flex flex-col items-center bg-gray-50 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Program Benefits
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            As a loyalty member, you’ll receive exclusive perks and rewards!
            Here are some of the benefits:
          </p>
          <ul className="list-disc list-inside text-gray-600 text-lg">
            <li className="mb-4">Exclusive discounts on select products</li>
            <li className="mb-4">Early access to sales and new arrivals</li>
            <li className="mb-4">Birthday rewards and special promotions</li>
            <li className="mb-4">Free shipping on orders over $50</li>
          </ul>
          <div className="mt-6">
            <p className="text-lg font-semibold text-gray-700">
              Current Points: {points}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
