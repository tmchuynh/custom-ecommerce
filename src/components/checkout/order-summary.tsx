"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronUp,
  Check,
  Clock,
  Info,
  ArrowRight,
} from "lucide-react";
import DiscountForm from "./discount-form";
import { useCart } from "@/app/context/cartContext";
import { formatCurrency } from "@/lib/utils";

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
  discount?: number;
  total: number;
  itemCount: number;
  estimatedDelivery?: string;
  onApplyDiscount?: (code: string) => void;
}

export default function OrderSummary({
  subtotal,
  tax,
  shipping,
  discount = 0,
  total,
  itemCount,
  estimatedDelivery,
  onApplyDiscount,
}: OrderSummaryProps) {
  const { applyDiscount } = useCart();

  const [showDiscount, setShowDiscount] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [discountError, setDiscountError] = useState<boolean>(false);
  const [discountCode, setDiscountCode] = useState<string>("");

  const handleApplyDiscount = () => {
    if (!discountCode.trim()) {
      setDiscountError(true);
      setDiscountApplied(false);
      return;
    }

    const isValidDiscount = applyDiscount(discountCode);

    if (isValidDiscount) {
      setDiscountApplied(true);
      setDiscountError(false);
    } else {
      setDiscountError(true);
      setDiscountApplied(false);
    }

    setDiscountCode("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-8">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Order Summary
        </h2>
        <p className="text-sm text-gray-600">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="p-6">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-between w-full text-left mb-4 text-gray-800 font-medium"
        >
          <span>Order Details</span>
          {showDetails ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>

        {showDetails && (
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  formatCurrency(shipping)
                )}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatCurrency(discount)}</span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        )}

        {estimatedDelivery && (
          <div className="flex items-start space-x-3 bg-blue-50 rounded-lg p-3 mb-4">
            <Clock className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-800">
                Estimated Delivery
              </p>
              <p className="text-sm text-blue-600">{estimatedDelivery}</p>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowDiscount(!showDiscount)}
          className="flex items-center justify-between w-full text-left mb-4 text-blue-600 font-medium"
        >
          <span>{discount > 0 ? "Promo code applied" : "Add promo code"}</span>
          {showDiscount ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {showDiscount && onApplyDiscount && (
          <div className="mb-4">
            <DiscountForm
              discountCode={discountCode}
              setDiscountCode={setDiscountCode}
              discountApplied={discountApplied}
              discountError={discountError}
              setDiscountError={setDiscountError}
              handleApplyDiscount={handleApplyDiscount}
            />
          </div>
        )}

        {discount > 0 && !showDiscount && (
          <div className="flex items-center mb-4 bg-green-50 p-2 rounded-lg">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            <p className="text-sm text-green-700">
              Promo code applied: -{formatCurrency(discount)}
            </p>
          </div>
        )}

        <div className="flex items-start space-x-2 mb-6 bg-gray-50 p-3 rounded-lg">
          <Info className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700">
              By placing your order, you agree to our{" "}
              <a
                href="/policies/terms_and_conditions"
                className="text-blue-600 hover:underline"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/policies/privacy_policy"
                className="text-blue-600 hover:underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <a
            href="/cart"
            className="flex items-center justify-center text-blue-600 text-sm hover:underline"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Return to cart
          </a>
        </div>
      </div>
    </div>
  );
}

// Helper icon component
const ChevronLeft = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);
