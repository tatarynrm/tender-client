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
import { connectSocket } from "@/sockets/socketManager";

interface AuthContextType {
  profile?: IUserProfile;
  setProfile: React.Dispatch<React.SetStateAction<IUserProfile | undefined>>; // 🟢 додаємо типізацію для setProfile
}

const AuthContext = createContext<AuthContextType>({
  setProfile: () => {}, // значення за замовчуванням (щоб не було помилки)
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
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!profile || socketRef.current) return; // ⚡ запобігаємо повторному підключенню

    const socket = connectSocket("user", { query: { userId: profile.id } });
    socketRef.current = socket;

    socket.on("USER_BLOCKED", () => {
      setProfile((prev) => prev && { ...prev, is_blocked: true });
      router.replace("/blocked");
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [profile, router]);

  return (
    <AuthContext.Provider value={{ profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
