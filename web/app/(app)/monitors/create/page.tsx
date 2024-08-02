import MonitorsForm from "@/components/monitors/form/monitors-form";
import { Button } from "@/components/ui/button";
import { fetchNotifications } from "@/lib/api/notifications";
import { fetchStatusPages } from "@/lib/api/status-pages";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function CreteMonitor() {
  const notificationChannels = await fetchNotifications();
  const statusPages = await fetchStatusPages();

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          className="p-2 w-fit text-muted-foreground h-7"
          asChild
        >
          <Link href="/">
            <ChevronLeft className="w-4 h-4" />
            Monitor
          </Link>
        </Button>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Monitor</h1>
          <p className="text-muted-foreground">Create your monitor</p>
        </div>
      </div>

      <MonitorsForm
        notificationChannels={notificationChannels?.notifications}
        statusPages={statusPages?.statusPages}
      />
    </div>
  );
}
