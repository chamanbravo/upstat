import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { api } from "@/lib/api";

export default function MonitorsTable() {
  const [monitorData, setMonitorData] = useState<[]>([]);

  const fetchMonitorsList = async (signal: AbortSignal) => {
    try {
      const response = await api("/api/monitors/list", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        signal,
      });
      if (response.ok) {
        const data = await response.json();
        setMonitorData(data?.monitors);
      }
    } catch (err) {}
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchMonitorsList(controller.signal);
  }, []);

  return <DataTable columns={columns} data={monitorData} />;
}
