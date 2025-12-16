import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { connectSocket } from "@/sockets/socketManager";
import { tenderService } from "../services/tender.service";
import { ITender } from "../types/tender.type";

export const useTenders = () => {
  const queryClient = useQueryClient();

  const {
    data: tenders = [],
    isLoading,
    error,
    refetch,
  } = useQuery<ITender[]>({
    queryKey: ["tenders"],
    queryFn: tenderService.getTenders,
    staleTime: 1000 * 60, // кеш 1 хв
  });

  useEffect(() => {
    const socket = connectSocket("user");

    const handleNewLoad = () =>
      queryClient.invalidateQueries({ queryKey: ["tenders"] });

    socket.on("new_load", handleNewLoad);
    return () => {
      socket.off("new_load", handleNewLoad);
    };
  }, [queryClient]);

  return { tenders, isLoading, error, refetch };
};
