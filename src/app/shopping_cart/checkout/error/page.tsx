"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdRefresh, IoIosAlert } from "react-icons/io";

/**
 * CheckoutError component displays an error page when checkout process fails.
 *
 * Features:
 * - Generates and displays a random error code
 * - Shows possible reasons for the error
 * - Provides suggestions for resolving the issue
 * - Offers buttons to retry checkout or return to cart
 * - Displays customer support contact information
 *
 * @component
 * @example
 * ```tsx
 * <CheckoutError />
 * ```
 *
 * @returns A JSX element containing the error page layout with:
 * - Error icon and message
 * - Random error code
 * - List of potential issues
 * - Suggested solutions
 * - Action buttons
 * - Support contact details
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

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <IoIosAlert className="h-20 w-20 text-red-500 mx-auto" />
          <h1 className="text-5xl font-extrabold mt-4">
            Oops! Something went wrong.
          </h1>
          <p className="text-xl mt-4">
            We encountered an issue while processing your order.
          </p>
          <p className="text-lg font-medium mt-2">Error Code: {errorCode}</p>
        </div>

        <div className="rounded-xl shadow-md overflow-hidden border">
          <div className="p-6">
            <h2 className="text-2xl font-semibold">
              What might have happened?
            </h2>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>Your payment might not have been processed correctly</li>
              <li>There could be an issue with our payment system</li>
              <li>
                Network connectivity issues might have interrupted the checkout
              </li>
              <li>One or more items in your cart might be out of stock</li>
            </ul>
          </div>
        </div>

        <div className="rounded-xl shadow-md overflow-hidden border mt-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold">What you can do</h2>
            <ul className="mt-4 list-disc list-inside space-y-2">
              <li>Try placing your order again</li>
              <li>Check that your payment information is correct</li>
              <li>Make sure you have a stable internet connection</li>
              <li>
                If the problem persists, please contact our customer support
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <Button onClick={() => router.push("/shopping_cart/checkout")}>
            <IoMdRefresh className="h-4 w-4 mr-2" />
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/shopping_cart")}
          >
            Return to Cart
          </Button>
        </div>

        <div className="text-center text-sm mt-8">
          <p>Need assistance? Contact our customer service at</p>
          <p className="font-medium mt-1">
            support@yourstore.com or 1-800-123-4567
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutError;
