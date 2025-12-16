"use client";
import api from "@/shared/api/instance.api";

export const TelegramDisconnectButton = ({ telegram_id }: { telegram_id: number }) => {
  const handleDisconnect = async () => {
    try {
      await api.post("/telegram-token/disconnect", { telegram_id });
      alert("Telegram успішно відключено!");
      // 🔥 тригер події через сокет, або оновлення профілю через useAuth
    } catch (err) {
      console.error("Помилка при відключенні Telegram:", err);
    }
  };

  return (
    <button
      onClick={handleDisconnect}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    >
      Відключити Telegram
    </button>
  );
};
