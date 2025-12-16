"use client";
import { Menu } from "lucide-react";
import ThemeSwitcher from "@/shared/components/ui/theme-switcher";

export default function Header({
  onMenuClick,
}: {
  onMenuClick?: () => void;
}) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 shadow-md">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700"
        >
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Кабінет користувача
        </h1>
      </div>
      <ThemeSwitcher />
    </header>
  );
}
