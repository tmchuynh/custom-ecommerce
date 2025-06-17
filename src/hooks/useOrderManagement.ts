import { Order, useOrder } from "@/app/context/orderContext";
import { useMemo } from "react";

export interface OrderStats {
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
  ordersByStatus: Record<string, number>;
  recentOrders: Order[];
  userOrders: number; // Number of actual user orders (not demo data)
  demoOrders: number; // Number of demo orders from DummyJSON
}

export interface CombinedOrderStats {
  userOrderStats: OrderStats;
  totalOrderStats: OrderStats; // Combined user + demo data for display
}

export const useOrderManagement = (userEmail?: string) => {
  const { orders, getOrderByTrackingNumber, getUserOrders, updateOrderStatus } =
    useOrder();

  // Get user-specific orders if email is provided
  const userOrders = useMemo(() => {
    if (!userEmail) return [];
    return getUserOrders(userEmail);
  }, [userEmail, getUserOrders, orders]);

  // Calculate order statistics
  const orderStats = useMemo((): OrderStats => {
    const relevantOrders = userEmail ? userOrders : orders;

    const totalOrders = relevantOrders.length;
    const totalSpent = relevantOrders.reduce(
      (sum, order) => sum + order.grandTotal,
      0
    );
    const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

    const ordersByStatus = relevantOrders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recentOrders = relevantOrders
      .sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      )
      .slice(0, 5);

    return {
      totalOrders,
      totalSpent,
      averageOrderValue,
      ordersByStatus,
      recentOrders,
      userOrders: userEmail ? userOrders.length : 0,
      demoOrders: 0, // This will be set by the caller if needed
    };
  }, [userOrders, orders, userEmail]);

  // Find orders by various criteria
  const findOrdersByStatus = (status: Order["status"]) => {
    const relevantOrders = userEmail ? userOrders : orders;
    return relevantOrders.filter((order) => order.status === status);
  };

  const findOrdersByDateRange = (startDate: Date, endDate: Date) => {
    const relevantOrders = userEmail ? userOrders : orders;
    return relevantOrders.filter((order) => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= startDate && orderDate <= endDate;
    });
  };

  const findOrdersByCategory = (category: string) => {
    const relevantOrders = userEmail ? userOrders : orders;
    return relevantOrders.filter((order) =>
      order.items.some((item) => item.category === category)
    );
  };

  // Get order tracking information
  const getTrackingInfo = (trackingNumber: string) => {
    const order = getOrderByTrackingNumber(trackingNumber);
    if (!order) return null;

    // Generate mock tracking events based on order status
    const events = [];
    const orderDate = new Date(order.orderDate);

    events.push({
      date: orderDate,
      status: "Order Placed",
      location: "Order Processing Center",
      description: "Your order has been received and is being processed.",
    });

    if (["processing", "shipped", "delivered"].includes(order.status)) {
      const processingDate = new Date(orderDate);
      processingDate.setDate(orderDate.getDate() + 1);
      events.push({
        date: processingDate,
        status: "Processing",
        location: "Fulfillment Center",
        description: "Your order is being prepared for shipment.",
      });
    }

    if (["shipped", "delivered"].includes(order.status)) {
      const shippedDate = new Date(orderDate);
      shippedDate.setDate(orderDate.getDate() + 2);
      events.push({
        date: shippedDate,
        status: "Shipped",
        location: "Shipping Facility",
        description: `Package has been shipped via ${order.shippingCarrier}.`,
      });
    }

    if (order.status === "delivered") {
      const deliveredDate = new Date(orderDate);
      deliveredDate.setDate(orderDate.getDate() + 5);
      events.push({
        date: deliveredDate,
        status: "Delivered",
        location: "Destination",
        description: "Package has been successfully delivered.",
      });
    }

    return {
      order,
      events: events.sort((a, b) => b.date.getTime() - a.date.getTime()),
    };
  };

  // Check if order needs attention (e.g., delayed delivery)
  const checkOrderStatus = (order: Order) => {
    const now = new Date();
    const estimatedDelivery = new Date(order.estimatedDelivery);
    const isDelayed = now > estimatedDelivery && order.status !== "delivered";

    return {
      isDelayed,
      daysUntilDelivery: Math.ceil(
        (estimatedDelivery.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      ),
      needsAttention: isDelayed || order.status === "cancelled",
    };
  };

  return {
    // Data
    orders: userEmail ? userOrders : orders,
    orderStats,

    // Functions
    getOrderByTrackingNumber,
    getUserOrders,
    updateOrderStatus,
    findOrdersByStatus,
    findOrdersByDateRange,
    findOrdersByCategory,
    getTrackingInfo,
    checkOrderStatus,
  };
};

export default useOrderManagement;
