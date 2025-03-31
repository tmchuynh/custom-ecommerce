"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";
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
const OrderConfirmation = (): JSX.Element => {
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
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <FaCheckCircle className="h-20 w-20 text-green-500 mx-auto" />
          <h1 className="text-5xl font-extrabold mt-4">Thank You!</h1>
          <p className="text-xl mt-2">
            Your order has been placed successfully.
          </p>
          <p className="text-lg font-medium mt-2">Order #{orderNumber}</p>
        </div>

        <div className="space-y-8">
          <div className="rounded-xl shadow-md overflow-hidden border">
            <div className="p-6">
              <h2 className="text-2xl font-semibold">Order Information</h2>
            </div>
            <div className="border-t grid grid-cols-1 sm:grid-cols-2">
              <div className="p-6 flex items-center space-x-4">
                <BsTruck className="h-8 w-8" />
                <div>
                  <p className="font-medium">Shipping</p>
                  <p>Standard shipping</p>
                </div>
              </div>
              <div className="p-6 flex items-center space-x-4">
                <IoMdTimer className="h-8 w-8" />
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p>{estimatedDelivery}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl shadow-md overflow-hidden border">
            <div className="p-6">
              <h2 className="text-2xl font-semibold">What Happens Next?</h2>
              <p className="mt-4">
                You will receive a confirmation email with your order details.
                Once your order ships, we'll send you tracking information.
              </p>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={handleContinueShopping}>Continue Shopping</Button>
            <Button
              variant="outline"
              onClick={() => router.push("/user/orders")}
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
