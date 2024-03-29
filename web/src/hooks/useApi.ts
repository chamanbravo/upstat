import { useEffect, useState } from "react";
import { refreshAccessToken } from "@/lib/utils";

const useApi = <T>(url: string, options?: any) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);

  const api = async () => {
    setLoading(true);
    const response = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "content-type": "applications/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setLoading(false);
      return setData(data);
    } else if (response.status === 401) {
      refreshAccessToken();
      api();
    } else if (response.status !== 200) {
      setLoading(false);
      const error = await response.json();
      return setError(error);
    } else {
      throw new Error(`Request failed with status: ${response.status}`);
    }
  };

  useEffect(() => {
    api();
  }, []);

  return { data, error, loading };
};

export default useApi;
