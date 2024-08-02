import fetchHeartbeat from "@/lib/api/monitors";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicChart = dynamic(() => import("./chart"), { ssr: false });

interface Props {
  id: string;
}

export default async function GenericLineChart({ id }: Props) {
  const heartbeat = await fetchHeartbeat(id, "2024-07-28T04:33:50.102Z");

  return (
    <div className="bg-card p-2 px-4 rounded-lg flex flex-col gap-8 border">
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
        <h3 className="font-medium text--xl">Response time</h3>
      </div>
      <div className="flex flex-col w-full max-w-full h-[325px]">
        <Suspense fallback={<div>Loading...</div>}>
          <DynamicChart heartbeat={heartbeat?.heartbeat || []} />
        </Suspense>
      </div>
    </div>
  );
}
