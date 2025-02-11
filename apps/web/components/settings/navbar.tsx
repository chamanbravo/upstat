"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tabItems = [
  {
    title: "Account",
    href: "/settings/",
  },
  {
    title: "Password & Security",
    href: "/settings/password-security/",
  },
];

export default function SettingsNavbar() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6">
      {tabItems.map((menu, i) => (
        <Link
          href={menu.href}
          key={i}
          className={cn(
            "text-muted-foreground font-normal hover:text-foreground pb-4",
            pathname === menu.href &&
              "text-foreground border-b-2 border-foreground"
          )}
        >
          {menu.title}
        </Link>
      ))}
    </nav>
  );
}
