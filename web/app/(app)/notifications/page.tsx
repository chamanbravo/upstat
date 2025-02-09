import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { fetchNotifications } from "@/lib/api/notifications";
import DataTable from "@/components/notifications/data-table";
import EmptyState from "@/components/empty-state";
import { BellDotIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Notifications | Upstat",
  description: "Simple & easy status monitoring.",
};

export default async function Notifications() {
  const notifications = await fetchNotifications();

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex items-end justify-between ">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Overview of all your notification channels.
          </p>
        </div>

        <Button asChild>
          <Link href="/notifications/create">Create</Link>
        </Button>
      </div>

      {!notifications?.notifications ? (
        <EmptyState
          icon={<BellDotIcon />}
          title="No notifications channels"
          description="Create your first notification channel"
          action={
            <Button className="mt-4" asChild>
              <Link href="/notifications/create">Create</Link>
            </Button>
          }
        />
      ) : (
        <DataTable data={notifications?.notifications} />
      )}
    </div>
  );
}
