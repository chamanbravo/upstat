import DashboardLayout from "@/components/DashboardLayout";
import { Helmet } from "react-helmet-async";
import RedirectOnNoUser from "@/components/RedirectOnNoUser";
import NotificationChannelTable from "./NotificationChannelTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function index() {
  return (
    <RedirectOnNoUser>
      <div className="m-auto max-w-[1200px] flex flex-col gap-4">
        <Helmet>
          <title>Notifications | Upstat</title>
        </Helmet>
        <DashboardLayout>
          <div className="flex flex-col w-full gap-8">
            <div className="flex items-end justify-between ">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <p className="text-muted-foreground">
                  Overview of all your notification channels.
                </p>
              </div>

              <Button asChild>
                <Link to="/app/notifications/create">Create</Link>
              </Button>
            </div>

            <NotificationChannelTable />
          </div>
        </DashboardLayout>
      </div>
    </RedirectOnNoUser>
  );
}
