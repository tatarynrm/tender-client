import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { tenderService } from "../services/tender.service";
import { ITender } from "../types/tender.type";




export const useTenders = () => {
  const queryClient = useQueryClient();


  // useEffect(() => {
  //   if (!socket) return;

  //   const handleNewLoad = () =>
  //     queryClient.invalidateQueries({ queryKey: ["tenders"] });

  //   socket.on("new_load", handleNewLoad);
  //   socket.on("saveTender", handleNewLoad);

  //   return () => {
  //     socket.off("new_load", handleNewLoad);
  //     socket.off("saveTender", handleNewLoad);
  //   };
  // }, [socket, queryClient]);

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

  return { tenders, isLoading, error, refetch };
};
