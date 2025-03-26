"use client";

import { useCart } from "@/app/context/cartContext";
import { useCurrency } from "@/app/context/CurrencyContext";
import { useProduct } from "@/app/context/productContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderSummaryProps } from "@/lib/types";
import { capitalize } from "@/lib/utils";
import { useEffect, useState } from "react";

const OrderSummary = ({
  subtotal,
  tax,
  shippingMethod,
  shipping,
  internationalFee = 0,
  isInternational = false,
  discountApplied,
  discountAmount,
  discountedTotal,
  newDate,
  shippingCountry,
}: OrderSummaryProps) => {
  const { getDeliveryDescription, getDeliveryEstimateText } = useCart();

  const [deliveryInfo, setDeliveryInfo] = useState("");
  const { selectedCurrency } = useCurrency();
  const { convertPrice } = useProduct();

  // Update delivery info whenever shipping method or country changes
  useEffect(() => {
    // Pass the actual shipping country code instead of selectedCurrency.code
    const description = getDeliveryDescription(
      shippingMethod,
      newDate,
      shippingCountry
    );
    setDeliveryInfo(description);
  }, [shippingMethod, shippingCountry, newDate, getDeliveryDescription]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{convertPrice(subtotal, selectedCurrency)}</span>
          </div>

          {discountApplied && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-{convertPrice(discountAmount, selectedCurrency)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Tax</span>
            <span>{convertPrice(tax, selectedCurrency)}</span>
          </div>

          {!isInternational && internationalFee === 0 && (
            <div className="flex justify-between">
              <span>{capitalize(shippingMethod)} Shipping Fee</span>
              <span>{convertPrice(shipping, selectedCurrency)}</span>
            </div>
          )}

          {/* Only show international fee if it's applicable */}
          {isInternational && internationalFee > 0 && (
            <div className="flex justify-between">
              <span>International Shipping Fee</span>
              <span>{convertPrice(internationalFee, selectedCurrency)}</span>
            </div>
          )}

          <div className="flex justify-between items-start">
            <span>Estimated Delivery</span>
            <span className="text-right flex flex-col items-end">
              {getDeliveryEstimateText(shippingCountry)}
              <div
                className="text-xs text-muted-foreground flex-wrap flex w-5/6 m-0 mt-1"
                id="deliveryInfo"
              >
                {deliveryInfo}
              </div>
            </span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>{convertPrice(discountedTotal, selectedCurrency)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
