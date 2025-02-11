"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { setCookie } from "@/lib/utils";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCookie("upstat.theme", newTheme, 365);
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(newTheme);
  };

  return (
    <Button
      // variant="ghost"
      variant="outline"
      className="px-0 flex items-center justify-center"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[2.2rem] cursor-pointer" />
      ) : (
        <Moon className="h-[1.2rem] w-[2.2rem] cursor-pointer" />
      )}
    </Button>
  );
}
