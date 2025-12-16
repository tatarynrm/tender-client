"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 140, height = 200 }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setMounted(true); // після того як компонент змонтовано, можна використовувати theme
  }, []);

  if (!mounted) return null; // не рендеримо поки не визначена тема

  const logoSrc =
    theme === "dark" ? "/images/logo/logo-white.png" : "/images/logo/logo.png";

  return (
    <Image
      className="cursor-pointer"
      onClick={() => router.push("/")}
      src={logoSrc}
      alt="Логотип"
      width={width}
      height={height}
      priority
    />
  );
};

export default Logo;
