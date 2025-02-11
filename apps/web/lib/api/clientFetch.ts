import { getCookie } from "@/lib/utils";

export const clientFetch = async (url: string, options?: RequestInit) => {
  const accessToken = getCookie("access_token");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    ...options,
  });
  if (response.ok) {
    return response;
  } else if (response.status === 401) {
  }
  return response;
};
