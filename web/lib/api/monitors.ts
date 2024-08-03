import { serverFetch, isRedirectError } from "./api";
import { components } from "./types";

export async function fetchMonitorsList(): Promise<
  components["schemas"]["MonitorsListOut"] | null
> {
  try {
    const res = await serverFetch("/api/monitors");
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return null;
  }
}

export async function fetchMonitorInfo(
  id: string
): Promise<components["schemas"]["MonitorInfoOut"] | null> {
  try {
    const response = await serverFetch(`/api/monitors/${id}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function fetchMonitorSummary(
  id: string
): Promise<components["schemas"]["MonitorSummaryOut"] | null> {
  try {
    const response = await serverFetch(`/api/monitors/summary/${id}`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    return null;
  }
}

export async function fetchMonitorCertExpCountdown(
  id: string
): Promise<components["schemas"]["CertificateExpiryCountDown"] | null> {
  try {
    const response = await serverFetch(
      `/api/monitors/cert-exp-countdown/${id}`
    );
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    return null;
  }
}

export default async function fetchHeartbeat(
  id: string,
  startTime: string
): Promise<components["schemas"]["HeartbeatsOut"] | null> {
  try {
    const response = await serverFetch(
      `/api/monitors/heartbeat/${id}?startTime=${startTime}`
    );
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    return null;
  }
}

export const fetchMonitorsStatusPages = async (
  id: string
): Promise<components["schemas"]["ListStatusPagesOut"] | null> => {
  if (!id) return null;
  try {
    const response = await serverFetch(`/api/monitors/${id}/status-pages`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const fetchMonitorsNotificationChannels = async (
  id: string
): Promise<components["schemas"]["NotificationListOut"] | null> => {
  try {
    const response = await serverFetch(`/api/monitors/${id}/notifications`);
    if (response.ok) {
      return await response.json();
    }
    return null;
  } catch (error) {
    return null;
  }
};
