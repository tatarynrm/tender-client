import { io, Socket } from "socket.io-client";
import { useAuth } from "../providers/AuthCheckProvider";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

type Namespace = "chat" | "notifications" | "game" | "load" | "tender" | "user";

const sockets: Partial<Record<Namespace, Socket>> = {};
const { profile } = useAuth();
export function getSocket(namespace: Namespace): Socket {
  if (!sockets[namespace]) {
    sockets[namespace] = io(`${SOCKET_URL}${namespace}`, {
      transports: ["websocket"],
      autoConnect: true,
      auth: {
        userId: profile?.id, // ✅ ЗАВЖДИ profile.id
      },
    });
  }

  return sockets[namespace]!;
}
