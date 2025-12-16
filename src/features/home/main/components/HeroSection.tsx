"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { buttonVariants } from "@/shared/components/ui";
import { IUserProfile } from "@/shared/types/user.types";

const HeroSection = ({ profile }: { profile?: IUserProfile }) => {
  console.log(profile, "profile");

  return (
    <section className="relative z-10 flex flex-col items-center mt-12 text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-teal-400 via-cyan-300 to-indigo-400 text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]"
      >
        Cучасна тендерна платформа
      </motion.h1>

      {/* <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-lg md:text-xl text-gray-300 max-w-3xl mt-6 leading-relaxed"
      >
        Платформа для{" "}
        <span className="font-semibold text-teal-300">перевізників</span> і{" "}
        <span className="font-semibold text-indigo-300">замовників</span> —
        участь у тендерах, управління транспортом, документообіг і аналітика у
        єдиній системі.
      </motion.p> */}

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex gap-4 flex-wrap justify-center mt-10"
      >
        <Link
          href="/auth/register"
          className={`${buttonVariants()} px-8 py-4 text-lg rounded-full shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-teal-400/70 transition-all bg-gradient-to-r from-teal-500 to-indigo-500`}
        >
          🚛 Зареєструватися
        </Link>
        <Link
          href="/auth/login"
          className={`${buttonVariants({
            variant: "outline",
          })} px-8 py-4 text-lg rounded-full border border-teal-400 text-white bg-transparent transition-all`}
        >
          {profile?.company_name
            ? `📑 Увійти як ${profile.company_name}`
            : "📑 Увійти"}
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
