"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
  useRef,
  use,
} from "react";
import { useRouter } from "next/navigation";
import { IUserProfile } from "../types/user.types";

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
  // setSocketUserId(profile.id);

  // // Використовуємо useEffect, щоб налаштувати підключення до сокету
  // useEffect(() => {
  //   if (!profile?.id) return;

  //   console.log('this socket',socket);

  //   // setSocketUserId(profile.id); // після логіну
  //   socket?.on("USER_BLOCKED", () => {
  //     router.replace("/blocked");
  //   });

  //   return () => {
  //     socket?.off("USER_BLOCKED");
  //   };
  // }, [profile?.id]);

  useEffect(() => {
    if (profile?.id) {
      localStorage.setItem("socket", profile.id); // Зберігаємо userId в localStorage після логіну
    }
  }, [profile]);
  return (
    <AuthContext.Provider value={{ profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
