"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  JSX,
  useCallback,
} from "react";
// import { countryTaxRates } from "@/lib/constants/taxRatesConstant"; // Commented out as it's not used here
import { CurrencyContextType } from "@/lib/contextTypes";
// import { CountryTaxInfo } from "@/lib/interfaces"; // Commented out as it's not used here
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

export const CurrencyProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(() => {
    // Load saved currency from localStorage on initial load
    if (typeof window !== "undefined") {
      const savedCurrency = localStorage.getItem("selectedCurrency");
      if (savedCurrency) {
        try {
          const parsedCurrency = JSON.parse(savedCurrency);
          if (parsedCurrency?.code && parsedCurrency?.name) {
            return {
              ...parsedCurrency,
              rate: parsedCurrency.rate || 1,
              symbol:
                parsedCurrency.symbol ||
                currencyCountries.find((c) => c.code === parsedCurrency.code)
                  ?.symbol ||
                "$",
            };
          }
        } catch (error) {
          console.error("Error parsing saved currency:", error);
          localStorage.removeItem("selectedCurrency");
        }
      }
    }
    return { code: "USD", name: "US Dollar", rate: 1, symbol: "$" }; // Default
  });

  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>(
    {}
  );
  const [lastRatesUpdate, setLastRatesUpdate] = useState<Date | null>(null);
  const [loadingRates, setLoadingRates] = useState(true);
  const [errorRates, setErrorRates] = useState<string | null>(null);

  // Fetch exchange rates from API
  useEffect(() => {
    const fetchRates = async () => {
      setLoadingRates(true);
      setErrorRates(null);
      const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY;
      if (!apiKey) {
        console.warn("ExchangeRate API key not found. Using fallback rates.");
        setErrorRates(
          "API key missing. Currency conversion will use default rates."
        );
        // Fallback: Use rates from currencyCountries if API fails or key is missing
        const fallbackRates = currencyCountries.reduce((acc, curr) => {
          acc[curr.code] = curr.rate || 1; // Ensure rate is a number
          return acc;
        }, {} as { [key: string]: number });
        setExchangeRates(fallbackRates);
        setLastRatesUpdate(new Date()); // Indicate rates (even if fallback) are set
        setLoadingRates(false);

        // Update selected currency with fallback rate
        const fallbackSelectedRate = fallbackRates[selectedCurrency.code] || 1;
        setSelectedCurrency((prev) => ({
          ...prev,
          rate: fallbackSelectedRate,
        }));
        return;
      }

      try {
        const response = await fetch(
          `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch exchange rates: ${response.statusText} (status: ${response.status})`
          );
        }
        const data = await response.json();
        if (data.result === "success" && data.conversion_rates) {
          setExchangeRates(data.conversion_rates);
          setLastRatesUpdate(new Date(data.time_last_update_unix * 1000));
          // Update selected currency rate based on newly fetched rates
          const currentSelectedCode = selectedCurrency.code; // Use a stable value
          const newRateForSelected = data.conversion_rates[currentSelectedCode];

          if (newRateForSelected) {
            setSelectedCurrency((prev) => ({
              ...prev,
              rate: newRateForSelected,
            }));
          } else if (currentSelectedCode === "USD") {
            setSelectedCurrency((prev) => ({ ...prev, rate: 1 })); // USD base rate is 1
          } else {
            // If the selected currency is not in the new rates (should not happen with 'USD' base)
            console.warn(
              `Rate for ${currentSelectedCode} not found in new rates. Keeping existing rate.`
            );
          }
        } else {
          throw new Error(data.error_type || "Invalid API response structure");
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setErrorRates(
          error instanceof Error
            ? error.message
            : "Unknown error fetching rates."
        );
        // Fallback: Use rates from currencyCountries if API fails
        const fallbackRates = currencyCountries.reduce((acc, curr) => {
          acc[curr.code] = curr.rate || 1; // Ensure rate is a number
          return acc;
        }, {} as { [key: string]: number });
        setExchangeRates(fallbackRates);
        const fallbackSelectedRate = fallbackRates[selectedCurrency.code] || 1;
        setSelectedCurrency((prev) => ({
          ...prev,
          rate: fallbackSelectedRate,
        }));
      } finally {
        setLoadingRates(false);
      }
    };

    fetchRates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Removed selectedCurrency.code from dependency array to prevent re-fetching on currency change if rates are already loaded

  // Update localStorage when selectedCurrency changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "selectedCurrency",
        JSON.stringify(selectedCurrency)
      );
    }
  }, [selectedCurrency]);

  const updateCurrency = useCallback(
    (currencyCode: CurrencyCode) => {
      const newCurrencyDetails = currencyCountries.find(
        (c) => c.code === currencyCode
      );
      if (newCurrencyDetails) {
        const newRate =
          exchangeRates[currencyCode] || newCurrencyDetails.rate || 1; // Use fetched rate if available
        setSelectedCurrency({
          code: newCurrencyDetails.code,
          name: newCurrencyDetails.name,
          rate: newRate,
          symbol: newCurrencyDetails.symbol,
        });
      } else {
        console.warn(
          `Currency code ${currencyCode} not found in currencyCountries.`
        );
        // Optionally, fall back to USD or keep current if new code is invalid
        if (currencyCode === "USD") {
          setSelectedCurrency({
            code: "USD",
            name: "US Dollar",
            rate: exchangeRates["USD"] || 1,
            symbol: "$",
          });
        }
      }
    },
    [exchangeRates]
  );

  const convertPrice = useCallback(
    (priceInUSD: number, toCurrencyCode?: CurrencyCode) => {
      const targetCurrency = toCurrencyCode || selectedCurrency.code;
      const rate = exchangeRates[targetCurrency];
      if (typeof rate === "number") {
        return priceInUSD * rate;
      }
      // Fallback if rate not found (e.g., during initial load or error)
      const fallbackCurrencyDetails = currencyCountries.find(
        (c) => c.code === targetCurrency
      );
      return priceInUSD * (fallbackCurrencyDetails?.rate || 1);
    },
    [exchangeRates, selectedCurrency.code]
  );

  const formatPrice = useCallback(
    (priceInUSD: number, currencyCode?: CurrencyCode) => {
      const targetCurrencyCode = currencyCode || selectedCurrency.code;
      const convertedPrice = convertPrice(priceInUSD, targetCurrencyCode);
      const currencyInfo =
        currencyCountries.find((c) => c.code === targetCurrencyCode) ||
        selectedCurrency;

      try {
        return new Intl.NumberFormat(undefined, {
          // Use locale-sensitive formatting
          style: "currency",
          currency: targetCurrencyCode,
          currencyDisplay: "symbol", // Use symbol like $, €, etc.
        }).format(convertedPrice);
      } catch (e) {
        // Fallback for unsupported currency codes by Intl.NumberFormat
        console.warn(
          `Formatting for ${targetCurrencyCode} failed, using fallback:`,
          e
        );
        return `${currencyInfo.symbol}${convertedPrice.toFixed(2)}`;
      }
    },
    [convertPrice, selectedCurrency]
  );

  const value = {
    selectedCurrency,
    updateCurrency,
    exchangeRates,
    lastRatesUpdate,
    loadingRates,
    errorRates,
    convertPrice, // Added convertPrice to context
    formatPrice, // Added formatPrice to context
    // --- Tax related properties (commented out as per previous discussion if not immediately needed) ---
    // selectedCountryForTax: "US", // Default or from user profile
    // setSelectedCountryForTax: () => {}, // Placeholder
    // getTaxRate: (countryCode: string) => {
    //   const countryInfo = countryTaxRates.find(
    //     (ct: CountryTaxInfo) => ct.countryCode === countryCode
    //   );
    //   return countryInfo ? countryInfo.taxRate : 0; // Default to 0 if not found
    // },
    // calculateTotalPriceWithTax: (price: number, countryCode: string) => {
    //   const taxRate = getTaxRate(countryCode);
    //   return price * (1 + taxRate);
    // },
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
