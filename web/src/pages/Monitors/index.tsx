import DashboardLayout from "@/components/DashboardLayout";
import { Helmet } from "react-helmet-async";
import MonitorsTable from "./MonitorsTable";
import RedirectOnNoUser from "@/components/RedirectOnNoUser";

export default function Monitors() {
  return (
    <RedirectOnNoUser>
      <div className="m-auto max-w-[1200px] flex flex-col gap-4">
        <Helmet>
          <title>Monitors | Upstat</title>
        </Helmet>
        <DashboardLayout>
          <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">Monitors</h1>
              <p className="text-muted-foreground">
                Overview of all your monitors.
              </p>
            </div>
            <MonitorsTable />
          </div>
        </DashboardLayout>
      </div>
    </RedirectOnNoUser>
  );
}
