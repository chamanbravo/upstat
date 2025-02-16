import { serverFetch, isRedirectError } from "./api";

export async function fetchNotifications() {
  try {
    const res = await serverFetch("/api/notifications");
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return null;
  }
}

export async function fetchNotificationItem(id: string) {
  try {
    const res = await serverFetch(`/api/notifications/${id}`);
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return null;
  }
}
