import { serverFetch, isRedirectError } from "./api";

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
