import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";

export default function HeartbeatSummary({ heartbeat }: { heartbeat: any }) {
  function fillArray(arr: any) {
    while (arr?.length < 10) {
      arr.push(undefined);
    }
    return arr;
  }
  const finalHeartbeat = fillArray(heartbeat || [])?.reverse();

  return (
    <div className="flex h-full gap-1">
      {finalHeartbeat?.map((h: any, i: number) => (
        <TooltipProvider key={i}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                key={i}
                className={`h-4 w-1 rounded-[2px] ${
                  h?.status
                    ? h?.status === "green"
                      ? "bg-green-400"
                      : "bg-red-400"
                    : "bg-gray-400"
                } ${h && "hover:scale-125"} `}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-card border text-muted-foreground w-[170px] pl-1 h-full flex justify-between">
              <span>
                {h?.timestamp && format(new Date(h?.timestamp), "LLL d pp")}
              </span>
              <span>
                {h?.status && h?.timestamp ? `${h?.status_code}` : ""}
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
