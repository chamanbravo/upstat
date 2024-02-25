import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { api } from "@/lib/api";
import { type components } from "@/lib/api/v1";
import { useState, useEffect } from "react";

export default function MonitorsTable() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<components["schemas"]["MonitorItem"][]>([]);

  const getMonitorData = async (signal: AbortSignal) => {
    try {
      const res = await api("/api/monitors/list", {
        method: "GET",
        credentials: "include",
        signal,
        headers: {
          "accept": "application/json",
        },
      });
      const jsonRes: components["schemas"]["MonitorsListOut"] = await res.json();
      setData(jsonRes.monitors as components["schemas"]["MonitorItem"][]);
      setError("");
    } catch (err) {
      setError("Something went wrong.")
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteRow = (id: number) => {
    const remainingMonitors = data.filter((d) => +(d.id as string) !== id);
    setData(remainingMonitors);
  }

  useEffect(() => {
    const abortController = new AbortController();
    getMonitorData(abortController.signal);
    return () => abortController.abort();
  }, []);

  if (error) {
    return (
      <span className="text-center text-muted-foreground">{error}</span>
    );
  }

  if (loading) {
    return (
      <span className="text-center text-muted-foreground">Loading...</span>
    );
  }

  return <DataTable columns={columns} data={data || []} onDeleteRow={handleDeleteRow} />;
}
