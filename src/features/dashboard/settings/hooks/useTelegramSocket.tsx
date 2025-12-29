// // src/features/dashboard/settings/model/useTelegramSocket.ts
// "use client"


// import { useEffect, useState } from "react"


// interface TelegramServerEvent {
//   type: "connected" | "disconnected" | "error" | "status"
//   payload?: any
// }

// export function useTelegramSocket() {
//   const [isConnected, setIsConnected] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     // підключаємось до Telegram namespace
//     const socket = connectSocket("telegram", {
//       transports: ["websocket"],
//     })

//     socket.on("connect", () => {
//       console.log("[socket] Connected to /telegram")
//       socket.emit("get_status") // одразу запитуємо статус підключення
//     })

//     socket.on("disconnect", () => {
//       console.log("[socket] Disconnected from /telegram")
//       setIsConnected(false)
//     })

//     socket.on("telegram_status", (status: boolean) => {
//       setIsConnected(status)
//       setIsLoading(false)
//     })

//     socket.on("telegram_connected", () => {
//       setIsConnected(true)
//       setIsLoading(false)
//     })

//     socket.on("telegram_disconnected", () => {
//       setIsConnected(false)
//       setIsLoading(false)
//     })

//     socket.on("error", (err: any) => {
//       console.error("[socket error]", err)
//       setError("Помилка з’єднання")
//       setIsLoading(false)
//     })

//     return () => {
//       disconnectSocket("telegram")
//     }
//   }, [])

//   const connectTelegram = () => {
//     const socket = getSocket("telegram")
//     if (!socket) return
//     setIsLoading(true)
//     socket.emit("connect_telegram")
//   }

//   const disconnectTelegram = () => {
//     const socket = getSocket("telegram")
//     if (!socket) return
//     setIsLoading(true)
//     socket.emit("disconnect_telegram")
//   }

//   return {
//     isConnected,
//     isLoading,
//     error,
//     connectTelegram,
//     disconnectTelegram,
//   }
// }
