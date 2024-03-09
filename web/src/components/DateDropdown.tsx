import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { subDays, subHours, subMonths } from "date-fns";
import {
  formatAsDateHour,
  formatAsDayDateHour,
  formatAsMonthDate,
  formatAsMonthYear,
} from "@/lib/utils";

export type DateItem = {
  value: string;
  label: string;
  interval: "day" | "hour" | "month" | "year";
  getStartTimeStamp: string;
  formatter: (value: string) => string;
  count: number;
};

interface Props {
  date: DateItem;
  onChange: (date: DateItem) => void;
}

const data: DateItem[] = [
  {
    value: "6_hour",
    label: "Last 6 Hours",
    interval: "hour",
    count: 6,
    getStartTimeStamp:
      new Date() instanceof Date
        ? subHours(new Date(), 6).toString()
        : new Date().toISOString(),
    formatter: formatAsDateHour,
  },
  {
    value: "12_hour",
    label: "Last 12 Hours",
    interval: "hour",
    count: 12,
    getStartTimeStamp:
      new Date() instanceof Date
        ? subHours(new Date(), 12).toString()
        : new Date().toISOString(),
    formatter: formatAsDateHour,
  },
  {
    value: "24_hour",
    label: "Last 24 Hours",
    interval: "hour",
    count: 24,
    getStartTimeStamp:
      new Date() instanceof Date
        ? subHours(new Date(), 24).toString()
        : new Date().toISOString(),
    formatter: formatAsDateHour,
  },
  {
    value: "7_day",
    label: "Last 7 Days",
    interval: "day",
    count: 7,
    getStartTimeStamp:
      new Date() instanceof Date
        ? subDays(new Date(), 7).toString()
        : new Date().toISOString(),
    formatter: formatAsDayDateHour,
  },
  {
    value: "14_day",
    label: "Last 14 Days",
    interval: "day",
    count: 14,
    getStartTimeStamp:
      new Date() instanceof Date
        ? subDays(new Date(), 14).toString()
        : new Date().toISOString(),
    formatter: formatAsDayDateHour,
  },
  {
    value: "30_day",
    label: "Last 30 Days",
    interval: "day",
    count: 30,
    getStartTimeStamp:
      new Date() instanceof Date
        ? subDays(new Date(), 30).toString()
        : new Date().toISOString(),
    formatter: formatAsMonthDate,
  },
  {
    value: "12_month",
    label: "Last 12 Months",
    interval: "month",
    count: 12,
    getStartTimeStamp:
      new Date() instanceof Date
        ? subMonths(new Date(), 12).toString()
        : new Date().toISOString(),
    formatter: formatAsMonthYear,
  },
];

const dataMap = new Map(data.map((i) => [i.value, i]));
export const defaultDate = data[0];

export function DateDropdown({ date, onChange }: Props) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className=" border-2 min-w-[150px] inline-flex items-center whitespace-nowrap"
        >
          <span className="text-sm font-medium truncate">{date.label}</span>
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px]">
        <DropdownMenuRadioGroup
          value={date.value}
          onValueChange={(value) => {
            onChange(dataMap.get(value) || data[0]);
          }}
        >
          {data.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
