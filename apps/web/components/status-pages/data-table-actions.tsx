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
import Link from "next/link";
import { clientFetch } from "@/lib/api/clientFetch";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  slug: string;
}

export default function DataTableActions({ id, slug }: Props) {
  const router = useRouter();

  const deleteItem = async () => {
    const response = await clientFetch(`/api/status-pages/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.refresh();
    }
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
        <DropdownMenuItem asChild>
          <Link href={`/status-pages/configure/${id}`}>Configure </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/status/${slug}`}>Visit</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={deleteItem}
          className="text-destructive hover:text-destructive-foreground"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
