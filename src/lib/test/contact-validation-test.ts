// Contact Form Validation Test Examples
// ====================================

import {
  formatContactName,
  getCategoryDisplayName,
  isValidEmail,
  isValidName,
  sanitizeContactForm,
  validateContactField,
  validateContactForm,
  type ContactFormData,
} from "../utils/contact";

// Test contact form data
const testContactForms = {
  validForm: {
    name: "John Doe",
    email: "john.doe@example.com",
    subject: "Question about my order",
    category: "orders",
    message:
      "I would like to know the status of my recent order #12345. When can I expect it to be delivered?",
  },
  invalidForm: {
    name: "J", // Too short
    email: "invalid-email", // Invalid format
    subject: "Hi", // Too short
    category: "invalid", // Invalid category
    message: "Short", // Too short
  },
  securityTestForm: {
    name: "John <script>alert('xss')</script>",
    email: "test@example.com",
    subject: "javascript:alert('xss')",
    category: "general",
    message: "This is a test message with <script>malicious</script> content",
  },
  emailTypoForm: {
    name: "Jane Smith",
    email: "jane@gmial.com", // Common typo
    subject: "Account question",
    category: "account",
    message: "I need help with my account settings and password reset.",
  },
  longContentForm: {
    name: "A".repeat(150), // Too long
    email: "user@example.com",
    subject: "A".repeat(250), // Too long
    category: "feedback",
    message: "A".repeat(6000), // Too long
  },
};

// Test individual field validation
const testFields = {
  names: {
    valid: ["John Doe", "Mary Smith", "Jean-Pierre", "O'Connor", "Dr. Smith"],
    invalid: ["J", "123456", "<script>", "A".repeat(150), ""],
  },
  emails: {
    valid: [
      "user@example.com",
      "test.email@domain.co.uk",
      "user+tag@example.org",
      "firstname.lastname@company.com",
    ],
    invalid: [
      "invalid-email",
      "@example.com",
      "user@",
      "user@.com",
      "user..double@example.com",
      "A".repeat(250) + "@example.com",
    ],
    typos: [
      "user@gmial.com",
      "test@yahooo.com",
      "contact@hotmial.com",
      "info@outlok.com",
    ],
  },
  subjects: {
    valid: [
      "Question about order",
      "Account password reset help",
      "Feedback on recent purchase",
      "Technical issue with website",
    ],
    invalid: [
      "Hi", // Too short
      "A".repeat(250), // Too long
      "<script>alert('xss')</script>",
      "javascript:void(0)",
      "",
    ],
  },
  categories: {
    valid: ["orders", "account", "returns", "technical", "general", "feedback"],
    invalid: ["invalid", "spam", "test", ""],
  },
  messages: {
    valid: [
      "This is a valid message with sufficient length and proper content.",
      "I need help with my order. Can you please provide an update on the shipping status?",
      "The website is not loading properly on my mobile device. Please help.",
    ],
    invalid: [
      "Short", // Too short
      "A".repeat(6000), // Too long
      "<script>alert('xss')</script>",
      "javascript:alert('hack')",
      "!!!!!@@@@@#####$$$$$%%%%%", // Too many special chars
      "",
    ],
  },
};

console.log("=== CONTACT FORM VALIDATION TEST RESULTS ===");

// Test individual field validators
console.log("\n1. NAME VALIDATION:");
console.log("Valid names:");
testFields.names.valid.forEach((name) => {
  const isValid = isValidName(name);
  const error = validateContactField("name", name);
  console.log(
    `  "${name}": ${isValid ? "✅" : "❌"} ${error ? `(${error})` : ""}`
  );
});

console.log("Invalid names:");
testFields.names.invalid.forEach((name) => {
  const isValid = isValidName(name);
  const error = validateContactField("name", name);
  console.log(
    `  "${name}": ${isValid ? "✅" : "❌"} ${error ? `(${error})` : ""}`
  );
});

console.log("\n2. EMAIL VALIDATION:");
console.log("Valid emails:");
testFields.emails.valid.forEach((email) => {
  const isValid = isValidEmail(email);
  const error = validateContactField("email", email);
  console.log(
    `  "${email}": ${isValid ? "✅" : "❌"} ${error ? `(${error})` : ""}`
  );
});

console.log("Invalid emails:");
testFields.emails.invalid.forEach((email) => {
  const isValid = isValidEmail(email);
  const error = validateContactField("email", email);
  console.log(
    `  "${email}": ${isValid ? "✅" : "❌"} ${error ? `(${error})` : ""}`
  );
});

console.log("Email typo detection:");
testFields.emails.typos.forEach((email) => {
  const error = validateContactField("email", email);
  console.log(`  "${email}": ${error ? `⚠️ ${error}` : "✅ Valid"}`);
});

