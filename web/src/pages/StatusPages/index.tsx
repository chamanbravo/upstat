import DashboardLayout from "@/components/DashboardLayout";
import { Helmet } from "react-helmet-async";
import RedirectOnNoUser from "@/components/RedirectOnNoUser";
import StatusPagesTable from "./StatusPagesTable";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function index() {
  return (
    <RedirectOnNoUser>
      <div className="m-auto max-w-[1200px] flex flex-col gap-4">
        <Helmet>
          <title>Status Pages | Upstat</title>
        </Helmet>
        <DashboardLayout>
          <div className="flex flex-col w-full gap-8">
            <div className="flex items-end justify-between ">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold">Status Pages</h1>
                <p className="text-muted-foreground">
                  Overview of all your status pages.
                </p>
              </div>

              <Button asChild>
                <Link to="/app/status-pages/create">Create</Link>
              </Button>
            </div>

            <StatusPagesTable />
          </div>
        </DashboardLayout>
      </div>
    </RedirectOnNoUser>
  );
}
