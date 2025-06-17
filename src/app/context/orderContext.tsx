"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "./cartContext";

export interface OrderItem {
  id: number;
  productId: number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
  category: string;
  thumbnail?: string;
  brand?: string;
}

export interface Order {
  id: string;
  trackingNumber: string;
  items: OrderItem[];
  totalAmount: number;
  discountAmount: number;
  shippingFee: number;
  grandTotal: number;
  customerEmail: string;
  customerName: string;
  shippingAddress: string;
  billingAddress: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  orderDate: Date;
  estimatedDelivery: Date;
  paymentMethod: string;
  discountCode?: string;
  membershipDiscount?: number;
  notes?: string;
  shippingCarrier?: string;
  shippingTier?: string;
  lastUpdated: Date;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface BillingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  nameOnCard: string;
}

export interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  createOrder: (
    items: CartItem[],
    totals: {
      totalAmount: number;
      discountAmount: number;
      shippingFee: number;
      grandTotal: number;
      discountCode?: string;
      membershipDiscount?: number;
      shippingTier?: string;
    },
    shippingInfo: ShippingInfo,
    billingInfo: BillingInfo,
    paymentMethod: string
  ) => Promise<{ success: boolean; message: string; orderId?: string }>;
  getOrderByTrackingNumber: (trackingNumber: string) => Order | null;
  getOrderById: (orderId: string) => Order | null;
  updateOrderStatus: (orderId: string, status: Order["status"]) => void;
  getUserOrders: (email: string) => Order[];
  setCurrentOrder: (order: Order | null) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};

// Generate tracking number
const generateTrackingNumber = (): string => {
  const prefix = "TRK";
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

// Generate order ID
const generateOrderId = (): string => {
  const prefix = "ORD";
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

// Estimate delivery date based on shipping tier
const estimateDeliveryDate = (shippingTier?: string): Date => {
  const today = new Date();
  let deliveryDays: number;

  switch (shippingTier) {
    case "Next Day Delivery":
      deliveryDays = 1;
      break;
    case "Overnight Express":
      deliveryDays = 1;
      break;
    case "Express Shipping":
      deliveryDays = Math.floor(Math.random() * 2) + 2; // 2-3 days
      break;
    case "Standard Shipping":
    default:
      deliveryDays = Math.floor(Math.random() * 3) + 5; // 5-7 days
      break;
  }

  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + deliveryDays);
  return deliveryDate;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem("ecommerce-orders");
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
        ...order,
        orderDate: new Date(order.orderDate),
        estimatedDelivery: new Date(order.estimatedDelivery),
        lastUpdated: new Date(order.lastUpdated),
      }));
      setOrders(parsedOrders);
    }
  }, []);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem("ecommerce-orders", JSON.stringify(orders));
    }
  }, [orders]);

  const createOrder = async (
    items: CartItem[],
    totals: {
      totalAmount: number;
      discountAmount: number;
      shippingFee: number;
      grandTotal: number;
      discountCode?: string;
      membershipDiscount?: number;
      shippingTier?: string;
    },
    shippingInfo: ShippingInfo,
    billingInfo: BillingInfo,
    paymentMethod: string
  ): Promise<{ success: boolean; message: string; orderId?: string }> => {
    try {
      const orderId = generateOrderId();
      const trackingNumber = generateTrackingNumber();
      const orderDate = new Date();
      const estimatedDelivery = estimateDeliveryDate(totals.shippingTier);

      // Convert cart items to order items
      const orderItems: OrderItem[] = items.map((item) => ({
        id: item.id,
        productId: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        category: item.category,
        thumbnail: item.thumbnail,
        brand: item.brand,
      }));

      // Create new order
      const newOrder: Order = {
        id: orderId,
        trackingNumber,
        items: orderItems,
        totalAmount: totals.totalAmount,
        discountAmount: totals.discountAmount,
        membershipDiscount: totals.membershipDiscount,
        shippingFee: totals.shippingFee,
        grandTotal: totals.grandTotal,
        customerEmail: shippingInfo.email,
        customerName: shippingInfo.fullName,
        shippingAddress: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zipCode}, ${shippingInfo.country}`,
        billingAddress: `${billingInfo.address}, ${billingInfo.city}, ${billingInfo.state} ${billingInfo.zipCode}, ${billingInfo.country}`,
        status: "pending",
        orderDate,
        estimatedDelivery,
        paymentMethod,
        discountCode: totals.discountCode,
        shippingCarrier: "Standard Shipping",
        shippingTier: totals.shippingTier,
        lastUpdated: orderDate,
      };

      // Add order to the list
      setOrders((prevOrders) => [newOrder, ...prevOrders]);
      setCurrentOrder(newOrder);

      return {
        success: true,
        message: "Order placed successfully!",
        orderId: orderId,
      };
    } catch (error) {
      console.error("Order creation error:", error);
      return {
        success: false,
        message: "Failed to create order. Please try again.",
      };
    }
  };

  const getOrderByTrackingNumber = (trackingNumber: string): Order | null => {
    return (
      orders.find((order) => order.trackingNumber === trackingNumber) || null
    );
  };

  const getOrderById = (orderId: string): Order | null => {
    return orders.find((order) => order.id === orderId) || null;
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? { ...order, status, lastUpdated: new Date() }
          : order
      )
    );
  };

  const getUserOrders = (email: string): Order[] => {
    return orders
      .filter(
        (order) => order.customerEmail.toLowerCase() === email.toLowerCase()
      )
      .sort((a, b) => b.orderDate.getTime() - a.orderDate.getTime());
  };

  const contextValue: OrderContextType = {
    orders,
    currentOrder,
    createOrder,
    getOrderByTrackingNumber,
    getOrderById,
    updateOrderStatus,
    getUserOrders,
    setCurrentOrder,
  };

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;
