/**
 * Import tax rates by country based on Zonos data
 * Source: https://zonos.com/docs/guides/import-tax-rates-by-country
 */

import { CountryTaxInfo } from "../interfaces";

/**
 * Country tax information including VAT/GST rates, duty rates, and de minimis thresholds
 */
export const countryTaxRates: CountryTaxInfo[] = [
  {
    country: "Australia",
    code: "AUS",
    vatRate: 0.1, // 10% GST
    dutyRate: 0.05, // Average 5%
    deMinimisDuty: 1000, // AUD 1,000 (~USD 650)
    deMinimisVAT: 0, // No GST de minimis
    hasImportFees: true,
  },
  {
    country: "Brazil",
    code: "BRA",
    vatRate: 0.17, // ICMS (varies by state, average 17%)
    dutyRate: 0.35, // High import duties
    deMinimisDuty: 50,
    deMinimisVAT: 50,
    hasImportFees: true,
  },
  {
    country: "Canada",
    code: "CAN",
    vatRate: 0.05, // Federal GST 5% (may vary with provincial taxes)
    dutyRate: 0.08, // Varies by product
    deMinimisDuty: 150, // CAD 20 for duties
    deMinimisVAT: 40, // CAD 40 for taxes
    hasImportFees: true,
  },
  {
    country: "China",
    code: "CHN",
    vatRate: 0.13, // Standard VAT 13%
    dutyRate: 0.2, // Varies significantly
    deMinimisDuty: 50,
    deMinimisVAT: 50,
    hasImportFees: true,
  },
  {
    country: "France",
    code: "FRA",
    vatRate: 0.2, // 20% VAT rate (This is the tax rate)
    dutyRate: 0.04, // 4% customs duty rate (This is the import fee rate)
    deMinimisDuty: 150, // Customs duty exemption threshold (This is the import fee threshold)
    deMinimisVAT: 22, // VAT exemption threshold (This is the tax threshold)
    hasImportFees: true, // Indicates if import fees (customs duty) are applicable
  },
  {
    country: "Germany",
    code: "DEU",
    vatRate: 0.19, // Standard VAT 19%
    dutyRate: 0.04, // Varies by product
    deMinimisDuty: 150, // EUR 150
    deMinimisVAT: 22, // EUR 22
    hasImportFees: true,
  },
  {
    country: "Italy",
    code: "ITA",
    vatRate: 0.22, // Standard VAT 22%
    dutyRate: 0.04, // Varies by product
    deMinimisDuty: 150, // EUR 150
    deMinimisVAT: 22, // EUR 22
    hasImportFees: true,
  },
  {
    country: "Japan",
    code: "JPN",
    vatRate: 0.1, // Consumption tax 10%
    dutyRate: 0.1, // Varies by product
    deMinimisDuty: 100,
    deMinimisVAT: 0, // No de minimis for consumption tax
    hasImportFees: true,
  },
  {
    country: "Mexico",
    code: "MEX",
    vatRate: 0.16, // Standard VAT 16%
    dutyRate: 0.15, // Varies by product
    deMinimisDuty: 50,
    deMinimisVAT: 50,
    hasImportFees: true,
  },
  {
    country: "Russia",
    code: "RUS",
    vatRate: 0.2, // Standard VAT 20%
    dutyRate: 0.15, // Varies by product
    deMinimisDuty: 200, // EUR 200
    deMinimisVAT: 200, // EUR 200
    hasImportFees: true,
  },
  {
    country: "South Korea",
    code: "KOR",
    vatRate: 0.1, // Standard VAT 10%
    dutyRate: 0.08, // Varies by product
    deMinimisDuty: 150,
    deMinimisVAT: 150,
    hasImportFees: true,
  },
  {
    country: "Spain",
    code: "ESP",
    vatRate: 0.21, // Standard VAT 21%
    dutyRate: 0.04, // Varies by product
    deMinimisDuty: 150, // EUR 150
    deMinimisVAT: 22, // EUR 22
    hasImportFees: true,
  },
  {
    country: "United Kingdom",
    code: "GBR",
    vatRate: 0.2, // Standard VAT 20%
    dutyRate: 0.04, // Varies by product
    deMinimisDuty: 135, // GBP 135
    deMinimisVAT: 15, // GBP 15
    hasImportFees: true,
  },
  {
    country: "United States",
    code: "USA",
    vatRate: 0.0, // No federal VAT/GST (varies by state for sales tax)
    dutyRate: 0.03, // Varies widely by product
    deMinimisDuty: 800, // USD 800
    deMinimisVAT: 0, // N/A
    hasImportFees: false,
  },
  // Adding more countries from major trading partners
  {
    country: "India",
    code: "IND",
    vatRate: 0.18, // GST 18% (standard rate)
    dutyRate: 0.28, // Can be very high
    deMinimisDuty: 30,
    deMinimisVAT: 30,
    hasImportFees: true,
  },
  {
    country: "Singapore",
    code: "SGD",
    vatRate: 0.08, // GST 8%
    dutyRate: 0.0, // Duty-free for most items
    deMinimisDuty: 400, // SGD 400
    deMinimisVAT: 400, // SGD 400
    hasImportFees: true,
  },
];
