import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";

export type MonitorItem = {
  id: number;
  name: string;
  url: string;
  frequency: string;
  heartbeat: [];
};

export const columns: ColumnDef<MonitorItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <p
          className="text-primary font-medium hover:underline cursor-pointer"
          onClick={() => navigate("/app/monitors/" + row.original.id)}
        >
          {row.getValue("name")}
        </p>
      );
    },
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: (row) => (
      <div className="max-w-[150px]">{row.getValue() as React.ReactNode}</div>
    ),
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
  },
  {
    accessorKey: "heartbeat",
    header: "Heartbeat Summary",
    cell: ({ row }) => {
      const heartbeat: [] = row.getValue("heartbeat") || [];
      function fillArray(arr: []) {
        while (arr.length < 10) {
          arr.unshift(undefined);
        }
        return arr;
      }
      const finalHeartbeat = fillArray(heartbeat);
      return (
        <div className="flex gap-1 h-full">
          {finalHeartbeat.map((h, i) => (
            <div
              key={i}
              className={`h-4 w-1 rounded-[2px] ${
                h
                  ? h?.status.includes("200")
                    ? "bg-green-400"
                    : "bg-red-400"
                  : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigate("/app/monitors/" + row.original.id)}
            >
              Details
            </DropdownMenuItem>
            <DropdownMenuItem>Configure</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
