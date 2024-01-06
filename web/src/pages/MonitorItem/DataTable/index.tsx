import { MonitorItem, columns } from "./Columns";
import { DataTable } from "./DataTable";

export default function DemoPage() {
  const data: MonitorItem[] = [
    {
      date: new Date().toDateString(),
      status: "200",
      latency: "200",
    },
    {
      date: new Date().toDateString(),
      status: "200",
      latency: "200",
    },
    {
      date: new Date().toDateString(),
      status: "200",
      latency: "200",
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
