"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { differenceInHours, subDays, subHours } from "date-fns";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export type DateItem = {
  value: string;
  label: string;
  interval: "day" | "hour" | "month" | "year";
  getStartTimeStamp: string;
};

interface Props {
  date: string;
}

const data: DateItem[] = [
  {
    value: "6_hour",
    label: "Last 6 Hours",
    interval: "hour",
    getStartTimeStamp:
      new Date() instanceof Date
        ? subHours(new Date(), 6).toString()
        : new Date().toISOString(),
  },
  {
    value: "12_hour",
    label: "Last 12 Hours",
    interval: "hour",
    getStartTimeStamp:
      new Date() instanceof Date
        ? subHours(new Date(), 12).toString()
        : new Date().toISOString(),
  },
  {
    value: "24_hour",
    label: "Last 24 Hours",
    interval: "hour",
    getStartTimeStamp:
      new Date() instanceof Date
        ? subHours(new Date(), 24).toString()
        : new Date().toISOString(),
  },
  {
    value: "7_day",
    label: "Last 7 Days",
    interval: "day",
    getStartTimeStamp:
      new Date() instanceof Date
        ? subDays(new Date(), 7).toString()
        : new Date().toISOString(),
  },
];

export function DateDropdown({ date }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [dateItem, setDateItem] = useState<DateItem>(data[0]);

  useEffect(() => {
    const hoursDifference = differenceInHours(new Date(), new Date(date));

    if (hoursDifference === 6) {
      setDateItem(data[0]);
    } else if (hoursDifference === 12) {
      setDateItem(data[1]);
    } else if (hoursDifference === 24) {
      setDateItem(data[2]);
    } else {
      setDateItem(data[3]);
    }
  }, [date]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className=" border-2 min-w-[150px] inline-flex items-center whitespace-nowrap"
        >
          <span className="text-sm font-medium truncate">{dateItem.label}</span>
          <CaretSortIcon className="w-4 h-4 ml-auto opacity-50 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px]">
        <DropdownMenuRadioGroup
          value={dateItem.value}
          onValueChange={(value) => {
            const item = data.filter((i) => i.value === value)[0];
            const startDate = new Date(item.getStartTimeStamp).toISOString();
            setDateItem(item);
            router.push(`${pathname}?startDate=${startDate}`);
            router.refresh();
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
