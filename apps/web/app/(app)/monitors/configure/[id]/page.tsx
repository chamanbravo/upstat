import type { Metadata } from "next";
import ChangeStatus from "@/components/monitor-item/change-status";
import DeleteMonitor from "@/components/monitor-item/delete-monitor";
import MonitorsForm from "@/components/monitors/form/monitors-form";
import { Button } from "@/components/ui/button";
import {
  fetchMonitorInfo,
  fetchMonitorsNotificationChannels,
  fetchMonitorsStatusPages,
} from "@/lib/api/monitors";
import { fetchNotifications } from "@/lib/api/notifications";
import { fetchStatusPages } from "@/lib/api/status-pages";
import { ChevronLeft, DotIcon } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Configure | Upstat",
  description: "Simple & easy status monitoring.",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMonitor({ params }: PageProps) {
  const id = (await params).id;
  const notificationChannels = await fetchNotifications();
  const statusPages = await fetchStatusPages();
  const monitorInfo = await fetchMonitorInfo(id);
  const monitorNotificationChannels =
    await fetchMonitorsNotificationChannels(id);
  const monitorStatusPages = await fetchMonitorsStatusPages(id);

  const defaultValues = {
    ...monitorInfo?.monitor,
    channels:
      monitorNotificationChannels?.notifications?.map((i) => String(i.id)) ||
      [],
    statusPages:
      monitorStatusPages?.statusPages?.map((i) => String(i.id)) || [],
  };

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          className="p-2 w-fit text-muted-foreground h-7"
          asChild
        >
          <Link href={`/monitors/${id}`}>
            <ChevronLeft className="w-4 h-4" />
            Monitor
          </Link>
        </Button>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Configure Monitor</h1>
          <div className="inline-flex items-center gap-1">
            <p className="text-muted-foreground">
              {monitorInfo?.monitor?.name}
            </p>
            <DotIcon className="text-muted-foreground h-4 w-4" />
            <p className={`text-${monitorInfo?.monitor?.status}-500 text-sm`}>
              {monitorInfo?.monitor?.status === "green"
                ? "Up"
                : monitorInfo?.monitor?.status === "red"
                  ? "Down"
                  : "Paused"}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 items-centerm">
        <ChangeStatus id={id} status={monitorInfo?.monitor?.status} />
        <DeleteMonitor id={id} />
      </div>

      <MonitorsForm
        notificationChannels={notificationChannels?.notifications}
        statusPages={statusPages?.statusPages}
        defaultValues={defaultValues}
      />
    </div>
  );
}
