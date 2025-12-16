"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/features/dashboard/main/components/Sidebar";
import Header from "@/features/dashboard/main/components/Header";
import NextNProgress from "nextjs-progressbar";
export default function DashboardShell({
  profile,
  children,
}: {
  profile?: any; // можеш типізувати як UserProfile
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(false);

  // зчитування стану з localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("closeSidebar");
    if (savedState !== null) setCloseSidebar(savedState === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("closeSidebar", closeSidebar.toString());
  }, [closeSidebar]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleSidebarState = () => setCloseSidebar((prev) => !prev);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden transition-opacity"
        />
      )}

      {!closeSidebar && (
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white dark:bg-slate-800 shadow-lg transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:shadow-none`}
        >
          <Sidebar onSelect={() => setSidebarOpen(false)} profile={profile} />
        </aside>
      )}

      <div className="flex flex-col overflow-y-auto flex-1 min-h-screen">
        <Header
          profile={profile}
          onMenuClick={toggleSidebar}
          toggleSidebarState={toggleSidebarState}
          closeSidebarState={closeSidebar}
        />
        <main className="flex-1 overflow-y-auto p-2 bg-gray-100 dark:bg-slate-900 transition-colors duration-300 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
