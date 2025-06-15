"use client";

import { useCart } from "@/app/context/cartContext";
import { useCurrency } from "@/app/context/currencyContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingBag, Trash2, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    appliedDiscount,
    discountAmount,
    subtotalAfterDiscount,
    shippingFee,
    grandTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyDiscount,
    removeDiscount,
  } = useCart();
  const { formatPrice } = useCurrency();

  const [discountCode, setDiscountCode] = useState("");
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) {
      toast.error("Please enter a discount code");
      return;
    }

    setIsApplyingDiscount(true);
    const result = applyDiscount(discountCode.trim().toUpperCase());
    
    if (result.success) {
      toast.success(result.message);
      setDiscountCode("");
    } else {
      toast.error(result.message);
    }
    setIsApplyingDiscount(false);
  };

  const handleRemoveDiscount = () => {
    removeDiscount();
    toast.info("Discount removed");
  };

  if (items.length === 0) {
    return (
      <div className="bg-background min-h-screen">
        <div className="mx-auto px-4 py-8 container">
          <div className="flex flex-col justify-center items-center space-y-6 py-16 text-center">
            <div className="flex justify-center items-center bg-muted rounded-full w-24 h-24">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <h1 className="mb-2 font-bold text-2xl text-foreground">
                Your cart is empty
              </h1>
              <p className="mb-2 text-muted-foreground">
                Looks like you haven't added anything to your cart yet.
              </p>
              <p className="text-muted-foreground text-sm">
                Note: A 12% shipping fee will be applied at checkout.
              </p>
              <p className="text-muted-foreground text-sm">
                Available discount codes: TECH20, BULK15, FASHION10, NEWUSER
              </p>
            </div>
            <Button asChild>
              <Link href="/shopping">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="mx-auto px-4 py-8 container">
        <div className="gap-8 grid lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h1 className="font-bold text-2xl">Shopping Cart</h1>
              <Button
                variant="outline"
                size="sm"
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="mr-2 w-4 h-4" />
                Clear Cart
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item) => {
                const discountedPrice = item.discountPercentage
                  ? item.price * (1 - item.discountPercentage / 100)
                  : item.price;

                return (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="relative flex-shrink-0 w-24 h-24">
                          <Image
                            src={
                              item.image ||
                              item.thumbnail ||
                              "/placeholder-image.jpg"
                            }
                            alt={item.title}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-medium text-lg line-clamp-1">
                                {item.title}
                              </h3>
                              <p className="text-muted-foreground text-sm capitalize">
                                {item.category}
                              </p>
                              {item.brand && (
                                <p className="text-muted-foreground text-sm">
                                  {item.brand}
                                </p>
                              )}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.productId)}
                              className="ml-2 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Price and Quantity */}
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col">
                              <span className="font-semibold text-lg">
                                {formatPrice(discountedPrice)}
                              </span>
                              {item.discountPercentage && (
                                <span className="text-muted-foreground text-sm line-through">
                                  {formatPrice(item.price)}
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity <= 1}
                                className="w-8 h-8"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 font-medium text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
                                className="w-8 h-8"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>

                          {/* Item Total */}
                          <div className="text-right mt-2">
                            <span className="text-muted-foreground text-sm">
                              Total:{" "}
                              {formatPrice(discountedPrice * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Items ({totalItems})</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                
                {/* Discount Section */}
                {!appliedDiscount ? (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Discount code"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleApplyDiscount()}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleApplyDiscount}
                        disabled={isApplyingDiscount}
                        size="sm"
                        variant="outline"
                      >
                        <Tag className="w-4 h-4 mr-1" />
                        {isApplyingDiscount ? "Applying..." : "Apply"}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-green-600 font-medium">
                        {appliedDiscount.rule.name}
                      </span>
                      <Button
                        onClick={handleRemoveDiscount}
                        size="sm"
                        variant="ghost"
                        className="text-red-600 hover:text-red-700 h-auto p-1"
                      >
                        Remove
                      </Button>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedDiscount.rule.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping (12%)</span>
                  <span>{formatPrice(shippingFee)}</span>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/shopping">Continue Shopping</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
