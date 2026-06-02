"use client";

import { useState } from "react";
import { Eraser } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { toast } from "../ui/use-toast";
import { clientFetch } from "@/lib/api/clientFetch";

interface Props {
  id: string;
}

export default function ClearHeartbeats({ id }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const clearHeartbeats = async () => {
    setPending(true);
    try {
      const response = await clientFetch(`/api/monitors/${id}/heartbeats`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast({ title: "Heartbeats cleared" });
        setOpen(false);
        router.refresh();
      } else {
        toast({
          title: "Failed to clear heartbeats",
          variant: "destructive",
        });
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-1 p-2 w-fit h-7 text-destructive hover:text-destructive-foreground"
        >
          <Eraser className="h-4 w-4" />
          Clear Heartbeats
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Clear heartbeat data?</DialogTitle>
          <DialogDescription>
            All heartbeat data older than a month will be permanently deleted.
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={pending}
          >
            Cancel
          </Button>
          <Button
            variant="ghost"
            onClick={clearHeartbeats}
            disabled={pending}
            className="text-destructive hover:text-destructive-foreground"
          >
            {pending ? "Clearing..." : "Clear"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
