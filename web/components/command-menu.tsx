"use client";

import * as React from "react";
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
import { useRouter } from "next/navigation";

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

export default function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

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
      <Button variant="ghost" className="p-0 w-9" onClick={() => setOpen(true)}>
        <kbd className="inline-flex items-center">
          <span className="text-[1rem]">⌘</span>
          <span className="text-[1.1rem]">K</span>
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList className="custom-scrollbar">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandSeparator />
          <CommandGroup heading="Menus">
            {menus.map((m, i) => (
              <CommandItem
                key={i}
                onSelect={() => {
                  runCommand(() => {
                    router.push(m.path);
                    if (m.name === "Logout") {
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
