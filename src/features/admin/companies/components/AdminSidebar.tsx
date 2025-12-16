"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Users, LayoutDashboard } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/companies", label: "Компанії", icon: Building2 },
  { href: "/admin/users", label: "Користувачі", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r shadow-sm h-[90vh]">
      <div className="p-4 font-bold text-xl border-b">Admin Panel</div>
      <nav className="p-4 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              pathname === href
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Icon className="w-4 h-4" /> {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
