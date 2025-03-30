"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, Check, Gift, X } from "lucide-react";
import { DiscountFormProps } from "@/lib/types";

/**
 * A form component for handling discount code applications in a checkout process.
 *
 * @component
 * @param {Object} props - Component props
 * @param {(code: string) => void} [props.onApply] - Callback function when discount is applied
 * @param {string} [props.discountCode] - Current discount code value
 * @param {(code: string) => void} [props.setDiscountCode] - Function to update discount code
 * @param {boolean} [props.discountApplied] - Whether a discount has been successfully applied
 * @param {boolean} [props.discountError] - Whether there is an error with the current discount
 * @param {(error: boolean) => void} [props.setDiscountError] - Function to update error state
 * @param {() => void} [props.handleApplyDiscount] - Custom handler for discount application
 *
 * @remarks
 * The component can work in two modes:
 * 1. Controlled mode: When props are provided for state management
 * 2. Uncontrolled mode: Using internal state when props are not provided
 *
 * Includes features:
 * - Input field for discount code entry
 * - Visual feedback for valid/invalid codes
 * - Available promotions display
 * - Enter key support for code submission
 * - Quick-apply buttons for available promotions
 *
 * @example
 * ```tsx
 * <DiscountForm
 *   onApply={(code) => handleDiscount(code)}
 *   discountCode={code}
 *   setDiscountCode={setCode}
 *   discountApplied={isApplied}
 * />
 * ```
 */
export default function DiscountForm({
  onApply,
  discountCode,
  setDiscountCode,
  discountApplied,
  discountError,
  setDiscountError,
  handleApplyDiscount,
}: DiscountFormProps) {
  // If props are not provided, create local state
  const [localDiscountCode, setLocalDiscountCode] = useState<string>("");
  const [localDiscountApplied, setLocalDiscountApplied] =
    useState<boolean>(false);
  const [localDiscountError, setLocalDiscountError] = useState<boolean>(false);

  // Determine which state to use
  const code = discountCode !== undefined ? discountCode : localDiscountCode;
  const applied =
    discountApplied !== undefined ? discountApplied : localDiscountApplied;
  const error =
    discountError !== undefined ? discountError : localDiscountError;

  /**
   * Handles changes to the discount code input field.
   * Updates either the parent's discount code state or local state based on prop availability.
   * Resets error state when user is typing.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   */
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCode = e.target.value;
    if (setDiscountCode) {
      setDiscountCode(newCode);
    } else {
      setLocalDiscountCode(newCode);
    }

    // Reset error state when typing
    if (error) {
      if (setDiscountError) {
        setDiscountError(false);
      } else {
        setLocalDiscountError(false);
      }
    }
  };

  /**
   * Handles the application of discount codes to the checkout.
   * If handleApplyDiscount prop exists, it calls that function directly.
   * Otherwise, if onApply prop exists, it:
   * - Validates that the discount code is not empty
   * - Checks if the code matches predefined valid codes
   * - Updates local state for discount applied/error status
   * - Calls onApply with the valid code
   * - Resets the discount code input
   *
   * @returns {void}
   */
  const applyDiscount = (): void => {
    if (handleApplyDiscount) {
      handleApplyDiscount();
    } else if (onApply) {
      if (!code.trim()) {
        setLocalDiscountError(true);
        setLocalDiscountApplied(false);
        return;
      }

      // This is just an example validation - in a real app,
      // this would likely be handled by the server
      const isValidCode = ["WELCOME10", "SALE20", "SUMMER25"].includes(
        code.toUpperCase()
      );

      if (isValidCode) {
        onApply(code);
        setLocalDiscountApplied(true);
        setLocalDiscountError(false);
      } else {
        setLocalDiscountError(true);
        setLocalDiscountApplied(false);
      }

      setLocalDiscountCode("");
    }
  };

  // Handle keydown event for Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyDiscount();
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="flex space-x-2">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Enter promo code"
              value={code}
              onChange={handleCodeChange}
              onKeyDown={handleKeyDown}
              className={`pr-8 ${
                error
                  ? "border-red-500 focus-visible:ring-red-500"
                  : applied
                  ? "border-green-500 focus-visible:ring-green-500"
                  : ""
              }`}
            />
            {applied && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Check className="h-4 w-4 text-green-500" />
              </div>
            )}
            {error && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <X className="h-4 w-4 text-red-500" />
              </div>
            )}
          </div>
          <Button
            onClick={applyDiscount}
            className={
              applied
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }
            disabled={applied}
          >
            {applied ? (
              <>
                <Check className="h-4 w-4 mr-1" /> Applied
              </>
            ) : (
              "Apply"
            )}
          </Button>
        </div>

        {error && (
          <div className="flex items-center mt-1 text-red-500 text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            Invalid promo code. Please try again.
          </div>
        )}
      </div>

      <div className="flex items-start p-3 rounded-lg">
        <Gift className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium">Available Promotions</p>
          <div className="grid gap-2 mt-2">
            <div className="flex justify-between items-start text-sm">
              <div>
                <p className="font-medium text-blue-700">WELCOME10</p>
                <p className="text-xs">10% off your first order</p>
              </div>
              <button
                onClick={() => {
                  if (setDiscountCode) {
                    setDiscountCode("WELCOME10");
                  } else {
                    setLocalDiscountCode("WELCOME10");
                  }
                }}
                className="text-xs text-blue-600 hover:underline"
              >
                Apply
              </button>
            </div>
            <div className="flex justify-between items-start text-sm">
              <div>
                <p className="font-medium text-blue-700">SUMMER25</p>
                <p className="text-xs">25% off summer collection</p>
              </div>
              <button
                onClick={() => {
                  if (setDiscountCode) {
                    setDiscountCode("SUMMER25");
                  } else {
                    setLocalDiscountCode("SUMMER25");
                  }
                }}
                className="text-xs text-blue-600 hover:underline"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
