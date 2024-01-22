import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const tabItems = [
  {
    title: "Account",
    href: "/app/settings",
  },
  {
    title: "Password & Security",
    href: "/app/settings/password-security",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: SettingsLayoutProps) {
  const { pathname } = useLocation();
  return (
    <div className="space-y-6 pb-16 md:block">
      <div className="flex flex-col mt-4">
        <nav className="flex gap-6">
          {tabItems.map((menu, i) => (
            <Link
              to={menu.href}
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
        <Separator className="m-0" />
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
