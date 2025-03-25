"use client";

import { useCurrency } from "@/app/context/CurrencyContext";
import { useProduct } from "@/app/context/productContext";
import { currencies } from "@/lib/constants";

/**
 * A debugging component to visualize currency conversions
 * This can be placed anywhere in the application to check if currency changes are working
 */
export default function CurrencyDebug() {
  const { selectedCurrency } = useCurrency();
  const { convertPrice } = useProduct();

  // Test prices to convert
  const testPrices = [10, 25, 50, 100, 999.99];

  // Find the selected currency details from the constants
  const currencyDetails = currencies.find(
    (c) => c.code === selectedCurrency.code
  );

  return (
    <div className="p-4 my-2 border rounded bg-muted">
      <h3 className="font-bold mb-2">
        Currency Debug ({selectedCurrency.code})
      </h3>
      <p className="text-sm mb-2">Name: {selectedCurrency.name}</p>
      <p className="text-sm mb-2">Symbol: {currencyDetails?.symbol}</p>
      <p className="text-sm mb-2">Rate: {selectedCurrency.rate}</p>
      <div className="grid grid-cols-2 gap-2">
        {testPrices.map((price) => (
          <div key={price} className="flex justify-between">
            <span>${price.toFixed(2)} USD</span>
            <span className="font-bold">
              {convertPrice(price, selectedCurrency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
