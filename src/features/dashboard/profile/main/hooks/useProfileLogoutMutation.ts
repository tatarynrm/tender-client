import { authService } from "@/features/auth/services";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useProfileLogoutMutation() {
  const router = useRouter();

  const { mutate: logout, isPending: isLoadingLogout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSuccess() {
      toast.success("Ви успішно вийшли з аккаунту");
      router.push("/auth/login");
    },
    onError(error) {
      console.log(error);
    },
  });

  return { logout, isLoadingLogout };
}
