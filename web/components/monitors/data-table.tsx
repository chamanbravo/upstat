import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DataTableActions from "./data-table-actions";
import HeartbeatSummary from "../heartbeat-summary";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  data: any;
}

export default function DataTable({ data }: Props) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Heartbeat Summary</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((i: any) => (
            <TableRow key={i.id}>
              <TableCell>
                <Link
                  href={`/monitors/${i.id}`}
                  className="inline-flex items-center gap-[0.3rem]"
                >
                  <div
                    className={cn(`w-[6px] h-[6px] rounded-[50%]`, {
                      "bg-green-500": i.status === "green",
                      "bg-yellow-500": i.status === "yellow",
                      "bg-red-500": i.status === "red",
                    })}
                    title={
                      i.status === "green"
                        ? "Up"
                        : i.status === "yellow"
                        ? "Paused"
                        : "Down"
                    }
                  />
                  <p className="font-medium cursor-pointer text-primary hover:underline">
                    {i.name}
                  </p>
                </Link>
              </TableCell>
              <TableCell>{i.url}</TableCell>
              <TableCell>
                {i.frequency <= 60
                  ? `${i.frequency}s`
                  : i.frequency < 60 * 60
                  ? i.frequency / 60 + "m"
                  : i.frequency / (60 * 60) + "h"}
              </TableCell>
              <TableCell>
                <HeartbeatSummary heartbeat={i?.heartbeat} />
              </TableCell>
              <TableCell>
                <DataTableActions id={i.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
