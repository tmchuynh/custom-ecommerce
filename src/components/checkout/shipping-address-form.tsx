"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShippingAddressFormProps } from "@/lib/types";

const ShippingAddressForm = ({
  shippingAddress,
  setShippingAddress,
  shippingCity,
  setShippingCity,
  shippingState,
  setShippingState,
  shippingZip,
  setShippingZip,
  touchedFields,
  formErrors,
  handleBlur,
}: ShippingAddressFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="shippingAddress">Street Address</Label>
          <Input
            id="shippingAddress"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            onBlur={() => handleBlur("shippingAddress")}
            className={
              touchedFields.shippingAddress && formErrors.shippingAddress
                ? "border-red-500"
                : ""
            }
            placeholder="123 Main St"
          />
          {touchedFields.shippingAddress && formErrors.shippingAddress && (
            <p className="text-sm text-red-500 mt-1">
              {formErrors.shippingAddress}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="shippingCity">City</Label>
            <Input
              id="shippingCity"
              value={shippingCity}
              onChange={(e) => setShippingCity(e.target.value)}
              placeholder="Anytown"
            />
          </div>

          <div>
            <Label htmlFor="shippingState">State</Label>
            <Input
              id="shippingState"
              value={shippingState}
              onChange={(e) => setShippingState(e.target.value)}
              placeholder="CA"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="shippingZip">ZIP Code</Label>
          <Input
            id="shippingZip"
            value={shippingZip}
            onChange={(e) => setShippingZip(e.target.value)}
            placeholder="12345"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingAddressForm;
