// Address Validation Test Examples
// ===============================

import {
  getValidCountries,
  getValidStates,
  isValidCountry,
  isValidPostalCode,
  isValidState,
  validateAddressEnhanced,
  validateAddressField,
  validateAndNormalizeAddress,
} from "../utils/validate";

import { ValidatedAddress } from "../interfaces/address";

import { formatPostalCode, toTitleCase } from "../utils/format";

// Test addresses for different countries
const testAddresses = {
  validUS: {
    address: "123 Main Street",
    address2: "Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "US",
  },
  validCanada: {
    address: "456 Maple Avenue",
    city: "Toronto",
    state: "ON",
    postalCode: "M5V 3A8",
    country: "CA",
  },
  validUK: {
    address: "789 Baker Street",
    city: "London",
    state: "England",
    postalCode: "W1U 6TU",
    country: "GB",
  },
  validAustralia: {
    address: "321 Collins Street",
    city: "Melbourne",
    state: "VIC",
    postalCode: "3000",
    country: "AU",
  },
  invalidAddress: {
    address: "123", // Too short
    city: "", // Missing
    state: "InvalidState",
    postalCode: "InvalidZip",
    country: "InvalidCountry",
  },
  edgeCases: {
    address: "1600 Pennsylvania Avenue NW",
    address2: "",
    city: "washington", // Lowercase (should be normalized)
    state: "dc", // Lowercase (should be normalized)
    postalCode: "20500-0003", // Extended ZIP
    country: "us", // Lowercase (should be normalized)
  },
};

// Test postal codes for different countries
const testPostalCodes = {
  US: {
    valid: ["10001", "90210", "20500", "12345-6789"],
    invalid: ["1234", "ABCDE", "123456", "12-345"],
  },
  CA: {
    valid: ["M5V 3A8", "K1A 0A6", "H3Z 2Y7", "V6B 1A1"],
    invalid: ["12345", "M5V", "M5V3A8", "Z1Z 1Z1"],
  },
  GB: {
    valid: ["W1U 6TU", "M1 1AA", "B33 8TH", "SW1A 1AA"],
    invalid: ["12345", "W1U", "INVALID", "123 ABC"],
  },
  AU: {
    valid: ["3000", "2000", "4000", "6000"],
    invalid: ["300", "12345", "ABCD", "00000"],
  },
};

// Test names and city formatting
const testFormatting = {
  names: {
    "john doe": "John Doe",
    "MARY SMITH": "Mary Smith",
    mcDonald: "McDonald",
    "o'brien": "O'Brien",
  },
  cities: {
    "new york": "New York",
    "LOS ANGELES": "Los Angeles",
    "san francisco": "San Francisco",
    "las vegas": "Las Vegas",
  },
};

console.log("=== ADDRESS VALIDATION TEST RESULTS ===");

// Test country validation
console.log("\n1. COUNTRY VALIDATION:");
const countries = getValidCountries();
console.log(`Total valid countries: ${countries.length}`);
console.log(`Sample countries: ${countries.slice(0, 5).join(", ")}...`);

["US", "CA", "GB", "AU", "XX"].forEach((country) => {
  const isValid = isValidCountry(country);
  console.log(`${country}: ${isValid ? "Valid" : "Invalid"}`);
});

// Test state validation
console.log("\n2. STATE/PROVINCE VALIDATION:");
const testStateValidation = [
  { country: "US", state: "NY", expected: true },
  { country: "US", state: "California", expected: true },
  { country: "CA", state: "ON", expected: true },
  { country: "CA", state: "Ontario", expected: true },
  { country: "US", state: "InvalidState", expected: false },
  { country: "GB", state: "England", expected: true },
];

testStateValidation.forEach(({ country, state, expected }) => {
  const isValid = isValidState(state, country);
  const states = getValidStates(country);
  console.log(
    `${country}-${state}: ${
      isValid ? "Valid" : "Invalid"
    } (Expected: ${expected})`
  );
  if (country === "US" && states) {
    console.log(
      `  Available US states: ${states.slice(0, 3).join(", ")}... (${
        states.length
      } total)`
    );
  }
});

