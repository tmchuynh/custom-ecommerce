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
import { generateMonths, generateYears } from "@/lib/utils/generate";
import {
  handleInputChange,
  handleFormSubmit,
  handleBlur,
  handleSelectChange,
} from "@/lib/utils/utils";
import { validateField } from "@/lib/utils/validation";

import Image from "next/image";
import { useState } from "react";
import { FaCreditCard, FaInfo, FaLock } from "react-icons/fa";
import { IoIosAlert } from "react-icons/io";

const months = generateMonths();
const years = generateYears();

/**
 * A form component for handling payment information during checkout.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Callback function called when form is successfully submitted
 * @param {number} props.total - Total amount to be charged
 * @param {string} props.billingAddress - Billing street address
 * @param {string} props.billingCity - Billing city
 * @param {string} props.billingState - Billing state
 * @param {string} props.billingZip - Billing ZIP code
 *
 * @returns A payment form that supports credit card and PayPal payment methods
 *
 * Features:
 * - Credit card and PayPal payment options
 * - Real-time credit card type detection
 * - Card number formatting and validation
 * - Expiry date validation
 * - CVC validation with card-specific rules
 * - Option to save payment information
 * - Option to use shipping address as billing address
 * - Secure payment processing
 * - Error handling and display
 * - Responsive design
 *
 * Supported credit cards:
 * - Visa
 * - Mastercard
 * - American Express
 * - Discover
 * - Diners Club
 * - JCB
 * - UnionPay
 */
export default function PaymentInfoForm({
  onSubmit,
  total,
  billingAddress,
  billingCity,
  billingState,
  billingZip,
}: PaymentInfoFormProps) {
  const { handlePaymentSubmission, paymentError } = usePayment();

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

  /**
   * Handles form input changes for payment information.
   * Specifically manages credit card number formatting, card type detection, and field validation.
   *
   * @param e - The React change event from the input element
   *
   * For card number inputs:
   * - Formats the card number
   * - Detects and sets the card type
   * - Updates form data with formatted value
   * - Validates the field
   *
   * For other inputs:
   * - Handles both text inputs and checkboxes
   * - Updates form data accordingly
   * - Validates non-checkbox fields
   *
   * @example
   * <input
   *   name="cardNumber"
   *   onChange={handleChange}
   *   value={formData.cardNumber}
   * />
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, setFormData, setErrors, setCardType, {
      expiryMonth: formData.expiryMonth,
      expiryYear: formData.expiryYear,
    });
  };

  /**
   * Handles the submission of the payment form.
   *
   * @param {React.FormEvent} e - The form submission event
   * @returns {Promise<void>} A promise that resolves when the payment submission is complete
   *
   * @description
   * This function processes payment form submissions with two possible flows:
   * 1. PayPal payments - directly calls onSubmit()
   * 2. Credit card payments - validates and processes card details
   *
   * For credit card payments, it:
   * - Formats card and billing information
   * - Attempts payment processing via handlePaymentSubmission()
   * - Handles successful payments by calling onSubmit()
   * - Handles errors by updating the error state
   *
   * @throws Will throw an error if payment processing fails
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (formData.paymentMethod === "paypal") {
      onSubmit();
      return;
    }

    const requiredFields: (keyof PaymentInfoData)[] = [
      "cardNumber",
      "nameOnCard",
      "expiryMonth",
      "expiryYear",
      "cvc",
    ];
    const isValid = handleFormSubmit(
      formData,
      requiredFields,
      validateField,
      setErrors,
      setTouched,
      async () => {
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
                country: "US",
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
      },
      { expiryMonth: formData.expiryMonth, expiryYear: formData.expiryYear }
    );

    if (!isValid) {
      setErrors((prev) => ({
        ...prev,
        cardNumber: "Please fix the errors above before submitting.",
      }));
    }
  };

  return (
    <div className="rounded-xl shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Payment Information</h2>
        <p className="text-sm">
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
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary hover:text-secondary-foreground"
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
                    <FaCreditCard
                      className={`h-5 w-5 mr-2 ${
                        formData.paymentMethod === "creditCard"
                          ? "text-primary"
                          : "text-secondary"
                      }`}
                    />
                    <div>
                      <div className="font-medium">Credit or Debit Card</div>
                      <div className="text-sm">All major cards accepted</div>
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
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary hover:text-secondary-foreground"
              }`}
            >
              <RadioGroupItem value="paypal" id="paypal" className="mt-0.5" />
              <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaCreditCard
                      className={`h-5 w-5 mr-2 ${
                        formData.paymentMethod === "paypal"
                          ? "text-primary"
                          : "text-secondary"
                      }`}
                    />
                    <div>
                      <div className="font-medium">PayPal</div>
                      <div className="text-sm">Fast and secure payments</div>
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
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 ">
                  <FaCreditCard className="h-4 w-4" />
                </div>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  onBlur={(e) => handleBlur(e, setTouched)}
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
                    <IoIosAlert className="h-3 w-3 mr-1" />
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
                onBlur={(e) => handleBlur(e, setTouched)}
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
                  <IoIosAlert className="h-3 w-3 mr-1" />
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
                    handleSelectChange(
                      "expiryMonth",
                      value,
                      setFormData,
                      setErrors,
                      setTouched
                    )
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
                    <IoIosAlert className="h-3 w-3 mr-1" />
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
                    handleSelectChange(
                      "expiryYear",
                      value,
                      setFormData,
                      setErrors,
                      setTouched
                    )
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
                    <IoIosAlert className="h-3 w-3 mr-1" />
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
                    className="text-xs"
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
                  onBlur={(e) => handleBlur(e, setTouched)}
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
                    <IoIosAlert className="h-3 w-3 mr-1" />
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
                  className="text-sm font-normal leading-snug"
                >
                  Save my payment information for future purchases
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                    Optional
                  </Badge>
                </Label>
                <p className="text-xs">
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
                  className="text-sm font-normal leading-snug"
                >
                  Billing address is the same as my shipping address
                </Label>
              </div>
            </div>
          </div>
        )}

        {formData.paymentMethod === "paypal" && (
          <div className="p-4 rounded-lg my-4">
            <div className="flex items-start">
              <FaInfo className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
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

        <div className="border-t hover:bg-secondary hover:text-secondary-foreground mt-6 pt-6">
          <div className="flex items-center mb-4 p-3 rounded-lg">
            <FaLock className="h-5 w-5 text-blue-600 mr-2" />
            <p className="text-sm text-blue-800">
              Your payment information is encrypted and secure.
            </p>
          </div>

          <Button type="submit" className="w-full">
            Place Order
          </Button>
        </div>
      </form>
    </div>
  );
}
