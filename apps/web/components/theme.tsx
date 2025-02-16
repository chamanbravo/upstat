"use client";

import { useEffect } from "react";

export function Theme() {
  const theme = "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add(theme);
    // root.classList.remove("light", "dark");
    // root.classList.add(theme);
    // window.localStorage.setItem("upstat.theme", theme);
  }, []);

  return null;
}
