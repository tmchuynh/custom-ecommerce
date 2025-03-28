"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Mail, User, Phone, AlertCircle } from "lucide-react";

interface CustomerInfoFormProps {
  onSubmit: (data: CustomerInfoData) => void;
  defaultValues?: CustomerInfoData;
}

export interface CustomerInfoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  marketingConsent: boolean;
}

export default function CustomerInfoForm({
  onSubmit,
  defaultValues,
}: CustomerInfoFormProps) {
  const [formData, setFormData] = useState<CustomerInfoData>(
    defaultValues || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      marketingConsent: false,
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    if (name === "firstName" || name === "lastName") {
      return value.trim() === ""
        ? `${name === "firstName" ? "First" : "Last"} name is required`
        : "";
    }

    if (name === "email") {
      if (value.trim() === "") return "Email is required";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailPattern.test(value)
        ? "Please enter a valid email address"
        : "";
    }

    if (name === "phone") {
      if (value.trim() === "") return "Phone number is required";
      const phonePattern = /^\+?[0-9]{10,15}$/;
      return !phonePattern.test(value.replace(/[^0-9]/g, ""))
        ? "Please enter a valid phone number"
        : "";
    }

    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (type !== "checkbox") {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const formErrors: Record<string, string> = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof CustomerInfoData>).forEach((key) => {
      if (key !== "marketingConsent") {
        const error = validateField(key, formData[key] as string);
        if (error) {
          formErrors[key] = error;
          isValid = false;
        }
      }
    });

    setErrors(formErrors);

    // Mark all fields as touched
    const touchedFields: Record<string, boolean> = {};
    (Object.keys(formData) as Array<keyof CustomerInfoData>).forEach((key) => {
      touchedFields[key] = true;
    });
    setTouched(touchedFields);

    if (isValid) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Customer Information
        </h2>
        <p className="text-sm text-gray-600">
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
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <User className="h-4 w-4" />
              </div>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John"
                className={`pl-10 ${
                  touched.firstName && errors.firstName
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {touched.firstName && errors.firstName && (
                <div className="flex items-center mt-1 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
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
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <User className="h-4 w-4" />
              </div>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
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
                  <AlertCircle className="h-3 w-3 mr-1" />
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
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Mail className="h-4 w-4" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="john.doe@example.com"
                className={`pl-10 ${
                  touched.email && errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {touched.email && errors.email && (
                <div className="flex items-center mt-1 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">
              We'll send your order confirmation here
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Phone className="h-4 w-4" />
              </div>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="(555) 123-4567"
                className={`pl-10 ${
                  touched.phone && errors.phone
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {touched.phone && errors.phone && (
                <div className="flex items-center mt-1 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.phone}
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">
              For delivery updates and order questions
            </p>
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
                className="text-sm font-normal text-gray-700 leading-snug"
              >
                Keep me updated about new products, promotions, and exclusive
                offers
                <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                  Optional
                </Badge>
              </Label>
              <p className="text-xs text-gray-500">
                We respect your privacy and will never share your information
                with third parties.
              </p>
            </div>
          </div>

          <div className="pt-3">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continue to Shipping
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
