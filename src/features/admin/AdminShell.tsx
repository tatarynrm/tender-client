"use client";

import React, { useEffect, useState } from "react";
import AdminSidebar from "./main/components/AdminSidebar";
import AdminHeader from "./main/components/AdminHeader";

interface AdminShellProps {
  children: React.ReactNode;
  profile?: any; // можна типізувати як User
}

export default function AdminShell({ children, profile }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [closeSidebar, setCloseSidebar] = useState(false);


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
      {/* BACKDROP */}
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
          <AdminSidebar onSelect={() => setSidebarOpen(false)}  profile={profile}/>
        </aside>
      )}
      {/* CONTENT */}
      <div className="flex flex-col flex-1 overflow-y-auto min-h-screen">
        <AdminHeader
          onMenuClick={toggleSidebar}
          toggleSidebarState={toggleSidebarState}
          closeSidebarState={closeSidebar}
          profile={profile}
        />
        <main className="flex-1 overflow-y-auto p-2 bg-gray-100 dark:bg-slate-900 transition-colors duration-300 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
}
