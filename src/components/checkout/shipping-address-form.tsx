"use client";

import { useState } from "react";
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
import {
  AlertCircle,
  MapPin,
  Home,
  Building,
  Truck,
  Package,
} from "lucide-react";
import { ShippingAddressFormProps } from "@/lib/types";
import { usStates } from "@/lib/constants";
import { ShippingAddressData } from "@/lib/interfaces";

// List of shipping methods
const shippingMethods = [
  {
    id: "standard",
    title: "Standard Shipping",
    description: "3-5 business days",
    price: "Free",
    icon: <Truck className="h-5 w-5" />,
    estimatedDelivery: "Jul 27 - Jul 29",
  },
  {
    id: "express",
    title: "Express Shipping",
    description: "2-3 business days",
    price: "$9.99",
    icon: <Truck className="h-5 w-5" />,
    estimatedDelivery: "Jul 25 - Jul 26",
  },
  {
    id: "overnight",
    title: "Overnight Shipping",
    description: "Next business day",
    price: "$19.99",
    icon: <Package className="h-5 w-5" />,
    estimatedDelivery: "Jul 24",
  },
];

export default function ShippingAddressForm({
  onSubmit,
}: ShippingAddressFormProps) {
  const [formData, setFormData] = useState<ShippingAddressData>({
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

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "addressLine1":
        return value.trim() === "" ? "Address is required" : "";
      case "city":
        return value.trim() === "" ? "City is required" : "";
      case "state":
        return value.trim() === "" ? "State is required" : "";
      case "postalCode":
        if (value.trim() === "") return "Postal code is required";
        const zipPattern = /^\d{5}(-\d{4})?$/;
        return !zipPattern.test(value)
          ? "Please enter a valid postal code (e.g., 12345 or 12345-6789)"
          : "";
      default:
        return "";
    }
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

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const formErrors: Record<string, string> = {};
    let isValid = true;

    // Only validate required fields
    const requiredFields = ["addressLine1", "city", "state", "postalCode"];

    requiredFields.forEach((field) => {
      const error = validateField(
        field,
        formData[field as keyof ShippingAddressData] as string
      );
      if (error) {
        formErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(formErrors);

    // Mark all required fields as touched
    const touchedFields: Record<string, boolean> = {};
    requiredFields.forEach((field) => {
      touchedFields[field] = true;
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
          Shipping Address
        </h2>
        <p className="text-sm text-gray-600">
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
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <MapPin className="h-4 w-4" />
            </div>
            <Input
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleChange}
              onBlur={handleBlur}
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
            <Badge className="ml-2 bg-gray-100 text-gray-800 hover:bg-gray-100">
              Optional
            </Badge>
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
              onBlur={handleBlur}
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
              onValueChange={(value) => handleSelectChange("state", value)}
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
              onBlur={handleBlur}
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
              onValueChange={(value) => handleSelectChange("country", value)}
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
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Home
                className={`h-5 w-5 mr-2 ${
                  formData.addressType === "residential"
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
              />
              <div className="text-left">
                <div
                  className={`font-medium ${
                    formData.addressType === "residential"
                      ? "text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  Residential
                </div>
                <div className="text-xs text-gray-500">Home or apartment</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData({ ...formData, addressType: "business" })
              }
              className={`flex items-center p-3 rounded-lg border ${
                formData.addressType === "business"
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Building
                className={`h-5 w-5 mr-2 ${
                  formData.addressType === "business"
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
              />
              <div className="text-left">
                <div
                  className={`font-medium ${
                    formData.addressType === "business"
                      ? "text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  Business
                </div>
                <div className="text-xs text-gray-500">
                  Office or retail location
                </div>
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
                      ? "bg-blue-50 border-blue-200"
                      : "border-gray-200"
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
                              ? "text-blue-500"
                              : "text-gray-400"
                          }`}
                        >
                          {method.icon}
                        </span>
                        <div>
                          <div className="font-medium">{method.title}</div>
                          <div className="text-sm text-gray-500">
                            {method.description}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{method.price}</div>
                        <div className="text-xs text-gray-500">
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
              className="text-sm font-normal text-gray-700 leading-snug"
            >
              Save this address for future orders
            </Label>
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
}
