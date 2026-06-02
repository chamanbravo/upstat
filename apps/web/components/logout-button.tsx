"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="justify-start text-muted-foreground hover:text-foreground w-full"
      onClick={() => {
        document.cookie =
          "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        router.push("/auth/");
      }}
    >
      <LogOut className="w-4 h-4 mr-2" />
      Logout
    </Button>
  );
}
