"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "./ui/button";
import { setCookie, getCookie } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

function getSystemPreference(): "light" | "dark" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = window.document.documentElement;
  const resolvedTheme = theme === "system" ? getSystemPreference() : theme;
  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = getCookie("upstat.theme") as Theme | null;
    if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      setTheme("system");
      applyTheme("system");
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => applyTheme("system");
      mediaQuery.addEventListener("change", handleChange);
      applyTheme("system");
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      applyTheme(theme);
    }
  }, [theme, mounted]);

  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
    setCookie("upstat.theme", nextTheme, 365);
  };

  const resolvedTheme =
    theme === "system" ? getSystemPreference() : theme;

  if (!mounted) {
    return (
      <Button
        variant="outline"
        className="px-0 flex items-center justify-center w-9 h-9"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      className="px-0 flex items-center justify-center w-9 h-9"
      onClick={cycleTheme}
      title={`Current: ${theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light"} mode. Click to switch.`}
    >
      {theme === "system" ? (
        <Monitor className="h-[1.2rem] w-[1.2rem] cursor-pointer" />
      ) : resolvedTheme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] cursor-pointer" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] cursor-pointer" />
      )}
    </Button>
  );
}
