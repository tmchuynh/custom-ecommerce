"use client";

import { useCart } from "@/app/context/cartContext";
import { useCurrency } from "@/app/context/CurrencyContext";
import { useProduct } from "@/app/context/productContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderSummaryProps } from "@/lib/types";
import { capitalize } from "@/lib/utils";

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
}: OrderSummaryProps) => {
  const { getDeliveryWindowEndDate } = useCart();
  const { selectedCurrency } = useCurrency();
  const { convertPrice } = useProduct();

  // Calculate the delivery window end date based on shipping method
  const deliveryWindowEnd = getDeliveryWindowEndDate(shippingMethod, newDate);

  // Format dates for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Generate the delivery estimate text based on shipping method
  const getDeliveryEstimateText = () => {
    switch (shippingMethod) {
      case "overnight":
        return formatDate(newDate);
      case "express":
      case "standard":
        return `${formatDate(newDate)} - ${formatDate(deliveryWindowEnd)}`;
      default:
        return formatDate(newDate);
    }
  };

  // Delivery description based on shipping method
  const getDeliveryDescription = () => {
    switch (shippingMethod) {
      case "overnight":
        return "Next business day";
      case "express":
        return "2-4 business days";
      case "standard":
        return "5-7 business days";
    }
  };

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

          <div className="flex justify-between">
            <span>{capitalize(shippingMethod)} Shipping</span>
            <span>{convertPrice(shipping, selectedCurrency)}</span>
          </div>

          {/* Only show international fee if it's applicable */}
          {isInternational && internationalFee > 0 && (
            <div className="flex justify-between">
              <span>
                International {capitalize(shippingMethod)} Shipping Fee
              </span>
              <span>{convertPrice(internationalFee, selectedCurrency)}</span>
            </div>
          )}

          <div className="flex justify-between items-start">
            <span>Estimated Delivery</span>
            <span className="text-right">
              {getDeliveryEstimateText()}
              <div className="text-xs text-muted-foreground mt-1">
                {getDeliveryDescription()}
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
