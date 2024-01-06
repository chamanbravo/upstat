import { useUser } from "@/contexts/UserContext";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";

interface Props {
  children: React.ReactNode;
}

export default function RedirectOnNoUser({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const { username, setUser } = useUser();

  const fetchUser = async (signal: AbortSignal) => {
    if (username) return setLoading(false);
    try {
      const start = new Date().valueOf();

      const res = await fetch("/api/user-info/", { signal });
      if (res.ok) {
        const data = await res.json();
        setUser(data.username);

        // Wait at least 2 seconds before showing the page
        const elapsed = new Date().valueOf() - start;
        const waitTime = Math.max(0, 2000 - elapsed);
        setTimeout(() => setLoading(false), waitTime);
      } else {
        location.href = new URL("/admin/login/?next=/", location.href).href;
      }
    } catch (reason) {
      console.log(reason);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchUser(controller.signal);
    return () => controller.abort();
  }, []);

  return loading ? <Loader /> : children;
}
