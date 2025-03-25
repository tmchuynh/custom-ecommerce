"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShippingAddressFormProps } from "@/lib/types";
import { FormLabel, FormMessage } from "../ui/form";
import { countries } from "@/lib/constants";

const ShippingAddressForm = ({
  shippingAddress,
  setShippingAddress,
  shippingCity,
  setShippingCity,
  shippingState,
  setShippingState,
  shippingZip,
  setShippingZip,
  shippingCountry,
  setShippingCountry,
  touchedFields,
  formErrors,
  handleBlur,
}: ShippingAddressFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Address</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <FormLabel>Street Address</FormLabel>
            <Input
              placeholder="123 Main St"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              onBlur={() => handleBlur("shippingAddress")}
              className={
                touchedFields.shippingAddress && formErrors.shippingAddress
                  ? "border-red-500"
                  : ""
              }
            />
            {touchedFields.shippingAddress && formErrors.shippingAddress && (
              <FormMessage>{formErrors.shippingAddress}</FormMessage>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormLabel>City</FormLabel>
              <Input
                placeholder="City"
                value={shippingCity}
                onChange={(e) => setShippingCity(e.target.value)}
              />
            </div>

            <div>
              <FormLabel>State/Province</FormLabel>
              <Input
                placeholder="State/Province"
                value={shippingState}
                onChange={(e) => setShippingState(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormLabel>ZIP/Postal Code</FormLabel>
              <Input
                placeholder="ZIP/Postal Code"
                value={shippingZip}
                onChange={(e) => setShippingZip(e.target.value)}
              />
            </div>

            <div>
              <FormLabel>Country</FormLabel>
              <Select
                value={shippingCountry}
                onValueChange={setShippingCountry}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingAddressForm;
