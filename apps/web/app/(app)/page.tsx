import EmptyState from "@/components/empty-state";
import MonitorsPage from "@/components/monitors/monitors-page";
import { Button } from "@/components/ui/button";
import { fetchMonitorsList } from "@/lib/api/monitors";
import { Activity } from "lucide-react";
import Link from "next/link";

export default async function Monitors() {
  const data = await fetchMonitorsList();

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Monitors</h1>
        <p className="text-muted-foreground">Overview of all your monitors.</p>
      </div>
      <MonitorsPage monitors={data?.monitors || []} />
    </div>
  );
}
