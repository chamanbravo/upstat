import { components } from "@/lib/api/types";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

interface Props {
  finalHeartbeat: (components["schemas"]["HeartbeatSummary"] | undefined)[];
}

export default function DetailBar({ finalHeartbeat }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between w-full h-full">
        {finalHeartbeat.map((h, i) => {
          const uptime = ((h?.up || 0) / (h?.total || 0)) * 100;
          const barColor = {
            "bg-green-400": uptime > 99,
            "bg-yellow-400": 95 < uptime && uptime < 98,
            "bg-red-400": uptime <= 95,
          };
          return (
            <div key={i}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      key={i}
                      className={cn(`h-8 w-[9px] rounded-[2px] bg-gray-600`, {
                        ...barColor,
                        "hover:scale-110": h,
                      })}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-card border text-muted-foreground w-[170px] pl-1 h-full flex gap-2">
                    <div className={cn("w-1 h-auto rounded-md", barColor)} />
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex justify-between">
                        <span>{h?.total} Requests</span>
                        <span>
                          {h?.timestamp &&
                            format(new Date(h?.timestamp), "LLL d")}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          <span className="text-green-400">{h?.up}</span>{" "}
                          Success
                        </span>
                        <span>
                          <span className="text-red-400">{h?.down}</span> Failed
                        </span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
