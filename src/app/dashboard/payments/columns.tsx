"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PurchaseRecord } from "@/lib/types";
import { toTitle } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

/**
 * Defines the column configuration for the PurchaseRecord table.
 *
 * @type {ColumnDef<PurchaseRecord>[]}
 *
 * @property {Object} select - Column for row selection with checkboxes.
 * @property {string} select.id - Unique identifier for the column.
 * @property {Function} select.header - Renders the header checkbox for selecting all rows.
 * @property {Function} select.cell - Renders the checkbox for selecting individual rows.
 * @property {boolean} select.enableSorting - Disables sorting for this column.
 * @property {boolean} select.enableHiding - Enables hiding for this column.
 * @property {number} select.size - Sets a fixed width for the select column.
 *
 * @property {Object} productName - Column for displaying the product name.
 * @property {string} productName.accessorKey - Key to access the product name data.
 * @property {string} productName.header - Header text for the product name column.
 * @property {boolean} productName.enableHiding - Disables hiding for this column.
 *
 * @property {Object} productId - Column for displaying the product ID.
 * @property {string} productId.accessorKey - Key to access the product ID data.
 * @property {string} productId.header - Header text for the product ID column.
 * @property {boolean} productId.enableHiding - Disables hiding for this column.
 *
 * @property {Object} price - Column for displaying the price.
 * @property {string} price.accessorKey - Key to access the price data.
 * @property {string} price.header - Header text for the price column.
 * @property {boolean} price.enableHiding - Disables hiding for this column.
 *
 * @property {Object} quantity - Column for displaying the quantity.
 * @property {string} quantity.accessorKey - Key to access the quantity data.
 * @property {string} quantity.header - Header text for the quantity column.
 * @property {boolean} quantity.enableHiding - Disables hiding for this column.
 *
 * @property {Object} date - Column for displaying the date.
 * @property {Function} date.header - Renders the header with a button for sorting by date.
 * @property {Function} date.cell - Renders the date cell with formatted date.
 *
 * @property {Object} payment - Column group for displaying payment information.
 * @property {Function} payment.header - Renders the header with a button for sorting by payment.
 * @property {Object[]} payment.columns - Array of columns within the payment group.
 * @property {Object} payment.columns[].accessorKey - Key to access the payment data.
 * @property {Function} payment.columns[].header - Renders the header for the payment column.
 * @property {Function} payment.columns[].cell - Renders the cell for the payment column.
 *
 * @property {Object} creditCardType - Column for displaying the credit card type.
 * @property {string} creditCardType.id - Unique identifier for the column.
 * @property {Function} creditCardType.header - Renders the header for the credit card type column.
 * @property {Function} creditCardType.cell - Renders the cell with the credit card issuer.
 *
 * @property {Object} creditCardNumber - Column for displaying the credit card number.
 * @property {string} creditCardNumber.id - Unique identifier for the column.
 * @property {Function} creditCardNumber.header - Renders the header for the credit card number column.
 * @property {Function} creditCardNumber.cell - Renders the cell with the formatted credit card number.
 */
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

/**
 * Defines the columns for the sub-table in the payments dashboard.
 *
 * Each column is represented by an object with the following properties:
 * - `accessorKey`: The key used to access the data for the column.
 * - `header`: A function that returns a JSX element to be used as the column header.
 * - `cell` (optional): A function that returns a JSX element to be used as the cell content.
 *
 * Columns:
 * - `productId`: Displays the product ID with a sortable header.
 * - `productName`: Displays the product name with a sortable header.
 * - `price`: Displays the price with a sortable header and formats the price as USD currency.
 * - `quantity`: Displays the quantity with a sortable header.
 *
 * @type {ColumnDef<PurchaseRecord["items"][0]>[]}
 */
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
