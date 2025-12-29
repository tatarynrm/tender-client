import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { loadService } from "../services/load.service";

import { LoadApiItem } from "@/app/log/cargo/active/page";
import { useAuth } from "@/shared/providers/AuthCheckProvider";
import { useSockets } from "@/shared/providers/SocketProvider";

export const useLoads = () => {
  const { profile } = useAuth();
  const queryClient = useQueryClient();
  const { load } = useSockets();
  const {
    data: loads = [],
    isLoading,
    error,
    refetch,
  } = useQuery<LoadApiItem[]>({
    queryKey: ["loads"],
    queryFn: loadService.getLoads,
    staleTime: 1000 * 60, // кеш 1 хв
  });

  useEffect(() => {
    if (!profile?.id) return;

    const handleNewLoad = () =>
      queryClient.invalidateQueries({ queryKey: ["loads"] });

    load?.on("new_load", handleNewLoad);
    return () => {
      load?.off("new_load", handleNewLoad);
    };
  }, [queryClient]);

  return { loads, isLoading, error, refetch };
};
