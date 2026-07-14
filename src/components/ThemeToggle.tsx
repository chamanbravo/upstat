"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;

    const applyTheme = (isDark: boolean) => {
      root.classList.toggle("dark", isDark);
    };

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mq.matches);
      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    } else {
      applyTheme(theme === "dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  if (!mounted) return null;

  const next: Record<Theme, Theme> = { light: "dark", dark: "system", system: "light" };

  return (
    <button
      onClick={() => setTheme(next[theme])}
      className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-accent transition-colors"
      aria-label={`Theme: ${theme}. Click to switch.`}
    >
      {theme === "light" && <Sun className="h-4 w-4" />}
      {theme === "dark" && <Moon className="h-4 w-4" />}
      {theme === "system" && (
        <span className="relative flex h-4 w-4 items-center justify-center">
          <Sun className="h-3 w-3 absolute rotate-0 scale-100 dark:rotate-90 dark:scale-0 transition-all" />
          <Moon className="h-3 w-3 absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100 transition-all" />
        </span>
      )}
      <span className="capitalize">{theme}</span>
    </button>
  );
}
