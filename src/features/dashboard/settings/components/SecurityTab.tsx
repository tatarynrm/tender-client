"use client";

import { useEffect, useState } from "react";
import { Button, Card } from "@/shared/components/ui";
import { SettingsCard } from "./SettingsCard";
import api from "@/shared/api/instance.api";
import { format } from "date-fns";
import { uk } from "date-fns/locale";

interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
  createdAt?: string;
}

export const SecurityTab = () => {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState<{
    current?: Session;
    others?: Session[];
  }>({});
  const [sessionsLoading, setSessionsLoading] = useState(false);
  const loadSessions = async () => {
    setSessionsLoading(true);
    try {
      const { data } = await api.get("/auth/sessions");
      setSessions(data || {});
    } catch (e) {
      console.error(e);
    } finally {
      setSessionsLoading(false);
    }
  };
  useEffect(() => {
    loadSessions();
  }, []);

  const toggle2FA = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/user/twofa", {
        enable: !is2FAEnabled,
      });
      setIs2FAEnabled(data.enabled);
    } catch (error) {
      console.error(error);
      alert("Не вдалося оновити 2FA");
    } finally {
      setLoading(false);
    }
  };

  const logoutOtherSessions = async () => {
    if (!confirm("Вийти з усіх інших пристроїв?")) return;
    setSessionsLoading(true);
    try {
      const { data } = await api.post("/auth/sessions/logout-others");
      loadSessions();
    } catch (e) {
      console.error(e);
    } finally {
      setSessionsLoading(false);
    }
  };

  const logoutCurrentSession = async () => {
    if (!confirm("Вийти з поточної сесії?")) return;
    try {
      await api.delete(`/auth/sessions/current`);
      // window.location.reload();
    } catch (e) {
      console.error(e);
      alert("Не вдалося вийти");
    }
  };

  return (
    <SettingsCard title="Безпека">
      <p className="text-gray-400 text-sm mb-3">
        Ви можете змінити пароль, ввімкнути двофакторну автентифікацію або
        керувати активними сесіями.
      </p>

      {/* --- Кнопки --- */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button
          className="px-5 py-2.5 bg-zinc-800 border border-zinc-700 text-gray-200 rounded-lg font-medium hover:bg-zinc-700 transition"
          onClick={() => alert("Тут можна зробити форму зміни пароля")}
        >
          🔒 Змінити пароль
        </Button>

        <Button
          className={`px-5 py-2.5 border rounded-lg font-medium transition ${
            is2FAEnabled
              ? "border-zinc-600 text-gray-300 hover:bg-zinc-800"
              : "border-zinc-600 text-gray-300 hover:bg-zinc-800"
          }`}
          onClick={toggle2FA}
          disabled={loading}
        >
          {loading
            ? "Завантаження..."
            : is2FAEnabled
            ? "🔑 Вимкнути 2FA"
            : "🔑 Увімкнути 2FA"}
        </Button>
      </div>

      {/* --- Сесії --- */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-200">
          Активні сесії
        </h3>

        {sessionsLoading ? (
          <p className="text-gray-400 text-sm">Завантаження...</p>
        ) : !sessions?.others?.length && !sessions?.current ? (
          <p className="text-gray-400 text-sm">Немає активних сесій</p>
        ) : (
          <ul className="divide-y rounded-lg overflow-hidden mb-4">
            {/* Поточна сесія */}
            {sessions.current && (
              <Card className="flex justify-between items-center px-4 py-3 text-sm bg-gray-300">
                <div>
                  <div className="font-medium text-gray-100">
                    {sessions.current.device}
                  </div>
                  <div className="text-gray-400">
                    Поточна сесія • Активна:{" "}
                    {sessions.current?.createdAt
                      ? format(
                          new Date(sessions.current.createdAt),
                          "dd.MM.yyyy HH:mm",
                          { locale: uk }
                        )
                      : "невідомо"}
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-semibold">
                  Цей пристрій
                </span>
              </Card>
            )}

            {/* Інші сесії */}
            {sessions.others?.map((session) => (
              <li
                key={session.id}
                className="flex justify-between items-center px-4 py-3 text-sm hover:bg-zinc-800/30 transition"
              >
                <div>
                  <div className="font-medium text-gray-100">
                    {session.device}
                  </div>
                  <div className="text-gray-400">
                    {session.location} • Активна:{" "}
                    {session.createdAt
                      ? format(
                          new Date(session.createdAt),
                          "dd.MM.yyyy HH:mm",
                          { locale: uk }
                        )
                      : "невідомо"}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="flex gap-3">
          <Button
            className="px-5 py-2 border rounded-lgtransition"
            onClick={logoutCurrentSession}
            disabled={sessionsLoading}
          >
            🚪 Вийти з цього пристрою
          </Button>

          <Button
            className="px-5 py-2 border rounded-lg  transition"
            onClick={logoutOtherSessions}
            disabled={sessionsLoading}
          >
            🔐 Вийти з усіх інших пристроїв
          </Button>
        </div>
      </div>
    </SettingsCard>
  );
};
