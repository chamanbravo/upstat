import { ColumnDef } from "@tanstack/react-table";

export type MonitorItem = {
  date: string;
  latency: string;
  status: string;
};

export const columns: ColumnDef<MonitorItem>[] = [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "latency",
    header: "Latency",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
