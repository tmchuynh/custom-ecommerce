"use client";

import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, MapPin, Home, Building } from "lucide-react";
import { ShippingAddressFormProps } from "@/lib/types";
import { usStates } from "@/lib/constants";
import { ShippingAddress, ShippingMethod } from "@/lib/interfaces";
import {
  handleInputChange,
  handleFormSubmit,
  handleBlur,
  handleSelectChange,
} from "@/lib/utils/utils";
import { validateField } from "@/lib/utils/validation";
import { FaTruckFast } from "react-icons/fa6";
import { BiSolidPackage } from "react-icons/bi";

const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    title: "Standard Shipping",
    description: "3-5 business days",
    price: "Free",
    icon: FaTruckFast,
    estimatedDelivery: "Jul 27 - Jul 29",
  },
  {
    id: "express",
    title: "Express Shipping",
    description: "2-3 business days",
    price: "$9.99",
    icon: FaTruckFast,
    estimatedDelivery: "Jul 25 - Jul 26",
  },
  {
    id: "overnight",
    title: "Overnight Shipping",
    description: "Next business day",
    price: "$19.99",
    icon: BiSolidPackage,
    estimatedDelivery: "Jul 24",
  },
];

/**
 * A form component for collecting shipping address information during checkout.
 *
 * @component
 * @param {Object} props - Component props
 * @param {function} props.onSubmit - Callback function triggered when the form is successfully submitted with valid data
 *
 * @example
 * ```tsx
 * <ShippingAddressForm
 *   onSubmit={(data) => handleShippingAddress(data)}
 * />
 * ```
 *
 * The component handles:
 * - Address validation for required fields
 * - US state selection
 * - ZIP code format validation
 * - Address type selection (residential/business)
 * - Shipping method selection
 * - Form state management
 * - Error display
 * - Field touch status tracking
 *
 * Features:
 * - Real-time validation
 * - Visual error feedback
 * - Optional address saving
 * - Responsive layout
 * - Accessible form controls
 *
 * @returns {JSX.Element} A shipping address form with validation and error handling
 */
