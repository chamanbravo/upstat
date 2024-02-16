import { Card, CardTitle } from "@/components/ui/card";
import useApi from "@/hooks/useApi";
import { components } from "@/lib/api/v1";
import { useParams } from "react-router";

export default function Summary() {
  const { id } = useParams();
  const { data, error, loading } = useApi<
    components["schemas"]["MonitorSummaryOut"]
  >(`/api/monitors/summary/${id}`);
  const {
    data: certExpData,
    error: certError,
    loading: certLoading,
  } = useApi<components["schemas"]["CertificateExpiryCountDown"]>(
    `/api/monitors/cert-exp-countdown/${id}`
  );

  if (error) {
    return <span>Something went wrong!</span>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="flex flex-col gap-3 px-4 py-5">
        <CardTitle className="font-normal text-muted-foreground">
          Avg. Response (24 hour)
        </CardTitle>
        <p className="text-xl font-semibold">
          {loading
            ? "Loading..."
            : data?.summary?.averageLatency?.toFixed(0) + "ms"}
        </p>
      </Card>
      <Card className="flex flex-col gap-3 px-4 py-5">
        <CardTitle className="font-normal text-muted-foreground">
          Uptime (24 hour)
        </CardTitle>
        <p className="text-xl font-semibold">
          {loading ? "Loading..." : data?.summary?.dayUptime?.toFixed(0) + "%"}
        </p>
      </Card>
      <Card className="flex flex-col gap-3 px-4 py-5">
        <CardTitle className="font-normal text-muted-foreground">
          Uptime (30 days)
        </CardTitle>
        <p className="text-xl font-semibold">
          {loading
            ? "Loading..."
            : data?.summary?.monthUptime?.toFixed(0) + "%"}
        </p>
      </Card>
      <Card className="flex flex-col gap-3 px-4 py-5">
        <CardTitle className="font-normal text-muted-foreground">
          Cert Exp.
        </CardTitle>
        <p className="text-xl font-semibold">
          {certLoading
            ? "Loading..."
            : certError
            ? "N/A"
            : certExpData?.daysUntilExpiration + " Days"}
        </p>
      </Card>
    </div>
  );
}
