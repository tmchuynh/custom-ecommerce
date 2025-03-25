"use client";

import { useCart } from "@/app/context/cartContext";
import { ShippingMethod } from "@/lib/types";
import React from "react";

const ShippingMethodSelector: React.FC = () => {
  const {
    selectedShippingMethod,
    updateShippingMethod,
    calculateShippingCost,
  } = useCart();

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
        <option value="standard">
          Standard Shipping (${calculateShippingCost("standard").toFixed(2)})
        </option>
        <option value="express">
          Express Shipping (${calculateShippingCost("express").toFixed(2)})
        </option>
        <option value="overnight">
          Overnight Shipping (${calculateShippingCost("overnight").toFixed(2)})
        </option>
      </select>
    </div>
  );
};

export default ShippingMethodSelector;
