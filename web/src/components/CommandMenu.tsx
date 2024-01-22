import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DialogProps } from "@radix-ui/react-alert-dialog";
import { cn } from "@/lib/utils";
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

const menus = [
  {
    name: "Monitors",
    path: "/app/monitors",
  },
  {
    name: "Settings",
    path: "/app/settings/",
  },
  {
    name: "Account",
    path: "/app/settings/",
  },
  {
    name: "Password & Security",
    path: "/app/settings/password-security/",
  },
];

export default function CommandMenu({ ...props }: DialogProps) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

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
        className={cn(
          "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 ml-auto"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
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
                  runCommand(() => navigate(m.path));
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
