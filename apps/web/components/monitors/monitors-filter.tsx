"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

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
  onFiltered: (filtered: Monitor[]) => void;
}

export default function MonitorsFilter({ monitors, onFiltered }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    let result = monitors;

    // Filter by search term
    if (search.trim()) {
      const term = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(term) ||
          m.url.toLowerCase().includes(term)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((m) => m.status === statusFilter);
    }

    return result;
  }, [monitors, search, statusFilter]);

  // Notify parent of filtered results
  useMemo(() => {
    onFiltered(filtered);
  }, [filtered, onFiltered]);

  const statusFilters = [
    { value: "all", label: "All" },
    { value: "green", label: "Up" },
    { value: "yellow", label: "Paused" },
    { value: "red", label: "Down" },
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or URL..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <Filter className="h-4 w-4 text-muted-foreground mr-1" />
        {statusFilters.map((filter) => (
          <Button
            key={filter.value}
            variant={statusFilter === filter.value ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter(filter.value)}
            className="h-7 text-xs"
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
