"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdTimer } from "react-icons/io";
import { BsTruck } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

/**
 * A component that displays the order confirmation page after a successful purchase.
 *
 * @component
 * @returns {JSX.Element} A page showing order confirmation details including:
 *  - Success message with order number
 *  - Shipping information
 *  - Estimated delivery date
 *  - Next steps information
 *  - Navigation buttons for continuing shopping or viewing order status
 *
 * @example
 * ```tsx
 * <OrderConfirmation />
 * ```
 *
 * @remarks
 * - Generates a random order number on mount
 * - Calculates estimated delivery date (7-10 business days from order date)
 * - Uses router for navigation between pages
 * - Styled with Tailwind CSS classes
 */
const OrderConfirmation = () => {
  const router = useRouter();
  const [orderNumber, setOrderNumber] = useState<string>("");
  const [estimatedDelivery, setEstimatedDelivery] = useState<string>("");

  // Simulate order data that would come from the backend
  useEffect(() => {
    // Generate a random order number
    const randomOrderNumber = Math.floor(
      100000000 + Math.random() * 900000000
    ).toString();
    setOrderNumber(randomOrderNumber);

    // Calculate an estimated delivery date (7-10 business days from now)
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7 + Math.floor(Math.random() * 3));

    // Format the date
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setEstimatedDelivery(deliveryDate.toLocaleDateString("en-US", options));
  }, []);

  const handleContinueShopping = () => {
    router.push("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div className="shadow-xl rounded-lg p-8">
        <div className="text-center">
          <div className="flex justify-center">
            <FaCheckCircle className="h-20 w-20 text-green-500" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-xl">
            Your order has been placed successfully.
          </p>
          <p className="mt-2 font-medium">Order #{orderNumber}</p>
        </div>

        <div className="mt-10">
          <div className="border-t pt-6">
            <h2 className="text-lg font-medium">Order information</h2>

            <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div className="flex items-center space-x-3 p-4 rounded-md">
                <BsTruck className="h-8 w-8" />
                <div>
                  <p className="font-medium">Shipping</p>
                  <p className="">Standard shipping</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 rounded-md">
                <IoMdTimer className="h-8 w-8" />
                <div>
                  <p className="font-medium">Estimated delivery</p>
                  <p className="">{estimatedDelivery}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t pt-6">
            <h3 className="text-lg font-medium">What happens next?</h3>
            <p className="mt-2">
              You will receive a confirmation email with your order details.
              Once your order ships, we'll send you tracking information.
            </p>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <Button onClick={handleContinueShopping}>Continue Shopping</Button>
            <Button
              variant="outline"
              onClick={() => router.push("/account/orders")}
            >
              View Order Status
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
