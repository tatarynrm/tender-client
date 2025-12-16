import { Metadata } from "next";
import Link from "next/link";
import ProfileForm from "@/features/dashboard/profile/main/components/ProfileForm";

export const metadata: Metadata = {
  title: "Профіль — Налаштування",
  description: "Керуйте своїм профілем, сесіями, налаштуваннями та рефералами",
};

export default function ProfilePage() {
  const links = [
    { href: "/dashboard/profile", label: "Налаштування" },
    { href: "/dashboard/profile/sessions", label: "Сесії" },
    { href: "/dashboard/profile/referals", label: "Реферали" },
  ];

  return (
    <div className="max-w-4xl py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">Мій профіль</h1>

      <nav className="mb-6 flex gap-4 border-b border-gray-200 pb-1">
        {links.map(({ href, label }, idx) => (
          <Link
            key={idx}
            href={href}
            className={`hover:underline ${
              href === "/dashboard/profile" ? "text-teal-700" : "text-blue-600"
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <ProfileForm />
    </div>
  );
}
