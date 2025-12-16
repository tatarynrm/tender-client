import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";
import {
  TypeLoginSchema,
  TypeNewPasswordSchema,
  TypeRegisterSchema,
  TypeResetPasswordSchema,
} from "../schemes";
import { toastMessageHandler } from "@/shared/utils";
import { toast } from "sonner";
import { ErrorResponse } from "@/shared/api";
import { useRouter, useSearchParams } from "next/navigation";
import { passwordRecoveryService } from "../services/password-recovery.service";

export function useNewPasswordMutation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
    mutationKey: ["new password"],
    mutationFn: ({ values }: { values: TypeNewPasswordSchema }) =>
      passwordRecoveryService.newPassword(values, token),

    onSuccess() {
      toast.success("Пароль успішно змінений", {
        description: "Тепер ви можете увійти в свій аккаунт.",
      });
      router.push("/dashboard/settings");
    },

    onError(error: any) {
      // Якщо використовуєш axios, помилка лежить у error.response.data
      const err = error?.response?.data as ErrorResponse | undefined;

      toast.error(err?.message);
    },
  });

  return { newPassword, isLoadingNew };
}
