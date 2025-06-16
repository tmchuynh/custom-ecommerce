"use client";

import { useCurrency } from "@/app/context/currencyContext";
import { Order, useOrder } from "@/app/context/orderContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  ExternalLink,
  MapPin,
  Package,
  Search,
  Truck,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

interface TrackingEvent {
  date: Date;
  location: string;
  status: string;
  description: string;
}

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialTracking = searchParams.get("tracking") || "";

  const { getOrderByTrackingNumber, orders } = useOrder();
  const { formatPrice } = useCurrency();

  const [trackingNumber, setTrackingNumber] = useState(initialTracking);
  const [order, setOrder] = useState<Order | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Mock tracking events for demonstration
  const generateTrackingEvents = (order: Order): TrackingEvent[] => {
    const events: TrackingEvent[] = [];
    const orderDate = new Date(order.orderDate);

    // Order placed event
    events.push({
      date: orderDate,
      location: "Order Processing Center",
      status: "Order Placed",
      description: "Your order has been received and is being processed.",
    });

    // Based on order status, add appropriate events
    if (["processing", "shipped", "delivered"].includes(order.status)) {
      const processingDate = new Date(orderDate);
      processingDate.setDate(orderDate.getDate() + 1);
      events.push({
        date: processingDate,
        location: "Fulfillment Center",
        status: "Processing",
        description: "Your order is being prepared for shipment.",
      });
    }

    if (["shipped", "delivered"].includes(order.status)) {
      const shippedDate = new Date(orderDate);
      shippedDate.setDate(orderDate.getDate() + 2);
      events.push({
        date: shippedDate,
        location: "Shipping Facility",
        status: "Shipped",
        description: `Package has been shipped via ${order.shippingCarrier}.`,
      });
    }

    if (order.status === "delivered") {
      const deliveredDate = new Date(orderDate);
      deliveredDate.setDate(orderDate.getDate() + 5);
      events.push({
        date: deliveredDate,
        location: "Destination",
        status: "Delivered",
        description: "Package has been successfully delivered.",
      });
    }

    return events.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  useEffect(() => {
    if (initialTracking) {
      handleSearch(initialTracking);
    }
  }, [initialTracking]);

  const handleSearch = (trackingNum?: string) => {
    const searchTerm = trackingNum || trackingNumber;
    if (!searchTerm.trim()) {
      toast.error("Please enter a tracking number");
      return;
    }

    setIsSearching(true);
    setSearchAttempted(true);

    // Simulate API delay
    setTimeout(() => {
      const foundOrder = getOrderByTrackingNumber(searchTerm.trim());
      setOrder(foundOrder);

      if (foundOrder) {
        toast.success("Order found!");
      } else {
        toast.error("No order found with this tracking number");
      }

      setIsSearching(false);
    }, 1000);
  };

  const copyTrackingNumber = () => {
    if (order?.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
      toast.success("Tracking number copied!");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "cancelled":
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 font-bold text-3xl">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your tracking number to see the current status of your
            shipment
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 w-5 h-5" />
              Track Package
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex sm:flex-row flex-col gap-4">
              <div className="flex-1">
                <Label htmlFor="tracking">Tracking Number</Label>
                <Input
                  id="tracking"
                  placeholder="Enter your tracking number (e.g., TRK1234567890AB)"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={() => handleSearch()}
                  disabled={isSearching || !trackingNumber.trim()}
                  variant={isSearching ? "classic" : "modern"}
                  className="w-full sm:w-auto"
                >
                  {isSearching ? (
                    <>
                      <div className="mr-2 border-b-2 rounded-full w-4 h-4 animate-spin"></div>
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 w-4 h-4" />
                      Track Package
                    </>
                  )}
                </Button>
              </div>
            </div>

            {searchAttempted && !order && (
              <div className="bg-yellow-50 mt-4 p-4 border border-yellow-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="mr-2 w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-sm text-yellow-800">
                      Order not found
                    </p>
                    <p className="text-sm text-yellow-700">
                      Please check your tracking number and try again. Tracking
                      numbers are case-sensitive.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Details */}
        {order && (
          <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Order Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className="ml-2">Order Status</span>
                    </span>
                    <Badge
                      className={`capitalize ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </Badge>
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
                          <span className="font-medium text-sm">
                            Order Date
                          </span>
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
                  </div>
                </CardContent>
              </Card>

              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Tracking Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {generateTrackingEvents(order).map((event, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              index === 0
                                ? "text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {index === 0 ? (
                              getStatusIcon(event.status)
                            ) : (
                              <div className="bg-current rounded-full w-2 h-2" />
                            )}
                          </div>
                          {index < generateTrackingEvents(order).length - 1 && (
                            <div className="bg-muted mt-2 w-px h-12" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium">{event.status}</p>
                            <p className="text-muted-foreground text-sm">
                              {formatDate(event.date)}
                            </p>
                          </div>
                          <p className="mb-1 text-muted-foreground text-sm">
                            {event.location}
                          </p>
                          <p className="text-sm">{event.description}</p>
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
                    <p className="text-muted-foreground">
                      {order.customerEmail}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6 lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-sm">
                    <p className="mb-2 font-medium">Order #{order.id}</p>
                    <p className="text-muted-foreground">
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <span>Total</span>
                    <span className="font-semibold">
                      {formatPrice(order.grandTotal)}
                    </span>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button asChild className="w-full">
                      <Link href={`/checkout/confirmation?orderId=${order.id}`}>
                        View Order Details
                      </Link>
                    </Button>

                    <Button asChild variant="outline" className="w-full">
                      <Link href="/support">Contact Support</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Items in This Order</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.items.slice(0, 3).map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-3"
                      >
                        <div className="flex justify-center items-center bg-muted rounded-lg w-12 h-12">
                          {item.thumbnail ? (
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              className="rounded-lg w-full h-full object-cover"
                              width={48}
                              height={48}
                              loading="lazy"
                            />
                          ) : (
                            <Package className="w-6 h-6 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {item.title}
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <p className="text-muted-foreground text-sm">
                        +{order.items.length - 3} more items
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Recent Orders (if no order is being tracked) */}
        {!order && orders.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {orders.slice(0, 5).map((recentOrder) => (
                  <div
                    key={recentOrder.id}
                    className="flex justify-between items-center hover:bg-muted/50 p-4 border rounded-lg cursor-pointer"
                    onClick={() =>
                      setTrackingNumber(recentOrder.trackingNumber)
                    }
                  >
                    <div>
                      <p className="font-medium">Order #{recentOrder.id}</p>
                      <p className="text-muted-foreground text-sm">
                        {formatDate(recentOrder.orderDate)} •{" "}
                        {recentOrder.items.length} items
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`capitalize mb-1 ${getStatusColor(
                          recentOrder.status
                        )}`}
                      >
                        {recentOrder.status}
                      </Badge>
                      <p className="text-muted-foreground text-sm">
                        {recentOrder.trackingNumber}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <div>
                <h3 className="mb-2 font-semibold">Tracking Issues</h3>
                <p className="mb-3 text-muted-foreground text-sm">
                  If you're having trouble tracking your order, here are some
                  things to check:
                </p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Make sure your tracking number is entered correctly</li>
                  <li>• Tracking information may take 24-48 hours to appear</li>
                  <li>• Check your email for shipping confirmations</li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 font-semibold">Contact Support</h3>
                <p className="mb-3 text-muted-foreground text-sm">
                  Our customer service team is here to help with any questions.
                </p>
                <div className="space-y-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Link href="/support">
                      <ExternalLink className="mr-2 w-4 h-4" />
                      Contact Support
                    </Link>
                  </Button>
                </div>
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
    <div className="min-h-screen">
      <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
        <div className="mb-8">
          <div className="bg-muted mb-2 rounded w-64 h-8 animate-pulse"></div>
          <div className="bg-muted rounded w-96 h-4 animate-pulse"></div>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <div className="bg-muted rounded w-32 h-6 animate-pulse"></div>
          </CardHeader>
          <CardContent>
            <div className="flex sm:flex-row flex-col gap-4">
              <div className="flex-1">
                <div className="bg-muted mb-2 rounded w-24 h-4 animate-pulse"></div>
                <div className="bg-muted rounded w-full h-10 animate-pulse"></div>
              </div>
              <div className="flex items-end">
                <div className="bg-muted rounded w-32 h-10 animate-pulse"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <TrackOrderContent />
    </Suspense>
  );
}
