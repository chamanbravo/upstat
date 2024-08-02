"use client";

import { formatAsDateHour, formatAsDayDateHour } from "@/lib/utils";
import { differenceInHours } from "date-fns";
import { useEffect, useState } from "react";
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
            {`${item.name}: ${item.value}`}
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

  if (hoursDifference === 6) {
    return formatAsDateHour;
  } else if (hoursDifference === 12) {
    return formatAsDateHour;
  } else if (hoursDifference === 24) {
    return formatAsDateHour;
  } else {
    return formatAsDayDateHour;
  }
};

export default function Chart({ heartbeat, startDate }: Props) {
  return (
    <div className="flex flex-grow justify-center items-center">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={heartbeat} margin={{ top: 8 }}>
          <CartesianGrid
            stroke="hsl(var(--muted-foreground)/0.2)"
            strokeDasharray="5 5"
          />
          <Tooltip
            content={<CustomTooltip labelFormatter={formatter(startDate)} />}
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
            tickFormatter={(value) => `${(value / 60).toFixed(0)}s`}
          />
          <XAxis
            interval="preserveStartEnd"
            dataKey="timestamp"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tick={{
              fill: "hsl(var(--muted-foreground))",
            }}
            tickFormatter={formatter(startDate)}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
