"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderSummaryProps } from "@/lib/types";
import { capitalize } from "@/lib/utils";

const OrderSummary = ({
  subtotal,
  tax,
  shippingMethod,
  shipping,
  discountApplied,
  discountAmount,
  discountedTotal,
  newDate,
  isFormValid,
  handleCheckout,
}: OrderSummaryProps) => {
  // Calculate the delivery window end date (3 days after estimated delivery)
  const deliveryWindowEnd = new Date(newDate);
  deliveryWindowEnd.setDate(newDate.getDate() + 3);

  // Format dates for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
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

          <div className="flex justify-between items-start">
            <span>Estimated Delivery</span>
            <span className="text-right">
              {formatDate(newDate)} - {formatDate(deliveryWindowEnd)}
              <div className="text-xs text-muted-foreground mt-1">
                ({shippingMethod} shipping)
              </div>
            </span>
          </div>

          <Separator />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${discountedTotal.toFixed(2)}</span>
          </div>

          <Button
            className="w-full py-3 mt-6"
            onClick={handleCheckout}
            disabled={!isFormValid}
          >
            Place Order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