export default function ShippingAddressForm({
  onSubmit,
}: ShippingAddressFormProps): JSX.Element {
  const [formData, setFormData] = useState<ShippingAddress>({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
    addressType: "residential",
    saveAddress: true,
    shippingMethod: "standard",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  /**
   * Handles form input changes and updates the form state accordingly.
   * Also performs validation for non-checkbox fields.
   *
   * @param e - The React change event from the input element
   *
   * @remarks
   * - For checkbox inputs, updates the form state with the checked status
   * - For other inputs, updates the form state with the input value and validates the field
   * - Uses the validateField function to check for errors
   * - Updates both formData and errors states using their respective setters
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setFormData, setErrors);
  };

  /**
   * Handles the form submission event for the shipping address form.
   * Validates required fields, sets error messages, marks fields as touched,
   * and calls the onSubmit callback if validation passes.
   *
   * @param {React.FormEvent} e - The form submission event
   * @returns {void}
   *
   * @remarks
   * Required fields that are validated:
   * - addressLine1
   * - city
   * - state
   * - postalCode
   */
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();

    const requiredFields: (keyof ShippingAddress)[] = [
      "addressLine1",
      "city",
      "state",
      "postalCode",
    ];
    handleFormSubmit(
      formData,
      requiredFields,
      validateField,
      setErrors,
      setTouched,
      onSubmit
    );
  };

  return (
    <div className="rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Shipping Address</h2>
        <p className="text-sm">
          Please enter the address where you would like your order to be
          delivered.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="addressLine1" className="text-sm font-medium">
            Address <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 ">
              <MapPin className="h-4 w-4" />
            </div>
            <Input
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              onBlur={(e) => handleBlur(e, setTouched)}
              placeholder="123 Main St"
              className={`pl-10 ${
                touched.addressLine1 && errors.addressLine1
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
            />
            {touched.addressLine1 && errors.addressLine1 && (
              <div className="flex items-center mt-1 text-red-500 text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.addressLine1}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="addressLine2" className="text-sm font-medium">
            Apartment, suite, etc.
            <Badge className="ml-2">Optional</Badge>
          </Label>
          <Input
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            placeholder="Apt 4B, Floor 2, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-sm font-medium">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={(e) => handleBlur(e, setTouched)}
              placeholder="New York"
              className={`${
                touched.city && errors.city
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
            />
            {touched.city && errors.city && (
              <div className="flex items-center mt-1 text-red-500 text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.city}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="state" className="text-sm font-medium">
              State <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.state}
              onValueChange={(value) =>
                handleSelectChange(
                  "state",
                  value,
                  setFormData,
                  setErrors,
                  setTouched
                )
              }
            >
              <SelectTrigger
                id="state"
                className={`${
                  touched.state && errors.state
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              >
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {usStates.map((state) => (
                  <SelectItem key={state.code} value={state.code}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {touched.state && errors.state && (
              <div className="flex items-center mt-1 text-red-500 text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.state}
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="postalCode" className="text-sm font-medium">
              ZIP / Postal Code <span className="text-red-500">*</span>
            </Label>
            <Input
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              onBlur={(e) => handleBlur(e, setTouched)}
              placeholder="10001"
              className={`${
                touched.postalCode && errors.postalCode
                  ? "border-red-500 focus-visible:ring-red-500"
                  : ""
              }`}
            />
            {touched.postalCode && errors.postalCode && (
              <div className="flex items-center mt-1 text-red-500 text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.postalCode}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium">
              Country <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.country}
              onValueChange={(value) =>
                handleSelectChange(
                  "country",
                  value,
                  setFormData,
                  setErrors,
                  setTouched
                )
              }
              disabled // Currently only shipping to US
            >
              <SelectTrigger id="country">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="US">United States</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Label className="text-sm font-medium">Address Type</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, addressType: "residential" })
              }
              className={`flex items-center p-3 rounded-lg border ${
                formData.addressType === "residential"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary hover:text-secondary-foreground"
              }`}
            >
              <Home
                className={`h-5 w-5 mr-2 ${
                  formData.addressType === "residential"
                    ? "text-primary"
                    : "text-secondary"
                }`}
              />
              <div className="text-left">
                <div
                  className={`font-medium ${
                    formData.addressType === "residential"
                      ? "text-primary"
                      : "text-secondary"
                  }`}
                >
                  Residential
                </div>
                <div className="text-xs">Home or apartment</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, addressType: "business" })
              }
              className={`flex items-center p-3 rounded-lg border ${
                formData.addressType === "business"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary hover:text-secondary-foreground"
              }`}
            >
              <Building
                className={`h-5 w-5 mr-2 ${
                  formData.addressType === "business"
                    ? "text-primary"
                    : "text-secondary"
                }`}
              />
              <div className="text-left">
                <div
                  className={`font-medium ${
                    formData.addressType === "business"
                      ? "text-primary"
                      : "text-secondary"
                  }`}
                >
                  Business
                </div>
                <div className="text-xs">Office or retail location</div>
              </div>
            </button>
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <Label className="text-sm font-medium">Shipping Method</Label>
          <RadioGroup
            value={formData.shippingMethod}
            onValueChange={(value) =>
              setFormData({ ...formData, shippingMethod: value as any })
            }
            className="mt-2"
          >
            <div className="space-y-3">
              {shippingMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center space-x-3 rounded-lg border p-4 ${
                    formData.shippingMethod === method.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-secondary hover:text-secondary-foreground"
                  }`}
                >
                  <RadioGroupItem
                    value={method.id}
                    id={method.id}
                    className="mt-0.5"
                  />
                  <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span
                          className={`mr-2 ${
                            formData.shippingMethod === method.id
                              ? "bg-primary"
                              : "bg-secondary"
                          }`}
                        >
                          <method.icon />
                        </span>
                        <div>
                          <div className="font-medium">{method.title}</div>
                          <div className="text-sm">{method.description}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{method.price}</div>
                        <div className="text-xs">
                          Est. delivery: {method.estimatedDelivery}
                        </div>
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-start space-x-2 pt-3">
          <Checkbox
            id="saveAddress"
            checked={formData.saveAddress}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, saveAddress: checked as boolean })
            }
            className="mt-1"
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="saveAddress"
              className="text-sm font-normal leading-snug"
            >
              Save this address for future orders
            </Label>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" className="w-full">
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
}
