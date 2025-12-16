"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/shared/components/ui";

const CTASection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      viewport={{ once: true }}
      className="mt-32 text-center relative z-10"
    >
      <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-300 to-indigo-400 bg-clip-text text-transparent">
        Приєднуйтесь до платформи вже сьогодні
      </h2>
      <p className="text-gray-300 mb-8">
        Отримайте перевагу на ринку та автоматизуйте роботу свого бізнесу.
      </p>
      <Link
        href="/auth/register"
        className={`${buttonVariants()} px-8 py-4 text-lg rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_50px_rgba(56,189,248,0.7)] transition-all`}
      >
        🚀 Почати зараз
      </Link>
    </motion.section>
  );
};

export default CTASection;
