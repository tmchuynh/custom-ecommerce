"use client";

import { useCart } from "@/app/context/cartContext";
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
            <span>${subtotal.toFixed(2)}</span>
          </div>

          {discountApplied && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>{capitalize(shippingMethod)} Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          {/* Only show international fee if it's applicable */}
          {isInternational && internationalFee > 0 && (
            <div className="flex justify-between">
              <span>International Shipping Fee</span>
              <span>${internationalFee.toFixed(2)}</span>
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
            <span>${discountedTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
