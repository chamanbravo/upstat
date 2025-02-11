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
    path: "/",
  },
  {
    name: "Notifications",
    path: "/notifications",
  },
  {
    name: "Status Pages",
    path: "/status-pages",
  },
  {
    name: "Settings",
    path: "/settings",
  },
  {
    name: "Account",
    path: "/settings",
  },
  {
    name: "Password & Security",
    path: "/settings/password-security",
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
      <Button
        variant="outline"
        className="w-full flex justify-between p-0 px-2 min-w-[200px] md:min-w-[400px]"
        onClick={() => setOpen(true)}
      >
        <span className="text-muted-foreground text-sm">Jump to...</span>
        <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
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
