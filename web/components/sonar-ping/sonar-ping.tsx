import { cn } from "@/lib/utils";
import "./styles.css";

interface Props {
  status: string;
}

const sonarColor: Record<string, string> = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
};

export default function SonarPing({ status }: Props) {
  return (
    <div className="relative h-8 w-8 pl-1">
      <div className={cn("pulse", sonarColor[status])}>
        <div
          className={`small-pulse absolute inset-0 flex items-center justify-center border rounded-[50%] border-${status}-500`}
        />
        <div
          className={`small-pulse absolute inset-0 flex items-center justify-center border rounded-[50%] border-${status}-500`}
        />
      </div>
    </div>
  );
}
