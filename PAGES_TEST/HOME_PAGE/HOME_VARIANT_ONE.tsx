"use client";

import { buttonVariants } from "@/shared/components/ui";
import Link from "next/link";
import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Logo from "@/shared/components/Logo/Logo";
import Footer from "@/shared/components/Footer/Footer";

const features = [
  {
    title: "Прозорі тендери 📑",
    description:
      "Усі тендери доступні онлайн. Беріть участь у чесних торгах і знаходьте найвигідніші умови співпраці.",
    details:
      "Докладна інформація: переглядайте історію тендерів, умови, рейтинги компаній та аналітику.",
    image:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Особистий кабінет перевізника 🚛",
    description:
      "Керуйте автопарком, відстежуйте тендери, завантажуйте документи та керуйте замовленнями в реальному часі.",
    details:
      "Повний контроль над транспортом: статус замовлень, фінансові звіти, завдання водіїв та аналітика ефективності.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Аналітика і звіти 📊",
    description:
      "Відстежуйте ваші ставки, виграні тендери та прибутковість, щоб приймати стратегічні рішення.",
    details:
      "Сегментація за періодами, графіки та детальні звіти для оптимізації роботи і підвищення прибутковості.",
    image:
      "https://static.tildacdn.com/tild3531-6361-4862-b332-373230313339/frame_1.png",
  },
  {
    title: "Документообіг онлайн 🗂️",
    description:
      "Всі контракти, рахунки та документи зберігаються у вашому кабінеті. Зручний доступ у будь-який час.",
    details:
      "Завантаження, підписання та відправка документів онлайн. Швидко та безпечно.",
    image:
      "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Мультиплатформність 🌍",
    description:
      "Користуйтеся платформою на комп’ютері, планшеті чи смартфоні. Все працює швидко і зручно.",
    details:
      "Платформа адаптована під будь-які пристрої, підтримує мобільні додатки та всі сучасні браузери.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1470&auto=format&fit=crop",
  },
  {
    title: "Інтеграції 🔗",
    description:
      "Синхронізуйте платформу з CRM, бухгалтерією, календарями та месенджерами для максимальної ефективності.",
    details:
      "API, Webhooks та готові інтеграції для швидкої синхронізації з вашими системами.",
    image:
      "https://d3373sevsv1jc.cloudfront.net/uploads/communities_production/article_block/1899/DA16A3C90F5A47569303568433490D8F.jpg",
  },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 },
  },
};

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 py-2 bg-gradient-to-br from-indigo-100 via-white to-teal-50 overflow-hidden">
      <div className="flex w-full">
        <Logo />
      </div>
      {/* декоративні бліки */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-teal-200 rounded-full blur-3xl opacity-40 animate-pulse pointer-events-none" />
      <div className="absolute top-60 -right-40 w-[500px] h-[500px] bg-indigo-200 rounded-full blur-3xl opacity-40 animate-pulse pointer-events-none" />

      {/* HERO */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-6xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-600"
      >
        Cучасна тендерна платформа
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-lg text-gray-700 max-w-3xl text-center mb-12 leading-relaxed"
      >
        Єдина платформа для{" "}
        <span className="font-semibold text-teal-700">перевізників</span> та{" "}
        <span className="font-semibold text-indigo-700">замовників</span>.
        Участь у тендерах, управління транспортом, документообіг і прозорі угоди
        — <span className="font-semibold">все онлайн</span>.
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="flex gap-4 flex-wrap justify-center"
      >
        <Link
          href="/auth/register"
          className={`${buttonVariants()} px-6 py-3 text-lg rounded-full shadow-lg hover:shadow-teal-400/50 transition-all`}
        >
          🚛 Зареєструватися як перевізник
        </Link>
        <Link
          href="/auth/login"
          className={`${buttonVariants({
            variant: "outline",
          })} px-6 py-3 text-lg rounded-full shadow-lg hover:shadow-indigo-400/10 transition-all text-black`}
        >
          📑 Увійти
        </Link>
      </motion.div>

      {/* FEATURES */}
      <motion.div
        className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="relative bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl p-6 flex flex-col items-center text-center border border-gray-100 overflow-hidden group hover:shadow-2xl hover:scale-[1.03] transition-all duration-300"
          >
            {/* Фото */}
            <div className="overflow-hidden rounded-xl w-full h-48 mb-4">
              <motion.img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Заголовок і опис */}
            <h3 className="text-xl font-semibold text-teal-700 mb-2 hover:text-indigo-700 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>

            {/* Детальна інформація при hover */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute top-0 left-0 w-full h-full bg-white/95 backdrop-blur-md p-6 flex flex-col justify-center items-start text-left opacity-0 pointer-events-none group-hover:opacity-100"
            >
              <h4 className="text-lg font-bold mb-2 text-teal-700">
                {feature.title} — Деталі
              </h4>
              <p className="text-gray-700">{feature.details}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA BOTTOM */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="mt-24 text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Приєднуйтесь до тендерної платформи вже сьогодні 🚀
        </h2>
        <Link
          href="/auth/register"
          className={`${buttonVariants()} px-8 py-3 text-lg rounded-full`}
        >
          Почати зараз
        </Link>
      </motion.div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
