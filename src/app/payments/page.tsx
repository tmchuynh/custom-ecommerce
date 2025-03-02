"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/app/payments/data-table";
import { columns } from "@/app/payments/columns";
import LoadingIndicator from "@/components/Loading";
import { Payment, PurchaseRecord } from "@/lib/types";

export default function DemoPage() {
  const [data, setData] = useState<PurchaseRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const response = await fetch("/api/payments");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const payments: PurchaseRecord[] = await response.json();
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
        <LoadingIndicator />
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
