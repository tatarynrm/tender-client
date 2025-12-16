import { useEffect } from "react";
import { connectSocket } from "@/sockets/socketManager";
import { useLoads } from "@/features/log/hooks/useLoads";


export function useRefetchOnTrigger() {
  const { refetch } = useLoads(); // Використовуємо хук для отримання даних

  useEffect(() => {
    const socket = connectSocket("load"); // Підключення до сокета "load"

    // Слухаємо подію "refetch_triggered", яку сервер посилає
    socket.on("update_from_server", (data: any) => {
      console.log("Refetch triggered from server:", data);
      refetch(); // Виконуємо refetch для оновлення даних
    });

    // Очищаємо слухачів при відключенні компонента
    return () => {
      socket.off("update_from_server");
    };
  }, [refetch]);
}
