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
import ShippingMethodSelector from "@/components/ShippingMethodSelector";
import { currencyCountries } from "@/lib/countriesConstant";

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
            <FormLabel className="my-2 ml-2">Street Address</FormLabel>
            <Input
              placeholder="123 Main St"
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              onBlur={() => handleBlur("shippingAddress")}
              className={
                touchedFields.shippingAddress && formErrors.shippingAddress
                  ? "border-red-500"
                  : "border border-border"
              }
            />
            {touchedFields.shippingAddress && formErrors.shippingAddress && (
              <FormMessage className="mt-3 mx-2">
                {formErrors.shippingAddress}
              </FormMessage>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormLabel className="my-2 ml-2">City</FormLabel>
              <Input
                placeholder="City"
                value={shippingCity}
                onChange={(e) => setShippingCity(e.target.value)}
                onBlur={() => handleBlur("shippingCity")}
                className={
                  touchedFields.shippingCity && formErrors.shippingCity
                    ? "border-red-500"
                    : "border border-border"
                }
              />
              {touchedFields.shippingCity && formErrors.shippingCity && (
                <FormMessage className="mt-3 mx-2">
                  {formErrors.shippingCity}
                </FormMessage>
              )}
            </div>

            <div>
              <FormLabel className="my-2 ml-2">State/Province</FormLabel>
              <Input
                placeholder="State/Province"
                value={shippingState}
                onChange={(e) => setShippingState(e.target.value)}
                onBlur={() => handleBlur("shippingState")}
                className={
                  touchedFields.shippingState && formErrors.shippingState
                    ? "border-red-500"
                    : "border border-border"
                }
              />
              {touchedFields.shippingState && formErrors.shippingState && (
                <FormMessage className="mt-3 mx-2">
                  {formErrors.shippingState}
                </FormMessage>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormLabel className="my-2 ml-2">ZIP/Postal Code</FormLabel>
              <Input
                placeholder="ZIP/Postal Code"
                value={shippingZip}
                onChange={(e) => setShippingZip(e.target.value)}
                onBlur={() => handleBlur("shippingZip")}
                className={
                  touchedFields.shippingZip && formErrors.shippingZip
                    ? "border-red-500"
                    : "border border-border"
                }
              />
              {touchedFields.shippingZip && formErrors.shippingZip && (
                <FormMessage className="mt-3 mx-2">
                  {formErrors.shippingZip}
                </FormMessage>
              )}
            </div>

            <div>
              <FormLabel className="my-2 ml-2">Country</FormLabel>
              <Select
                value={shippingCountry}
                onValueChange={setShippingCountry}
              >
                <SelectTrigger
                  onBlur={() => handleBlur("shippingCountry")}
                  className={
                    touchedFields.shippingCountry && formErrors.shippingCountry
                      ? "border-red-500"
                      : "border border-border"
                  }
                >
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                {touchedFields.shippingCountry &&
                  formErrors.shippingCountry && (
                    <FormMessage className="mt-3 mx-2">
                      {formErrors.shippingCountry}
                    </FormMessage>
                  )}
                <SelectContent>
                  <SelectGroup>
                    {currencyCountries
                      .flatMap((country) => country.countries)
                      .map((subCountry) => (
                        <SelectItem
                          key={subCountry.value}
                          value={subCountry.value}
                        >
                          {subCountry.label}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <ShippingMethodSelector shippingCountry={shippingCountry} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShippingAddressForm;
