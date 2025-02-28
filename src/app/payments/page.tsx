"use client";

import { useEffect, useState } from "react";
import { Payment } from "@/lib/interfaces";
import { DataTable } from "@/app/payments/data-table";
import { columns } from "@/app/payments/columns";

export default function DemoPage() {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await fetch("/api/payments");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const payments: Payment[] = await response.json();
        setData(payments);
      } catch (error) {
        console.error("Error fetching payments:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPayments();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Payments Data</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
