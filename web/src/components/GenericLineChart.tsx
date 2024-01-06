import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  TooltipProps,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "@/contexts/ThemeContext";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";
import { DateItem } from "@/components/DateDropdown";

interface Props {
  title: string;
  url: string;
  dateFormatter: (value: string) => string;
  date: DateItem;
  cumulative: boolean;
}

interface GamesData {
  current_period_date: string;
}

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
            className={`${
              item.name === "Current Period"
                ? "text-[#8884d8]"
                : "text-[#8d8d8d]"
            }`}
          >
            {`${item.name}: ${item.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function GenericLineChart({
  title,
  url,
  dateFormatter,
  date,
  cumulative,
}: Props) {
  const { theme } = useTheme();
  const [data, setData] = useState<GamesData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        url +
          `?count=${date.count}&interval=${date.interval}&start_date=${new Date(
            date.getStartTimeStamp
          ).toISOString()}&cumulative=${cumulative}`
      );
      if (response.ok) {
        const data = await response.json();
        setData(data?.items || []);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date, cumulative]);

  return (
    <div className="flex flex-col w-full sm:w-[500px] h-[325px] ">
      <div className="flex justify-between w-full">
        <div className="inline-flex gap-2">
          <span className="font-medium whitespace-nowrap">{title}</span>
        </div>
      </div>
      <div className="flex flex-grow justify-center items-center">
        {loading ? (
          <p>Loading...</p>
        ) : data?.length ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 8 }}>
              <CartesianGrid
                stroke={theme === "light" ? "#e2e8f0" : "#1e293b"}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="previous_period_value"
                name="Previous Period"
                stroke={theme == "light" ? "#c5cfd9" : "#303030"}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="current_period_value"
                name="Current Period"
                stroke="#8349B6"
                strokeWidth={2}
                dot={false}
              />
              <XAxis
                interval="preserveStartEnd"
                dataKey="current_period_date"
                fontSize={14}
                tickLine={false}
                tick={{
                  fill: "hsl(var(--muted-foreground))",
                }}
                // custom ticks, only show first and last
                ticks={[
                  data.at(0)?.current_period_date || 0,
                  data.at(-1)?.current_period_date || 0,
                ]}
                tickFormatter={dateFormatter}
              />
              <Tooltip
                content={<CustomTooltip labelFormatter={date.formatter} />}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted-foreground">No data found</p>
        )}
      </div>
    </div>
  );
}
