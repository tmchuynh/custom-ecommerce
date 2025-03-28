"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPhoneNumber } from "@/lib/utils";
import { CustomerInfoFormProps } from "@/lib/types";

const CustomerInfoForm = ({
  customerName,
  setCustomerName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  touchedFields,
  formErrors,
  handleBlur,
}: CustomerInfoFormProps) => {
  // Handle phone number change with formatting
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const digitsOnly = inputValue.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(digitsOnly);

    // Set the formatted value back to the input
    e.target.value = formatPhoneNumber(digitsOnly);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="name" className="my-2 ml-2">
            Full Name
          </Label>
          <Input
            id="name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            onBlur={() => handleBlur("name")}
            className={
              touchedFields.name && formErrors.name
                ? "border-red-500"
                : "border border-border"
            }
            placeholder="John Doe"
          />
          {touchedFields.name && formErrors.name && (
            <p className="text-sm text-red-500 mt-3 mx-2">{formErrors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="my-2 ml-2">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur("email")}
            className={
              touchedFields.email && formErrors.email
                ? "border-red-500"
                : "border border-border"
            }
            placeholder="john.doe@example.com"
          />
          {touchedFields.email && formErrors.email && (
            <p className="text-sm text-red-500 mt-3 mx-2">{formErrors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="my-2 ml-2">
            Phone Number
          </Label>
          <div className="mt-2">
            <Input
              id="phone"
              value={formatPhoneNumber(phoneNumber)}
              onChange={handlePhoneChange}
              onBlur={() => handleBlur("phone")}
              className={
                touchedFields.phone && formErrors.phone
                  ? "border-red-500"
                  : "border border-border"
              }
              placeholder="(123) 456-7890"
            />
          </div>
          {touchedFields.phone && formErrors.phone && (
            <p className="text-sm text-red-500 mt-3 mx-2">{formErrors.phone}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfoForm;
