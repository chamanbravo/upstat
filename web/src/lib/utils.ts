import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatAsMonthDateHour = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  });

export const formatAsMonthDate = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
  });

export const formatAsMonthYear = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: "short",
    year: "numeric",
  });

export const formatAsYear = (value: string) =>
  new Date(value).toLocaleString(undefined, { year: "numeric" });
