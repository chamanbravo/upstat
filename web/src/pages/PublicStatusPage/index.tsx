import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Helmet } from "react-helmet-async";
import { api } from "@/lib/api";
import { components } from "@/lib/api/v1";

export default function Monitors() {
  const { slug } = useParams();
  const [monitors, setMonitors] = useState<
    components["schemas"]["MonitorsListOut"]["monitors"]
  >([]);
  const [statusPageInfo, setStatusPageInfo] = useState<
    components["schemas"]["StatusPageInfo"]["statusPage"] | undefined
  >(undefined);

  const fetchStatusPages = async () => {
    if (!slug) return;
    try {
      const response = await api(`/api/status-pages/summary/${slug}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setStatusPageInfo(data?.statusPageInfo);
        setMonitors(data?.monitors);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchStatusPages();
  }, []);

  if (!statusPageInfo) {
    return <span>Not found</span>;
  }

  return (
    <div className="m-auto max-w-[650px] flex flex-col gap-4 pt-8">
      <Helmet>
        <title>{statusPageInfo ? statusPageInfo?.name : ""} | Upstat</title>
      </Helmet>
      <div className="flex flex-col w-full gap-8">
        <div className="flex flex-col gap-1 align-center">
          <h1 className="text-2xl font-bold text-center">
            {statusPageInfo?.name}
          </h1>
        </div>
        <div className="w-full p-4 border rounded-md">
          <div className="w-full text-center">
            <h3 className="text-lg font-medium">Status Check</h3>
          </div>

          <div className="flex flex-col w-full gap-8 mt-8 align-center">
            {monitors?.length &&
              monitors.map((m, i) => {
                function fillArray(
                  arr: (components["schemas"]["Heartbeat"] | undefined)[]
                ) {
                  while (arr.length < 45) {
                    arr.push(undefined);
                  }
                  return arr;
                }
                const finalHeartbeat = [
                  ...fillArray(m.heartbeat || []),
                ].reverse();
                return (
                  <div className="flex flex-col w-full gap-2" key={i}>
                    <div className="flex justify-between">
                      <span className="font-medium">{m.name}</span>
                      <span className="text-muted-foreground">100%</span>
                    </div>
                    <div className="flex justify-between w-full h-full">
                      {finalHeartbeat.map((h, i) => (
                        <div>
                          <div
                            key={i}
                            className={`h-8 w-[9px] rounded-[2px] ${
                              h?.status
                                ? h?.status === "green"
                                  ? "bg-green-400"
                                  : "bg-red-400"
                                : "bg-gray-600"
                            } ${h && "hover:scale-125"} `}
                            title={
                              h?.status && h?.timestamp
                                ? `${new Date(
                                    h?.timestamp
                                  ).toLocaleString()} - ${h?.status_code}`
                                : ""
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <span className="text-center text-muted-foreground">
          Powered by{" "}
          <a
            href="https://github.com/chamanbravo/upstat"
            className="underline"
            target="_blank"
          >
            Upstat
          </a>
        </span>
      </div>
    </div>
  );
}
