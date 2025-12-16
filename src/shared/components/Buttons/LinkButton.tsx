"use client";

import Link from "next/link";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/shared/utils";

interface LinkButtonProps {
  href: string;
  children?: ReactNode;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  icon?: ReactNode;
  title?:string;
}

const LinkButton = ({
  href,

  className,
  variant = "default",
  icon,
  title
}: LinkButtonProps) => {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-offset-1";

  const variants = {
    default:
      "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-500 shadow-md",
    outline:
      "border border-teal-600 text-teal-700 hover:bg-teal-600 hover:text-white focus:ring-teal-500",
    ghost: "text-teal-600 hover:bg-teal-50 focus:ring-teal-400",
  };

  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.94 }}>
      <Link
        href={href}
        className={cn(
          baseStyle,
          variants[variant],
          "px-4 py-2 text-sm",
          className
        )}
      >
        {title}
        {icon && <span className="text-lg">{icon}</span>}
      </Link>
    </motion.div>
  );
};

export default LinkButton;
