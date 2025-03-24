"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderItemsProps } from "@/lib/types";
import { cn } from "@/lib/utils";

const OrderItems = ({ cartItems, handleNavigation }: OrderItemsProps) => {
  return (
    <Card className="py-2 my-10">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order Items</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleNavigation("/shopping_cart")}
        >
          Edit Cart
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-60 overflow-y-auto space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={item.id}
              className={cn("flex items-start space-x-4 pb-4 ", {
                "border-b": index !== cartItems.length - 1,
              })}
            >
              <Skeleton className="h-12 w-12 rounded-md shrink-0" />
              <div className="flex-1 sm:max-w-1/2 max-w-9/12 md:max-w-10/12 lg:max-w-11/12 lg:pr-3 xl:pr-0">
                <h3 className="font-medium text-sm">{item.name}</h3>
                <div className="flex justify-between mt-1 text-sm text-gray-500">
                  <span>Qty: {item.quantity}</span>
                  <span>
                    ${(Number(item.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItems;
