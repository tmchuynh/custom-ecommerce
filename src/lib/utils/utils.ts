// lib/utils/utils.ts

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatCreditCardNumber } from "./format";
import { validateField } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Determines the type of a credit card based on its number.
 *
 * @param cardNumber - The credit card number as a string, stripped of any non-numeric characters.
 * @returns The card type as a string ("Visa", "MasterCard", "American Express", "Discover"), or `null` if the type cannot be determined.
 *
 * @example
 * ```typescript
 * const cardType = getCardType("4111111111111111");
 * console.log(cardType); // "Visa"
 * ```
 */

export function getCardType(cardNumber: string): string | null {
  // Remove spaces and dashes
  const sanitizedNumber = cardNumber.replace(/[\s-]/g, "");

  // Visa
  if (/^4/.test(sanitizedNumber)) return "Visa";

  // Mastercard
  if (/^(5[1-5]|2[2-7])/.test(sanitizedNumber)) return "MasterCard";

  // American Express
  if (/^3[47]/.test(sanitizedNumber)) return "American Express";

  // Discover
  if (
    /^(6011|65|64[4-9]|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]))/.test(
      sanitizedNumber
    )
  )
    return "Discover";

  // Diners Club
  if (/^3(0[0-5]|[68])/.test(sanitizedNumber)) return "Diners Club";

  // JCB
  if (/^35/.test(sanitizedNumber)) return "JCB";

  // UnionPay
  if (/^62/.test(sanitizedNumber)) return "UnionPay";

  return null;
}

/**
 * Smoothly scrolls to a specified section of the page and optionally updates the active section state.
 *
 * @param sectionId - The ID of the section to scroll to
 * @param sectionRefs - A React mutable ref object containing references to section elements
 * @param setActiveSection - Optional callback function to update the active section state
 *
 * @example
 * ```typescript
 * scrollToSection('about', sectionRefs, setActiveSection);
 * ```
 */
export const scrollToSection = (
  sectionId: string,
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>,
  setActiveSection?: (sectionId: string) => void
) => {
  if (setActiveSection) {
    setActiveSection(sectionId);
  }
  sectionRefs.current[sectionId]?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

/**
 * Toggles an accordion section and scrolls to it if newly opened
 *
 * @param id - The ID of the section to toggle
 * @param activeSection - The currently active section ID
 * @param setActiveSection - Function to update the active section state
 * @param sectionRef - Reference to the section element to scroll to
 */
export const toggleAccordionSection = (
  id: string,
  activeSection: string | null,
  setActiveSection: (id: string | null) => void,
  sectionRef: HTMLElement | null
) => {
  setActiveSection(activeSection === id ? null : id);
  if (activeSection !== id && sectionRef) {
    sectionRef.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
};

/**
 * Handles the blur event for form fields and marks the field as touched.
 *
 * @param e - The blur event from the input field
 * @param setTouched - The state setter function for the touched fields
 */
export const handleBlur = (
  e: React.FocusEvent<HTMLInputElement>,
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
) => {
  const { name } = e.target;
  setTouched((prev) => ({ ...prev, [name]: true }));
};

/**
 * Validates and applies a discount code.
 *
 * @param discountCode - The discount code to validate and apply.
 * @param applyDiscount - A callback function to apply the discount.
 * @returns An object containing the discount application status and error state.
 *
 * @example
 * ```typescript
 * const { discountApplied, discountError } = handleApplyDiscount("CODE123", applyDiscount);
 * ```
 */
export function handleApplyDiscountUtil(
  discountCode: string,
  applyDiscount: (code: string) => boolean
): { discountApplied: boolean; discountError: boolean } {
  if (!discountCode.trim()) {
    return { discountApplied: false, discountError: true };
  }

  const isValidDiscount = applyDiscount(discountCode);

  return {
    discountApplied: isValidDiscount,
    discountError: !isValidDiscount,
  };
}

/**
 * Handles form input changes and updates the form state accordingly.
 * Also performs validation for non-checkbox fields.
 *
 * @param e - The React change event from the input element.
 * @param setFormData - The state setter function for the form data.
 * @param setErrors - The state setter function for validation errors.
 * @param setCardType - Optional state setter for card type detection (used for payment forms).
 * @param additionalData - Optional additional data for validation (e.g., expiryMonth, expiryYear).
 */
export function handleInputChange<T extends Record<string, any>>(
  e: React.ChangeEvent<HTMLInputElement>,
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setCardType?: React.Dispatch<React.SetStateAction<string>>,
  additionalData?: { [key: string]: any }
): void {
  const { name, value, type, checked } = e.target;

  if (name === "cardNumber" && setCardType) {
    const formattedValue = formatCreditCardNumber(value);
    const detectedType = getCardType(formattedValue);
    setCardType(detectedType || "");

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    const error = validateField(name, formattedValue, {
      cardType: detectedType,
    });
    setErrors((prev) => ({ ...prev, [name]: error }));
  } else {
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (type !== "checkbox") {
      const error = validateField(name, value, additionalData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  }
}

/**
 * Handles changes in select input fields by updating form data, validating the field, and marking it as touched.
 *
 * @param name - The name of the select field being changed
 * @param value - The new value selected in the field
 * @param setFormData - The state setter function for the form data
 * @param setErrors - The state setter function for validation errors
 * @param setTouched - The state setter function for touched fields
 */
export function handleSelectChange<T extends Record<string, any>>(
  name: string,
  value: string,
  setFormData: React.Dispatch<React.SetStateAction<T>>,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
): void {
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  const error = validateField(name, value);
  setErrors((prev) => ({ ...prev, [name]: error }));
  setTouched((prev) => ({ ...prev, [name]: true }));
}

/**
 * Handles the submission of forms with validation and optional callbacks.
 *
 * @param formData - The form data object containing field values.
 * @param requiredFields - An array of required field names to validate.
 * @param validateField - A function to validate individual fields.
 * @param setErrors - A state setter function to update the error state.
 * @param setTouched - A state setter function to mark fields as touched.
 * @param onSubmit - A callback function to execute when the form is valid.
 * @param additionalData - Optional additional data for validation or submission.
 * @returns A boolean indicating whether the form submission was successful.
 */
export function handleFormSubmit<T>(
  formData: T,
  requiredFields: Array<keyof T>,
  validateField: (name: string, value: string, additionalData?: any) => string,
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setTouched: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
  onSubmit: (data: T) => void,
  additionalData?: any
): boolean {
  const formErrors: Record<string, string> = {};
  let isValid = true;

  // Validate required fields
  requiredFields.forEach((field) => {
    const error = validateField(
      field as string,
      formData[field] as string,
      additionalData
    );
    if (error) {
      formErrors[field as string] = error;
      isValid = false;
    }
  });

  setErrors(formErrors);

  // Mark all required fields as touched
  const touchedFields: Record<string, boolean> = {};
  requiredFields.forEach((field) => {
    touchedFields[field as string] = true;
  });
  setTouched(touchedFields);

  if (isValid) {
    onSubmit(formData);
  }

  return isValid;
}
