"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableProps } from "@/lib/interfaces";
import { PurchaseRecord } from "@/lib/types";
import {
  ColumnFiltersState,
  ColumnOrderState,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { subTableColumns } from "./columns";

export function DataTable<TData extends PurchaseRecord, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      productName: false,
      productId: false,
      price: false,
      quantity: false,
      // Set other columns to true or false as needed
    });
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  const hasInitialized = useRef(false);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

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

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      setColumnVisibility((prev) => ({
        ...prev,
        select: true,
      }));
    }
  }, []);

  const hasVisibleColumns = Object.entries(columnVisibility).some(
    ([key, isVisible]) => key !== "select" && isVisible
  );

  const statusFilterFn: FilterFn<any> = (
    row: Row<any>,
    columnId: string,
    filterValue: string[]
  ) => {
    return filterValue.includes(row.getValue(columnId));
  };

  const exportToCSV = (exportType: "all" | "selected") => {
    const rowsToExport =
      exportType === "selected"
        ? table.getFilteredSelectedRowModel().rows // Only selected rows
        : table.getFilteredRowModel().rows; // All rows

    if (rowsToExport.length === 0) {
      alert("No rows to export.");
      return;
    }

    // Get visible column headers
    const visibleColumns = table.getAllColumns().filter(
      (column) => column.getIsVisible() && column.id !== "select" // Ignore select column
    );

    // Convert data to CSV format
    const csvContent = [
      visibleColumns.map((col) => col.id).join(","), // Header row
      ...rowsToExport.map((row) =>
        visibleColumns
          .map((col) => JSON.stringify(row.getValue(col.id)))
          .join(",")
      ),
    ].join("\n");

    // Download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `export_${exportType}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRow((prev) => (prev === rowId ? null : rowId));
  };

  const SubTable = ({ row }: { row: Row<PurchaseRecord> }) => {
    const subTable = useReactTable({
      data: row.original.items, // Assuming `items` is the nested array in `PurchaseRecord`
      columns: subTableColumns, // Sub-table columns defined earlier
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onSortingChange: setSorting,
      state: {
        sorting,
      },
    });

    return (
      <Table className="w-full">
        <TableHeader>
          {subTable.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {subTable.getRowModel().rows.map((subRow) => (
            <TableRow key={subRow.index} className="w-fit">
              {subRow.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.column.id}
                  className={
                    cell.column.id === "quantity" || cell.column.id === "price"
                      ? "text-left"
                      : ""
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <div>
      {/* ✅ Filter for Status Column */}
      <div className="flex items-center py-4 space-x-4">
        {/* 🔹 Auto-hide Column Selector if No Columns are Visible */}
        {hasVisibleColumns && (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"sm"} className="ml-auto">
                  Columns
                  {selectedColumns.length > 0 && selectedColumns.length < 3
                    ? ` (${selectedColumns.length})`
                    : ""}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Select Columns</DropdownMenuLabel>
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      column.getCanHide() &&
                      column.id !== "select" &&
                      column.id !== "productName" &&
                      column.id !== "productId" &&
                      column.id !== "price" &&
                      column.id !== "quantity"
                  )
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => {
                        column.toggleVisibility(!!value);
                        setSelectedColumns((prev) => {
                          const newSelectedColumns = !!value
                            ? [...prev, column.id]
                            : prev.filter((id) => id !== column.id);
                          return newSelectedColumns;
                        });
                      }}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setColumnVisibility(
                      Object.fromEntries(
                        table.getAllColumns().map((column) => [column.id, true])
                      )
                    );
                    setSelectedColumns(
                      table
                        .getAllColumns()
                        .filter((column) => column.id !== "select")
                        .map((column) => column.id)
                    );
                  }}
                  className="w-full"
                >
                  Clear Column Filters
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        <div className="flex space-x-2 py-4">
          <Button
            variant="default"
            size="sm"
            onClick={() => exportToCSV("all")}
          >
            Export All to CSV
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => exportToCSV("selected")}
          >
            Export Selected Rows to CSV
          </Button>
        </div>
      </div>

      <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="w-fit">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getCoreRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => toggleRowExpansion(row.id)}
                      className="cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                      <TableCell>
                        {expandedRow === row.id ? (
                          <IoMdArrowDropup className="ml-auto" />
                        ) : (
                          <IoMdArrowDropdown className="ml-auto" />
                        )}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1} // Adjust for the additional cell
                  className="h-24 text-center w-full"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="border rounded p-1 cursor-pointer"
          >
            {[5, 10, 15, 20, 25].map((pageSize) => (
              <option
                key={pageSize}
                value={pageSize}
                className="cursor-pointer"
              >
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Pagination className="mt-4 cursor-pointer">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => table.previousPage()}
                  className={
                    table.getCanPreviousPage()
                      ? ""
                      : "pointer-events-none opacity-50"
                  }
                  aria-disabled={!table.getCanPreviousPage()}
                />
              </PaginationItem>

              {/* Page Numbers & Ellipsis */}
              {table.getPageCount() > 1 &&
                Array.from({ length: table.getPageCount() }).map((_, index) => {
                  const currentPage = table.getState().pagination.pageIndex;
                  const isActive = index === currentPage;

                  if (
                    index === 0 ||
                    index === table.getPageCount() - 1 ||
                    Math.abs(currentPage - index) <= 1
                  ) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationLink
                          isActive={isActive}
                          onClick={() => table.setPageIndex(index)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }

                  // Show ellipsis when skipping pages
                  if (
                    (index === currentPage - 2 && currentPage > 2) ||
                    (index === currentPage + 2 &&
                      currentPage < table.getPageCount() - 3)
                  ) {
                    return <PaginationEllipsis key={`ellipsis-${index}`} />;
                  }

                  return null;
                })}

              <PaginationItem>
                <PaginationNext
                  onClick={() => table.nextPage()}
                  className={
                    table.getCanNextPage()
                      ? ""
                      : "pointer-events-none opacity-50"
                  }
                  aria-disabled={!table.getCanNextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <Table>
        <TableBody>
          {table.getCoreRowModel().rows.map(
            (row) =>
              expandedRow === row.id && (
                <TableRow className="cursor-pointer" key={`sub-${row.id}`}>
                  <TableCell
                    colSpan={columns.length}
                    className="max-w-min relative h-24"
                  >
                    <SubTable row={row} />
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
