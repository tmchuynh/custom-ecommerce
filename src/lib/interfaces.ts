import { ColumnDef } from "@tanstack/react-table";
import { CommonProps, LengthType, PurchaseRecord } from "./types";

export interface LoaderSizeMarginProps extends CommonProps {
  size?: LengthType;
  margin?: LengthType;
}

export interface LengthObject {
  value: number;
  unit: string;
}

export interface DataTableProps<TData extends PurchaseRecord, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface LoaderSizeProps extends CommonProps {
  size?: LengthType;
}

export interface LoaderSizeMarginProps extends CommonProps {
  size?: LengthType;
  margin?: LengthType;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface User extends UserType {
  purchaseRecords: PurchaseRecord[];
}

// other exports

export interface UserType {
  id: string;
  name: string;
  email: string;
}

export interface JobDetail {
  icon: React.ReactNode;
  text: string;
}

export interface PageHeadingProps {
  title: string;
  description?: string;
  jobDetails?: JobDetail[];
  actions?: React.ReactNode;
}
