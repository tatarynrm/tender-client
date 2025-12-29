"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";

import { ITender } from "@/features/log/types/tender.type";
import { tenderClientsService } from "../services/tender.clients.service";

import { useAuth } from "@/shared/providers/AuthCheckProvider";
import { getSocket } from "@/shared/lib/socket";
import { useSockets } from "@/shared/providers/SocketProvider";

export const useTenderListClient = () => {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") ?? "";
  const { tender } = useSockets();
  // 🔹 формуємо params стабільно
  const params = useMemo(() => {
    const p = new URLSearchParams();
    if (search) p.set("search", search);
    if (status) p.set("status", status);
    return p;
  }, [search, status]);

  const {
    data: tenders = [],
    isLoading,
    error,
  } = useQuery<ITender[]>({
    queryKey: ["tenders", search, status],
    queryFn: () => tenderClientsService.getTenders(params),
    staleTime: 1000 * 60,
  });

  // 3️⃣ Сокети
  useEffect(() => {
    if (!profile?.id) return;

    const handleNewLoad = () => {
      queryClient.invalidateQueries({ queryKey: ["tenders"] });
    };

    const handleNewBid = (updatedTender: ITender) => {
      queryClient.setQueryData<ITender[]>(
        ["tenders", search, status],
        (old = []) =>
          old.map((t) => (t.id === updatedTender.id ? updatedTender : t))
      );

      queryClient.setQueryData(["tender", updatedTender.id], updatedTender);
    };

    tender?.on("new_load", handleNewLoad);
    tender?.on("new_bid", handleNewBid);

    return () => {
      tender?.off("new_load", handleNewLoad);
      tender?.off("new_bid", handleNewBid);
    };
  }, [profile?.id, queryClient, search, status]);

  return { tenders, isLoading, error };
};
