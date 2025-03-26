"use client";

import { useCart } from "@/app/context/cartContext";
import { ShippingMethod } from "@/lib/types";
import React, { useEffect } from "react";

const ShippingMethodSelector: React.FC<{ shippingCountry?: string }> = ({
  shippingCountry = "USA",
}) => {
  const { selectedShippingMethod, updateShippingMethod } = useCart();

  // Get the current hour (local time)
  const now = new Date();
  const currentHour = now.getHours();

  // Determine if specific shipping methods should be disabled
  const isOvernightDisabled = currentHour >= 21; // After 9 PM
  const isSameDayDisabled = currentHour >= 14; // After 2 PM

  // Check if the shipping address is international (non-US)
  const isInternational = shippingCountry !== "USA" && shippingCountry !== "";

  // Disable premium shipping methods for international addresses
  const isTwoDayDisabled = isInternational;
  const isOvernightDisabledFinal = isOvernightDisabled || isInternational;
  const isSameDayDisabledFinal = isSameDayDisabled || isInternational;

  // If the currently selected shipping method becomes invalid,
  // automatically update to a fallback option (here, "standard")
  useEffect(() => {
    // Check if current shipping method is invalid for the current conditions
    const isCurrentMethodInvalid =
      (selectedShippingMethod === "overnight" && isOvernightDisabledFinal) ||
      (selectedShippingMethod === "sameDay" && isSameDayDisabledFinal) ||
      (selectedShippingMethod === "twoDay" && isTwoDayDisabled);

    // Update to standard shipping if needed
    if (isCurrentMethodInvalid) {
      updateShippingMethod("standard");
    }
  }, [
    selectedShippingMethod,
    updateShippingMethod,
    // Use a boolean for the combined conditions to maintain array size
    isOvernightDisabledFinal && selectedShippingMethod === "overnight",
    isSameDayDisabledFinal && selectedShippingMethod === "sameDay",
    isTwoDayDisabled && selectedShippingMethod === "twoDay",
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateShippingMethod(e.target.value as ShippingMethod);
  };

  return (
    <div className="shipping-method-selector">
      <label
        htmlFor="shipping-method"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Shipping Method
      </label>
      <select
        id="shipping-method"
        value={selectedShippingMethod}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="standard">Standard Ground</option>
        <option value="economy">Economy</option>
        <option value="expedited">Expedited</option>
        <option value="twoDay" disabled={isTwoDayDisabled}>
          Two-Day{" "}
          {isTwoDayDisabled && "(not available for international shipping)"}
        </option>
        <option value="overnight" disabled={isOvernightDisabledFinal}>
          Overnight {isOvernightDisabled && "(not available after 9pm)"}
          {!isOvernightDisabled &&
            isInternational &&
            "(not available for international shipping)"}
        </option>
        <option value="sameDay" disabled={isSameDayDisabledFinal}>
          Same-Day {isSameDayDisabled && "(not available after 2pm)"}
          {!isSameDayDisabled &&
            isInternational &&
            "(not available for international shipping)"}
        </option>
      </select>
      {isInternational &&
        (selectedShippingMethod === "twoDay" ||
          selectedShippingMethod === "overnight" ||
          selectedShippingMethod === "sameDay") && (
          <p className="text-amber-600 text-xs mt-1">
            Premium shipping options are not available for international
            addresses.
          </p>
        )}
    </div>
  );
};

export default ShippingMethodSelector;
