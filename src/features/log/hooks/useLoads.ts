import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { loadService } from "../services/load.service";
import { connectSocket } from "@/sockets/socketManager";
import { LoadApiItem } from "@/app/log/cargo/active/page";

export const useLoads = () => {
  const queryClient = useQueryClient();

  const {
    data: loads = [],
    isLoading,
    error,
    refetch
  } = useQuery<LoadApiItem[]>({
    queryKey: ["loads"],
    queryFn: loadService.getLoads,
    staleTime: 1000 * 60, // кеш 1 хв
  });

  useEffect(() => {
    const socket = connectSocket("user");

    const handleNewLoad = () =>
      queryClient.invalidateQueries({ queryKey: ["loads"] });

    socket.on("new_load", handleNewLoad);
    return () => {
      socket.off("new_load", handleNewLoad);
    };
  }, [queryClient]);

  return { loads, isLoading, error,refetch };
};
