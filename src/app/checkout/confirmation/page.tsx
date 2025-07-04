"use client";

import { useCart } from "@/app/context/cartContext";
import { useCurrency } from "@/app/context/currencyContext";
import { Order, useOrder } from "@/app/context/orderContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils/format";
import { getStatusColor } from "@/lib/utils/orders";
import {
  Calendar,
  CheckCircle,
  Copy,
  CreditCard,
  Download,
  Home,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

function OrderConfirmationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { getOrderById } = useOrder();
  const { formatPrice } = useCurrency();
  const { removeDiscount } = useCart();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      removeDiscount(); // Clear any existing discounts
      const foundOrder = getOrderById(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        toast.error("Order not found");
        router.push("/");
      }
    } else {
      router.push("/");
    }
    setLoading(false);
  }, [orderId, getOrderById, router]);

  const copyTrackingNumber = () => {
    if (order?.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
      toast.success("Tracking number copied to clipboard!");
    }
  };

  const downloadReceipt = () => {
    if (!order) return;
    const receiptData = `
      Order ID: ${order.id}
      Order Date: ${new Date(order.orderDate).toLocaleDateString("en-US")}
      Tracking Number: ${order.trackingNumber}
      Customer: ${order.customerName} (${order.customerEmail})
      Shipping Address: ${order.shippingAddress}
      Payment Method: ${order.paymentMethod}
      Status: ${order.status}
      Subtotal: ${formatPrice(order.totalAmount)}
      Discount: ${formatPrice(order.discountAmount)}
      Membership Discount: ${formatPrice(order.membershipDiscount ?? 0)}
      Shipping Fee: ${
        order.shippingFee > 0 ? formatPrice(order.shippingFee) : "FREE"
      }
      Total Amount: ${formatPrice(order.grandTotal)}
      Items: ${order.items
        .map((item) => `${item.title} (x${item.quantity})`)
        .join(", ")}
    `;
    const blob = new Blob([receiptData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-background min-h-screen">
        <div className="text-center">
          <div className="mx-auto mb-4 border-primary border-b-2 rounded-full w-8 h-8 animate-spin"></div>
          <p className="text-muted-foreground">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center bg-background min-h-screen">
        <div className="text-center">
          <Package className="mx-auto mb-4 w-16 h-16 text-muted-foreground" />
          <h1 className="mb-2 font-bold text-2xl">Order not found</h1>
          <p className="mb-6 text-muted-foreground">
            The order you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
        {/* Success Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex justify-center items-center bg-green-100 mb-4 rounded-full w-20 h-20">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="mb-2 font-bold text-3xl text-green-600">
            Order Confirmed!
          </h1>
          <p className="mb-4 text-lg text-muted-foreground">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
          <div className="flex justify-center items-center space-x-4 text-muted-foreground text-sm">
            <span>Order #{order.id}</span>
            <span>•</span>
            <span>{formatDate(order.orderDate)}</span>
          </div>
          <div className="flex justify-center items-center space-x-2 my-3">
            <Badge
              variant={`${getStatusColor(order.status)}`}
              className="capitalize"
            >
              {order.status}
            </Badge>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 mx-auto mt-4 p-3 border border-blue-200 dark:border-blue-800 rounded-lg max-w-md">
            <p className="text-blue-800 text-sm dark:text-blue-200">
              💡 Your order will appear in your{" "}
              <Link href="/dashboard" className="font-medium underline">
                dashboard
              </Link>{" "}
              and can be tracked from there.
            </p>
          </div>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Tracking Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Truck className="mr-2 w-5 h-5" />
                  Tracking Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        Tracking Number
                      </p>
                      <p className="font-mono font-semibold text-lg">
                        {order.trackingNumber}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyTrackingNumber}
                      className="gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </Button>
                  </div>

                  <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">Order Date</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {formatDate(order.orderDate)}
                      </p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Truck className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-sm">
                          Estimated Delivery
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {formatDate(order.estimatedDelivery)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button asChild className="w-full">
                      <Link
                        href={`/track-order?tracking=${order.trackingNumber}`}
                      >
                        Track Your Order
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 w-5 h-5" />
                  Order Items ({order.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <div className="flex justify-center items-center bg-muted rounded-lg w-16 h-16">
                        {item.thumbnail ? (
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            className="rounded-lg w-full h-full object-cover"
                            width={64}
                            height={64}
                            loading="lazy"
                          />
                        ) : (
                          <Package className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-muted-foreground text-sm">
                          {item.category}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Quantity: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 w-5 h-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress}
                  </p>
                  <p className="text-muted-foreground">{order.customerEmail}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="top-4 sticky">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.totalAmount)}</span>
                </div>

                {order.discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>
                      Discount
                      {order.discountCode && ` (${order.discountCode})`}
                    </span>
                    <span>-{formatPrice(order.discountAmount)}</span>
                  </div>
                )}

                {(order.membershipDiscount ?? 0) > 0 && (
                  <div className="flex justify-between text-blue-600">
                    <span>Membership Discount</span>
                    <span>-{formatPrice(order.membershipDiscount ?? 0)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>
                    Shipping{" "}
                    <span className="text-xs">({order.shippingCarrier})</span>
                  </span>
                  <span>
                    {order.shippingFee > 0
                      ? formatPrice(order.shippingFee)
                      : "FREE"}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Paid</span>
                  <span>{formatPrice(order.grandTotal)}</span>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    variant="outline"
                    className="gap-2 w-full"
                    onClick={downloadReceipt}
                  >
                    <Download className="w-4 h-4" />
                    Download Receipt
                  </Button>

                  <Button asChild className="gap-2 w-full">
                    <Link href="/dashboard">
                      <Package className="w-4 h-4" />
                      View in Dashboard
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="gap-2 w-full">
                    <Link href="/shopping">
                      <Package className="w-4 h-4" />
                      Continue Shopping
                    </Link>
                  </Button>

                  <Button asChild variant="outline" className="gap-2 w-full">
                    <Link href="/">
                      <Home className="w-4 h-4" />
                      Return Home
                    </Link>
                  </Button>
                </div>

                {/* Payment Method */}
                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                    <CreditCard className="w-4 h-4" />
                    <span>Paid with {order.paymentMethod}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* What's Next Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
              <div className="text-center">
                <div className="flex justify-center items-center bg-blue-100 mx-auto mb-3 rounded-full w-12 h-12">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mb-2 font-semibold">Order Processing</h3>
                <p className="text-muted-foreground text-sm">
                  We're preparing your items for shipment. You'll receive an
                  email when your order ships.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center items-center bg-green-100 mx-auto mb-3 rounded-full w-12 h-12">
                  <Truck className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="mb-2 font-semibold">Track Your Package</h3>
                <p className="text-muted-foreground text-sm">
                  Use your tracking number to monitor your package's journey to
                  your door.
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center items-center bg-purple-100 mx-auto mb-3 rounded-full w-12 h-12">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="mb-2 font-semibold">Enjoy Your Purchase</h3>
                <p className="text-muted-foreground text-sm">
                  Questions? Contact our support team. We're here to help!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center bg-background min-h-screen">
      <div className="text-center">
        <div className="mx-auto mb-4 border-primary border-b-2 rounded-full w-8 h-8 animate-spin"></div>
        <p className="text-muted-foreground">Loading order confirmation...</p>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
