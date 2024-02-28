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

export const columns: ColumnDef<components["schemas"]["StatusPage"]>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    id: "link",
    cell: ({ row }) => {
      const navigate = useNavigate();
      return (
        <Button
          variant="outline"
          className="h-[30px] hover:underline"
          onClick={() => navigate(`/status-pages/${row.original.slug}`)}
        >
          Visit
        </Button>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const navigate = useNavigate();

      const deleteNotificationChannel = async () => {
        if (!row?.original?.id) return;
        try {
          const { response } = await DELETE("/api/status-pages/delete/{id}", {
            params: {
              path: { id: String(row?.original?.id) },
            },
          });

          if (response.ok) {
            toast({
              title: "Status page deleted successfully.",
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
                navigate("/app/status-pages/configure/" + row.original?.id);
              }}
            >
              Configure
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                navigate(`/status-pages/${row.original?.slug}`);
              }}
            >
              Visit
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
