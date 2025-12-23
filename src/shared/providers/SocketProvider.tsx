// sockets/SocketProvider.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Socket } from "socket.io-client";
import { connectSocket } from "@/sockets/socketManager";
import { useAuth } from "@/shared/providers/AuthCheckProvider";
import { useRouter } from "next/navigation";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { profile } = useAuth();
  const router = useRouter();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!profile?.id) return;

    const socket = connectSocket("user", {
      auth: { userId: profile.id },
    });

    setSocket(socket);

    socket.on("USER_BLOCKED", () => {
      router.replace("/blocked");
    });

    return () => {
      socket.off("USER_BLOCKED");
      // ❌ НЕ disconnect
    };
  }, [profile?.id, router]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error("useSocket must be used inside SocketProvider");
  }

  return socket;
};
