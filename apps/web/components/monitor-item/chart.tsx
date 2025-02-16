"use client";

import { formatAsDateHourMinute, formatAsDayDateHour } from "@/lib/utils";
import { differenceInHours } from "date-fns";
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
      <div className="bg-card p-2 border border-border rounded-sm">
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
  startDate: string;
}

const formatter = (date: string) => {
  const hoursDifference = differenceInHours(new Date(), new Date(date));

  let format: (date: string) => string;
  let interval: number;

  if (hoursDifference === 6) {
    format = formatAsDateHourMinute;
    interval = 30;
  } else if (hoursDifference === 12) {
    format = formatAsDateHourMinute;
    interval = 60;
  } else if (hoursDifference === 24) {
    format = formatAsDateHourMinute;
    interval = 120;
  } else {
    format = formatAsDayDateHour;
    interval = 360;
  }

  return { format, interval };
};

export default function Chart({ heartbeat, startDate }: Props) {
  return (
    <div className="flex flex-grow justify-center items-center">
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
                <CustomTooltip labelFormatter={formatter(startDate).format} />
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
              fontSize={14}
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "hsl(var(--muted-foreground))",
              }}
              tickFormatter={(value) =>
                value < 1000 ? value + "ms" : (value / 1000).toFixed(1) + "s"
              }
            />
            <XAxis
              dataKey="timestamp"
              fontSize={14}
              tickLine={false}
              axisLine={false}
              dy={8}
              tick={{
                fill: "hsl(var(--muted-foreground))",
              }}
              tickFormatter={formatter(startDate).format}
              interval={formatter(startDate).interval}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
