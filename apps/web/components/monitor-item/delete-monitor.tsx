"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/api/clientFetch";

interface Props {
  id: string;
}

export default function DeleteMonitor({ id }: Props) {
  const router = useRouter();

  const deleteMonitor = async () => {
    const response = await clientFetch(`/api/monitors/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
      router.refresh();
    }
  };
  return (
    <Button
      variant="ghost"
      className="flex gap-1 p-2 w-fit h-7 text-destructive hover:text-destructive-foreground"
      onClick={deleteMonitor}
    >
      <Trash2 className="w-4 h-4" />
      Delete
    </Button>
  );
}
