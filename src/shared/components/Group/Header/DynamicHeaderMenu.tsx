"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui";
import { IUserProfile } from "@/shared/types/user.types";

export default function DynamicHeaderMenu({
  profile,
}: {
  profile?: IUserProfile;
}) {
  const pathname = usePathname();

  // Твоє меню команд
  const menus = [
    {
      match: "/log",
      items: [
        { href: "/log/cargo/add", label: "+ Нова заявка" },
        { href: "/log/tender/add", label: "+ Новий тендер" },
        // { href: "/log/cargo/export", label: "Експорт" },
      ],
    },
    {
      match: "/dashboard",
      items: [
        {
          href: "/dashboard/users",
          label: "+ Новий користувач",
        },
        { href: "/dashboard/users", label: "+ Додати тягач(авто)" },
        { href: "/dashboard/users", label: "+ Додати причіп(напівпричіп)" },
        // { href: "/log/tender/add", label: "+ Новий тендер" },
        // { href: "/log/cargo/export", label: "Експорт" },
      ],
    },
  ];

  const currentMenu = menus.find((m) => pathname.startsWith(m.match));
  if (!currentMenu) return null;

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          {currentMenu.items.map((item) => {
            const isActive = pathname === item?.href;

            return (
              <DropdownMenuItem asChild key={item?.href}>
                <Link
                  href={item?.href}
                  className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-sm transition-colors
                    ${
                      isActive
                        ? "bg-teal-500 text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700"
                    }`}
                >
                  <span>{item.label}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
