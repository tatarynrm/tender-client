"use client";
import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";

type Notification = { id: number; text: string };

const notificationsData = {
  system: [
    { id: 1, text: "Сервер буде оновлено о 18:00" },
    { id: 2, text: "Нова версія додатка доступна" },
  ],
  other: [
    { id: 3, text: "Марія закінчила завдання" },
    { id: 4, text: "Новий тендер створено" },
  ],
};

export default function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"system" | "other">("system");
  const ref = useRef<HTMLDivElement>(null);

  // Закриття при кліку поза меню
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700"
      >
        <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 shadow-lg rounded-lg border border-gray-200 dark:border-slate-700 z-50">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-slate-700">
            <button
              className={`flex-1 py-2 text-sm font-semibold transition ${
                activeTab === "system"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("system")}
            >
              Системні
            </button>
            <button
              className={`flex-1 py-2 text-sm font-semibold transition ${
                activeTab === "other"
                  ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              onClick={() => setActiveTab("other")}
            >
              Інші
            </button>
          </div>

          {/* Notifications */}
          <div className="max-h-60 overflow-y-auto">
            {notificationsData[activeTab].length === 0 ? (
              <div className="p-4 text-gray-500 dark:text-gray-400 text-sm">
                Сповіщень немає
              </div>
            ) : (
              notificationsData[activeTab].map((notif: Notification) => (
                <div
                  key={notif.id}
                  className="p-3 border-b border-gray-100 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                >
                  {notif.text}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
