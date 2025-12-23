"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useRef,
} from "react";
import { useRouter } from "next/navigation";
import { IUserProfile } from "../types/user.types";
import {
  connectSocket,
  disconnectSocket,
  setSocketUserId,
} from "@/sockets/socketManager";

interface AuthContextType {
  profile?: IUserProfile;
  setProfile: React.Dispatch<React.SetStateAction<IUserProfile | undefined>>;
}

const AuthContext = createContext<AuthContextType>({
  setProfile: () => {},
});

export const AuthCheckProvider = ({
  profile: initialProfile,
  children,
}: {
  profile?: IUserProfile;
  children: ReactNode;
}) => {
  const router = useRouter();
  const [profile, setProfile] = useState<IUserProfile | undefined>(
    initialProfile
  );
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);

  // Використовуємо useEffect, щоб налаштувати підключення до сокету
  useEffect(() => {
    if (!profile?.id) return; // Чекаємо, поки профіль буде доступний

    // Встановлюємо userId для сокета
    setSocketUserId(profile.id);
    console.log(profile, "PROFILE 47");

    // Підключаємося до сокету
    const socket = connectSocket("user");

    // Функція для перевірки серця
    const sendHeartbeat = () => {
      if (socket.connected && document.visibilityState === "visible") {
        socket.emit("heartbeat");
      }
    };

    // Обробник для блокування користувача
    socket.on("USER_BLOCKED", () => {
      router.replace("/blocked");
    });

    // Інтервал для серця
    const interval = setInterval(sendHeartbeat, 25000);
    document.addEventListener("visibilitychange", sendHeartbeat);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", sendHeartbeat);
      socket.off("USER_BLOCKED");
      // ❌ disconnectSocket("user");
      // ❌ setSocketUserId(null);
    };
  }, [profile?.id, router]);

  return (
    <AuthContext.Provider value={{ profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
