import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import useApi from "@/hooks/useApi";
import { components } from "@/lib/api/v1";

export default function MonitorsTable() {
  const { data, error, loading } =
    useApi<components["schemas"]["MonitorsListOut"]>("/api/monitors/list");

  if (error) {
    return (
      <span className="text-center text-muted-foreground">
        Something went wrong!
      </span>
    );
  }

  if (loading) {
    return (
      <span className="text-center text-muted-foreground">Loading...</span>
    );
  }

  return <DataTable columns={columns} data={data?.monitors || []} />;
}
