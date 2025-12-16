'use client'
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// ThemeToggle.tsx
// Використовує next-themes + TailwindCSS
// Кнопка переключає тему між 'light' та 'dark'.
// Візуально — місяць переходить у сонце з плавною анімацією.

export default function ThemeSwitcher() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <button
      aria-label="Change theme"
      className="w-12 h-12 rounded-full p-2 bg-transparent flex items-center justify-center"
      disabled
    />
  );

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  function toggle() {
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      title={isDark ? "Switch to light" : "Switch to dark"}
      className="relative w-12 h-12 rounded-full p-2 flex items-center justify-center transition-colors duration-300
        bg-white/80 dark:bg-slate-800/60 backdrop-blur-sm shadow-sm dark:shadow-none"
    >
      {/* Container for icons */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* SUN */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-7 h-7 transform transition-all duration-500 ease-in-out
            ${isDark ? "opacity-0 scale-50 rotate-45" : "opacity-100 scale-100 rotate-0"}`}
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
          <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="M4.93 4.93l1.41 1.41" />
            <path d="M17.66 17.66l1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="M4.93 19.07l1.41-1.41" />
            <path d="M17.66 6.34l1.41-1.41" />
          </g>
        </svg>

        {/* MOON */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-7 h-7 transform transition-all duration-500 ease-in-out
            ${isDark ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-45"}`}
          aria-hidden
        >
          <path
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Ripple focus ring for accessibility */}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
