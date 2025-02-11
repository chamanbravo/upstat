import CreateNotificationForm from "@/components/notifications/create-notification-form";
import { fetchNotificationItem } from "@/lib/api/notifications";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditNotification({ params }: PageProps) {
  const { id } = params;
  const notification = await fetchNotificationItem(id);

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Edit your notification channel.</p>
      </div>

      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">Alerts</h3>
            <p className="max-w-xs text-muted-foreground">
              Select the notification channels you want to be informed.
            </p>
          </div>

          <CreateNotificationForm defaultValues={notification?.notification} />
        </div>
      </div>
    </div>
  );
}
