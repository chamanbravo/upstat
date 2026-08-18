"use client";

import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/api/clientFetch";
import { useState } from "react";
import { ConfirmDeleteDialog } from "@/components/confirm-delete-dialog";

interface Props {
  id: string;
}

export default function DeleteMonitor({ id }: Props) {
  const router = useRouter();
  const [confirmOpen, setConfirmOpen] = useState(false);

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
    <>
      <Button
        variant="ghost"
        className="flex gap-1 p-2 w-fit h-7 text-destructive hover:text-destructive-foreground"
        onClick={() => setConfirmOpen(true)}
      >
        <Trash2 className="w-4 h-4" />
        Delete
      </Button>
      <ConfirmDeleteDialog
        open={confirmOpen}
        onConfirm={deleteMonitor}
        onCancel={() => setConfirmOpen(false)}
        title="Delete this monitor?"
        description="This action cannot be undone. All associated heartbeat data will be permanently removed."
      />
    </>
  );
}
