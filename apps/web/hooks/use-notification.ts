"use client";

import { useEffect, useState, useCallback } from "react";

interface NotificationOptions {
  title: string;
  body?: string;
  icon?: string;
  tag?: string;
}

export function useNotification() {
  const [permission, setPermission] = useState<NotificationPermission>(
    typeof Notification !== "undefined" ? Notification.permission : "denied"
  );

  const requestPermission = useCallback(async () => {
    if (typeof Notification === "undefined") return;
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, []);

  const notify = useCallback(
    (options: NotificationOptions) => {
      if (permission !== "granted") return null;
      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon,
        tag: options.tag,
      });
      return notification;
    },
    [permission]
  );

  useEffect(() => {
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      requestPermission();
    }
  }, [requestPermission]);

  return { permission, requestPermission, notify };
}
