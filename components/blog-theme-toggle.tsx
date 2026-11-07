"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function BlogThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <button className="blog-theme" aria-label="Toggle color theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      <Sun size={18} className="blog-sun" aria-hidden="true" />
      <Moon size={18} className="blog-moon" aria-hidden="true" />
    </button>
  );
}
