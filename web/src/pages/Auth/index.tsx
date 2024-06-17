/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import RedirectOnUser from "@/components/RedirectOnUser";
import { client } from "@/lib/utils";

const { GET } = client;

export default function index() {
  const [needSetup, setNeedSetup] = useState<boolean | undefined>(undefined);

  const fetchNeedSetup = async () => {
    try {
      const { response, data } = await GET("/api/users/setup");
      if (response.ok) {
        setNeedSetup(data?.needSetup);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchNeedSetup();
  }, []);

  return (
    <RedirectOnUser>
      <div className="mt-4 px-4 flex justify-center items-center  md:h-[100vh] md:mt-0 md:px-0">
        {needSetup === undefined ? null : needSetup ? (
          <RegisterForm />
        ) : (
          <LoginForm />
        )}

        <span className="absolute p-2 w-[90%] sm:w-fit text-muted-foreground border text-sm rounded bottom-10 bg-card">
          This is a demo of upstat dashboard. The database resets periodically.
        </span>
      </div>
    </RedirectOnUser>
  );
}
