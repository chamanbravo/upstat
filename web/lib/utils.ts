import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { components } from "./api/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setCookie(name: string, value: string, days: number) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name: string) {
  let cookieValue = null;
  if (typeof window === "undefined") {
    return null;
  }

  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export function eraseCookie(name: string) {
  document.cookie = name + "=; Max-Age=-99999999;";
}

export const formatAsDateHour = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    hour: "numeric",
  });

export const formatAsDateHourMinute = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    hour: "numeric",
    minute: "numeric",
  });

export const formatAsDayDateHour = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  });

export const formatAsMonthDate = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
  });

export function calculateUptimePercentage(
  heartbeats: components["schemas"]["HeartbeatSummary"][]
) {
  const total = heartbeats.reduce((acc, hb) => hb?.total || 0 + acc, 0);
  const upCount = heartbeats.reduce((acc, hb) => hb?.up || 0 + acc, 0) || 0;
  // @ts-ignore
  return total === 0 ? 0 : (upCount / total).toFixed(2) * 100;
}
