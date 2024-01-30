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
import { api } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { components } from "@/lib/api/v1";

export const columns: ColumnDef<components["schemas"]["MonitorItem"]>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <div className="inline-flex items-center gap-[0.3rem]">
          <div
            className={`w-[6px] h-[6px] rounded-[50%] bg-${row.original.status}-500`}
            title={
              row.original.status === "green"
                ? "Up"
                : row.original.status === "yellow"
                ? "Paused"
                : "Down"
            }
          />
          <p
            className="text-primary font-medium hover:underline cursor-pointer"
            onClick={() => navigate("/app/monitors/" + row.original.id)}
          >
            {row.getValue("name")}
          </p>
        </div>
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
    cell: ({ row }) => (
      <>
        {row.original.frequency && +row.original.frequency <= 60
          ? `${row.getValue("frequency")}s`
          : `${row.getValue("frequency")}h`}
      </>
    ),
  },
  {
    accessorKey: "heartbeat",
    header: "Heartbeat Summary",
    cell: ({ row }) => {
      const heartbeat: components["schemas"]["Heartbeat"][] =
        row.getValue("heartbeat") || [];
      function fillArray(
        arr: (components["schemas"]["Heartbeat"] | undefined)[]
      ) {
        while (arr.length < 10) {
          arr.push(undefined);
        }
        return arr;
      }
      const finalHeartbeat = [...fillArray(heartbeat)].reverse();
      return (
        <div className="flex gap-1 h-full">
          {finalHeartbeat.map((h, i) => (
            <div
              key={i}
              className={`h-4 w-1 rounded-[2px] ${
                h?.status
                  ? h?.status.includes("200")
                    ? "bg-green-400"
                    : "bg-red-400"
                  : "bg-gray-400"
              } ${h && "hover:scale-125"} `}
              title={
                h?.status && h?.timestamp
                  ? `${new Date(h?.timestamp).toLocaleString()} - ${h?.status}`
                  : ""
              }
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
      const deleteMonitor = async () => {
        try {
          const response = await api(
            `/api/monitors/delete/${row.original.id}`,
            {
              method: "DELETE",
              headers: {
                "content-type": "application/json",
              },
            }
          );
          if (response.ok) {
            navigate("/app/monitors");
            return toast({
              title: "Monitor deleted successfull.",
            });
          } else {
            return toast({
              title: "Something went wrong.",
            });
          }
        } catch (err) {}
      };
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
            <DropdownMenuItem
              onClick={() =>
                navigate("/app/monitors/configure/" + row.original.id)
              }
            >
              Configure
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={deleteMonitor}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
