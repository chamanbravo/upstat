import { Card, CardTitle } from "@/components/ui/card";
import {
  fetchMonitorCertExpCountdown,
  fetchMonitorSummary,
} from "@/lib/api/monitors";

interface Props {
  id: string;
}

export default async function Summary({ id }: Props) {
  const [summary, certExpData] = await Promise.all([
    fetchMonitorSummary(id),
    fetchMonitorCertExpCountdown(id),
  ]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="flex flex-col gap-3 px-4 py-5">
        <CardTitle className="font-normal text-muted-foreground">
          Avg. Response (24 hour)
        </CardTitle>
        <p className="text-xl font-semibold">
          {summary?.summary?.averageLatency?.toFixed(0) + "ms"}
        </p>
      </Card>
      <Card className="flex flex-col gap-3 px-4 py-5">
        <CardTitle className="font-normal text-muted-foreground">
          Uptime (24 hour)
        </CardTitle>
        <p className="text-xl font-semibold">
          {summary?.summary?.dayUptime?.toFixed(0) + "%"}
        </p>
      </Card>
      <Card className="flex flex-col gap-3 px-4 py-5">
        <CardTitle className="font-normal text-muted-foreground">
          Uptime (30 days)
        </CardTitle>
        <p className="text-xl font-semibold">
          {summary?.summary?.monthUptime?.toFixed(0) + "%"}
        </p>
      </Card>
      <Card className="flex flex-col gap-3 px-4 py-5">
        <CardTitle className="font-normal text-muted-foreground">
          Cert Exp.
        </CardTitle>
        <p className="text-xl font-semibold">
          {certExpData?.daysUntilExpiration + " Days"}
        </p>
      </Card>
    </div>
  );
}
