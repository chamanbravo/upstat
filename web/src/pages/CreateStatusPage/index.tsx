import DashboardLayout from "@/components/DashboardLayout";
import { Helmet } from "react-helmet-async";
import RedirectOnNoUser from "@/components/RedirectOnNoUser";
import CreateStatusPage from "./StatusPageForm";

export default function Monitors() {
  return (
    <RedirectOnNoUser>
      <div className="m-auto max-w-[1200px] flex flex-col gap-4">
        <Helmet>
          <title>Status Pages | Upstat</title>
        </Helmet>
        <DashboardLayout>
          <div className="flex flex-col w-full gap-8">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold">Status Page</h1>
              <p className="text-muted-foreground">Create your status page</p>
            </div>

            <CreateStatusPage />
          </div>
        </DashboardLayout>
      </div>
    </RedirectOnNoUser>
  );
}
