"use client";
import { Columns2, Menu, PanelRight } from "lucide-react";
import { ToggleTheme } from "@/shared/components/ui";

import { IUserProfile } from "@/shared/types/user.types";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import DynamicHeaderMenu from "@/shared/components/Group/Header/DynamicHeaderMenu";

export default function LogHeader({
  onMenuClick,
  toggleSidebarState,
  closeSidebarState,
  profile,
}: {
  onMenuClick?: () => void;
  toggleSidebarState?: () => void;
  closeSidebarState?: boolean;
  profile: IUserProfile;
}) {
  const pathname = usePathname();
  return (
    <header className=" flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-800 shadow-md relative">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700"
        >
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        </button>

        <div className="hidden md:block">
          {closeSidebarState ? (
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <PanelRight
                size={30}
                color="teal"
                className="cursor-pointer"
                onClick={toggleSidebarState}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 270 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Columns2
                size={30}
                color="teal"
                className="cursor-pointer"
                onClick={toggleSidebarState}
              />
            </motion.div>
          )}
        </div>
        <div className="hidden md:block">
          <span className="text-teal-400 text-xs font-bold ">
            {profile?.company_name_full}({profile?.surname}{" "}
            {profile?.name.charAt(0)}.{profile?.last_name.charAt(0)})
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DynamicHeaderMenu profile={profile} />
        <ToggleTheme />
      </div>
    </header>
  );
}
