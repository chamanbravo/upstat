import CreateNotificationForm from "@/components/notifications/create-notification-form";

export default function CreateNotification() {
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <p className="text-muted-foreground">Create your notification</p>
      </div>

      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">Alerts</h3>
            <p className="max-w-xs text-muted-foreground">
              Select the notification channels you want to be informed.
            </p>
          </div>

          <CreateNotificationForm />
        </div>
      </div>
    </div>
  );
}
