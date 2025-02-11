import StatusPageForm from "@/components/status-pages/status-page-form";

export default function CreateStatusPage() {
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold">Status Page</h1>
        <p className="text-muted-foreground">Create your status page.</p>
      </div>

      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-medium">Basic Information</h3>
            <p className="max-w-xs text-muted-foreground">
              A public status page informs your users about the uptime of your
              services.
            </p>
          </div>

          <StatusPageForm />
        </div>
      </div>
    </div>
  );
}
