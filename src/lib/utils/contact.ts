/**
 * Contact form validation utilities
 * Provides comprehensive validation for contact form fields
 */

import {
  ContactFormData,
  ContactValidationError,
  ContactValidationResult,
} from "../interfaces/contact";


/**
 * Email validation using RFC 5322 compliant regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

/**
 * Name validation - allows letters, spaces, hyphens, apostrophes
 */
export function isValidName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
  return nameRegex.test(name) && name.trim().length >= 2;
}

/**
 * Validates contact form name field
 */
export function validateName(name: string): string | null {
  if (!name || !name.trim()) {
    return "Name is required";
  }

  const trimmedName = name.trim();

  if (trimmedName.length < 2) {
    return "Name must be at least 2 characters long";
  }

  if (trimmedName.length > 100) {
    return "Name must not exceed 100 characters";
  }

  if (!isValidName(trimmedName)) {
    return "Name can only contain letters, spaces, hyphens, and apostrophes";
  }

  // Check for suspicious patterns
  if (/^\d+$/.test(trimmedName)) {
    return "Name cannot contain only numbers";
  }

  if (/<[^>]*>/.test(trimmedName)) {
    return "Name cannot contain HTML tags";
  }

  return null;
}

/**
 * Validates contact form email field
 */
export function validateEmail(email: string): string | null {
  if (!email || !email.trim()) {
    return "Email address is required";
  }

  const trimmedEmail = email.trim();

  if (trimmedEmail.length > 254) {
    return "Email address is too long";
  }

  if (!isValidEmail(trimmedEmail)) {
    return "Please enter a valid email address";
  }

  // Check for common typos in domains
  const commonDomainTypos = [
    { typo: "gmial.com", correct: "gmail.com" },
    { typo: "gmai.com", correct: "gmail.com" },
    { typo: "yahooo.com", correct: "yahoo.com" },
    { typo: "hotmial.com", correct: "hotmail.com" },
    { typo: "outlok.com", correct: "outlook.com" },
  ];

  for (const { typo, correct } of commonDomainTypos) {
    if (trimmedEmail.toLowerCase().includes(typo)) {
      return `Did you mean ${trimmedEmail
        .toLowerCase()
        .replace(typo, correct)}?`;
    }
  }

  return null;
}

/**
 * Validates contact form subject field
 */
export function validateSubject(subject: string): string | null {
  if (!subject || !subject.trim()) {
    return "Subject is required";
  }

  const trimmedSubject = subject.trim();

  if (trimmedSubject.length < 5) {
    return "Subject must be at least 5 characters long";
  }

  if (trimmedSubject.length > 200) {
    return "Subject must not exceed 200 characters";
  }

  // Check for suspicious content
  if (/<[^>]*>/.test(trimmedSubject)) {
    return "Subject cannot contain HTML tags";
  }

  if (/script|javascript|vbscript/i.test(trimmedSubject)) {
    return "Subject contains prohibited content";
  }

  return null;
}

/**
 * Validates contact form category field
 */
export function validateCategory(category: string): string | null {
  const validCategories = [
    "orders",
    "account",
    "returns",
    "technical",
    "general",
    "feedback",
  ];

  if (!category || !category.trim()) {
    return "Please select a category";
  }

  if (!validCategories.includes(category.toLowerCase())) {
    return "Please select a valid category";
  }

  return null;
}

/**
 * Validates contact form message field
 */
export function validateMessage(message: string): string | null {
  if (!message || !message.trim()) {
    return "Message is required";
  }

  const trimmedMessage = message.trim();

  if (trimmedMessage.length < 10) {
    return "Message must be at least 10 characters long";
  }

  if (trimmedMessage.length > 5000) {
    return "Message must not exceed 5000 characters";
  }

  // Check for suspicious content
  if (/<script[^>]*>.*?<\/script>/gi.test(trimmedMessage)) {
    return "Message contains prohibited content";
  }

  if (/javascript:|vbscript:|data:|file:/gi.test(trimmedMessage)) {
    return "Message contains prohibited content";
  }

  // Check for excessive special characters (potential spam)
  const specialCharCount = (
    trimmedMessage.match(/[!@#$%^&*()_+={}[\]|\\:";'<>?,./]/g) || []
  ).length;
  const specialCharRatio = specialCharCount / trimmedMessage.length;

  if (specialCharRatio > 0.3) {
    return "Message contains too many special characters";
  }

  return null;
}

/**
 * Validates a specific contact form field
 */
export function validateContactField(
  field: keyof ContactFormData,
  value: string,
  formData?: Partial<ContactFormData>
): string | null {
  switch (field) {
    case "name":
      return validateName(value);
    case "email":
      return validateEmail(value);
    case "subject":
      return validateSubject(value);
    case "category":
      return validateCategory(value);
    case "message":
      return validateMessage(value);
    default:
      return null;
  }
}

/**
 * Comprehensive contact form validation
 */
export function validateContactForm(
  formData: Partial<ContactFormData>
): ContactValidationResult {
  const errors: ContactValidationError[] = [];

  // Validate each field
  const fields: (keyof ContactFormData)[] = [
    "name",
    "email",
    "subject",
    "category",
    "message",
  ];

  fields.forEach((field) => {
    const value = formData[field] || "";
    const error = validateContactField(field, value, formData);

    if (error) {
      errors.push({ field, message: error });
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitizes contact form data for safe processing
 */
export function sanitizeContactForm(
  formData: ContactFormData
): ContactFormData {
  return {
    name: formData.name.trim().replace(/\s+/g, " "),
    email: formData.email.trim().toLowerCase(),
    subject: formData.subject.trim().replace(/\s+/g, " "),
    category: formData.category.toLowerCase(),
    message: formData.message
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\n\s*\n/g, "\n\n"),
  };
}

/**
 * Formats name with proper capitalization
 */
export function formatContactName(name: string): string {
  return name
    .trim()
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Gets user-friendly category name
 */
export function getCategoryDisplayName(category: string): string {
  const categoryMap: Record<string, string> = {
    orders: "Orders & Shipping",
    account: "Account & Membership",
    returns: "Returns & Refunds",
    technical: "Technical Support",
    general: "General Inquiry",
    feedback: "Feedback",
  };

  return categoryMap[category.toLowerCase()] || category;
}
