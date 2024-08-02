"use client";

import { clientFetch } from "@/lib/api/clientFetch";
import { Button } from "../ui/button";
import { PauseCircle, Play } from "lucide-react";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  status: string;
}

export default function ChangeStatus({ id, status }: Props) {
  const router = useRouter();

  const pauseMonitor = async () => {
    try {
      const response = await clientFetch(`/api/monitors/${id}/pause`, {
        method: "PATCH",
      });
      if (response.ok) {
        router.refresh();
        return toast({
          title: "Monitor paused",
        });
      }
    } catch (error) {}
  };

  const resumeMonitor = async () => {
    try {
      const response = await clientFetch(`/api/monitors/${id}/resume`, {
        method: "PATCH",
      });
      if (response.ok) {
        router.refresh();
        return toast({
          title: "Monitor resumed",
        });
      }
    } catch (error) {}
  };

  return (
    <Button
      variant="ghost"
      className="w-fit text-muted-foreground p-2 flex gap-1 h-7"
      onClick={() => {
        if (status === "green" || status === "red") {
          pauseMonitor();
        } else {
          resumeMonitor();
        }
      }}
    >
      {status === "green" || status === "red" ? (
        <>
          <PauseCircle className="h-4 w-4" />
          Pause this monitor
        </>
      ) : (
        <>
          <Play className="h-4 w-4" />
          Unpause this monitor
        </>
      )}
    </Button>
  );
}
