import { serverFetch, isRedirectError } from "./api";

export async function fetchMonitorsList() {
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

export async function fetchMonitorInfo(id: string) {
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

export async function fetchMonitorSummary(id: string) {
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

export async function fetchMonitorCertExpCountdown(id: string) {
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

export default async function fetchHeartbeat(id: string, startTime: string) {
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

export const fetchMonitorsStatusPages = async (id: string) => {
  if (!id) return;
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

export const fetchMonitorsNotificationChannels = async (id: string) => {
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
