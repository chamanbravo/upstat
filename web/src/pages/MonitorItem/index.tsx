import DashboardLayout from "@/components/DashboardLayout";
import SonarPing from "@/components/SonarPing/SonarPing";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { ChevronLeft, DotIcon, PauseCircle, Settings } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import DataTable from "./DataTable";
import GenericLineChart from "./LineChart";

export default function index() {
  const navigate = useNavigate();
  const monitorItem = {
    name: "Chad",
    url: "https://chad.com",
    frequency: "3",
    status: "up",
    result: [
      {
        date: "Sat Jan 15 2022",
        latency: "100",
        status: "200",
      },
      {
        date: "Sun Jan 16 2022",
        latency: "200",
        status: "200",
      },
      {
        date: "Sat Jan 15 2022",
        latency: "100",
        status: "200",
      },
      {
        date: "Sun Jan 16 2022",
        latency: "200",
        status: "200",
      },
    ],
  };

  return (
    <div className="m-auto max-w-[1200px] flex flex-col gap-4">
      <Helmet>
        <title>{monitorItem.name} | Upstat</title>
      </Helmet>
      <DashboardLayout>
        <div className="flex flex-col gap-3 w-full">
          <Button
            variant="ghost"
            className="w-fit text-muted-foreground p-2 h-7"
            onClick={() => navigate("/app/monitors")}
          >
            <ChevronLeft className="h-4 w-4" />
            Monitors
          </Button>
          <div className="flex gap-4 items-center">
            <SonarPing />
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold flex gap-1 items-center">
                {monitorItem.name}
              </h1>
              <div className="flex gap-1 items-center">
                <p className="text-green-500">
                  {monitorItem.status.charAt(0).toUpperCase() +
                    monitorItem.status.slice(1)}
                </p>
                <DotIcon className="text-muted-foreground h-4 w-4" />
                <p className="text-muted-foreground">
                  Checked every {monitorItem.frequency} minutes
                </p>
                <DotIcon className="text-muted-foreground h-4 w-4" />
                <p className="text-muted-foreground">{monitorItem.url}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex gap-4 items-center">
              <Button
                variant="ghost"
                className="w-fit text-muted-foreground p-2 flex gap-1 h-7"
              >
                <PauseCircle className="h-4 w-4" />
                Pause this monitor
              </Button>
              <Button
                variant="ghost"
                className="w-fit text-muted-foreground p-2 flex gap-1 h-7"
              >
                <Settings className="h-4 w-4" />
                Configure
              </Button>
            </div>
            <div className="flex flex-col gap-8">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="px-4 py-5 flex flex-col gap-3">
                  <CardTitle className="text-muted-foreground font-normal">
                    Avg. Response
                  </CardTitle>
                  <p className="text-xl font-semibold">230 ms</p>
                </Card>
                <Card className="px-4 py-5 flex flex-col gap-3">
                  <CardTitle className="text-muted-foreground font-normal">
                    Uptime (24 hour)
                  </CardTitle>
                  <p className="text-xl font-semibold">100%</p>
                </Card>
                <Card className="px-4 py-5 flex flex-col gap-3">
                  <CardTitle className="text-muted-foreground font-normal">
                    Uptime (30 days)
                  </CardTitle>
                  <p className="text-xl font-semibold">Content</p>
                </Card>
                <Card className="px-4 py-5 flex flex-col gap-3">
                  <CardTitle className="text-muted-foreground font-normal">
                    Cert Exp.
                  </CardTitle>
                  <p className="text-xl font-semibold">258 days</p>
                </Card>
              </div>
              <GenericLineChart data={monitorItem.result} />
              <DataTable />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
