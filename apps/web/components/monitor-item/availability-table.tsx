import { fetchMonitorAvailability } from "@/lib/api/monitors";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Props {
  id: string;
}

const fmtPct = (pct: number | undefined) =>
  pct === undefined ? "~" : `${pct.toFixed(2)}%`;

const fmtDuration = (seconds: number | undefined) => {
  if (seconds === undefined) return "None";
  if (seconds === 0) return "0s";
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (d) return `${d}d ${h}h`;
  if (h) return `${h}h ${m}m`;
  if (m) return `${m}m ${s}s`;
  return `${s}s`;
};

export default async function AvailabilityTable({ id }: Props) {
  const data = await fetchMonitorAvailability(id);
  const a = data?.availability;
  const d = data?.downtime;

  const rows: {
    label: string;
    availability: number | undefined;
    downtime: number | undefined;
  }[] = [
    { label: "Today", availability: a?.today, downtime: d?.today },
    {
      label: "Last 7 days",
      availability: a?.last7Days,
      downtime: d?.last7Days,
    },
    {
      label: "Last 30 days",
      availability: a?.last30Days,
      downtime: d?.last30Days,
    },
    {
      label: "Last 365 days",
      availability: a?.last365Days,
      downtime: d?.last365Days,
    },
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="bg-accent">
          <TableRow>
            <TableHead>Time Period</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Downtime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.label} className="text-muted-foreground">
              <TableCell>{r.label}</TableCell>
              <TableCell>{fmtPct(r.availability)}</TableCell>
              <TableCell>{fmtDuration(r.downtime)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
