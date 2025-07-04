"use client";

import { useAuth } from "@/app/context/authContext";
import { useCurrency } from "@/app/context/currencyContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useOrderManagement from "@/hooks/useOrderManagement";
import { formatDate } from "@/lib/utils/format";
import { getStatusColor } from "@/lib/utils/orders.tsx";
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  ChevronUp,
  Eye,
  Filter,
  Package,
  Search,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const { user, isLoggedIn } = useAuth();
  const { formatPrice } = useCurrency();
  const { orders, orderStats, findOrdersByStatus } = useOrderManagement(
    user?.email
  );
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState("date-desc");

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return (
      <div className="flex justify-center items-center bg-background min-h-screen">
        <div className="text-center">
          <Package className="mx-auto mb-4 w-16 h-16 text-muted-foreground" />
          <h1 className="mb-2 font-bold text-2xl">Access Denied</h1>
          <p className="mb-6 text-muted-foreground">
            Please log in to view your orders.
          </p>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Filter and sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return (
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          );
        case "date-asc":
          return (
            new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
          );
        case "amount-desc":
          return b.grandTotal - a.grandTotal;
        case "amount-asc":
          return a.grandTotal - b.grandTotal;
        default:
          return 0;
      }
    });

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto px-6 lg:px-8 py-12 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="mb-2 font-bold text-3xl">My Orders</h1>
          <p className="text-muted-foreground">
            Track and manage all your orders in one place
          </p>
        </div>

        {/* Order Statistics */}
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Total Orders</p>
                  <p className="font-bold text-2xl">{orderStats.totalOrders}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Total Spent</p>
                  <p className="font-bold text-2xl">
                    {formatPrice(orderStats.totalSpent)}
                  </p>
                </div>
                <div className="flex justify-center items-center bg-green-100 rounded-full w-8 h-8">
                  <span className="font-bold text-green-600 text-sm">$</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">In Transit</p>
                  <p className="font-bold text-2xl">
                    {orderStats.ordersByStatus.shipped || 0}
                  </p>
                </div>
                <Truck className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Delivered</p>
                  <p className="font-bold text-2xl">
                    {orderStats.ordersByStatus.delivered || 0}
                  </p>
                </div>
                <div className="flex justify-center items-center bg-green-100 rounded-full w-8 h-8">
                  <Package className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="mr-2 w-5 h-5" />
              Filter & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex sm:flex-row flex-col gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground transform -translate-y-1/2" />
                  <Input
                    placeholder="Search by order ID, tracking number, or product name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date-desc">Newest First</SelectItem>
                  <SelectItem value="date-asc">Oldest First</SelectItem>
                  <SelectItem value="amount-desc">Highest Amount</SelectItem>
                  <SelectItem value="amount-asc">Lowest Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Package className="mx-auto mb-4 w-16 h-16 text-muted-foreground" />
              <h3 className="mb-2 font-semibold text-lg">
                {orders.length === 0
                  ? "No orders yet"
                  : "No orders match your search"}
              </h3>
              <p className="mb-6 text-muted-foreground">
                {orders.length === 0
                  ? "Start shopping to see your orders here!"
                  : "Try adjusting your search or filter criteria"}
              </p>
              <Button asChild>
                <Link href="/shopping">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleOrderExpansion(order.id)}
                      >
                        {expandedOrders.has(order.id) ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Button>
                      <div className="flex flex-col justify-between space-y-1 text-sm">
                        <div className="space-y-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold">Order #{order.id}</h3>
                            <Badge variant={`${getStatusColor(order.status)}`}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm">
                            {formatDate(order.orderDate)} • {order.items.length}{" "}
                            items
                          </p>
                          <p className="text-muted-foreground text-sm">
                            Tracking: {order.trackingNumber}
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Est. Delivery:{" "}
                            {new Date(
                              order.estimatedDelivery
                            ).toLocaleDateString()}
                          </span>
                          <span className="text-muted-foreground">
                            {order.shippingCarrier}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right space-y-2">
                      <p className="font-semibold text-lg">
                        {formatPrice(order.grandTotal)}
                      </p>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={`/track-order?tracking=${order.trackingNumber}`}
                          >
                            <Truck className="mr-1 w-4 h-4" />
                            Track
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <Link
                            href={`/checkout/confirmation?orderId=${order.id}`}
                          >
                            <Eye className="mr-1 w-4 h-4" />
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {expandedOrders.has(order.id) && (
                    <>
                      <Separator className="my-4" />
                      <div className="space-y-3">
                        <h4 className="font-medium">Items Ordered</h4>
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center space-x-4 bg-muted p-3 rounded-lg"
                          >
                            <div className="flex justify-center items-center bg-background rounded-lg w-12 h-12">
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
                                <Package className="w-6 h-6 text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">
                                {item.title}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {item.category}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                Qty: {item.quantity} × {formatPrice(item.price)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-sm">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        ))}

                        <div className="flex justify-between items-center pt-3 border-t">
                          <span className="font-medium">Order Total</span>
                          <span className="font-bold text-lg">
                            {formatPrice(order.grandTotal)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
