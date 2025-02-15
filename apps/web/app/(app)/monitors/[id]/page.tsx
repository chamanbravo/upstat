import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { ChevronLeft, DotIcon, Settings } from "lucide-react";
import Link from "next/link";
import { fetchMonitorInfo } from "@/lib/api/monitors";
import SonarPing from "@/components/sonar-ping/sonar-ping";
import Summary from "@/components/monitor-item/summary";
import GenericLineChart from "@/components/monitor-item/line-chart";
import ChangeStatus from "@/components/monitor-item/change-status";
import { subHours } from "date-fns";

export const metadata: Metadata = {
  title: "Upstat",
  description: "Simple & easy status monitoring.",
};

const statusColor: Record<string, string> = {
  green: "text-green-500",
  yellow: "text-yellow-500",
  red: "text-red-500",
};

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function MonitorItem({ params, searchParams }: PageProps) {
  const id = (await params).id;
  const startDate =
    (await searchParams)?.startDate || subHours(new Date(), 6).toISOString();
  const monitorInfo = await fetchMonitorInfo(id);

  return (
    <div className="m-auto flex flex-col gap-4">
      <div className="flex flex-col gap-3 w-full">
        <Button
          variant="ghost"
          className="w-fit text-muted-foreground p-2 h-7"
          asChild
        >
          <Link href="/">
            <ChevronLeft className="h-4 w-4" />
            Monitors
          </Link>
        </Button>
        <div className="flex gap-4 items-center">
          <SonarPing status={monitorInfo?.monitor?.status || ""} />
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold flex gap-1 items-center">
              {monitorInfo?.monitor?.name}
            </h1>
            <div className="flex gap-1 items-center">
              <p className={statusColor[monitorInfo?.monitor?.status || ""]}>
                {monitorInfo?.monitor?.status === "green"
                  ? "Up"
                  : monitorInfo?.monitor?.status === "red"
                    ? "Down"
                    : "Paused"}
              </p>
              <DotIcon className="text-muted-foreground h-4 w-4" />
              <p className="text-muted-foreground">
                {monitorInfo?.monitor?.frequency && (
                  <>
                    Checked every{" "}
                    {monitorInfo.monitor.frequency <= 60
                      ? `${monitorInfo.monitor.frequency} seconds`
                      : `${monitorInfo.monitor.frequency / 60} minutes`}
                  </>
                )}
              </p>
              <DotIcon className="text-muted-foreground h-4 w-4" />
              <p className="text-muted-foreground">
                {monitorInfo?.monitor?.url}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex gap-4 items-center">
            <ChangeStatus id={id} status={monitorInfo?.monitor?.status} />
            <Button
              variant="ghost"
              className="w-fit text-muted-foreground p-2 flex gap-1 h-7"
              asChild
            >
              <Link href={`/monitors/configure/${id}`}>
                <Settings className="h-4 w-4" />
                Configure
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-8">
            <Summary id={id} />
            <GenericLineChart id={id} startDate={startDate} />
          </div>
        </div>
      </div>
    </div>
  );
}
