"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { ITender } from "@/features/log/types/tender.type";
import { tenderClientsService } from "../services/tender.clients.service";

import { connectSocket, setSocketUserId } from "@/sockets/socketManager";
import { useAuth } from "@/shared/providers/AuthCheckProvider";

export const useTenderListClient = () => {
  const { profile } = useAuth();
  const queryClient = useQueryClient();

  // 1️⃣ Запит тендерів
  const {
    data: tenders = [],
    isLoading,
    error,
    refetch,
  } = useQuery<ITender[]>({
    queryKey: ["tenders"],
    queryFn: tenderClientsService.getTenders,
    staleTime: 1000 * 60, // кеш 1 хв
  });

  // 2️⃣ Підключення до сокета
  useEffect(() => {
    if (!profile?.id) return;
    // 🔑 Встановлюємо userId для сокета
    setSocketUserId(profile.id);
    // Створюємо або отримуємо існуючий сокет
    const socket = connectSocket("user"); // 🔑 тут завжди буде сокет
    console.log(socket, "SOCKET CONNECTED");

    const handleNewLoad = () => {
      queryClient.invalidateQueries({ queryKey: ["tenders"] });
    };

    const handleNewBid = (updatedTender: ITender) => {
      queryClient.setQueryData<ITender[]>(["tenders"], (old = []) =>
        old.map((t) => (t.id === updatedTender.id ? updatedTender : t))
      );
      queryClient.setQueryData(["tender", updatedTender.id], updatedTender);
    };

    // Підписка на події
    socket.on("new_load", handleNewLoad);
    socket.on("new_bid", handleNewBid);

    return () => {
      socket.off("new_load", handleNewLoad);
      socket.off("new_bid", handleNewBid);
      // Не відключаємо socket, залишаємо для глобального використання
    };
  }, [profile?.id, queryClient]);

  return { tenders, isLoading, error, refetch };
};
