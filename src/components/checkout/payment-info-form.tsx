"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCreditCardNumber, getCardType } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { PaymentInfoFormProps } from "@/lib/types";
import ShippingMethodSelector from "@/components/ShippingMethodSelector";
import { Separator } from "@/components/ui/separator";

const PaymentInfoForm = ({
  cardNumber,
  setCardNumber,
  cardType,
  setCardType,
  cardExpiry,
  setCardExpiry,
  cardCvv,
  setCardCvv,
  billingAddress,
  setBillingAddress,
  billingCity,
  setBillingCity,
  billingState,
  setBillingState,
  billingZip,
  setBillingZip,
  sameAsShipping,
  setSameAsShipping,
  touchedFields,
  formErrors,
  handleBlur,
}: PaymentInfoFormProps) => {
  // Handle credit card number change with formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const digitsOnly = inputValue.replace(/\D/g, "").slice(0, 16);
    setCardNumber(digitsOnly);
    setCardType(getCardType(digitsOnly) || "");
    e.target.value = formatCreditCardNumber(digitsOnly);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Information</CardTitle>
        <CardDescription className="pt-3 flex gap-3 items-center">
          {["discover", "mastercard", "visa", "americanexpress"].map(
            (card, index) => (
              <Image
                src={`/images/paymentInformation/${card}.svg`}
                alt={`${card}`}
                width={40}
                height={40}
                key={index}
              />
            )
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <div className="mt-2">
            <Input
              id="cardNumber"
              value={formatCreditCardNumber(cardNumber)}
              onChange={handleCardNumberChange}
              onBlur={() => handleBlur("cardNumber")}
              className={
                touchedFields.cardNumber && formErrors.cardNumber
                  ? "border-red-500"
                  : ""
              }
              placeholder="1234 5678 9012 3456"
            />
          </div>
          {!formErrors.cardNumber && cardType && (
            <p className="text-sm text-gray-500 mt-3 mx-2">{cardType}</p>
          )}
          {touchedFields.cardNumber && formErrors.cardNumber && (
            <p className="text-sm text-red-500 mt-1">{formErrors.cardNumber}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="cardExpiry">Expiration Date (MM/YY)</Label>
            <Input
              id="cardExpiry"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
              onBlur={() => handleBlur("cardExpiry")}
              className={
                touchedFields.cardExpiry && formErrors.cardExpiry
                  ? "border-red-500"
                  : ""
              }
              placeholder="MM/YY"
            />
            {touchedFields.cardExpiry && formErrors.cardExpiry && (
              <p className="text-sm text-red-500 mt-1">
                {formErrors.cardExpiry}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="cardCvv">CVV</Label>
            <Input
              id="cardCvv"
              value={cardCvv}
              onChange={(e) => setCardCvv(e.target.value)}
              onBlur={() => handleBlur("cardCvv")}
              className={
                touchedFields.cardCvv && formErrors.cardCvv
                  ? "border-red-500"
                  : ""
              }
              placeholder="123"
            />
            {touchedFields.cardCvv && formErrors.cardCvv && (
              <p className="text-sm text-red-500 mt-1">{formErrors.cardCvv}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 py-2">
          <Checkbox
            id="sameAsShipping"
            checked={sameAsShipping}
            onCheckedChange={(checked) => setSameAsShipping(checked as boolean)}
          />
          <Label htmlFor="sameAsShipping">
            Billing address same as shipping address
          </Label>
        </div>

        {!sameAsShipping && (
          <div className="space-y-4 pt-4 border-t">
            <h3 className="text-md font-medium">Billing Address</h3>

            <div>
              <Label htmlFor="billingAddress">Street Address</Label>
              <Input
                id="billingAddress"
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                placeholder="123 Main St"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="billingCity">City</Label>
                <Input
                  id="billingCity"
                  value={billingCity}
                  onChange={(e) => setBillingCity(e.target.value)}
                  placeholder="Anytown"
                />
              </div>

              <div>
                <Label htmlFor="billingState">State</Label>
                <Input
                  id="billingState"
                  value={billingState}
                  onChange={(e) => setBillingState(e.target.value)}
                  placeholder="CA"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="billingZip">ZIP Code</Label>
              <Input
                id="billingZip"
                value={billingZip}
                onChange={(e) => setBillingZip(e.target.value)}
                placeholder="12345"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentInfoForm;
