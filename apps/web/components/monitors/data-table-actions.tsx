"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/api/clientFetch";
import Link from "next/link";
import { useState } from "react";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";

interface Props {
  id: number;
}

export default function DataTableActions({ id }: Props) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const deleteItem = async () => {
    const response = await clientFetch(`/api/monitors/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.refresh();
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/monitors/configure/${id}`}>Configure </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setConfirmOpen(true)}
            className="text-destructive hover:text-destructive-foreground"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ConfirmDeleteDialog
        open={confirmOpen}
        onConfirm={deleteItem}
        onCancel={() => setConfirmOpen(false)}
        title="Delete this monitor?"
        description="This action cannot be undone. All associated heartbeat data will be permanently removed."
      />
    </>
  );
}
