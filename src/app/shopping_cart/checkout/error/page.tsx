"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * CheckoutError page that displays when something goes wrong during checkout
 *
 * This page shows:
 * - An error message
 * - Possible reasons for the error
 * - Options to retry or return to cart
 * - Troubleshooting tips
 */
const CheckoutError = () => {
  const router = useRouter();
  const [errorCode, setErrorCode] = useState<string>("");

  // Simulate error tracking that would come from a real system
  useEffect(() => {
    // Generate a random error code for demonstration
    const randomErrorCode = `ERR-${Math.floor(1000 + Math.random() * 9000)}`;
    setErrorCode(randomErrorCode);
  }, []);

  const handleRetry = () => {
    router.push("/shopping_cart/checkout");
  };

  const handleReturnToCart = () => {
    router.push("/shopping_cart");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="bg-white shadow-xl rounded-lg p-8">
        <div className="text-center">
          <div className="flex justify-center">
            <AlertTriangle className="h-20 w-20 text-red-500" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Oops! Something went wrong.
          </h1>
          <p className="mt-2 text-xl text-gray-500">
            We encountered an issue while processing your order.
          </p>
          <p className="mt-2 font-medium text-gray-500">
            Error Code: {errorCode}
          </p>
        </div>

        <div className="mt-10">
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900">
              What might have happened?
            </h2>

            <ul className="mt-4 list-disc pl-5 text-gray-500 space-y-2">
              <li>Your payment might not have been processed correctly</li>
              <li>There could be an issue with our payment system</li>
              <li>
                Network connectivity issues might have interrupted the checkout
              </li>
              <li>One or more items in your cart might be out of stock</li>
            </ul>
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900">
              What you can do
            </h3>

            <ul className="mt-4 list-disc pl-5 text-gray-500 space-y-2">
              <li>Try placing your order again</li>
              <li>Check that your payment information is correct</li>
              <li>Make sure you have a stable internet connection</li>
              <li>
                If the problem persists, please contact our customer support
              </li>
            </ul>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Button onClick={handleRetry} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={handleReturnToCart}>
              Return to Cart
            </Button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Need assistance? Contact our customer service at</p>
            <p className="font-medium mt-1">
              support@yourstore.com or 1-800-123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutError;
