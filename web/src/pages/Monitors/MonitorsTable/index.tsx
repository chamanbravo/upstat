import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { api } from "@/lib/api";

export default function MonitorsTable() {
  const [monitorData, setMonitorData] = useState<[]>([]);

  const fetchMonitorsList = async () => {
    try {
      const response = await api("/api/monitors/list", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMonitorData(data?.monitors);
      }
    } catch (err) {}
  };

  useEffect(() => {
    fetchMonitorsList();
  }, []);

  return <DataTable columns={columns} data={monitorData} />;
}
