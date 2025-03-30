"use client";

import { usePayment } from "@/app/context/paymentContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentInfoData } from "@/lib/interfaces";
import { PaymentInfoFormProps } from "@/lib/types";
import { AlertCircle, CreditCard, Info, Lock } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Generate month and year options
const generateMonths = () => {
  return Array.from({ length: 12 }, (_, i) => {
    const month = (i + 1).toString().padStart(2, "0");
    return { value: month, label: month };
  });
};

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => {
    const year = (currentYear + i).toString();
    return { value: year, label: year };
  });
};

const months = generateMonths();
const years = generateYears();

export default function PaymentInfoForm({
  onSubmit,
  total,
  billingAddress,
  billingCity,
  billingState,
  billingZip,
}: PaymentInfoFormProps) {
  const { handlePaymentSubmission, paymentError, validateCardDetails } =
    usePayment();

  const [formData, setFormData] = useState<PaymentInfoData>({
    paymentMethod: "creditCard",
    cardNumber: "",
    nameOnCard: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    savePaymentInfo: false,
    billingAddressSameAsShipping: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [cardType, setCardType] = useState<string>("");

  // Helper function to detect card type with expanded card support
  const detectCardType = (cardNumber: string) => {
    // Remove spaces and dashes
    const cleanNumber = cardNumber.replace(/[\s-]/g, "");

    // Visa
    if (/^4/.test(cleanNumber)) return "visa";

    // Mastercard
    if (/^(5[1-5]|2[2-7])/.test(cleanNumber)) return "mastercard";

    // American Express
    if (/^3[47]/.test(cleanNumber)) return "amex";

    // Discover
    if (
      /^(6011|65|64[4-9]|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]))/.test(
        cleanNumber
      )
    )
      return "discover";

    // Diners Club
    if (/^3(0[0-5]|[68])/.test(cleanNumber)) return "diners";

    // JCB
    if (/^35/.test(cleanNumber)) return "jcb";

    // UnionPay
    if (/^62/.test(cleanNumber)) return "unionpay";

    return "";
  };

  // Format the credit card number as the user types
  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, "");

    // Limit to 16 digits
    const limited = cleaned.slice(0, 16);

    // Format with spaces
    let formatted = "";
    for (let i = 0; i < limited.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += " ";
      }
      formatted += limited[i];
    }

    return formatted;
  };

  const validateField = (name: string, value: string) => {
    if (name === "cardNumber") {
      if (value.trim() === "") return "Card number is required";
      const cardIssuer = detectCardType(value);
      const isValid = validateCardDetails({
        number: value,
        expirationDate: formData.expiryMonth + "/" + formData.expiryYear,
        cvv: formData.cvc,
        issuer: cardIssuer || "unknown",
      });
      if (!isValid) return paymentError || "Invalid card number";
      return "";
    }
    switch (name) {
      case "nameOnCard":
        return value.trim() === "" ? "Name on card is required" : "";

      case "expiryMonth":
      case "expiryYear":
        if (value === "")
          return `Expiry ${
            name === "expiryMonth" ? "month" : "year"
          } is required`;

        // If both month and year are filled, check that the date is in the future
        if (formData.expiryMonth && formData.expiryYear) {
          const expiryDate = new Date();
          expiryDate.setFullYear(
            parseInt(formData.expiryYear),
            parseInt(formData.expiryMonth) - 1,
            expiryDate.getDate()
          );

          const currentDate = new Date();
          if (expiryDate < currentDate)
            return "Card expiration date has passed";
        }
        return "";

      case "cvc":
        if (value.trim() === "") return "CVC is required";
        if (!/^\d+$/.test(value)) return "CVC must contain only digits";
        if (cardType === "amex" && value.length !== 4)
          return "CVC must be 4 digits for American Express";
        if (cardType !== "amex" && value.length !== 3)
          return "CVC must be 3 digits";
        return "";

      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name === "cardNumber") {
      const formattedValue = formatCardNumber(value);
      const detectedType = detectCardType(formattedValue);
      setCardType(detectedType);

      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));

      const error = validateField(name, formattedValue);
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      const newValue = type === "checkbox" ? checked : value;

      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));

      if (type !== "checkbox") {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
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

    // Revalidate expiry date whenever month or year changes
    if (name === "expiryMonth" || name === "expiryYear") {
      if (formData.expiryMonth && formData.expiryYear) {
        const monthError = validateField("expiryMonth", formData.expiryMonth);
        const yearError = validateField("expiryYear", formData.expiryYear);
        setErrors((prev) => ({
          ...prev,
          expiryMonth: monthError,
          expiryYear: yearError,
        }));
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.paymentMethod === "paypal") {
      onSubmit();
      return;
    }

    try {
      const paymentData = {
        cardDetails: {
          number: formData.cardNumber,
          expirationDate: `${formData.expiryMonth}/${formData.expiryYear}`,
          cvv: formData.cvc,
          issuer: cardType || "unknown",
        },
        amount: total,
        billingAddress: formData.billingAddressSameAsShipping
          ? undefined
          : {
              address: billingAddress,
              city: billingCity,
              state: billingState,
              zipCode: billingZip,
              country: "US", // Add proper country selection if needed
            },
      };

      const result = await handlePaymentSubmission(paymentData);

      if (result) {
        onSubmit();
      } else {
        setErrors((prev) => ({
          ...prev,
          cardNumber: paymentError || "Payment failed",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        cardNumber: error instanceof Error ? error.message : "Payment failed",
      }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Payment Information
        </h2>
        <p className="text-sm text-gray-600">
          Please select your preferred payment method and enter your details
          securely.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <RadioGroup
          value={formData.paymentMethod}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              paymentMethod: value as "creditCard" | "paypal",
            })
          }
          className="mb-4"
        >
          <div className="space-y-3">
            <div
              className={`flex items-center space-x-3 rounded-lg border p-4 ${
                formData.paymentMethod === "creditCard"
                  ? "bg-blue-50 border-blue-200"
                  : "border-gray-200"
              }`}
            >
              <RadioGroupItem
                value="creditCard"
                id="creditCard"
                className="mt-0.5"
              />
              <Label htmlFor="creditCard" className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard
                      className={`h-5 w-5 mr-2 ${
                        formData.paymentMethod === "creditCard"
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                    />
                    <div>
                      <div className="font-medium">Credit or Debit Card</div>
                      <div className="text-sm text-gray-500">
                        All major cards accepted
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Image
                        src="/visa.svg"
                        alt="Visa"
                        width={24}
                        height={24}
                        className="h-6 w-auto"
                      />
                      <Image
                        src="/mastercard.svg"
                        alt="Mastercard"
                        width={24}
                        height={24}
                        className="h-6 w-auto"
                      />
                      <Image
                        src="/amex.svg"
                        alt="American Express"
                        width={24}
                        height={24}
                        className="h-6 w-auto"
                      />
                      <Image
                        src="/discover.svg"
                        alt="Discover"
                        width={24}
                        height={24}
                        className="h-6 w-auto"
                      />
                    </div>
                  </div>
                </div>
              </Label>
            </div>

            <div
              className={`flex items-center space-x-3 rounded-lg border p-4 ${
                formData.paymentMethod === "paypal"
                  ? "bg-blue-50 border-blue-200"
                  : "border-gray-200"
              }`}
            >
              <RadioGroupItem value="paypal" id="paypal" className="mt-0.5" />
              <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CreditCard
                      className={`h-5 w-5 mr-2 ${
                        formData.paymentMethod === "paypal"
                          ? "text-blue-500"
                          : "text-gray-400"
                      }`}
                    />
                    <div>
                      <div className="font-medium">PayPal</div>
                      <div className="text-sm text-gray-500">
                        Fast and secure payments
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Image
                      src="/paypal.svg"
                      alt="PayPal"
                      width={24}
                      height={24}
                      className="h-6 w-auto"
                    />
                  </div>
                </div>
              </Label>
            </div>
          </div>
        </RadioGroup>

        {formData.paymentMethod === "creditCard" && (
          <div className="space-y-5 pt-2">
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-sm font-medium">
                Card Number <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <CreditCard className="h-4 w-4" />
                </div>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="4111 1111 1111 1111"
                  autoComplete="cc-number"
                  className={`pl-10 ${
                    touched.cardNumber && errors.cardNumber
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {cardType && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Image
                      src={`/${cardType}.svg`}
                      alt={cardType}
                      width={24}
                      height={24}
                      className="h-6 w-auto"
                    />
                  </div>
                )}
                {touched.cardNumber && errors.cardNumber && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.cardNumber}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nameOnCard" className="text-sm font-medium">
                Name on Card <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nameOnCard"
                name="nameOnCard"
                value={formData.nameOnCard}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                autoComplete="cc-name"
                className={`${
                  touched.nameOnCard && errors.nameOnCard
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }`}
              />
              {touched.nameOnCard && errors.nameOnCard && (
                <div className="flex items-center mt-1 text-red-500 text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.nameOnCard}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2 col-span-1">
                <Label htmlFor="expiryMonth" className="text-sm font-medium">
                  Month <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.expiryMonth}
                  onValueChange={(value) =>
                    handleSelectChange("expiryMonth", value)
                  }
                >
                  <SelectTrigger
                    id="expiryMonth"
                    className={`${
                      touched.expiryMonth && errors.expiryMonth
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {touched.expiryMonth && errors.expiryMonth && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.expiryMonth}
                  </div>
                )}
              </div>

              <div className="space-y-2 col-span-1">
                <Label htmlFor="expiryYear" className="text-sm font-medium">
                  Year <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.expiryYear}
                  onValueChange={(value) =>
                    handleSelectChange("expiryYear", value)
                  }
                >
                  <SelectTrigger
                    id="expiryYear"
                    className={`${
                      touched.expiryYear && errors.expiryYear
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }`}
                  >
                    <SelectValue placeholder="YYYY" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year.value} value={year.value}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {touched.expiryYear && errors.expiryYear && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.expiryYear}
                  </div>
                )}
              </div>

              <div className="space-y-2 col-span-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="cvc" className="text-sm font-medium">
                    CVC <span className="text-red-500">*</span>
                  </Label>
                  <button
                    type="button"
                    className="text-xs text-blue-600 hover:underline"
                    onClick={() =>
                      alert(
                        "The CVC is the 3-digit code on the back of Visa, MasterCard, and Discover cards. For American Express, it's the 4-digit code on the front."
                      )
                    }
                  >
                    What's this?
                  </button>
                </div>
                <Input
                  id="cvc"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={cardType === "amex" ? "1234" : "123"}
                  autoComplete="cc-csc"
                  maxLength={cardType === "amex" ? 4 : 3}
                  className={`${
                    touched.cvc && errors.cvc
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }`}
                />
                {touched.cvc && errors.cvc && (
                  <div className="flex items-center mt-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.cvc}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-2 pt-2">
              <Checkbox
                id="savePaymentInfo"
                checked={formData.savePaymentInfo}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    savePaymentInfo: checked as boolean,
                  })
                }
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="savePaymentInfo"
                  className="text-sm font-normal text-gray-700 leading-snug"
                >
                  Save my payment information for future purchases
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                    Optional
                  </Badge>
                </Label>
                <p className="text-xs text-gray-500">
                  Your card data will be encrypted and stored securely.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="billingAddressSameAsShipping"
                checked={formData.billingAddressSameAsShipping}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    billingAddressSameAsShipping: checked as boolean,
                  })
                }
                className="mt-1"
              />
              <div className="grid gap-1.5 leading-none">
                <Label
                  htmlFor="billingAddressSameAsShipping"
                  className="text-sm font-normal text-gray-700 leading-snug"
                >
                  Billing address is the same as my shipping address
                </Label>
              </div>
            </div>
          </div>
        )}

        {formData.paymentMethod === "paypal" && (
          <div className="bg-blue-50 p-4 rounded-lg my-4">
            <div className="flex items-start">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">
                  You'll be redirected to PayPal to complete your purchase
                </h3>
                <p className="text-sm text-blue-600 mt-1">
                  After clicking "Place Order", you'll be taken to PayPal to
                  securely complete your payment.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="flex items-center mb-4 bg-blue-50 p-3 rounded-lg">
            <Lock className="h-5 w-5 text-blue-600 mr-2" />
            <p className="text-sm text-blue-800">
              Your payment information is encrypted and secure.
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
}