console.log("\n3. SUBJECT VALIDATION:");
console.log("Valid subjects:");
testFields.subjects.valid.forEach((subject) => {
  const error = validateContactField("subject", subject);
  console.log(
    `  "${subject}": ${error ? "❌" : "✅"} ${error ? `(${error})` : ""}`
  );
});

console.log("Invalid subjects:");
testFields.subjects.invalid.forEach((subject) => {
  const error = validateContactField("subject", subject);
  console.log(
    `  "${subject}": ${error ? "❌" : "✅"} ${error ? `(${error})` : ""}`
  );
});

console.log("\n4. CATEGORY VALIDATION:");
console.log("Valid categories:");
testFields.categories.valid.forEach((category) => {
  const error = validateContactField("category", category);
  const displayName = getCategoryDisplayName(category);
  console.log(
    `  "${category}" (${displayName}): ${error ? "❌" : "✅"} ${
      error ? `(${error})` : ""
    }`
  );
});

console.log("Invalid categories:");
testFields.categories.invalid.forEach((category) => {
  const error = validateContactField("category", category);
  console.log(
    `  "${category}": ${error ? "❌" : "✅"} ${error ? `(${error})` : ""}`
  );
});

console.log("\n5. MESSAGE VALIDATION:");
console.log("Valid messages:");
testFields.messages.valid.forEach((message, index) => {
  const error = validateContactField("message", message);
  console.log(
    `  Message ${index + 1}: ${error ? "❌" : "✅"} ${
      error ? `(${error})` : ""
    }`
  );
});

console.log("Invalid messages:");
testFields.messages.invalid.forEach((message, index) => {
  const error = validateContactField("message", message);
  console.log(
    `  Message ${index + 1}: ${error ? "❌" : "✅"} ${
      error ? `(${error})` : ""
    }`
  );
});

// Test comprehensive form validation
console.log("\n6. COMPREHENSIVE FORM VALIDATION:");
Object.entries(testContactForms).forEach(([testName, formData]) => {
  console.log(`\n${testName.toUpperCase()}:`);
  console.log("Form data:", formData);

  const validation = validateContactForm(formData);
  console.log(`Valid: ${validation.isValid}`);

  if (validation.errors.length > 0) {
    console.log("Errors:");
    validation.errors.forEach((error) => {
      console.log(`  - ${error.field}: ${error.message}`);
    });
  }

  if (validation.isValid) {
    console.log("✅ Form validation passed");
  } else {
    console.log("❌ Form validation failed");
  }
});

// Test data sanitization
console.log("\n7. DATA SANITIZATION:");
const unsanitizedForm: ContactFormData = {
  name: "  JOHN   DOE  ",
  email: "  JOHN.DOE@EXAMPLE.COM  ",
  subject: "  Multiple   Spaces   In   Subject  ",
  category: "GENERAL",
  message: "Multiple\n\n\nline\n\n\nbreaks\n\n\nand    spaces   everywhere",
};

console.log("Original form:", unsanitizedForm);
const sanitized = sanitizeContactForm(unsanitizedForm);
console.log("Sanitized form:", sanitized);

// Test name formatting
console.log("\n8. NAME FORMATTING:");
const testNames = ["john doe", "MARY SMITH", "jean-pierre dubois", "o'connor"];

testNames.forEach((name) => {
  const formatted = formatContactName(name);
  console.log(`"${name}" → "${formatted}"`);
});

// Test security patterns
console.log("\n9. SECURITY VALIDATION:");
const securityTests = [
  {
    field: "name",
    value: "<script>alert('xss')</script>",
    description: "XSS in name",
  },
  {
    field: "email",
    value: "user@example.com'; DROP TABLE users; --",
    description: "SQL injection in email",
  },
  {
    field: "subject",
    value: "javascript:alert('xss')",
    description: "JavaScript protocol",
  },
  {
    field: "message",
    value: "Visit my site: data:text/html,<script>alert('xss')</script>",
    description: "Data URI attack",
  },
  {
    field: "message",
    value: "!!!!!@@@@@#####$$$$$%%%%%^^^^^&&&&&*****",
    description: "Excessive special characters",
  },
];

securityTests.forEach(({ field, value, description }) => {
  const error = validateContactField(field as keyof ContactFormData, value);
  console.log(`${description}: ${error ? "✅ Blocked" : "❌ Allowed"}`);
  if (error) {
    console.log(`  Reason: ${error}`);
  }
});

console.log("\n=== CONTACT FORM VALIDATION TESTS COMPLETE ===");

export {}; // Make this a module
