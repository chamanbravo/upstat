"use client";

import { useState, useCallback } from "react";
import EmptyState from "@/components/empty-state";
import DataTable from "@/components/monitors/data-table";
import MonitorsFilter from "@/components/monitors/monitors-filter";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import Link from "next/link";

interface Monitor {
  id: number;
  name: string;
  url: string;
  status: string;
  frequency: number;
  heartbeat: any;
}

interface Props {
  monitors: Monitor[];
}

export default function MonitorsPage({ monitors }: Props) {
  const [filteredMonitors, setFilteredMonitors] = useState<Monitor[]>(monitors);

  const handleFiltered = useCallback((filtered: Monitor[]) => {
    setFilteredMonitors(filtered);
  }, []);

  if (!monitors?.length) {
    return (
      <EmptyState
        icon={<Activity />}
        title="No monitors"
        description="Create your first monitor."
        action={
          <Button className="mt-4" asChild>
            <Link href="/monitors/create">Create</Link>
          </Button>
        }
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-2 items-center">
        <MonitorsFilter monitors={monitors} onFiltered={handleFiltered} />
        <Button asChild>
          <Link href="/monitors/create">Create</Link>
        </Button>
      </div>
      {filteredMonitors.length > 0 ? (
        <DataTable data={filteredMonitors} />
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No monitors match your search or filter.
        </div>
      )}
    </div>
  );
}
