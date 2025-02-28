"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  VisibilityState,
  ColumnFiltersState,
  getPaginationRowModel,
  useReactTable,
  ColumnOrderState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(
      Object.fromEntries(columns.map((col) => [col.id, true])) // ✅ Ensure all columns are visible by default
    );
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  const hasInitialized = useRef(false); // Prevent infinite loop
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    onColumnOrderChange: setColumnOrder,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnOrder,
    },
  });

  // **🔹 Ensure "Select" column is visible unless it's the only column**
  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true; // Run once after mount
      setColumnVisibility((prev) => ({
        ...prev,
        select: true,
      }));
    }
  }, []);

  // **🔹 Check if any visible columns (excluding "Select")**
  const hasVisibleColumns = Object.entries(columnVisibility).some(
    ([key, isVisible]) => key !== "select" && isVisible
  );

  // **🔹 Status Filtering Handler (Multi-Select)**
  const handleStatusFilter = (status: string, checked: boolean) => {
    setSelectedStatuses((prev) => {
      const newStatuses = checked
        ? [...prev, status]
        : prev.filter((s) => s !== status);
      table
        .getColumn("status")
        ?.setFilterValue(newStatuses.length ? newStatuses : undefined);
      return newStatuses;
    });
  };

  // **🔹 Clear all selected statuses**
  const clearStatusFilter = () => {
    setSelectedStatuses([]);
    table.getColumn("status")?.setFilterValue(undefined);
  };

  return (
    <div>
      {/* ✅ "Toggle All" is checked by default and toggles all columns except "Select" */}
      <div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input
              type="checkbox"
              checked={hasVisibleColumns}
              onChange={() => {
                const allVisible = hasVisibleColumns;
                const newVisibility = Object.fromEntries(
                  table
                    .getAllLeafColumns()
                    .map((column) => [column.id, !allVisible])
                );
                setColumnVisibility(newVisibility);
              }}
            />{" "}
            Toggle All
          </label>
        </div>
        {table
          .getAllLeafColumns()
          .filter((column) => column.id !== "select") // **Hide "Select" column from toggle**
          .map((column) => (
            <div key={column.id} className="px-1">
              <label>
                <input
                  type="checkbox"
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                />{" "}
                {column.id}
              </label>
            </div>
          ))}
      </div>

      {/* ✅ Filter for Status Column */}
      <div className="flex items-center py-4 space-x-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <Input
          placeholder="Filter status..."
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("status")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* 🔹 Auto-hide Column Selector if No Columns are Visible */}
        {hasVisibleColumns && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter(
                  (column) => column.getCanHide() && column.id !== "select"
                ) // **Hide "Select" column from menu**
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="flex items-center py-4 space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Filter Status
              {selectedStatuses.length > 0
                ? ` (${selectedStatuses.length})`
                : ""}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Select Status</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("pending")}
              onCheckedChange={(checked) =>
                handleStatusFilter("pending", checked)
              }
            >
              Pending
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("processing")}
              onCheckedChange={(checked) =>
                handleStatusFilter("processing", checked)
              }
            >
              Processing
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("success")}
              onCheckedChange={(checked) =>
                handleStatusFilter("success", checked)
              }
            >
              Success
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("failed")}
              onCheckedChange={(checked) =>
                handleStatusFilter("failed", checked)
              }
            >
              Failed
            </DropdownMenuCheckboxItem>
            <DropdownMenuLabel>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearStatusFilter}
                className="w-full"
              >
                Clear Filters
              </Button>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center space-x-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
