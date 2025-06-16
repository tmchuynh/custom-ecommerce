import {
  POSTAL_CODE_PATTERNS,
  VALID_COUNTRIES,
  VALID_STATES,
} from "../constants/validate/address";
import {
  AddressValidationError,
  AddressValidationResult,
  ValidatedAddress,
} from "../interfaces/address";

/**
 * Comprehensive address validation with enhanced features
 */
export function validateAddressEnhanced(
  address: Partial<ValidatedAddress>
): AddressValidationResult {
  const errors: AddressValidationError[] = [];

  // Required field validation
  if (!address.address?.trim()) {
    errors.push({ field: "address", message: "Street address is required" });
  } else {
    const trimmedAddress = address.address.trim();
    if (trimmedAddress.length < 5) {
      errors.push({
        field: "address",
        message: "Street address must be at least 5 characters long",
      });
    } else if (trimmedAddress.length > 100) {
      errors.push({
        field: "address",
        message: "Street address must not exceed 100 characters",
      });
    }
    // Check for suspicious patterns (all numbers, suspicious characters)
    if (/^\d+$/.test(trimmedAddress)) {
      errors.push({
        field: "address",
        message: "Street address must contain more than just numbers",
      });
    }
    if (!/^[a-zA-Z0-9\s\-'.,#\/]+$/.test(trimmedAddress)) {
      errors.push({
        field: "address",
        message: "Street address contains invalid characters",
      });
    }
  }

  if (!address.city?.trim()) {
    errors.push({ field: "city", message: "City is required" });
  } else {
    const trimmedCity = address.city.trim();
    if (trimmedCity.length < 2) {
      errors.push({
        field: "city",
        message: "City must be at least 2 characters long",
      });
    } else if (trimmedCity.length > 50) {
      errors.push({
        field: "city",
        message: "City must not exceed 50 characters",
      });
    } else if (!/^[a-zA-Z\s\-'\.]+$/.test(trimmedCity)) {
      errors.push({
        field: "city",
        message:
          "City can only contain letters, spaces, hyphens, apostrophes, and periods",
      });
    }
  }

  if (!address.state?.trim()) {
    errors.push({ field: "state", message: "State/Province is required" });
  } else {
    const trimmedState = address.state.trim();
    if (trimmedState.length < 2) {
      errors.push({
        field: "state",
        message: "State/Province must be at least 2 characters long",
      });
    } else if (trimmedState.length > 50) {
      errors.push({
        field: "state",
        message: "State/Province must not exceed 50 characters",
      });
    }
  }

  if (!address.postalCode?.trim()) {
    errors.push({
      field: "postalCode",
      message: "Postal/ZIP code is required",
    });
  } else {
    const trimmedPostalCode = address.postalCode.trim();
    if (trimmedPostalCode.length < 3) {
      errors.push({
        field: "postalCode",
        message: "Postal/ZIP code must be at least 3 characters long",
      });
    } else if (trimmedPostalCode.length > 10) {
      errors.push({
        field: "postalCode",
        message: "Postal/ZIP code must not exceed 10 characters",
      });
    }
  }

  if (!address.country?.trim()) {
    errors.push({ field: "country", message: "Country is required" });
  } else {
    const trimmedCountry = address.country.trim().toUpperCase();
    if (trimmedCountry.length !== 2) {
      errors.push({
        field: "country",
        message: "Country must be a valid 2-letter code (e.g., US, CA, GB)",
      });
    } else if (!isValidCountry(trimmedCountry)) {
      errors.push({ field: "country", message: "Invalid country code" });
    }
  }

  // Country-specific validation
  if (address.country && address.postalCode) {
    const countryCode = address.country.toUpperCase();
    const pattern =
      POSTAL_CODE_PATTERNS[countryCode as keyof typeof POSTAL_CODE_PATTERNS];

    if (pattern && !pattern.test(address.postalCode.trim())) {
      errors.push({
        field: "postalCode",
        message: `Invalid postal code format for ${countryCode}`,
      });
    }
  }

  // State validation for specific countries
  if (address.country && address.state) {
    const countryCode = address.country.toUpperCase();
    const validStates = VALID_STATES[countryCode as keyof typeof VALID_STATES];

    if (validStates && !validStates.includes(address.state.toUpperCase())) {
      errors.push({
        field: "state",
        message: `Invalid state/province code for ${countryCode}`,
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Real-time field validation for form inputs
 */
export function validateAddressField(
  field: keyof ValidatedAddress,
  value: string,
  address?: Partial<ValidatedAddress>
): string | null {
  const trimmedValue = value.trim();

  switch (field) {
    case "address":
      if (!trimmedValue) return "Street address is required";
      if (trimmedValue.length < 5)
        return "Street address must be at least 5 characters long";
      if (trimmedValue.length > 100)
        return "Street address must not exceed 100 characters";
      if (/^\d+$/.test(trimmedValue))
        return "Street address must contain more than just numbers";
      if (!/^[a-zA-Z0-9\s\-'.,#\/]+$/.test(trimmedValue))
        return "Street address contains invalid characters";
      break;

    case "city":
      if (!trimmedValue) return "City is required";
      if (trimmedValue.length < 2)
        return "City must be at least 2 characters long";
      if (trimmedValue.length > 50) return "City must not exceed 50 characters";
      if (!/^[a-zA-Z\s\-'\.]+$/.test(trimmedValue))
        return "City can only contain letters, spaces, hyphens, apostrophes, and periods";
      break;

    case "state":
      if (!trimmedValue) return "State/Province is required";
      if (trimmedValue.length < 2)
        return "State/Province must be at least 2 characters long";
      if (trimmedValue.length > 50)
        return "State/Province must not exceed 50 characters";
      if (address?.country) {
        const validStates =
          VALID_STATES[
            address.country.toUpperCase() as keyof typeof VALID_STATES
          ];
        if (validStates && !validStates.includes(trimmedValue.toUpperCase())) {
          return `Invalid state/province code for ${address.country.toUpperCase()}`;
        }
      }
      break;

    case "postalCode":
      if (!trimmedValue) return "Postal/ZIP code is required";
      if (trimmedValue.length < 3)
        return "Postal/ZIP code must be at least 3 characters long";
      if (trimmedValue.length > 10)
        return "Postal/ZIP code must not exceed 10 characters";
      if (address?.country) {
        const pattern =
          POSTAL_CODE_PATTERNS[
            address.country.toUpperCase() as keyof typeof POSTAL_CODE_PATTERNS
          ];
        if (pattern && !pattern.test(trimmedValue)) {
          return `Invalid postal code format for ${address.country.toUpperCase()}`;
        }
      }
      break;

    case "country":
      if (!trimmedValue) return "Country is required";
      if (trimmedValue.length !== 2)
        return "Country must be a valid 2-letter code (e.g., US, CA, GB)";
      if (!isValidCountry(trimmedValue)) return "Invalid country code";
      break;

    default:
      return null;
  }

  return null;
}

/**
 * Validates an address object with comprehensive checks
 */
export function validateAddress(
  address: Partial<ValidatedAddress>
): AddressValidationResult {
  const errors: AddressValidationError[] = [];

  // Required field validation
  if (!address.address?.trim()) {
    errors.push({ field: "address", message: "Street address is required" });
  } else if (address.address.trim().length < 5) {
    errors.push({
      field: "address",
      message: "Street address must be at least 5 characters long",
    });
  } else if (address.address.trim().length > 100) {
    errors.push({
      field: "address",
      message: "Street address must not exceed 100 characters",
    });
  }

  if (!address.city?.trim()) {
    errors.push({ field: "city", message: "City is required" });
  } else if (address.city.trim().length < 2) {
    errors.push({
      field: "city",
      message: "City must be at least 2 characters long",
    });
  } else if (address.city.trim().length > 50) {
    errors.push({
      field: "city",
      message: "City must not exceed 50 characters",
    });
  } else if (!/^[a-zA-Z\s\-'\.]+$/.test(address.city.trim())) {
    errors.push({
      field: "city",
      message:
        "City can only contain letters, spaces, hyphens, apostrophes, and periods",
    });
  }

  if (!address.state?.trim()) {
    errors.push({ field: "state", message: "State/Province is required" });
  } else if (address.state.trim().length < 2) {
    errors.push({
      field: "state",
      message: "State/Province must be at least 2 characters long",
    });
  } else if (address.state.trim().length > 50) {
    errors.push({
      field: "state",
      message: "State/Province must not exceed 50 characters",
    });
  }

  if (!address.postalCode?.trim()) {
    errors.push({
      field: "postalCode",
      message: "Postal/ZIP code is required",
    });
  } else if (address.postalCode.trim().length < 3) {
    errors.push({
      field: "postalCode",
      message: "Postal/ZIP code must be at least 3 characters long",
    });
  } else if (address.postalCode.trim().length > 10) {
    errors.push({
      field: "postalCode",
      message: "Postal/ZIP code must not exceed 10 characters",
    });
  }

  if (!address.country?.trim()) {
    errors.push({ field: "country", message: "Country is required" });
  } else if (address.country.trim().length !== 2) {
    errors.push({
      field: "country",
      message: "Country must be a valid 2-letter code (e.g., US, CA, GB)",
    });
  }

  // Country-specific validation
  if (address.country && address.postalCode) {
    const countryCode = address.country.toUpperCase();
    const pattern =
      POSTAL_CODE_PATTERNS[countryCode as keyof typeof POSTAL_CODE_PATTERNS];

    if (pattern && !pattern.test(address.postalCode.trim())) {
      errors.push({
        field: "postalCode",
        message: `Invalid postal code format for ${countryCode}`,
      });
    }
  }

  // State validation for specific countries
  if (address.country && address.state) {
    const countryCode = address.country.toUpperCase();
    const validStates = VALID_STATES[countryCode as keyof typeof VALID_STATES];

    if (validStates && !validStates.includes(address.state.toUpperCase())) {
      errors.push({
        field: "state",
        message: `Invalid state/province code for ${countryCode}`,
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates and normalizes an address
 */
export function validateAndNormalizeAddress(
  address: Partial<ValidatedAddress>
): {
  isValid: boolean;
  errors: AddressValidationError[];
  normalizedAddress?: ValidatedAddress;
} {
  const validation = validateAddress(address);

  if (!validation.isValid) {
    return validation;
  }

  // Normalize the address
  const normalizedAddress: ValidatedAddress = {
    address: address.address!.trim(),
    city: address.city!.trim().replace(/\b\w/g, (l) => l.toUpperCase()), // Title case
    state: address.state!.trim().toUpperCase(),
    postalCode: address.postalCode!.trim().toUpperCase(),
    country: address.country!.trim().toUpperCase(),
  };

  return {
    isValid: true,
    errors: [],
    normalizedAddress,
  };
}

/**
 * Quick validation for address fields
 */
export function isValidPostalCode(
  postalCode: string,
  country: string
): boolean {
  const pattern =
    POSTAL_CODE_PATTERNS[
      country.toUpperCase() as keyof typeof POSTAL_CODE_PATTERNS
    ];
  return pattern
    ? pattern.test(postalCode.trim())
    : postalCode.trim().length >= 3;
}

/**
 * Get valid states for a country
 */
export function getValidStates(country: string): string[] | null {
  return (
    VALID_STATES[country.toUpperCase() as keyof typeof VALID_STATES] || null
  );
}

/**
 * Check if a state is valid for a country
 */
export function isValidState(state: string, country: string): boolean {
  const validStates = getValidStates(country);
  return validStates ? validStates.includes(state.toUpperCase()) : true;
}

/**
 * Check if a country code is valid
 */
export function isValidCountry(country: string): boolean {
  return VALID_COUNTRIES.includes(country.toUpperCase());
}

/**
 * Get all valid country codes
 */
export function getValidCountries(): string[] {
  return [...VALID_COUNTRIES];
}
