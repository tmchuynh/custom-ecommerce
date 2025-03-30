"use client";
import { usePayment } from "@/app/context/paymentContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerInfoData, CustomerInfoFormProps } from "@/lib/types";
import {
  handleBlur,
  handleFormSubmit,
  handleInputChange,
} from "@/lib/utils/utils";
import { validateField } from "@/lib/utils/validation";
import { useState } from "react";
import { FaMailBulk, FaPhoneAlt, FaUser } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";

/**
 * A form component for collecting customer information during checkout.
 *
 * @component
 * @param {CustomerInfoFormProps} props - The component props (currently empty)
 *
 * @remarks
 * This component handles:
 * - Collection and validation of customer details (first name, last name, email, phone)
 * - Real-time field validation and error messaging
 * - Optional marketing consent checkbox
 * - Form submission with validation checks
 * - Phone number formatting
 *
 * @example
 * ```tsx
 * <CustomerInfoForm />
 * ```
 *
 * @states
 * - formData: Stores customer input data
 * - errors: Tracks validation errors for each field
 * - touched: Tracks which fields have been interacted with
 *
 * @validation
 * Validates:
 * - Names (required, letters/spaces/hyphens/apostrophes only)
 * - Email (required, valid email format)
 * - Phone (required, valid 10-digit format)
 *
 * @returns A form component with input fields for customer information and validation feedback
 */
export default function CustomerInfoForm({}: CustomerInfoFormProps) {
  const [formData, setFormData] = useState<CustomerInfoData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    marketingConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { handlePaymentSubmission } = usePayment();

  /**
   * Handles form input changes and updates the form state accordingly.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event
   *
   * Updates the form data state with the new value:
   * - For checkboxes, uses the checked state
   * - For phone fields, formats the phone number
   * - For other fields, uses the raw value
   *
   * Also validates non-checkbox fields and updates the error state.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setFormData, setErrors);
  };

  /**
   * Handles the submission of the customer information form.
   * Performs validation on all form fields except marketing consent,
   * marks all fields as touched, and processes payment submission if valid.
   *
   * @param {React.FormEvent} e - The form submission event
   * @returns {void}
   *
   * @remarks
   * The function performs the following steps:
   * 1. Prevents default form submission
   * 2. Validates all form fields except marketingConsent
   * 3. Sets error messages for invalid fields
   * 4. Marks all fields as touched
   * 5. If valid, submits payment information with placeholder card details
   */
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const requiredFields: Array<keyof CustomerInfoData> = [
      "firstName",
      "lastName",
      "email",
      "phone",
    ];
    handleFormSubmit(
      formData,
      requiredFields,
      validateField,
      setErrors,
      setTouched,
      (data) => {
        handlePaymentSubmission({
          ...data,
          cardDetails: {
            number: data.firstName, // Placeholder for card number
            expirationDate: "",
            cvv: "",
            issuer: "",
          },
          amount: 0, // Add appropriate amount
        });
      }
    );
  };

  return (
    <div className="rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
        <p className="text-sm">
          Please enter your contact information for order confirmation and
          delivery updates.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaUser className="h-4 w-4" />
              </div>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={(e) => handleBlur(e, setTouched)}
                placeholder="John"
                className={`pl-10 ${
                  touched.firstName && errors.firstName
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {touched.firstName && errors.firstName && (
                <div className="flex items-center mt-1 text-red-500 text-xs">
                  <IoIosAlert className="h-3 w-3 mr-1" />
                  {errors.firstName}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaUser className="h-4 w-4" />
              </div>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={(e) => handleBlur(e, setTouched)}
                placeholder="Doe"
                className={`pl-10 ${
                  touched.lastName && errors.lastName
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {touched.lastName && errors.lastName && (
                <div className="flex items-center mt-1 text-red-500 text-xs">
                  {" "}
                  <IoIosAlert className="h-3 w-3 mr-1" />
                  {errors.lastName}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaMailBulk className="h-4 w-4" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={(e) => handleBlur(e, setTouched)}
                placeholder="john.doe@example.com"
                className={`pl-10 ${
                  touched.email && errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {touched.email && errors.email && (
                <div className="flex items-center mt-1 text-red-500 text-xs">
                  <IoIosAlert className="h-3 w-3 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>
            <p className="text-xs">We'll send your order confirmation here</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <FaPhoneAlt className="h-4 w-4" />
              </div>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                onBlur={(e) => handleBlur(e, setTouched)}
                placeholder="(555) 123-4567"
                className={`pl-10 ${
                  touched.phone && errors.phone
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {touched.phone && errors.phone && (
                <div className="flex items-center mt-1 text-red-500 text-xs">
                  <IoIosAlert className="h-3 w-3 mr-1" />
                  {errors.phone}
                </div>
              )}
            </div>
            <p className="text-xs">For delivery updates and order questions</p>
          </div>

          <div className="flex items-start space-x-2 pt-2">
            <Checkbox
              id="marketingConsent"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  marketingConsent: checked as boolean,
                })
              }
              className="mt-1"
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="marketingConsent"
                className="text-sm font-normal  leading-snug"
              >
                Keep me updated about new products, promotions, and exclusive
                offers
                <Badge className="ml-2">Optional</Badge>
              </Label>
              <p className="text-xs">
                We respect your privacy and will never share your information
                with third parties.
              </p>
            </div>
          </div>

          <div className="pt-3">
            <Button type="submit" className="w-full">
              Continue to Shipping
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
