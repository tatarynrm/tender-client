// "use client";
// import { io, Socket } from "socket.io-client";

// type SocketMap = {
//   user?: Socket;
//   tender?: Socket;
//   chat?: Socket;
//   telegram?: Socket;
//   load?: Socket;
// };

// const sockets: SocketMap = {};

// export const connectSocket = (
//   namespace: keyof SocketMap,
//   options?: any
// ): Socket => {
//   if (sockets[namespace]) return sockets[namespace]!;

//   const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/${namespace}`;
//   const socket = io(url, {
//     ...options,
//     reconnection: true, // Забезпечує автоматичне перепідключення
//     reconnectionAttempts: Infinity, // Безліч спроб перепідключення
//     reconnectionDelay: 1000, // Затримка між спробами перепідключення
//     reconnectionDelayMax: 5000, // Максимальна затримка для перепідключення
//   });

//   sockets[namespace] = socket;

//   // Відновлюємо підключення, коли вікно знову в фокусі
//   window.addEventListener("focus", () => {
//     // Перевіряємо, чи сокет підключений
//     if (!sockets[namespace]?.connected) {
//       console.log(`Reconnecting to socket ${namespace}`);
//       socket.connect();
//     }
//   });

//   // Якщо сокет не підключений, намагаємось підключити його
//   if (!socket.connected) {
//     socket.connect();
//   }

//   return socket;
// };

// export const getSocket = (namespace: keyof SocketMap): Socket | undefined => {
//   return sockets[namespace];
// };

// export const disconnectSocket = (namespace: keyof SocketMap) => {
//   sockets[namespace]?.disconnect();
//   delete sockets[namespace];
// };

// export const disconnectAllSockets = () => {
//   (Object.keys(sockets) as (keyof SocketMap)[]).forEach((ns) => {
//     sockets[ns]?.disconnect();
//     delete sockets[ns];
//   });
// };
"use client";
import { io, Socket } from "socket.io-client";

type SocketMap = {
  user?: Socket;
  tender?: Socket;
  chat?: Socket;
  telegram?: Socket;
  load?: Socket; // Сокет для namespace "load"
};

const sockets: SocketMap = {};

export const connectSocket = (
  namespace: keyof SocketMap,
  options?: any
): Socket => {
  if (sockets[namespace]) return sockets[namespace]!;

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/${namespace}`;
  const socket = io(url, {
    ...options,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
  });

  sockets[namespace] = socket;

  // Відновлюємо підключення, коли вікно знову в фокусі
  window.addEventListener("focus", () => {
    if (!sockets[namespace]?.connected) {
      console.log(`Reconnecting to socket ${namespace}`);
      socket.connect();
    }
  });

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

export const getSocket = (namespace: keyof SocketMap): Socket | undefined => {
  return sockets[namespace];
};

export const disconnectSocket = (namespace: keyof SocketMap) => {
  sockets[namespace]?.disconnect();
  delete sockets[namespace];
};

export const disconnectAllSockets = () => {
  (Object.keys(sockets) as (keyof SocketMap)[]).forEach((ns) => {
    sockets[ns]?.disconnect();
    delete sockets[ns];
  });
};
