import { profileService } from "@/features/dashboard/profile/main/services";
import { useQuery } from "@tanstack/react-query";
import { sessionSerivce } from "../services";

export function useGetSessions() {
  const { data: sessions, isLoading: isLoadingSessions } = useQuery({
    queryKey: ["get sessions"],
    queryFn: () => sessionSerivce.getSessions(),
    refetchOnWindowFocus:true
  });

  return { sessions, isLoadingSessions };
}
