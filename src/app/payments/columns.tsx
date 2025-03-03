"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PurchaseRecord } from "@/lib/types";
import { toTitle } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<PurchaseRecord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="cursor-pointer"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="cursor-pointer"
      />
    ),
    enableSorting: false,
    enableHiding: true,
    size: 50, // Set a fixed width for the select column
  },
  {
    accessorKey: "productName",
    header: "Product Name",
    enableHiding: false,
  },
  {
    accessorKey: "productId",
    header: "Product ID",
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: "Price",
    enableHiding: false,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-m-4 cursor-pointer"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = date.toLocaleDateString("en-US");

      return <div className="text-right font-medium w-fit">{formatted}</div>;
    },
  },
  {
    id: "payment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-m-4 cursor-pointer"
        >
          Payment
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    columns: [
      {
        accessorKey: "payment.ID",
        header: () => "ID",
        cell: ({ row }) => {
          return row.original.payment.id;
        },
      },
      {
        accessorKey: "payment.status",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="-m-4 cursor-pointer"
            >
              Status
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return row.original.payment.status;
        },
      },
    ],
  },
  {
    id: "creditCardType",
    header: () => "Credit Card",
    cell: ({ row }) => {
      return toTitle(row.original.user.creditCard.issuer);
    },
  },
  {
    id: "creditCardNumber",
    header: () => "Credit Card",
    cell: ({ row }) => {
      const cardNumber = row.original.user.creditCard.number;
      const formatted = `**** **** **** ${cardNumber.slice(-4)}`;
      return formatted;
    },
  },
];

export const subTableColumns: ColumnDef<PurchaseRecord["items"][0]>[] = [
  {
    accessorKey: "productId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-m-4 cursor-pointer"
        >
          Product ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-m-4 cursor-pointer"
        >
          Product Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-m-4 cursor-pointer"
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const price = row.original.price;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
      return <div className="text-right font-medium w-fit">{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-m-4 cursor-pointer"
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
