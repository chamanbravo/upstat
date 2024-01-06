import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  TooltipProps,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface Props {
  data: {}[];
}

const CustomTooltip = ({
  label,
  active,
  payload,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card p-2 border border-border rounded-sm">
        <p className="text-card-foreground">{label}</p>
        {payload.map((item) => (
          <p
            key={item.name}
            className="text-[hsl(var(--current-period-stroke))]"
          >
            {`${item.name}: ${item.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function GenericLineChart({ data }: Props) {
  return (
    <div className="bg-card p-2 px-4 rounded-lg flex flex-col gap-8 border">
      <h3 className="font-medium text--xl">Response time in the last day</h3>
      <div className="flex flex-col w-full max-w-full h-[325px]">
        <div className="flex flex-grow justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8 }}>
              <CartesianGrid
                stroke="hsl(var(--muted-foreground)/0.2)"
                strokeDasharray="5 5"
              />
              <Tooltip
                content={<CustomTooltip />}
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
              />
              <XAxis
                interval="preserveStartEnd"
                dataKey="date"
                fontSize={14}
                tickLine={false}
                axisLine={false}
                tick={{
                  fill: "hsl(var(--muted-foreground))",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
