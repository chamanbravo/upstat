import { useNavigate } from "react-router";

const refreshAccessToken = async () => {
  const response = await fetch("/api/auth/refresh-token", {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "applications/json",
    },
  });
  if (!response.ok) {
    const navigate = useNavigate();
    navigate("/");
  }
};

export const api = async (url: string, options: any) => {
  const response = await fetch(url, {
    ...options,
  });

  if (response.ok) {
    return response;
  } else if (response.status === 401) {
    await refreshAccessToken();
    return fetch(response.url, {
      ...options,
    });
  } else {
    throw new Error(`Request failed with status: ${response.status}`);
  }
};
