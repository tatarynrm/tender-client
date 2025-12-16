import { profileService } from "@/features/dashboard/profile/main/services";
import { useQuery } from "@tanstack/react-query";

export function useProfile() {
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.findProfile(),
  });

  return { profile, isProfileLoading };
}
