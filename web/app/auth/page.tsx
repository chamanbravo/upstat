import type { Metadata } from "next";
import LoginForm from "@/components/login-form";
import RegisterForm from "@/components/register-form";
import { fetchNeedSetup } from "@/lib/api/api";

export const metadata: Metadata = {
  title: "Auth | Upstat",
  description: "Simple & easy status monitoring.",
};

export default async function index() {
  const needSetup = await fetchNeedSetup();
  if (needSetup === undefined) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <span className="text-muted-foreground">
          Serverside error! Make sure application is configured properly.
        </span>
      </div>
    );
  }

  return (
    <div className="mt-4 px-4 flex justify-center items-center  md:h-[100vh] md:mt-0 md:px-0">
      {needSetup ? <RegisterForm /> : <LoginForm />}

      <span className="absolute p-2 w-[90%] sm:w-fit text-muted-foreground border text-sm rounded bottom-10 bg-card">
        This is a demo of upstat dashboard. The database resets periodically.
      </span>
    </div>
  );
}
