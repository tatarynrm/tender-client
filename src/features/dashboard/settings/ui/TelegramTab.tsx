// "use client";
// import api from "@/shared/api/instance.api";
// import { useAuth } from "@/shared/providers/AuthCheckProvider";
// import { connectSocket } from "@/sockets/socketManager";
// import { useEffect, useState } from "react";

// interface Props {}

// const TelegramTab = ({}: Props) => {
//   const { profile, setProfile } = useAuth();
//   const [token, setToken] = useState<string | null>(null);
//   const [telegramLink, setTelegramLink] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!profile?.id) return;

//     // Підключення до сокету при зміні профілю
//     const socket = connectSocket("user", { query: { userId: profile.id } });

//     const handleConnected = (data: any) => {
//       console.log("Telegram підключено ✅", data);
//       setProfile((prev) =>
//         prev ? { ...prev, telegram_id: data.telegram_id } : prev
//       );
//     };

//     const handleDisconnected = () => {
//       console.log("Telegram відключено ❌");
//       setProfile((prev) => (prev ? { ...prev, telegram_id: null } : prev));
//     };

//     // Встановлюємо обробники подій
//     socket.on("TELEGRAM_CONNECTED", handleConnected);
//     socket.on("TELEGRAM_DISCONNECTED", handleDisconnected);

//     // Очищаємо ресурси при відключенні компонента
//     // return () => {
//     //   socket.off("TELEGRAM_CONNECTED", handleConnected);
//     //   socket.off("TELEGRAM_DISCONNECTED", handleDisconnected);
//     // };
//   }, [profile?.id, setProfile]); // Підключаємо сокет, коли змінюється profile.id

//   // Цей ефект перевіряє, чи є підключення до Telegram після повернення на вкладку
//   useEffect(() => {
//     if (profile?.telegram_id) {
//       // Якщо Telegram вже підключений, генеруємо посилання на бота
//       const link = `https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME}?start=${profile.telegram_id}`;
//       setTelegramLink(link);
//     }
//   }, [profile?.telegram_id]); // Цей ефект викликається тільки при зміні telegram_id

//   const handleConnectTelegram = async () => {
//     if (!profile?.email) return;
//     setLoading(true);

//     try {
//       const { data } = await api.post("/telegram-token/get-token", {
//         email: profile.email,
//       });
//       if (data) {
//         setToken(data);
//         const link = `https://t.me/${process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME}?start=${data}`;
//         setTelegramLink(link);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDisconnectTelegram = async () => {
//     if (!profile?.telegram_id) return;
//     setLoading(true);

//     try {
//       await api.post("/telegram-token/disconnect", {
//         telegram_id: profile.telegram_id,
//       });
//       setProfile((prev) => (prev ? { ...prev, telegram_id: null } : prev));
//       setTelegramLink(null);
//       setToken(null);

//       // Відправляємо подію про відключення через сокет
//       const socket = connectSocket("user", { query: { userId: profile.id } });
//       socket.emit("TELEGRAM_DISCONNECTED", {
//         telegram_id: profile.telegram_id,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded shadow-md max-w-md">
//       <h2 className="text-xl font-semibold mb-4">Telegram</h2>

//       {!profile?.telegram_id ? (
//         <>
//           <button
//             onClick={handleConnectTelegram}
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
//             disabled={loading}
//           >
//             {loading ? "Завантаження..." : "Підключити Telegram"}
//           </button>

//           {telegramLink && (
//             <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
//               <p>Перейдіть за цим посиланням для підключення до бота:</p>
//               <a
//                 href={telegramLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:underline"
//               >
//                 Підключити до Telegram
//               </a>
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="flex flex-col gap-2">
//           <p className="text-green-600 font-medium">Telegram підключено ✅</p>
//           <p>Telegram ID: {profile.telegram_id}</p>
//           <button
//             onClick={handleDisconnectTelegram}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
//             disabled={loading}
//           >
//             {loading ? "Завантаження..." : "Відключити Telegram"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TelegramTab;
