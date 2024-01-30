import DashboardLayout from "@/components/DashboardLayout";
import SonarPing from "@/components/SonarPing/SonarPing";
import { Button } from "@/components/ui/button";
import { ChevronLeft, DotIcon, PauseCircle, Settings } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router";
import GenericLineChart from "./LineChart";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Summary from "./Summary";
import RedirectOnNoUser from "@/components/RedirectOnNoUser";
import { toast } from "@/components/ui/use-toast";
import { client } from "@/lib/utils";
import { components } from "@/lib/api/v1";

const { GET } = client;

const statusColor: Record<string, string> = {
  green: "text-green-500",
  yellow: "text-yellow-500",
  red: "text-red-500",
};

export default function index() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [monitorInfo, setMonitorInfo] = useState<
    components["schemas"]["MonitorInfoOut"]["monitor"]
  >({});
  const [monitorData, setMonitorData] = useState<
    components["schemas"]["HeartbeatsOut"]["heartbeat"]
  >([]);

  const fetchMonitorInfo = async (signal: AbortSignal) => {
    try {
      const response = await api(`/api/monitors/info/${id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        signal,
      });
      if (response.ok) {
        const data = await response.json();
        setMonitorInfo(data?.monitor);
      }
    } catch (error) {}
  };

  const fetchMonitorData = async (signal: AbortSignal) => {
    if (!id) return;
    try {
      const { response, data } = await GET(`/api/monitors/heartbeat/{id}`, {
        params: {
          path: {
            id: `${id}`,
          },
        },
        signal,
      });
      if (response.ok) {
        setMonitorData(data?.heartbeat);
      }
    } catch (error) {}
  };

  const pauseMonitor = async () => {
    try {
      const response = await api(`/api/monitors/pause/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        setMonitorInfo({ ...monitorInfo, status: "yellow" });
        return toast({
          title: "Monitor paused",
        });
      }
    } catch (error) {}
  };

  const resumeMonitor = async () => {
    try {
      const response = await api(`/api/monitors/resume/${id}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        setMonitorInfo({ ...monitorInfo, status: "green" });
        return toast({
          title: "Monitor resumed",
        });
      }
    } catch (error) {}
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchMonitorInfo(controller.signal);
    fetchMonitorData(controller.signal);
  }, []);

  return (
    <RedirectOnNoUser>
      <div className="m-auto max-w-[1200px] flex flex-col gap-4">
        <Helmet>
          <title>{monitorInfo?.name ? monitorInfo?.name : ""} | Upstat</title>
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
              <SonarPing status={monitorInfo?.status || ""} />
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-semibold flex gap-1 items-center">
                  {monitorInfo?.name}
                </h1>
                <div className="flex gap-1 items-center">
                  <p className={statusColor[monitorInfo?.status || ""]}>
                    {monitorInfo?.status === "green"
                      ? "Up"
                      : monitorInfo?.status === "red"
                      ? "Down"
                      : "Paused"}
                  </p>
                  <DotIcon className="text-muted-foreground h-4 w-4" />
                  <p className="text-muted-foreground">
                    {monitorInfo?.frequency && (
                      <>
                        Checked every{" "}
                        {monitorInfo.frequency <= 60
                          ? `${monitorInfo.frequency} seconds`
                          : `${monitorInfo.frequency / 60} minutes`}
                      </>
                    )}
                  </p>
                  <DotIcon className="text-muted-foreground h-4 w-4" />
                  <p className="text-muted-foreground">{monitorInfo?.url}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-8">
              <div className="flex gap-4 items-center">
                <Button
                  variant="ghost"
                  className="w-fit text-muted-foreground p-2 flex gap-1 h-7"
                  onClick={() => {
                    if (
                      monitorInfo?.status === "green" ||
                      monitorInfo?.status === "red"
                    ) {
                      pauseMonitor();
                    } else {
                      resumeMonitor();
                    }
                  }}
                >
                  <PauseCircle className="h-4 w-4" />
                  {monitorInfo?.status === "green"
                    ? "Pause"
                    : monitorInfo?.status === "yellow"
                    ? "Resume"
                    : "Pause"}{" "}
                  this monitor
                </Button>
                <Button
                  variant="ghost"
                  className="w-fit text-muted-foreground p-2 flex gap-1 h-7"
                  onClick={() => navigate(`/app/monitors/configure/${id}`)}
                >
                  <Settings className="h-4 w-4" />
                  Configure
                </Button>
              </div>
              <div className="flex flex-col gap-8">
                <Summary />
                <GenericLineChart
                  data={monitorData?.length ? [...monitorData].reverse() : []}
                />
              </div>
            </div>
          </div>
        </DashboardLayout>
      </div>
    </RedirectOnNoUser>
  );
}
