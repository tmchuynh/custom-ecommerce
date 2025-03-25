"use client";

import { Currency, CurrencyContextType } from "@/lib/interfaces";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  JSX,
} from "react";

/**
 * Context for managing the current currency.
 *
 * Provides a way to access and update the selected currency throughout the application.
 */
const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

/**
 * Provides the currency context to the application.
 *
 * This provider manages the currently selected currency and makes it available to all components within its scope.
 * It uses React's context API to avoid prop drilling and allows components to easily access and update the currency.
 * Currency selection is persisted in localStorage to maintain selection across page navigations.
 *
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered within the CurrencyProvider.
 * @returns {JSX.Element} A CurrencyContext.Provider component that wraps the children.
 */
export const CurrencyProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>({
    code: "USD",
    name: "US Dollar",
    rate: 1,
  });

  // Load saved currency preference on component mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem("selectedCurrency");
    if (savedCurrency) {
      try {
        const parsedCurrency = JSON.parse(savedCurrency);
        // Verify that the saved currency has all required properties
        if (
          parsedCurrency &&
          parsedCurrency.code &&
          parsedCurrency.name &&
          parsedCurrency.rate
        ) {
          setSelectedCurrency(parsedCurrency);
        }
      } catch (error) {
        console.error("Error parsing saved currency:", error);
        // If there's an error, fall back to default (USD)
        localStorage.removeItem("selectedCurrency");
      }
    }
  }, []);

  // Save currency preference whenever it changes
  useEffect(() => {
    localStorage.setItem("selectedCurrency", JSON.stringify(selectedCurrency));
  }, [selectedCurrency]);

  // Custom setCurrency function that handles both selectedCurrency and currency
  const handleSetCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency: handleSetCurrency,
        currency: selectedCurrency,
        setCurrency: handleSetCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

/**
 * A hook to access the currency context.
 *
 * @returns {CurrencyContextType} The currency context.
 * @throws {Error} If the hook is used outside of a CurrencyProvider.
 */
export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

/**
 * Formats a price according to a given currency.
 *
 * @param {number|string} price - The price to format.
 * @param {Currency} currency - The currency to use for formatting.
 * @returns {string} The formatted price string with currency symbol.
 */
export const formatPriceWithCurrency = (
  price: number | string,
  currency: Currency
): string => {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  const convertedPrice = numericPrice * currency.rate;

  // Format based on currency code
  switch (currency.code) {
    case "JPY":
      // JPY typically doesn't use decimal places
      return `¥${Math.round(convertedPrice)}`;
    case "EUR":
      // EUR uses € symbol and may use comma as decimal separator in some locales
      return `€${convertedPrice.toFixed(2).replace(".", ",")}`;
    case "GBP":
      return `£${convertedPrice.toFixed(2)}`;
    case "CAD":
      return `C$${convertedPrice.toFixed(2)}`;
    case "AUD":
      return `A$${convertedPrice.toFixed(2)}`;
    case "USD":
    default:
      return `$${convertedPrice.toFixed(2)}`;
  }
};
