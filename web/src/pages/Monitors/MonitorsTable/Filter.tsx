import DebouncedInput from "@/components/DebouncedInput";
import { Button } from "@/components/ui/button";
import { components } from "@/lib/api/v1";
import { Table } from "@tanstack/react-table";
import { Link } from "react-router-dom";

interface FilterProps {
  table: Table<components["schemas"]["MonitorsListOut"]["monitors"]>;
}

export default function Filter({ table }: FilterProps) {
  return (
    <div className="flex justify-between gap-2 items-center">
      <DebouncedInput
        placeholder="Search"
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={(value) => table.getColumn("name")?.setFilterValue(value)}
        className="max-w-xs"
      />
      <Button asChild>
        <Link to="/app/monitors/new">Create</Link>
      </Button>
    </div>
  );
}
