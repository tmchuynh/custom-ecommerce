"use client";

import { useCurrency } from "@/app/context/CurrencyContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderItemsProps } from "@/lib/types";
import { useProduct } from "@/app/context/productContext";
import { cn } from "@/lib/utils";

const OrderItems = ({ cartItems, handleNavigation }: OrderItemsProps) => {
  const { selectedCurrency } = useCurrency();
  const { convertPrice } = useProduct();

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order Items ({cartItems.length})</CardTitle>
        <Button
          variant="outline"
          onClick={() => handleNavigation("/shopping_cart")}
        >
          Edit Cart
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className={cn("flex justify-between items-center pb-4", {
                "border-b border-divider":
                  item.id !== cartItems[cartItems.length - 1].id,
              })}
            >
              <div className="flex gap-4 items-center">
                <Skeleton className="h-16 w-16 rounded-md" />
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </div>
                </div>
              </div>
              <div className="font-medium">
                {convertPrice(
                  Number(item.price) * item.quantity,
                  selectedCurrency
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItems;
