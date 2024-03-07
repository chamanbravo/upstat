import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DialogProps } from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import Cookies from "js-cookie";
import useUserStore from "@/store/UserStore";

const menus = [
  {
    name: "Monitors",
    path: "/app/monitors",
  },
  {
    name: "Notifications",
    path: "/app/notifications",
  },
  {
    name: "Status Pages",
    path: "/app/status-pages",
  },
  {
    name: "Settings",
    path: "/app/settings",
  },
  {
    name: "Account",
    path: "/app/settings",
  },
  {
    name: "Password & Security",
    path: "/app/settings/password-security",
  },
  {
    name: "Logout",
    path: "/",
  },
];

export default function CommandMenu({ ...props }: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const clearUser = useUserStore((state) => state.clearUser);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <Button
        variant="ghost"
        className="w-9 p-0"
        onClick={() => setOpen(true)}
        {...props}
      >
        <kbd className="inline-flex items-center">
          <span className="text-[1rem]">⌘</span>
          <span className="text-[1.1rem]">K</span>
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandSeparator />
          <CommandGroup heading="Menus">
            {menus.map((m, i) => (
              <CommandItem
                key={i}
                onSelect={() => {
                  runCommand(() => {
                    navigate(m.path);
                    if (m.name === "Logout") {
                      Cookies.remove("access_token");
                      Cookies.remove("refresh_token");
                      clearUser();
                    }
                  });
                }}
                className="cursor-pointer"
              >
                {m.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
