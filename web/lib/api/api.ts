import { redirect } from "next/navigation";
import { API_HOST } from "../constants";
import { headers } from "next/headers";
import { components } from "./types";

export const isRedirectError = (err: any) => {
  return (
    err &&
    typeof err === "object" &&
    "digest" in err &&
    typeof err.digest === "string" &&
    err.digest.startsWith("NEXT_REDIRECT")
  );
};

export const serverFetch = async (url: string, options?: RequestInit) => {
  const headerList = headers();
  const accessToken = headerList.get("x-access-token");

  const response = await fetch(API_HOST + url, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    ...options,
  });
  if (response.ok) {
    return response;
  } else if (response.status === 401) {
    redirect("/auth/");
  }
  return response;
};

export const fetchNeedSetup = async (): Promise<
  components["schemas"]["NeedSetup"] | null
> => {
  try {
    const response = await fetch(API_HOST + "/api/users/setup");
    if (response.ok) {
      const data = await response.json();
      return data.needSetup;
    }
    return null;
  } catch (err) {
    console.error("Error fetching data:", err);
    return null;
  }
};
