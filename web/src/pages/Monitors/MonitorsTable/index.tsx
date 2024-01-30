import { useEffect, useState } from "react";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { client } from "@/lib/utils";
import { components } from "@/lib/api/v1";

const { GET } = client;

export default function MonitorsTable() {
  const [monitorData, setMonitorData] = useState<
    components["schemas"]["MonitorsListOut"]["monitors"]
  >([]);

  const fetchMonitorsList = async (signal: AbortSignal) => {
    try {
      const { response, data } = await GET("/api/monitors/list", {
        signal,
      });
      if (response.ok) {
        setMonitorData(data?.monitors);
      }
    } catch (err) {}
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchMonitorsList(controller.signal);
  }, []);

  return <DataTable columns={columns} data={monitorData || []} />;
}
