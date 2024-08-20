import { serverFetch, isRedirectError } from "./api";
import { components } from "./types";

export async function fetchStatusPages() {
  try {
    const res = await serverFetch("/api/status-pages");
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return null;
  }
}

export async function fetchStatusPageItem(id: string) {
  try {
    const res = await serverFetch(`/api/status-pages/${id}`);
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return null;
  }
}

export async function fetchStatusPagesSummary(
  slug: string
): Promise<components["schemas"]["StatusPageSummary"] | null> {
  try {
    const response = await serverFetch(`/api/status-pages/${slug}/summary`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (err) {
    if (isRedirectError(err)) throw err;
    return null;
  }
}
