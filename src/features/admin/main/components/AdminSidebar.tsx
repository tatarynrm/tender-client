import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  Settings,
  BarChart,
  Building2,
  ChevronRight,
  ChevronDown,
  FileStack,
  Pickaxe,
  KeyRound,
  UserRoundPlus,
  Users2Icon,
} from "lucide-react";
import { LogoutButton } from "@/shared/components/Buttons/LogoutButton";
import { IUserProfile } from "@/shared/types/user.types";
import { FaTelegram } from "react-icons/fa";
import { SiTelegram } from "react-icons/si";
type MenuItem = {
  name: string;
  href?: string;
  icon?: React.ComponentType<any>;
  children?: MenuItem[];
  status?: "inactive";
  info?: string;
};
// Ваші налаштування меню та типи залишаються без змін
const links: MenuItem[] = [
  { name: "Головна", href: "/admin", icon: Home },
  {
    name: "Користувачі",
    icon: Users,
    children: [
      {
        name: "Передреєстрація",
        href: "/admin/users/pre-register",
        icon: KeyRound,
      },
      { name: "Усі користувачі", href: "/admin/users", icon: Users },
      { name: "Створити", href: "/admin/users/create", icon: UserRoundPlus },
    ],
  },
  {
    name: "Компанії",
    icon: Building2,
    children: [
      { name: "Усі компанії", href: "/admin/companies", icon: Building2 },
      { name: "Створити", href: "/admin/companies/create", icon: Pickaxe },
    ],
  },
  { name: "Аналітика", href: "/admin/analytics", icon: BarChart },
  {
    name: "Telegram",
    icon: FaTelegram,
    children: [
      {
        name: "Користувачі телеграм",
        href: "/admin/telegram/users",
        icon: Users2Icon,
      },
      {
        name: "Повідомлення",
        href: "/admin/telegram/telegram-messages",
        icon: SiTelegram,
      },
    ],
  },
];

export default function AdminSidebar({
  onSelect,
  profile,
}: {
  onSelect?: () => void;
  profile: IUserProfile;
}) {
  const pathname = usePathname();
  console.log(profile, "PROFILE  62");

  // ініціалізація стану openMenus з localStorage
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Перевірка наявності даних у localStorage і ініціалізація стану
    if (typeof window !== "undefined") {
      const savedState = localStorage.getItem("adminSidebarOpenMenus");
      if (savedState) {
        try {
          setOpenMenus(JSON.parse(savedState));
        } catch (e) {
          console.error("Error parsing localStorage data", e);
        }
      }
    }
  }, []); // Цей useEffect виконується лише після першого рендеру

  useEffect(() => {
    // Синхронізація при зміні openMenus
    localStorage.setItem("adminSidebarOpenMenus", JSON.stringify(openMenus));
  }, [openMenus]); // Цей useEffect виконується при зміні openMenus

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isActive = (href?: string) => href && pathname === href;

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
              ? "bg-teal-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
              : "hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200"
          } ${isChild ? "ml-4" : ""}`}
        >
          {Icon && <Icon className="w-5 h-5" />}
          <span>{name}</span>
        </Link>
      );
    }

    return (
      <div key={name} className="custom-scrollbar">
        <button
          onClick={() => toggleMenu(name)}
          className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm transition ${
            active
              ? "bg-teal-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
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
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          {children.map((child) => renderLink(child, true))}
        </div>
      </div>
    );
  };

  const footerLinks: MenuItem[] = [
    { name: "Налаштування", href: "/admin/settings", icon: Settings },
  ];

  if (profile?.is_ict_admin) {
    footerLinks.push(
      {
        name: "Основна платформа",
        href: "/dashboard",
        icon: BarChart,
      },
      {
        name: "CRM система", // новий елемент
        href: "/log",
        icon: FileStack, // можна обрати іншу іконку
      }
    );
  }

  return (
    <div className="relative flex flex-col w-64 bg-white dark:bg-slate-800 h-[100dvh]">
      {/* Меню зі скролом */}
      <div className="flex-1 min-h-[40vh] overflow-y-auto p-4 space-y-2 scrollbar-thin">
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
