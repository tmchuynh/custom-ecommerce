"use client";
import { columns } from "@/app/dashboard/payments/columns";
import { DataTable } from "@/app/dashboard/payments/data-table";
import PageHeading from "@/components/ui/pageheading";
import { PurchaseRecord } from "@/lib/types";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

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

  const jobDetails = [
    {
      icon: (
        <BriefcaseIcon
          aria-hidden="true"
          className="mr-1.5 size-5 shrink-0 text-gray-400"
        />
      ),
      text: "Full-time",
    },
    {
      icon: (
        <MapPinIcon
          aria-hidden="true"
          className="mr-1.5 size-5 shrink-0 text-gray-400"
        />
      ),
      text: "Remote",
    },
    {
      icon: (
        <CurrencyDollarIcon
          aria-hidden="true"
          className="mr-1.5 size-5 shrink-0 text-gray-400"
        />
      ),
      text: "$120k – $140k",
    },
    {
      icon: (
        <CalendarIcon
          aria-hidden="true"
          className="mr-1.5 size-5 shrink-0 text-gray-400"
        />
      ),
      text: "Closing on January 9, 2020",
    },
  ];

  const actions = (
    <>
      <span className="hidden sm:block">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-2xs ring-gray-300 ring-inset hover:bg-gray-50"
        >
          <PencilIcon
            aria-hidden="true"
            className="mr-1.5 -ml-0.5 size-5 text-gray-400"
          />
          Edit
        </button>
      </span>

      <span className="ml-3 hidden sm:block">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-2xs ring-gray-300 ring-inset hover:bg-gray-50"
        >
          <LinkIcon
            aria-hidden="true"
            className="mr-1.5 -ml-0.5 size-5 text-gray-400"
          />
          View
        </button>
      </span>

      <span className="sm:ml-3">
        <button
          type="button"
          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-2xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <CheckIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
          Publish
        </button>
      </span>

      {/* Dropdown */}
      <Menu as="div" className="relative ml-3 sm:hidden">
        <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-2xs ring-gray-300 ring-inset hover:ring-gray-400">
          More
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 ml-1.5 size-5 text-gray-400"
          />
        </MenuButton>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
            >
              Edit
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
            >
              View
            </a>
          </MenuItem>
        </MenuItems>
      </Menu>
    </>
  );

  return (
    <main className="w-11/12 md:w-10/12 mx-auto">
      <PageHeading
        title="Back End Developer"
        jobDetails={jobDetails}
        actions={actions}
      />
      <DataTable columns={columns} data={data} />
    </main>
  );
}
