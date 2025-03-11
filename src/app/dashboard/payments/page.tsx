"use client";
import { columns } from "@/app/dashboard/payments/columns";
import { DataTable } from "@/app/dashboard/payments/data-table";
import PageHeading from "@/components/ui/pageheading";
import { PurchaseRecord } from "@/lib/types";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  LinkIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

/**
 * DemoPage component fetches payment data from the server and displays it in a data table.
 * It also provides action buttons for editing, viewing, and publishing the data.
 *
 * @component
 * @example
 * return (
 *   <DemoPage />
 * )
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @remarks
 * This component uses the `useState` and `useEffect` hooks to manage state and side effects.
 * It fetches data from the `/api/payments` endpoint and handles loading and error states.
 *
 * @function
 * @name DemoPage
 */
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
    <main className="w-11/12 md:w-10/12 mx-auto">
      <PageHeading
        title="Back End Developer"
        description="We are looking for a back end developer to join our team."
      />
      <DataTable columns={columns} data={data} />
    </main>
  );
}
