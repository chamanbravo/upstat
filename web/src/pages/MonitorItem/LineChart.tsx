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
import { DateDropdown, DateItem, defaultDate } from "@/components/DateDropdown";
import { useEffect, useState } from "react";
import { components } from "@/lib/api/v1";
import { client } from "@/lib/utils";
import { useParams } from "react-router";

const { GET } = client;

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

export default function GenericLineChart() {
  const { id } = useParams();
  const [date, setDate] = useState<DateItem>(defaultDate);
  const [monitorData, setMonitorData] = useState<
    components["schemas"]["HeartbeatsOut"]["heartbeat"]
  >([]);

  const fetchHeartbeat = async (signal: AbortSignal) => {
    if (!id) return;
    try {
      const { response, data } = await GET(`/api/monitors/heartbeat/{id}`, {
        params: {
          path: {
            id: `${id}`,
          },
          query: {
            startTime: new Date(date.getStartTimeStamp).toISOString(),
          },
        },
        signal,
      });
      if (response.ok) {
        data?.heartbeat && setMonitorData(data?.heartbeat);
      }
    } catch (error) {}
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchHeartbeat(controller.signal);
  }, [date.value]);

  return (
    <div className="bg-card p-2 px-4 rounded-lg flex flex-col gap-8 border">
      <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
        <h3 className="font-medium text--xl">Response time</h3>
        <DateDropdown date={date} onChange={setDate} />
      </div>
      <div className="flex flex-col w-full max-w-full h-[325px]">
        <div className="flex flex-grow justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monitorData} margin={{ top: 8 }}>
              <CartesianGrid
                stroke="hsl(var(--muted-foreground)/0.2)"
                strokeDasharray="5 5"
              />
              <Tooltip
                content={<CustomTooltip labelFormatter={date.formatter} />}
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
                tickFormatter={(value) => `${value}ms`}
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
                tickFormatter={date.formatter}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
