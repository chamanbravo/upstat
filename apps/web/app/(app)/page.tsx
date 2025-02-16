import EmptyState from "@/components/empty-state";
import DataTable from "@/components/monitors/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-2 items-center">
          <Input placeholder="Search" className="max-w-xs" />
          <Button asChild>
            <Link href="/monitors/create">Create</Link>
          </Button>
        </div>
        {data?.monitors?.length ? (
          <DataTable data={data?.monitors} />
        ) : (
          <EmptyState
            icon=<Activity />
            title="No monitors"
            description="Create your first monitor."
            action={
              <Button className="mt-4" asChild>
                <Link href="/monitors/create">Create</Link>
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}
