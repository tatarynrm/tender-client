"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Settings,
  ChevronRight,
  ChevronDown,
  BarChart,
  Users,
  LayoutList,
  Building2,
  UserRoundPen,
  FileStack,
  Shield,
  ShieldPlus,
  FileArchive,
  Car,
  HousePlug,
  PersonStandingIcon,
} from "lucide-react";
import { LogoutButton } from "@/shared/components/Buttons/LogoutButton";
import { IUserProfile } from "@/shared/types/user.types";
import { FaCar } from "react-icons/fa";

type MenuItem = {
  name: string;
  href?: string;
  icon?: React.ComponentType<any>;
  children?: MenuItem[];
  status?: "inactive";
  info?: string;
};

const links: MenuItem[] = [
  { name: "Головна", href: "/dashboard", icon: Home },
  {
    name: "Кабінет перевізника",
    icon: Car,
    children: [
      { name: "Головна", href: "/dashboard/cabinet/main", icon: HousePlug },
      {
        name: "Мої первезення",
        href: "/dashboard/cabinet/transportations",
        icon: Shield,
      },
      {
        name: "Графік оплат",
        href: "/dashboard/cabinet/pay",
        icon: ShieldPlus,
      },
      {
        name: "Відправлені АВР",
        href: "/dashboard/cabinet/sended-documents",
        icon: FileArchive,
      },
      {
        name: "Мій автопарк",
        href: "/dashboard/cabinet/car-park",
        icon: FaCar,
      },
      {
        name: "Персонал",
        href: "/dashboard/cabinet/employees",
        icon: PersonStandingIcon,
      },
    ],
  },
  {
    name: "Тендери",
    icon: LayoutList,
    children: [
      { name: "Активні", href: "/dashboard/tenders/active", icon: Shield },
      {
        name: "Приймаю участь",
        href: "/dashboard/tenders/my",
        icon: ShieldPlus,
      },
      {
        name: "Майбутні",
        href: "/dashboard/tenders/archive",
        icon: FileArchive,
      },
      { name: "Архів", href: "/dashboard/tenders/archive", icon: FileArchive },
    ],
  },
  {
    name: "Персональні дані",
    icon: User,
    children: [
      {
        name: "Компанія",
        href: "/dashboard/personal/my-company",
        icon: Building2,
      },
      {
        name: "Мій профіль",
        href: "/dashboard/personal/profile",
        icon: UserRoundPen,
      },
      {
        name: "Документи",
        href: "/dashboard/personal/documents",
        icon: FileStack,
      },
    ],
  },
  { name: "Користувачі", href: "/dashboard/users", icon: Users },
];

const defaultFooterLinks: MenuItem[] = [
  { name: "Налаштування", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar({
  onSelect,
  profile,
}: {
  onSelect?: () => void;
  profile: IUserProfile;
}) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  // Завантажуємо стан меню з localStorage
  useEffect(() => {
    const saved = localStorage.getItem("userSidebarOpenMenus");
    if (saved) setOpenMenus(JSON.parse(saved));
  }, []);

  // Зберігаємо стан меню
  useEffect(() => {
    localStorage.setItem("userSidebarOpenMenus", JSON.stringify(openMenus));
  }, [openMenus]);

  const toggleMenu = (name: string) =>
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));

  const isActive = (href?: string) => {
    if (!href) return false;
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const renderLink = (link: MenuItem, isChild = false) => {
    const { name, href, icon: Icon, children, status, info } = link;
    const activeParent = children?.some((child) => isActive(child.href));
    const active = isActive(href) || activeParent;
    const isInactive = status === "inactive";

    if (!children) {
      if (isInactive) {
        return (
          <div
            key={name}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 dark:text-gray-500 opacity-60 cursor-not-allowed relative"
            title={info}
          >
            {Icon && <Icon className="w-5 h-5" />}
            <span>{name}</span>
          </div>
        );
      }

      return (
        <Link
          key={name}
          href={href!}
          onClick={onSelect}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
            active
              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
              : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200"
          } ${isChild ? "ml-4" : ""}`}
        >
          {Icon && <Icon className="w-5 h-5" />}
          <span>{name}</span>
        </Link>
      );
    }

    return (
      <div key={name}>
        <button
          onClick={() => toggleMenu(name)}
          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition ${
            active
              ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
              : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            {Icon && <Icon className="w-5 h-5" />}
            <span>{name}</span>
          </div>
          {openMenus[name] ? (
            <ChevronDown className="w-4 h-4 opacity-70" />
          ) : (
            <ChevronRight className="w-4 h-4 opacity-70" />
          )}
        </button>

        <div
          className={`ml-6 mt-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
            openMenus[name]
              ? "max-h-60 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          {children.map((child) => renderLink(child, true))}
        </div>
      </div>
    );
  };

  // Footer
  const footerLinks = [...defaultFooterLinks];
  if (profile?.is_ict_admin) {
    footerLinks.push(
      { name: "Адмін панель", href: "/admin", icon: BarChart },
      { name: "CRM система", href: "/log", icon: FileStack }
    );
  }

  return (
    <div className="relative flex flex-col w-64 bg-white dark:bg-slate-800 h-[100dvh] custom-scrollbar">
      {/* Меню зі скролом */}
      <div className="flex-1 min-h-[40vh] overflow-y-auto p-4 space-y-2 scrollbar-thin ">
        {links.map((link) => renderLink(link))}
      </div>

      {/* Footer завжди внизу */}
      <div className="border-t border-gray-200 dark:border-slate-700 p-4 space-y-2 flex-shrink-0">
        {footerLinks.map((link) => renderLink(link))}
        <div className="flex justify-end mt-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
