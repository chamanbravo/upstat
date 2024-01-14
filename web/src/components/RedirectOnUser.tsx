import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Loader } from "./Loader";
import useUserStore from "@/store/UserStore";
import { isValidToken } from "@/lib/utils";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

interface Props {
  children: React.ReactNode;
}

interface JwtPayload {
  username: string;
}

export default function RedirectOnUser({ children }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const username = useUserStore((state) => state.username);
  const setUser = useUserStore((state) => state.setUser);

  const checkUserAuth = async () => {
    if (username) return navigate("/app/monitors");

    const accessToken = Cookies.get("access_token") || "";
    if (isValidToken(accessToken)) {
      const payload: JwtPayload | null = jwtDecode(accessToken);
      if (payload) {
        setUser(payload.username);
        return navigate("/app/monitors");
      }
    } else {
      return setLoading(false);
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  return loading ? <Loader /> : children;
}
