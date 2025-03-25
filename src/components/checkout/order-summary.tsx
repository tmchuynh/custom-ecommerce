"use client";

import { useCart } from "@/app/context/cartContext";
import { useCurrency } from "@/app/context/CurrencyContext";
import { useProduct } from "@/app/context/productContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { OrderSummaryProps, ShippingMethod } from "@/lib/types";
import { capitalize, formatDate } from "@/lib/utils";

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
  const { getDeliveryWindowDates } = useCart();
  const { selectedCurrency } = useCurrency();
  const { convertPrice } = useProduct();

  const deliveryWindow = getDeliveryWindowDates(
    shippingMethod,
    newDate,
    selectedCurrency.code || selectedCurrency.toString()
  );

  // Generate the delivery estimate text based on shipping method
  const getDeliveryEstimateText = () => {
    const { windowStart, windowEnd } = deliveryWindow;

    if (shippingMethod === "overnight") {
      return formatDate(windowStart); // Single-day delivery
    }

    return `${formatDate(windowStart)} - ${formatDate(windowEnd)}`;
  };

  // Delivery description based on shipping method
  const getDeliveryDescription = (
    shippingMethod: ShippingMethod,
    startDate: Date,
    country: string
  ): string => {
    // Get the delivery window start and end dates
    const { windowStart, windowEnd } = getDeliveryWindowDates(
      shippingMethod,
      startDate,
      country
    );

    // Calculate the number of days from today to each date
    const today = new Date();
    // Normalize today's time to midnight for an accurate day difference
    today.setHours(0, 0, 0, 0);

    const diffInDays = (from: Date, to: Date) =>
      Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));

    const daysStart = diffInDays(today, windowStart);
    const daysEnd = diffInDays(today, windowEnd);

    if (daysStart === daysEnd) {
      return `in ${daysStart} day(s)`;
    }

    return `in ${daysStart} to ${daysEnd} days`;
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

          {!isInternational && internationalFee === 0 && (
            <div className="flex justify-between">
              <span>{capitalize(shippingMethod)} Shipping</span>
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
            <span className="text-right">
              {getDeliveryEstimateText()}
              <div className="text-xs text-muted-foreground mt-1">
                {getDeliveryDescription(
                  shippingMethod,
                  newDate,
                  selectedCurrency.code || selectedCurrency.toString()
                )}
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
