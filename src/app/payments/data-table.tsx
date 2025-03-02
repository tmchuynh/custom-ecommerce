"use client";
import React, { useEffect, useRef, useState } from "react";
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
  FilterFn,
  Row,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { PurchaseRecord } from "@/lib/types";
import { subTableColumns } from "./columns";

interface DataTableProps<TData extends PurchaseRecord, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

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
    React.useState<VisibilityState>(
      Object.fromEntries(columns.map((col) => [col.id, true]))
    );
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);
  const hasInitialized = useRef(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

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

  useEffect(() => {
    console.log("Table Columns", columns); // Check columns structure
    console.log("Table Data", data); // Check if data is correct
  }, [columns, data]);

  // Check column visibility
  useEffect(() => {
    console.log("Column Visibility", columnVisibility);
  }, [columnVisibility]);

  const hasVisibleColumns = Object.entries(columnVisibility).some(
    ([key, isVisible]) => key !== "select" && isVisible
  );

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

  const clearStatusFilter = () => {
    setSelectedStatuses([]);
    table.getColumn("status")?.setFilterValue(undefined);
  };

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

  useEffect(() => {
    const dateColumn = table.getColumn("date");
    if (dateColumn) {
      dateColumn.getFilterFn = () => statusFilterFn;
    }
  }, [table]);

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prev) => {
      const newExpandedRows = new Set(prev);
      if (newExpandedRows.has(rowId)) {
        newExpandedRows.delete(rowId);
      } else {
        newExpandedRows.add(rowId);
      }
      return newExpandedRows;
    });
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
      <Table className="w-full border-4">
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
            <TableRow key={subRow.id} className="w-fit border-2">
              {subRow.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
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
            <DropdownMenuContent align="start">
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
                  Clear Status Filters
                </Button>
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
                    (column) => column.getCanHide() && column.id !== "select"
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

        <Input
          placeholder="Filter emails..."
          // value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            const emailColumn = table.getColumn("email");
            if (emailColumn) {
              emailColumn.setFilterValue(event.target.value);
            }
          }}
          className="max-w-sm"
        />

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
          <TableHeader>
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
            {table.getRowModel().rows?.length ? (
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
                      <Button className="ml-auto" variant="ghost">
                        Edit
                        {/* <Icon path={Pencil} className="h-4 w-4 text-gray-500" /> */}
                        {/* <Icon path={X} className="h-4 w-4 text-gray-500" /> */}
                      </Button>
                    </TableRow>
                    {expandedRows.has(row.id) && (
                      <TableRow className="border-4 table-row">
                        <TableCell
                          colSpan={columns.length}
                          className="w-full table-cell"
                        >
                          <SubTable row={row} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
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
    </div>
  );
}
