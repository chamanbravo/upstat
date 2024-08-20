"use client";

import { Activity, BellDot, Cog, LogOut, PanelTop } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "./logout-button";

const selectedStyle = "bg-secondary text-foreground";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="max-w-[200px] h-[calc(100vh-60px)] border-r sticky top-[54px] pr-4 py-6 hidden md:flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <Button
          variant="ghost"
          className={`justify-start text-muted-foreground hover:text-foreground ${
            (pathname === "/" || pathname.includes("monitors")) && selectedStyle
          }`}
          asChild
        >
          <Link href="/">
            <Activity className="w-4 h-4 mr-2" />
            Monitors
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={`justify-start text-muted-foreground hover:text-foreground ${
            pathname?.includes("notifications") && selectedStyle
          }`}
          asChild
        >
          <Link href="/notifications/">
            <BellDot className="w-4 h-4 mr-2" />
            Notifications
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={`justify-start text-muted-foreground hover:text-foreground ${
            pathname?.includes("status-pages") && selectedStyle
          }`}
          asChild
        >
          <Link href="/status-pages/">
            <PanelTop className="w-4 h-4 mr-2" />
            Status Pages
          </Link>
        </Button>
        <Button
          variant="ghost"
          className={`justify-start text-muted-foreground hover:text-foreground ${
            pathname?.includes("settings") && selectedStyle
          }`}
          asChild
        >
          <Link href="/settings">
            <Cog className="w-4 h-4 mr-2" />
            Settings
          </Link>
        </Button>
      </div>
      <LogoutButton />
    </div>
  );
}
