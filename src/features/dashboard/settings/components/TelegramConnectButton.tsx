"use client";
import api from "@/shared/api/instance.api";
import { useEffect, useState } from "react";

interface TelegramConnectButtonProps {
  token: string | null;
  email?: string;
}

export const TelegramConnectButton = ({
  token,
  email,
}: TelegramConnectButtonProps) => {
  const [telegramToken, setTelegramToken] = useState<string | null>(token);

  const fetchToken = async () => {
    if (!email) return;
    try {
      const { data } = await api.post("/telegram-token/get", { email });
      setTelegramToken(data.token);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = () => {
    if (telegramToken) {
      console.log("good");

      const url = `https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME}?start=${telegramToken}`;
      window.open(url, "_blank");
    } else {
      fetchToken();
    }
  };

  return (
    <button
      className="px-6 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg shadow-md hover:shadow-lg transition"
      onClick={handleClick}
    >
      Підключити Telegram
    </button>
  );
};
