"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { capitalize } from "@/lib/utils";
import { useCart } from "../../context/cartContext";
import { JSX, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, X } from "lucide-react";

/**
 * The `CheckoutPage` component represents the checkout page of the e-commerce application.
 * It provides a summary of the user's cart, allows the application of discount codes,
 * and facilitates the checkout process.
 *
 * @component
 *
 * @returns {JSX.Element} The rendered checkout page.
 *
 * @remarks
 * - Displays the cart items, order summary, and discount code input.
 * - Handles discount code validation and application.
 * - Calculates subtotal, tax, shipping, and total amounts dynamically.
 * - Redirects to the home page upon successful checkout.
 *
 * @example
 * ```tsx
 * import CheckoutPage from './checkout/page';
 *
 * const App = () => {
 *   return <CheckoutPage />;
 * };
 * ```
 *
 * @dependencies
 * - `useCart`: Custom hook providing cart-related operations and data.
 * - `useState`: React state management for discount code and application status.
 * - `Button`, `Input`, `Skeleton`, `Separator`: UI components used for layout and styling.
 *
 * @hooks
 * - `useCart`: Provides cart items, subtotal, tax, shipping, discount, and checkout logic.
 * - `useState`: Manages local state for discount code, application status, and error handling.
 *
 * @functions
 * - `handleApplyDiscount`: Validates and applies the discount code.
 * - `handleCheckout`: Initiates the checkout process and redirects on success.
 *
 * @conditions
 * - If the cart is empty, a message is displayed prompting the user to continue shopping.
 * - If a discount code is invalid, an error message is shown.
 * - If a discount code is valid, the discount is applied to the total.
 */
const CheckoutPage = (): JSX.Element => {
  const {
    cartItems,
    getSubTotal,
    calculateTaxAmount,
    calculateShippingCost,
    getShippingMethod,
    getTotalItems,
    getTotalPrice,
    applyDiscount,
    getDiscountedTotal,
    startCheckout,
  } = useCart();

  const [discountCode, setDiscountCode] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [discountError, setDiscountError] = useState<boolean>(false);

  // Calculate values for order summary
  const subtotal = getSubTotal();
  const tax = calculateTaxAmount(subtotal);
  const shippingMethod = getShippingMethod(getTotalItems());
  const shipping = calculateShippingCost(shippingMethod);

  /**
   * Handles the submission of a discount code
   */
  const handleApplyDiscount = () => {
    if (!discountCode.trim()) return;

    const isValidDiscount = applyDiscount(discountCode);

    if (isValidDiscount) {
      setDiscountApplied(true);
      setDiscountError(false);
    } else {
      setDiscountError(true);
      setDiscountApplied(false);
    }

    setDiscountCode(""); // Clear the input field after successful application
  };

  /**
   * Handles the checkout process
   */
  const handleCheckout = () => {
    startCheckout();
    // In a real application, we would redirect to a success page or handle errors
    alert("Order placed successfully! Thank you for your purchase.");
    window.location.href = "/";
  };

  // Calculate the discount amount
  const originalTotal = getTotalPrice();
  const discountedTotal = discountApplied
    ? getDiscountedTotal()
    : originalTotal;
  const discountAmount = originalTotal - discountedTotal;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="h-[20rem] lg:h-[40rem] 2xl:h-[60rem] flex flex-col justify-center items-center">
          <h1 className="text-4xl font-extrabold text-center mb-8">Checkout</h1>
          <p className="text-xl text-center">Your cart is empty.</p>
          <Button className="mt-6" asChild>
            <a href="/products">Continue Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-center mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Cart Summary */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Order Items</h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start space-x-4 border-b pb-4"
              >
                <Skeleton className="h-20 w-20 rounded-md shrink-0" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <div className="flex justify-between mt-2">
                    <span>Qty: {item.quantity}</span>
                    <span className="font-medium">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Discount Code Section */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Discount Code</h3>
            <form
              className="flex space-x-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleApplyDiscount();
              }}
            >
              <Input
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => {
                  setDiscountCode(e.target.value);
                }}
                className={discountError ? "border-red-500" : ""}
              />
              <Button type="submit">Apply</Button>
            </form>

            {discountApplied && (
              <div className="flex items-center text-green-600 mt-2">
                <Check size={16} className="mr-1" />
                <span>Discount applied successfully!</span>
              </div>
            )}

            {discountError && (
              <div className="flex items-center text-red-600 mt-2">
                <X size={16} className="mr-1" />
                <span>Invalid discount code</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discountApplied && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>{capitalize(shippingMethod)} Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${discountedTotal.toFixed(2)}</span>
            </div>

            <Button className="w-full py-3 mt-6" onClick={handleCheckout}>
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
