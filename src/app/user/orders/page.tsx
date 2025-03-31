"use client";

import { useAuth } from "@/app/context/authContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const orders = user?.orders || [];

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold">Your Orders</h1>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-8">
            {orders.map((order, index) => (
              <div
                key={index}
                className="rounded-xl shadow-md overflow-hidden border"
              >
                <div className="p-6">
                  <p>
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </p>
                  <Button
                    onClick={() => router.push(`/user/orders/${order.id}`)}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">You have no orders yet.</p>
        )}
      </div>
    </div>
  );
}
