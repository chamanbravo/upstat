"use client";

import { formatAsDateHour, formatAsDateHourMinute } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  TooltipProps,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const CustomTooltip = ({
  label,
  active,
  payload,
  labelFormatter,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 border rounded-sm bg-card border-border">
        <p className="text-card-foreground">
          {labelFormatter ? labelFormatter(label, payload) : label}
        </p>
        {payload.map((item) => (
          <p
            key={item.name}
            className="text-[hsl(var(--current-period-stroke))]"
          >
            {item.name}:{" "}
            {+item.value! < 1000
              ? item.value + "ms"
              : +item.value! / 1000 + "s"}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

interface Props {
  heartbeat: any;
}

export default function RecentPingChart({ heartbeat }: Props) {
  return (
    <div className="flex items-center justify-center flex-grow h-40">
      <ResponsiveContainer width="100%" height="100%">
        {!heartbeat.length ? (
          <span className="text-muted-foreground items-center justify-center w-full h-full flex">
            No recent ping data.
          </span>
        ) : (
          <LineChart data={heartbeat} margin={{ top: 8 }}>
            <CartesianGrid
              stroke="hsl(var(--muted-foreground)/0.2)"
              strokeDasharray="5 5"
            />
            <Tooltip
              content={
                <CustomTooltip labelFormatter={formatAsDateHourMinute} />
              }
              cursor={{
                stroke: "hsl(var(--muted-foreground)/0.4)",
                strokeWidth: 1.5,
              }}
            />
            <Line
              type="monotone"
              dataKey="latency"
              name="Latency"
              stroke="hsl(var(--current-period-stroke))"
              strokeWidth={2}
              dot={false}
              activeDot={{
                stroke: "hsl(var(--background))",
              }}
              isAnimationActive={false}
            />
            <YAxis
              interval="preserveStartEnd"
              dataKey="latency"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={50}
              tick={{
                fill: "hsl(var(--muted-foreground))",
              }}
              tickFormatter={(value) =>
                value < 1000 ? value + "ms" : (value / 1000).toFixed(1) + "s"
              }
            />
            <XAxis
              dataKey="timestamp"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "hsl(var(--muted-foreground))",
              }}
              tickFormatter={formatAsDateHour}
              dy={4}
              overflow={"visible"}
              interval={60}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
