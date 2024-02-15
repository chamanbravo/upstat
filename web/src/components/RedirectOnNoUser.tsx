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
  firstname: {
    String: string;
  };
  lastname: {
    String: string;
  };
}

export default function RedirectOnNoUser({ children }: Props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const username = useUserStore((state) => state.username);
  const setUser = useUserStore((state) => state.setUser);

  const checkUserAuth = async () => {
    if (username) return setLoading(false);

    const accessToken = Cookies.get("access_token") || "";
    if (isValidToken(accessToken)) {
      const payload: JwtPayload | null = jwtDecode(accessToken);
      if (payload) {
        setUser(
          payload.username,
          payload.firstname.String,
          payload.lastname.String
        );
        return setLoading(false);
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    checkUserAuth();
  }, []);

  return loading ? <Loader /> : children;
}
