import useThemeStore from "@/store/ThemeStore";
import { useEffect } from "react";

export function ThemeProvider() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return null;
}
