"use client";
import { JSX, useState } from "react";
import DiscountForm from "./discount-form";
import { useCart } from "@/app/context/cartContext";
import { useCurrency } from "@/app/context/currencyContext";
import { OrderSummaryProps } from "@/lib/types";
import { handleApplyDiscountUtil } from "@/lib/utils/utils";
import {
  FaCheckDouble,
  FaChevronDown,
  FaChevronLeft,
  FaChevronUp,
  FaInfo,
} from "react-icons/fa";

/**
 * A component that displays the order summary during checkout, including pricing details and discount functionality.
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.subtotal - The subtotal amount before tax and shipping
 * @param {number} props.tax - The tax amount
 * @param {number} props.shipping - The shipping cost
 * @param {number} [props.discountAmount=0] - The discount amount to be applied
 * @param {number} props.total - The total order amount after all calculations
 * @param {number} props.itemCount - The total number of items in the order
 * @param {string} props.estimatedDelivery - The estimated delivery date/time
 * @param {Function} props.onApplyDiscount - Callback function when discount is applied
 *
 * @returns {JSX.Element} A card containing order summary details, discount controls, and checkout information
 *
 * @example
 * <OrderSummary
 *   subtotal={100}
 *   tax={10}
 *   shipping={5}
 *   discountAmount={20}
 *   total={95}
 *   itemCount={3}
 *   estimatedDelivery="2-3 business days"
 *   onApplyDiscount={(code) => handleDiscount(code)}
 * />
 */
export default function OrderSummary({
  subtotal,
  tax,
  shipping,
  discountAmount = 0,
  total,
  itemCount,
  estimatedDelivery,
  onApplyDiscount,
}: OrderSummaryProps): JSX.Element {
  const { applyDiscount } = useCart();
  const { formatCurrency, selectedCurrency } = useCurrency();

  const [showDiscount, setShowDiscount] = useState(false);
  const [showDetails, setShowDetails] = useState(true);
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [discountError, setDiscountError] = useState<boolean>(false);
  const [discountCode, setDiscountCode] = useState<string>("");

  /**
   * Handles the application of a discount code to the shopping cart.
   *
   * This function validates the discount code input and applies it if valid:
   * - Checks if discount code is not empty/whitespace
   * - Validates the discount code through applyDiscount helper
   * - Updates UI states for discount application status
   * - Resets the discount code input field
   *
   * @returns {void}
   * @throws {void}
   *
   * @example
   * handleApplyDiscount(); // Processes current discountCode state
   */
  const handleApplyDiscount = (): void => {
    const { discountApplied, discountError } = handleApplyDiscountUtil(
      discountCode,
      applyDiscount
    );

    setDiscountApplied(discountApplied);
    setDiscountError(discountError);

    if (discountApplied) {
      setDiscountCode("");
    }
  };

  return (
    <div className="rounded-xl shadow-md overflow-hidden sticky top-18">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold mb-1">Order Summary</h2>
        <p className="text-sm">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="p-6">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-between w-full text-left mb-4 font-medium"
        >
          <span>Order Details</span>
          {showDetails ? (
            <FaChevronUp className="h-5 w-5" />
          ) : (
            <FaChevronDown className="h-5 w-5" />
          )}
        </button>

        {showDetails && (
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal, selectedCurrency.code)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  formatCurrency(shipping, selectedCurrency.code)
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatCurrency(tax, selectedCurrency.code)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>
                  -{formatCurrency(discountAmount, selectedCurrency.code)}
                </span>
              </div>
            )}

            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formatCurrency(total, selectedCurrency.code)}</span>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowDiscount(!showDiscount)}
          className="flex items-center justify-between w-full text-left mb-4 "
        >
          <span>
            {discountAmount > 0 ? "Promo code applied" : "Add promo code"}
          </span>
          {showDiscount ? (
            <FaChevronUp className="h-5 w-5" />
          ) : (
            <FaChevronDown className="h-5 w-5" />
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

        {discountAmount > 0 && !showDiscount && (
          <div className="flex items-center mb-4 bg-green-50 p-2 rounded-lg">
            <FaCheckDouble className="h-4 w-4 text-green-500 mr-2" />
            <p className="text-sm text-green-700">
              Promo code applied: -
              {formatCurrency(discountAmount, selectedCurrency.code)}
            </p>
          </div>
        )}

        <div className="flex items-start space-x-2 mb-6 p-3 rounded-lg">
          <FaInfo className="h-5 w-5 mt-0.5 flex-shrink-0" />
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
            className="flex items-center justify-center text-sm hover:underline"
          >
            <FaChevronLeft className="h-4 w-4 mr-1" />
            Return to cart
          </a>
        </div>
      </div>
    </div>
  );
}
