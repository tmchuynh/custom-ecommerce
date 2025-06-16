"use client";

import { useOrderNotifications } from "@/hooks/useOrderNotifications";

export default function OrderNotificationProvider() {
  useOrderNotifications();
  return null;
}
