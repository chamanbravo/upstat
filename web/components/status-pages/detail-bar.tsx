import { components } from "@/lib/api/types";
import { cn } from "@/lib/utils";

interface Props {
  finalHeartbeat: (components["schemas"]["HeartbeatSummary"] | undefined)[];
}

export default function DetailBar({ finalHeartbeat }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between w-full h-full">
        {finalHeartbeat.map((h, i) => {
          const uptime = ((h?.up || 0) / (h?.total || 0)) * 100;
          return (
            <div key={i}>
              <div
                key={i}
                className={cn(`h-8 w-[9px] rounded-[2px] bg-gray-600`, {
                  "bg-green-400": uptime > 99,
                  "bg-yellow-400": 95 < uptime && uptime < 98,
                  "bg-red-400": uptime <= 95,
                  "hover:scale-110": h,
                })}
                title={h?.timestamp}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground text-xs font-light">
          45 days ago
        </span>
        <span className="text-muted-foreground text-xs font-light">Today</span>
      </div>
    </div>
  );
}
