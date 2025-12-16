"use client";
import { Key, ReactNode, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/shared/providers/AuthCheckProvider";
import { connectSocket } from "@/sockets/socketManager";
import api from "@/shared/api/instance.api";
import { SettingsCard } from "./SettingsCard";
import { Label, Switch } from "@/shared/components/ui";
import { TelegramConnectButton } from "./TelegramConnectButton";
import { TelegramDisconnectButton } from "./TelegramDisconectButton";
const notificationCategories = [
  {
    title: "Тендери",
    description: "Сповіщення про нові тендери та зміни у них.",
    options: [
      "Нові тендери у вашому регіоні",
      "Зміни у тендерах, на які ви подали заявку",
      "Завершені тендери та результати",
    ],
  },
  {
    title: "Замовлення",
    description: "Сповіщення про стан ваших замовлень та оновлення.",
    options: [
      "Статус замовлень",
      "Нові замовлення від клієнтів",
      "Затримки або проблеми у замовленнях",
    ],
  },
  {
    title: "Аналітика",
    description: "Статистика та звіти для вашого бізнесу.",
    options: [
      "Щотижневі звіти",
      "Щомісячні звіти",
      "Попередження про низьку ефективність",
    ],
  },
  {
    title: "Маркетинг",
    description: "Сповіщення про новини та пропозиції платформи.",
    options: [
      "Акції та знижки",
      "Новини платформи",
      "Офіційні оновлення та анонси",
    ],
  },
  {
    title: "Системні повідомлення",
    description: "Сповіщення про безпеку та технічні оновлення.",
    options: [
      "Попередження про безпеку",
      "Оновлення системи",
      "Технічні проблеми та аварії",
    ],
  },
];
const NotificationCard = ({ title, description, options }: any) => (
  <SettingsCard title={title}>
    <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
      {description}
    </p>
    <div className="flex flex-col gap-3">
      {options.map((opt: ReactNode, idx: Key | null | undefined) => (
        <Label
          key={idx}
          className="flex items-center gap-2 text-gray-800 dark:text-gray-100"
        >
          <Switch className="accent-teal-500" />
          {opt}
        </Label>
      ))}
    </div>
  </SettingsCard>
);

export const NotificationsTab = () => {
  const [activeTab, setActiveTab] = useState<"email" | "telegram">("email");
  const { profile, setProfile } = useAuth();

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Animated Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "email" ? (
            <EmailNotifications />
          ) : (
            <TelegramNotifications profile={profile} setProfile={setProfile} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* --------------------------------
   📩 Email Notifications Component
-----------------------------------*/
const EmailNotifications = () => (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
    {notificationCategories.map((cat, idx) => (
      <NotificationCard key={idx} {...cat} />
    ))}
  </div>
);

/* --------------------------------
   🤖 Telegram Notifications Component
-----------------------------------*/
export const TelegramNotifications = ({ profile, setProfile }: any) => {
  const [telegramToken, setTelegramToken] = useState<string | null>(null);
  const [loadingToken, setLoadingToken] = useState(true);
  const socketRef = useRef<any>(null);

  // 🔑 Отримання токена для підключення
  useEffect(() => {
    if (!profile?.email) return;

    const fetchToken = async () => {
      setLoadingToken(true);
      try {
        const { data } = await api.post("/telegram-token/get", {
          email: profile.email,
        });
        const token = data.token || data; // переконайся, що це токен
        setTelegramToken(token);
      } catch (err) {
        console.error("Помилка при отриманні Telegram токену:", err);
      } finally {
        setLoadingToken(false);
      }
    };

    fetchToken();
  }, [profile?.email]);

  // ⚡ Підключення сокета
  useEffect(() => {
    if (!profile?.id || socketRef.current) return;

    const socket = connectSocket("telegram", { query: { userId: profile.id } });
    socketRef.current = socket;

    socket.on("TELEGRAM_CONNECTED", (data: any) => {
      console.log("✅ TELEGRAM_CONNECTED:", data);
      setProfile((prev: any) => ({ ...prev, telegram_id: 0 }));
    });

    socket.on("TELEGRAM_DISCONNECTED", () => {
      console.log("❌ TELEGRAM_DISCONNECTED");
      setProfile((prev: any) => ({ ...prev, telegram_id: null }));
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [profile?.id, setProfile]);

  // 🔄 Рендеринг
  if (!profile?.telegram_id) {
    if (loadingToken) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Завантаження токену Telegram...
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          Для отримання Telegram-сповіщень потрібно підключити Telegram.
        </p>
        <TelegramConnectButton token={telegramToken} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TelegramDisconnectButton telegram_id={profile.telegram_id} />
      <EmailNotifications />
    </div>
  );
};
/* --------------------------------
   🧭 Tabs Component
-----------------------------------*/
const Tabs = ({ activeTab, setActiveTab }: any) => (
  <div className="flex justify-center gap-4 mb-6">
    {["email", "telegram"].map((tab) => (
      <button
        key={tab}
        onClick={() => setActiveTab(tab)}
        className={`px-6 py-2 rounded-full font-medium transition cursor-pointer ${
          activeTab === tab
            ? "bg-gradient-to-r from-teal-500 to-indigo-500 text-white shadow-lg"
            : "border-1 text-gray-400 hover:bg-white/20"
        }`}
      >
        {tab === "email" ? "Email сповіщення" : "Telegram сповіщення"}
      </button>
    ))}
  </div>
);
