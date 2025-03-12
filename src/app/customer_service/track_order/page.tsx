"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // Use your own button component
import { Input } from "@/components/ui/input"; // Use your own input component

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Simulated order statuses
  const orderStatuses = [
    { trackingNumber: "123456", status: "Shipped" },
    { trackingNumber: "654321", status: "In Transit" },
    { trackingNumber: "112233", status: "Delivered" },
  ];

  // Handle the tracking request
  const handleTrackOrder = () => {
    setLoading(true);
    // Simulate a delay (API call)
    setTimeout(() => {
      const order = orderStatuses.find(
        (order) => order.trackingNumber === trackingNumber
      );
      if (order) {
        setOrderStatus(order.status);
      } else {
        setOrderStatus("Order not found");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
        Track Your Order
      </h1>
      <p className="text-xl text-center text-gray-600 mb-12">
        Enter your tracking number to get the latest update on your order
        status.
      </p>

      <div className="flex justify-center items-center">
        <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
          <div className="mb-6">
            <label
              htmlFor="tracking-number"
              className="block text-sm font-medium text-gray-700"
            >
              Tracking Number
            </label>
            <Input
              id="tracking-number"
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter your tracking number"
              className="mt-2 w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-center items-center">
            <Button onClick={handleTrackOrder} className="w-full mt-4">
              {loading ? "Tracking..." : "Track Order"}
            </Button>
          </div>

          {orderStatus && (
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Order Status:
              </h3>
              <p
                className={`mt-2 text-xl ${
                  orderStatus === "Order not found"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {orderStatus}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
