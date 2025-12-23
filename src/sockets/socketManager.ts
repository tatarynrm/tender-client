"use client";

import { io, Socket } from "socket.io-client";

type Namespace = "user" | "tender" | "chat" | "load";

interface ManagedSocket {
  socket: Socket;
  userId: string;
}

const sockets: Partial<Record<Namespace, ManagedSocket>> = {};
let currentUserId: string | null = null;

// Встановлюємо userId
export const setSocketUserId = (userId: string | null) => {
  currentUserId = userId;
};

// Підключення сокета
export const connectSocket = (namespace: Namespace): Socket => {
  if (!currentUserId) throw new Error("UserId не встановлено. Виклич setSocketUserId() перед підключенням.");

  const existing = sockets[namespace];
  if (existing && existing.userId === currentUserId) return existing.socket;

  if (existing) {
    existing.socket.disconnect();
    delete sockets[namespace];
  }

  const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}/${namespace}`, {
    auth: { userId: currentUserId },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: Infinity,
  });

  sockets[namespace] = { socket, userId: currentUserId };
  return socket;
};

// Отримати існуючий сокет (може бути undefined)
export const getSocket = (namespace: Namespace): Socket | undefined =>
  sockets[namespace]?.socket;

// Відключити сокет
export const disconnectSocket = (namespace: Namespace) => {
  sockets[namespace]?.socket.disconnect();
  delete sockets[namespace];
};
