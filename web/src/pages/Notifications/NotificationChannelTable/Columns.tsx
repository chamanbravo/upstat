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
import { toast } from "@/components/ui/use-toast";
import { components } from "@/lib/api/v1";
import { client } from "@/lib/utils";

const { DELETE } = client;

export const columns: ColumnDef<components["schemas"]["Notification"]>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "provider",
    header: "Provider",
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const navigate = useNavigate();

      const deleteNotificationChannel = async () => {
        if (!row?.original?.id) return;
        try {
          const { response } = await DELETE("/api/notifications/delete/{id}", {
            params: {
              path: { id: row?.original?.id },
            },
          });

          if (response.ok) {
            toast({
              title: "Notification channel deleted successfully.",
            });
            table.options.meta?.refetchData();
          }
        } catch (err) {}
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                navigate("/app/notifications/configure/" + row.original?.id);
              }}
            >
              Configure
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={deleteNotificationChannel}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
