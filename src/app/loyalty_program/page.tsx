"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // You can use your own button component
import { StarIcon } from "@heroicons/react/24/outline";
import { perks } from "@/lib/constants";
import Image from "next/image";

const LoyaltyProgram = () => {
  const [points, setPoints] = useState(0);

  const earnPoints = () => {
    setPoints(points + 100); // Example: Add 100 points on button click
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      {/* Perks */}
      <section aria-labelledby="perks-heading">
        <h2 id="perks-heading" className="sr-only">
          Our perks
        </h2>

        <div className="mx-auto max-w-7xl px-4 pt-10 pb-28 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:shrink-0">
                  <div className="flow-root">
                    <Image
                      alt=""
                      src={perk.imageUrl}
                      className="mx-auto -my-1 h-24 w-auto"
                      width={96}
                      height={96}
                    />
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:ml-4 lg:mt-6 lg:ml-0">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <h1 className="text-4xl font-extrabold text-center mb-8">
        Loyalty Program
      </h1>
      <p className="text-xl text-center mb-12">
        Join our loyalty program and start earning points for every purchase!
      </p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
        {/* Section 1: How It Works */}
        <div className="flex flex-col items-center p-8 rounded-xl shadow-lg bg-card">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <p className="text-lg mb-6">
            Earn points for every purchase you make. Redeem your points for
            discounts, exclusive offers, and more! The more you shop, the more
            you earn!
          </p>
          <div className="flex items-center space-x-4 mb-6">
            <StarIcon className="h-8 w-8 text-yellow-500" />
            <p className="text-lg font-semibold">
              Earn 1 point for every $1 spent
            </p>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <StarIcon className="h-8 w-8 text-yellow-500" />
            <p className="text-lg font-semibold">Redeem points for discounts</p>
          </div>
          <Button onClick={earnPoints} className="w-2/5 mt-4">
            Enroll Now
          </Button>
        </div>

        {/* Section 2: Benefits */}
        <div className="flex flex-col items-center p-8 rounded-xl shadow-lg bg-card">
          <h2 className="text-2xl font-semibold mb-4">Program Benefits</h2>
          <p className="text-lg mb-6">
            As a loyalty member, you’ll receive exclusive perks and rewards!
            Here are some of the benefits:
          </p>
          <ul className="list-disc list-inside text-lg">
            <li className="mb-4">Exclusive discounts on select products</li>
            <li className="mb-4">Early access to sales and new arrivals</li>
            <li className="mb-4">Birthday rewards and special promotions</li>
            <li className="mb-4">Free shipping on orders over $50</li>
          </ul>
          <div className="mt-6">
            <p className="text-lg font-semibold text-foreground">
              Current Points: <span className="text-primary">{points}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyProgram;
