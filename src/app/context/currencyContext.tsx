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
import { getTaxInfoByCountryCode } from "./cartContext";

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

  const calculateImportTaxes = (subtotal: number, country: string) => {
    // Get country tax info
    const countryInfo = getTaxInfoByCountryCode(country);

    // Default values
    const result = {
      dutyAmount: 0,
      vatAmount: 0,
      totalImportCharges: 0,
      appliedDuty: false,
      appliedVAT: false,
    };

    // If USA or unknown country, return default (no import taxes)
    if (countryInfo.code === "USA" || countryInfo.code === "UNKNOWN") {
      return result;
    }

    // Calculate duty if above de minimis threshold
    if (subtotal > countryInfo.deMinimisDuty) {
      result.dutyAmount = subtotal * countryInfo.dutyRate;
      result.appliedDuty = true;
    }

    // Calculate VAT/GST if above de minimis threshold
    if (subtotal > countryInfo.deMinimisVAT) {
      result.vatAmount = subtotal * countryInfo.vatRate;
      result.appliedVAT = true;
    }

    // Calculate total import charges
    result.totalImportCharges = result.dutyAmount + result.vatAmount;

    return result;
  };

  const calculateImportFee = (value: number, countryCode: string): number => {
    const { totalImportCharges } = calculateImportTaxes(value, countryCode);
    return totalImportCharges;
  };

  const getImportTaxBreakdown = (subtotal: number, country: string) => {
    const { dutyAmount, vatAmount, totalImportCharges } = calculateImportTaxes(
      subtotal,
      country
    );

    return {
      duty: dutyAmount,
      vat: vatAmount,
      total: totalImportCharges,
      subtotal: subtotal,
      grandTotal: subtotal + totalImportCharges,
    };
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency: handleSetCurrency,
        currency: selectedCurrency,
        setCurrency: handleSetCurrency,
        calculateImportFee,
        getImportTaxBreakdown,
        calculateImportTaxes,
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
