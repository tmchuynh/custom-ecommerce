"use client";

import { Currency, CurrencyContextType } from "@/lib/interfaces";
import React, {
  createContext,
  useContext,
  useState,
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

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

/**
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
