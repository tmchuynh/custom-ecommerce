"use client";

import { Currency, CurrencyCode, CurrencyContextType } from "@/lib/interfaces";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  JSX,
} from "react";
import { getTaxInfoByCountryCode } from "./cartContext";
import { currencyCountries } from "@/lib/countriesConstant";

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
  const [lastRatesUpdate, setLastRatesUpdate] = useState<Date | null>(null);

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

  // Currency conversion functions
  const convertAmount = (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): number => {
    const fromRate = getExchangeRate(fromCurrency);
    const toRate = getExchangeRate(toCurrency);
    return (amount / fromRate) * toRate;
  };

  const formatCurrency = (
    amount: number,
    currencyCode: CurrencyCode
  ): string => {
    if (isNaN(amount)) return "$0.00";
    const currency = currencyCountries.find((c) => c.code === currencyCode);
    if (!currency) return `${amount}`;

    return (
      "$" +
      new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)
    );
  };

  // Currency rates management
  const updateExchangeRate = (currencyCode: string, newRate: number): void => {
    // This is a simplified version - in production you'd want to update your backend
    localStorage.setItem(`rate_${currencyCode}`, newRate.toString());
    setLastRatesUpdate(new Date());
  };

  const getExchangeRate = (currencyCode: string): number => {
    const currency = currencyCountries.find((c) => c.code === currencyCode);
    return currency?.rate ?? 1;
  };

  // Currency validation
  const isCurrencySupported = (currencyCode: string): boolean => {
    return currencyCountries.some((c) => c.code === currencyCode);
  };

  const getAvailableCurrencies = (): Currency[] => {
    return currencyCountries.map((c) => ({
      code: c.code,
      name: c.name,
      rate: c.rate,
    }));
  };

  // Currency info
  const getCurrencySymbol = (currencyCode: string): string => {
    const currency = currencyCountries.find((c) => c.code === currencyCode);
    return currency?.symbol ?? currencyCode;
  };

  const getCurrencyName = (currencyCode: string): string => {
    const currency = currencyCountries.find((c) => c.code === currencyCode);
    return currency?.name ?? currencyCode;
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
        convertAmount,
        formatCurrency,
        updateExchangeRate,
        getExchangeRate,
        isCurrencySupported,
        getAvailableCurrencies,
        getCurrencySymbol,
        getCurrencyName,
        lastRatesUpdate,
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
