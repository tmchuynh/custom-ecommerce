"use client";

import { useCart } from "@/app/context/cartContext";
import { ShippingMethod } from "@/lib/types";
import React, { useEffect } from "react";

const ShippingMethodSelector: React.FC = () => {
  const { selectedShippingMethod, updateShippingMethod } = useCart();

  // Get the current hour (local time)
  const now = new Date();
  const currentHour = now.getHours();

  // Determine if specific shipping methods should be disabled
  const isOvernightDisabled = currentHour >= 21; // After 9 PM
  const isSameDayDisabled = currentHour >= 14; // After 2 PM

  // If the currently selected shipping method becomes invalid,
  // automatically update to a fallback option (here, "standard")
  useEffect(() => {
    if (selectedShippingMethod === "overnight" && isOvernightDisabled) {
      updateShippingMethod("standard");
    }
    if (selectedShippingMethod === "sameDay" && isSameDayDisabled) {
      updateShippingMethod("standard");
    }
  }, [
    selectedShippingMethod,
    isOvernightDisabled,
    isSameDayDisabled,
    updateShippingMethod,
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
        <option value="express">Expedited</option>
        <option value="twoDay">Two-Day</option>
        <option value="overnight" disabled={isOvernightDisabled}>
          Overnight {isOvernightDisabled && "(not available after 9pm)"}
        </option>
        <option value="sameDay" disabled={isSameDayDisabled}>
          Same-Day {isSameDayDisabled && "(not available after 2pm)"}
        </option>
      </select>
    </div>
  );
};

export default ShippingMethodSelector;
