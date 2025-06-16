export interface AddressValidationError {
  field: string;
  message: string;
}


export interface AddressValidationResult {
  isValid: boolean;
  errors: AddressValidationError[];
}

export interface ValidatedAddress {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}