import { OrderSummaryProps, ShippingMethod } from "@/lib/types";
import { useCart } from "../context/cartContext";
import { useEffect, useState } from "react";
import { useCurrency } from "../context/CurrencyContext";
import { useProduct } from "../context/productContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalize } from "@/lib/utils";
import { Separator } from "@radix-ui/react-select";

const OrderSummary = ({
  subtotal,
  tax,
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
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod>("standard"); // Default to "standard"

  const { selectedCurrency } = useCurrency();
  const { convertPrice } = useProduct();

  // Update delivery info whenever shipping method or country changes
  useEffect(() => {
    const description = getDeliveryDescription(
      selectedShippingMethod,
      newDate,
      shippingCountry
    );
    setDeliveryInfo(description);
  }, [
    selectedShippingMethod,
    shippingCountry,
    newDate,
    getDeliveryDescription,
  ]);

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

          {/* Dropdown for selecting shipping method */}
          <div className="flex justify-between items-center">
            <span>Shipping Method</span>
            <select
              value={selectedShippingMethod}
              onChange={(e) =>
                setSelectedShippingMethod(e.target.value as ShippingMethod)
              }
              className="border rounded px-2 py-1"
            >
              <option value="standard">Standard</option>
              <option value="express">Express</option>
              <option value="overnight">Overnight</option>
            </select>
          </div>

          {!isInternational && internationalFee === 0 && (
            <div className="flex justify-between">
              <span>{capitalize(selectedShippingMethod)} Shipping</span>
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

// ...existing code...
