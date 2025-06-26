export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
}

export interface ContactValidationError {
  field: keyof ContactFormData;
  message: string;
}

export interface ContactValidationResult {
  isValid: boolean;
  errors: ContactValidationError[];
}
