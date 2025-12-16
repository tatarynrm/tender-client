"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/shared/components/Logo/Logo";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white/80 backdrop-blur-md shadow-inner mt-20">
      <div className="w-full px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Логотип */}
        <div className="flex items-center">
          <Logo width={100} height={100} />
        </div>

        {/* Навігація */}
        {/* <div className="flex flex-wrap gap-6 text-gray-700 font-medium justify-center">
          <Link href="/">Головна</Link>
          <Link href="/auth/register">Реєстрація</Link>
          <Link href="/auth/login">Вхід</Link>
          <Link href="/features">Функції</Link>
          <Link href="/contacts">Контакти</Link>
        </div> */}

        {/* Контакти */}
        <div className="text-gray-600 text-center md:text-right text-sm">
          <p>© {new Date().getFullYear()} ISTender. Всі права захищені.</p>
          <p>support@istender.com | +380 50 123 45 67</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
