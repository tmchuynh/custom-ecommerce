"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  JSX,
} from "react";
import { countryTaxRates } from "@/lib/constants/taxRatesConstant";
import { CurrencyContextType } from "@/lib/contextTypes";
import { CountryTaxInfo } from "@/lib/interfaces";
import { Currency, CurrencyCode } from "@/lib/types";
import { currencyCountries } from "@/lib/constants/countriesConstant";

/**
 * Context for managing the current currency.
 *
 * Provides a way to access and update the selected currency throughout the application.
 */
const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

/**
 * Provider component for managing currency-related functionality throughout the application.
 * Handles currency selection, conversion, formatting, and import tax calculations.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components that will have access to the currency context
 *
 * @returns {JSX.Element} Provider component that wraps children with currency context
 *
 * @example
 * ```tsx
 * <CurrencyProvider>
 *   <App />
 * </CurrencyProvider>
 * ```
 *
 * Features:
 * - Currency selection and persistence
 * - Import tax calculations for different countries
 * - Currency conversion and formatting
 * - Exchange rate management
 * - Currency validation and information
 *
 * State:
 * - selectedCurrency: Current selected currency with code, name and rate
 * - lastRatesUpdate: Timestamp of the last exchange rates update
 *
 * Context Values:
 * @property {Currency} selectedCurrency - Currently selected currency
 * @property {Function} setSelectedCurrency - Function to update selected currency
 * @property {Currency} currency - Alias for selectedCurrency (legacy support)
 * @property {Function} setCurrency - Alias for setSelectedCurrency (legacy support)
 * @property {Function} calculateImportFee - Calculates import fees for given value and country
 * @property {Function} getImportTaxBreakdown - Provides detailed tax breakdown
 * @property {Function} calculateImportTaxes - Calculates duty and VAT charges
 * @property {Function} convertAmount - Converts amounts between currencies
 * @property {Function} formatCurrency - Formats currency amounts
 * @property {Function} updateExchangeRate - Updates exchange rate for a currency
 * @property {Function} getExchangeRate - Retrieves exchange rate for a currency
 * @property {Function} isCurrencySupported - Checks if currency is supported
 * @property {Function} getAvailableCurrencies - Lists all available currencies
 * @property {Function} getCurrencySymbol - Gets symbol for a currency
 * @property {Function} getCurrencyName - Gets name for a currency
 * @property {Date | null} lastRatesUpdate - Timestamp of last rates update
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

  /**
   * Sets the selected currency for the application.
   * @param currency - The currency object to be set as the new selected currency
   * @returns void
   */
  const handleSetCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
  };

  /**
   * Calculates import taxes (duty and VAT/GST) for a given subtotal and country
   *
   * @param subtotal - The subtotal amount to calculate taxes on
   * @param country - The destination country code
   * @returns An object containing:
   *  - dutyAmount: The calculated duty amount
   *  - vatAmount: The calculated VAT/GST amount
   *  - totalImportCharges: Sum of duty and VAT charges
   *  - appliedDuty: Boolean indicating if duty was applied
   *  - appliedVAT: Boolean indicating if VAT was applied
   *
   * @remarks
   * - Returns no import taxes for USA or unknown countries
   * - Duty is only applied if subtotal exceeds country's de minimis duty threshold
   * - VAT/GST is only applied if subtotal exceeds country's de minimis VAT threshold
   */
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

  /**
   * Calculates the import fee for a given value and country code.
   *
   * @param value - The monetary value to calculate import fees for
   * @param countryCode - The two-letter ISO country code
   * @returns The total import charges calculated for the given parameters
   */
  const calculateImportFee = (value: number, countryCode: string): number => {
    const { totalImportCharges } = calculateImportTaxes(value, countryCode);
    return totalImportCharges;
  };

  /**
   * Calculates the breakdown of import taxes for a given subtotal and country.
   *
   * @param subtotal - The base amount before taxes and duties
   * @param country - The country for which to calculate import taxes
   *
   * @returns An object containing:
   * - duty: The calculated duty amount
   * - vat: The calculated VAT amount
   * - total: The sum of all import charges
   * - subtotal: The original amount before taxes
   * - grandTotal: The final amount including subtotal and all import charges
   */
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
  /**
   * Converts a monetary amount from one currency to another using exchange rates.
   *
   * @param {number} amount - The monetary amount to convert
   * @param {string} fromCurrency - The currency code to convert from (e.g., 'USD', 'EUR')
   * @param {string} toCurrency - The currency code to convert to (e.g., 'USD', 'EUR')
   * @returns {number} The converted amount in the target currency
   *
   * @example
   * // Convert 100 USD to EUR
   * const eurAmount = convertAmount(100, 'USD', 'EUR');
   */
  const convertAmount = (
    amount: number,
    fromCurrency: string,
    toCurrency: string
  ): number => {
    const fromRate = getExchangeRate(fromCurrency);
    const toRate = getExchangeRate(toCurrency);
    return (amount / fromRate) * toRate;
  };

  /**
   * Formats a numeric amount into a currency string based on the provided currency code.
   *
   * @param amount - The numeric amount to format
   * @param currencyCode - The ISO 4217 currency code (e.g., 'USD', 'EUR')
   * @returns A formatted currency string with the appropriate symbol and decimal places
   *
   * @example
   * formatCurrency(123.45, 'USD') // Returns "$123.45"
   * formatCurrency(NaN, 'EUR') // Returns "$0.00"
   *
   * @remarks
   * - Returns "$0.00" if the amount is NaN
   * - Returns the raw amount as string if currency code is not found
   * - Always formats with exactly 2 decimal places
   * - Currently prepends "$" regardless of currency type
   */
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
  /**
   * Updates the exchange rate for a specific currency and stores it in localStorage
   * @param currencyCode - The code representing the currency (e.g., "USD", "EUR")
   * @param newRate - The new exchange rate value to be set
   * @returns void
   *
   * @remarks
   * This is a simplified implementation. In a production environment,
   * this should be synchronized with a backend service.
   */
  const updateExchangeRate = (currencyCode: string, newRate: number): void => {
    // This is a simplified version - in production you'd want to update your backend
    localStorage.setItem(`rate_${currencyCode}`, newRate.toString());
    setLastRatesUpdate(new Date());
  };

  /**
   * Retrieves the exchange rate for a given currency code
   * @param currencyCode - The three-letter currency code (e.g., 'USD', 'EUR')
   * @returns The exchange rate as a number, defaults to 1 if currency not found
   */
  const getExchangeRate = (currencyCode: string): number => {
    const currency = currencyCountries.find((c) => c.code === currencyCode);
    return currency?.rate ?? 1;
  };

  // Currency validation
  /**
   * Checks if a given currency code is supported by the application.
   * @param {string} currencyCode - The ISO 4217 currency code to validate
   * @returns {boolean} True if the currency code exists in the supported currencies list, false otherwise
   */
  const isCurrencySupported = (currencyCode: string): boolean => {
    return currencyCountries.some((c) => c.code === currencyCode);
  };

  /**
   * Retrieves an array of available currencies.
   * Maps through currencyCountries to create a list of Currency objects.
   *
   * @returns {Currency[]} An array of Currency objects containing code, name, and rate.
   */
  const getAvailableCurrencies = (): Currency[] => {
    return currencyCountries.map((c) => ({
      code: c.code,
      name: c.name,
      rate: c.rate,
    }));
  };

  // Currency info
  /**
   * Returns the currency symbol for a given currency code.
   * @param currencyCode - The ISO 4217 currency code (e.g., 'USD', 'EUR', 'GBP')
   * @returns The currency symbol (e.g., '$', '€', '£') if found, otherwise returns the original currency code
   * @example
   * getCurrencySymbol('USD') // Returns '$'
   * getCurrencySymbol('EUR') // Returns '€'
   * getCurrencySymbol('XYZ') // Returns 'XYZ'
   */
  const getCurrencySymbol = (currencyCode: string): string => {
    const currency = currencyCountries.find((c) => c.code === currencyCode);
    return currency?.symbol ?? currencyCode;
  };

  /**
   * Retrieves the full name of a currency based on its code
   * @param currencyCode - The ISO 4217 currency code (e.g., "USD", "EUR")
   * @returns The full name of the currency if found, otherwise returns the original currency code
   * @example
   * getCurrencyName("USD") // returns "United States Dollar"
   * getCurrencyName("XYZ") // returns "XYZ"
   */
  const getCurrencyName = (currencyCode: string): string => {
    const currency = currencyCountries.find((c) => c.code === currencyCode);
    return currency?.name ?? currencyCode;
  };

  /**
   * Retrieves tax information for a given country code.
   *
   * @param countryCode - The ISO country code to look up tax information for
   * @returns {CountryTaxInfo} An object containing tax rates and import fee information
   *                          for the specified country. Returns default US tax info if
   *                          country code is not found.
   *
   * @example
   * const taxInfo = getTaxInfoByCountryCode('GBR');
   * // Returns tax info for United Kingdom
   *
   * @remarks
   * The function normalizes country codes to uppercase for comparison.
   * If the country code is not found, returns a default object with zero rates.
   */
  const getTaxInfoByCountryCode = (countryCode: string): CountryTaxInfo => {
    // Normalize the country code for comparison
    const normalizedCode = countryCode.toUpperCase();

    const taxInfo = countryTaxRates.find(
      (country) => country.code.toUpperCase() === normalizedCode
    ) || {
      country: "Unknown",
      code: "UNKNOWN",
      vatRate: 0.0,
      dutyRate: 0.0,
      deMinimisDuty: 0,
      deMinimisVAT: 0,
      hasImportFees: false,
    };

    console.log("taxInfo", taxInfo);

    // Find the country tax info
    return taxInfo;
  };

  /**
   * Retrieves tax information based on a country's full name.
   *
   * @param countryName - The full name of the country (e.g., "United States", "United Kingdom")
   * @returns Tax information for the country if found, undefined otherwise
   *
   * @example
   * getTaxInfoByCountryName("United Kingdom") // Returns UK tax info
   */
  const getTaxInfoByCountryName = (
    countryName: string
  ): CountryTaxInfo | undefined => {
    const normalizedName = countryName.toLowerCase();
    return countryTaxRates.find(
      (country) => country.country.toLowerCase() === normalizedName
    );
  };

  /**
   * Retrieves tax information based on a currency code.
   *
   * @param currencyCode - The ISO currency code (e.g., "USD", "EUR")
   * @returns Tax information for the country using that currency if found, undefined otherwise
   *
   * @example
   * getTaxInfoByCurrencyCode("GBP") // Returns UK tax info
   */
  const getTaxInfoByCurrencyCode = (
    currencyCode: string
  ): CountryTaxInfo | undefined => {
    const currency = currencyCountries.find((c) => c.code === currencyCode);
    if (!currency || !currency.countries[0]) return undefined;
    return getTaxInfoByCountryCode(currency.countries[0].value);
  };

  /**
   * Retrieves tax information based on a currency's full name.
   *
   * @param currencyName - The full name of the currency (e.g., "US Dollar", "Euro")
   * @returns Tax information for the country using that currency if found, undefined otherwise
   *
   * @example
   * getTaxInfoByCurrencyName("British Pound Sterling") // Returns UK tax info
   */
  const getTaxInfoByCurrencyName = (
    currencyName: string
  ): CountryTaxInfo | undefined => {
    const currency = currencyCountries.find(
      (c) => c.name.toLowerCase() === currencyName.toLowerCase()
    );
    if (!currency || !currency.countries[0]) return undefined;
    return getTaxInfoByCountryCode(currency.countries[0].value);
  };

  /**
   * Retrieves tax information based on a Currency object.
   *
   * @param currency - A Currency object containing code, name, and rate
   * @returns Tax information for the country using that currency if found, undefined otherwise
   *
   * @example
   * getTaxInfoByCurrency({ code: "GBP", name: "British Pound", rate: 0.79 })
   */
  const getTaxInfoByCurrency = (
    currency: Currency
  ): CountryTaxInfo | undefined => {
    return getTaxInfoByCurrencyCode(currency.code);
  };

  /**
   * Retrieves tax information based on a country identifier (code or name).
   *
   * @param country - Either a country code or full name
   * @returns Tax information for the country if found, undefined otherwise
   *
   * @example
   * getTaxInfoByCountry("GB") // Returns UK tax info
   * getTaxInfoByCountry("United Kingdom") // Returns UK tax info
   */
  const getTaxInfoByCountry = (country: string): CountryTaxInfo | undefined => {
    // Try as country code first
    const byCode = getTaxInfoByCountryCode(country);
    if (byCode && byCode.code !== "UNKNOWN") return byCode;

    // If not found, try as country name
    return getTaxInfoByCountryName(country);
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
        getTaxInfoByCountryCode,
        getTaxInfoByCountryName,
        getTaxInfoByCurrencyCode,
        getTaxInfoByCurrencyName,
        getTaxInfoByCurrency,
        getTaxInfoByCountry,
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