// Test postal code validation
console.log("\n3. POSTAL CODE VALIDATION:");
Object.entries(testPostalCodes).forEach(([country, codes]) => {
  console.log(`\n${country}:`);
  console.log("  Valid codes:");
  codes.valid.forEach((code) => {
    const isValid = isValidPostalCode(code, country);
    const formatted = formatPostalCode(code, country);
    console.log(`    ${code} → ${formatted} (Valid: ${isValid})`);
  });
  console.log("  Invalid codes:");
  codes.invalid.forEach((code) => {
    const isValid = isValidPostalCode(code, country);
    console.log(`    ${code} (Valid: ${isValid})`);
  });
});

// Test address formatting and normalization
console.log("\n4. NAME AND CITY FORMATTING:");
console.log("Names:");
Object.entries(testFormatting.names).forEach(([input, expected]) => {
  const formatted = toTitleCase(input);
  console.log(`  "${input}" → "${formatted}" (Expected: "${expected}")`);
});

console.log("Cities:");
Object.entries(testFormatting.cities).forEach(([input, expected]) => {
  const formatted = toTitleCase(input);
  console.log(`  "${input}" → "${formatted}" (Expected: "${expected}")`);
});

// Test comprehensive address validation
console.log("\n5. COMPREHENSIVE ADDRESS VALIDATION:");
Object.entries(testAddresses).forEach(([testName, address]) => {
  console.log(`\n${testName.toUpperCase()}:`);
  console.log("Address:", address);

  const validation = validateAddressEnhanced(address);
  console.log(`Valid: ${validation.isValid}`);

  if (validation.errors.length > 0) {
    console.log("Errors:");
    validation.errors.forEach((error) => {
      console.log(`  - ${error.field}: ${error.message}`);
    });
  }

  if (validation.isValid) {
    console.log("✅ Address validation passed");
  } else {
    console.log("❌ Address validation failed");
  }
});

// Test address normalization
console.log("\n6. ADDRESS NORMALIZATION:");
const normalizeTestAddress = testAddresses.edgeCases;
console.log("Original address:", normalizeTestAddress);

const normalized = validateAndNormalizeAddress(normalizeTestAddress);
console.log("Normalized address:", normalized.normalizedAddress);
console.log(`Normalization successful: ${normalized.isValid}`);

if (normalized.errors.length > 0) {
  console.log("Normalization errors:");
  normalized.errors.forEach((error) => {
    console.log(`  - ${error.field}: ${error.message}`);
  });
}

// Test field-specific validation
console.log("\n7. FIELD-SPECIFIC VALIDATION:");
const testAddress = testAddresses.validUS;
const fieldsToTest = ["address", "city", "state", "postalCode", "country"];

fieldsToTest.forEach((field) => {
  const error = validateAddressField(
    field as keyof ValidatedAddress,
    testAddress[field as keyof typeof testAddress],
    testAddress
  );
  console.log(`${field}: ${error || "Valid"}`);
});

// Test edge cases and security
console.log("\n8. SECURITY AND EDGE CASES:");
const securityTests = [
  { address: "123", description: "Too short address" },
  {
    address:
      "123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",
    description: "Too long address",
  },
  {
    address: "123 <script>alert('xss')</script> Street",
    description: "Potential XSS",
  },
  { address: "123456789", description: "Numbers only" },
  {
    address: "123 Main Street; DROP TABLE users;",
    description: "SQL injection attempt",
  },
];

securityTests.forEach(({ address, description }) => {
  const validation = validateAddressEnhanced({
    address,
    city: "Test City",
    state: "NY",
    postalCode: "10001",
    country: "US",
  });
  console.log(
    `${description}: ${
      validation.isValid ? "❌ Passed (unexpected)" : "✅ Blocked"
    }`
  );
  if (!validation.isValid) {
    const addressErrors = validation.errors.filter(
      (e) => e.field === "address"
    );
    if (addressErrors.length > 0) {
      console.log(`  Reason: ${addressErrors[0].message}`);
    }
  }
});

console.log("\n=== ADDRESS VALIDATION TESTS COMPLETE ===");

export {}; // Make this a module
