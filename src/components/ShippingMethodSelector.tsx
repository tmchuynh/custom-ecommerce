"use client";

import { useCart } from "@/app/context/cartContext";
import { ShippingMethod } from "@/lib/types";
import React, { useEffect, useState } from "react";

const ShippingMethodSelector: React.FC<{ shippingCountry?: string }> = ({
  shippingCountry = "USA",
}) => {
  const { selectedShippingMethod, updateShippingMethod } = useCart();
  // Track the previous shipping country to handle changes
  const [prevShippingCountry, setPrevShippingCountry] =
    useState(shippingCountry);

  // Get the current hour (local time)
  const now = new Date();
  const currentHour = now.getHours();

  // Determine if specific shipping methods should be disabled
  const isOvernightDisabled = currentHour >= 21 || currentHour <= 5; // After 9 PM
  const isSameDayDisabled = currentHour >= 14; // After 2 PM

  // Check if the shipping address is international (non-US)
  const isInternational = shippingCountry !== "USA" && shippingCountry !== "";

  // Disable premium shipping methods for international addresses
  const isTwoDayDisabled = isInternational;
  const isOvernightDisabledFinal = isOvernightDisabled || isInternational;
  const isSameDayDisabledFinal = isSameDayDisabled || isInternational;

  // Handle shipping country changes
  useEffect(() => {
    if (prevShippingCountry !== shippingCountry) {
      setPrevShippingCountry(shippingCountry);

      // Check if current method is invalid with the new country
      const isCurrentMethodInvalid =
        (selectedShippingMethod === "overnight" && isOvernightDisabledFinal) ||
        (selectedShippingMethod === "sameDay" && isSameDayDisabledFinal) ||
        (selectedShippingMethod === "twoDay" && isTwoDayDisabled);

      if (isCurrentMethodInvalid) {
        updateShippingMethod("standard");
      }
    }
  }, [
    shippingCountry,
    prevShippingCountry,
    selectedShippingMethod,
    updateShippingMethod,
    isOvernightDisabledFinal,
    isSameDayDisabledFinal,
    isTwoDayDisabled,
  ]);

  // Original useEffect to handle invalid shipping methods but without shippingCountry dependency
  useEffect(() => {
    const isCurrentMethodInvalid =
      (selectedShippingMethod === "overnight" && isOvernightDisabledFinal) ||
      (selectedShippingMethod === "sameDay" && isSameDayDisabledFinal) ||
      (selectedShippingMethod === "twoDay" && isTwoDayDisabled);

    if (isCurrentMethodInvalid) {
      updateShippingMethod("standard");
    }
  }, [
    selectedShippingMethod,
    updateShippingMethod,
    isOvernightDisabledFinal,
    isSameDayDisabledFinal,
    isTwoDayDisabled,
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateShippingMethod(e.target.value as ShippingMethod);
  };

  // Generate option display text based on disabled status
  const getOptionText = (
    method: string,
    baseText: string,
    isDisabled: boolean,
    timeMessage: string,
    intlMessage: string
  ) => {
    if (!isDisabled) return baseText;

    if (isInternational) return `${baseText} ${intlMessage}`;
    return `${baseText} ${timeMessage}`;
  };

  return (
    <div className="shipping-method-selector">
      <label
        htmlFor="shipping-method"
        className="block text-sm font-medium my-2 ml-2"
      >
        Shipping Method {isInternational ? `(to ${shippingCountry})` : ""}
      </label>
      <select
        id="shipping-method"
        value={selectedShippingMethod}
        onChange={handleChange}
        className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm bg-background"
      >
        <option value="standard">
          Standard Ground {isInternational && "(International)"}
        </option>
        <option value="economy">
          Economy {isInternational && "(International)"}
        </option>
        <option value="expedited">
          Expedited {isInternational && "(International)"}
        </option>
        <option value="twoDay" disabled={isTwoDayDisabled}>
          Two-Day{" "}
          {isTwoDayDisabled && "(not available for international shipping)"}
        </option>
        <option value="overnight" disabled={isOvernightDisabledFinal}>
          {getOptionText(
            "overnight",
            "Overnight",
            isOvernightDisabledFinal,
            "(not available after 9pm)",
            "(not available for international shipping)"
          )}
        </option>
        <option value="sameDay" disabled={isSameDayDisabledFinal}>
          {getOptionText(
            "sameDay",
            "Same-Day",
            isSameDayDisabledFinal,
            "(not available after 2pm)",
            "(not available for international shipping)"
          )}
        </option>
      </select>
      {isInternational && (
        <p className="text-destructive text-xs mt-3 mx-2">
          International shipping to {shippingCountry} may include import fees
          and taxes.
        </p>
      )}
      {isInternational &&
        (selectedShippingMethod === "twoDay" ||
          selectedShippingMethod === "overnight" ||
          selectedShippingMethod === "sameDay") && (
          <p className="text-destructive text-xs mt-3 mx-2">
            Premium shipping options are not available for international
            addresses.
          </p>
        )}
    </div>
  );
};

export default ShippingMethodSelector;
