import { useAuth } from "@/app/context/authContext";
import { useOrder } from "@/app/context/orderContext";
import { useEffect } from "react";
import { toast } from "sonner";

export const useOrderNotifications = () => {
  const { orders } = useOrder();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.email) return;

    // Check for orders that need attention
    const checkOrderUpdates = () => {
      const userOrders = orders.filter(
        (order) =>
          order.customerEmail.toLowerCase() === user.email?.toLowerCase()
      );

      userOrders.forEach((order) => {
        const now = new Date();
        const estimatedDelivery = new Date(order.estimatedDelivery);
        const orderDate = new Date(order.orderDate);
        const daysSinceOrder = Math.floor(
          (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Notify about delayed deliveries
        if (now > estimatedDelivery && order.status !== "delivered") {
          const notificationKey = `delayed-${order.id}`;
          if (!localStorage.getItem(notificationKey)) {
            toast.warning(`Order ${order.id} delivery is delayed`, {
              description: "Contact support if you have concerns",
              duration: 10000,
            });
            localStorage.setItem(notificationKey, "shown");
          }
        }

        // Notify about status changes (mock implementation)
        // In a real app, this would come from a webhook or real-time updates
        if (order.status === "shipped" && daysSinceOrder >= 2) {
          const notificationKey = `shipped-${order.id}`;
          if (!localStorage.getItem(notificationKey)) {
            toast.success(`Order ${order.id} has been shipped!`, {
              description: `Tracking: ${order.trackingNumber}`,
              duration: 8000,
            });
            localStorage.setItem(notificationKey, "shown");
          }
        }

        if (order.status === "delivered" && daysSinceOrder >= 5) {
          const notificationKey = `delivered-${order.id}`;
          if (!localStorage.getItem(notificationKey)) {
            toast.success(`Order ${order.id} has been delivered!`, {
              description: "Thank you for your purchase",
              duration: 8000,
            });
            localStorage.setItem(notificationKey, "shown");
          }
        }
      });
    };

    // Check immediately and then every 5 minutes
    checkOrderUpdates();
    const interval = setInterval(checkOrderUpdates, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [orders, user]);

  return null;
};
