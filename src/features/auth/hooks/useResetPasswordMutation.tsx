import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";
import {
  TypeLoginSchema,
  TypeRegisterSchema,
  TypeResetPasswordSchema,
} from "../schemes";
import { toastMessageHandler } from "@/shared/utils";
import { toast } from "sonner";
import { ErrorResponse } from "@/shared/api";
import { useRouter } from "next/navigation";
import { passwordRecoveryService } from "../services/password-recovery.service";

export function useResetPasswordMutation() {
  const router = useRouter();
  const { mutate: resetPassword, isPending: isLoadingReset } = useMutation({
    mutationKey: ["reset password"],
    mutationFn: ({
      values,
  
    }: {
      values: TypeResetPasswordSchema;

    }) => passwordRecoveryService.resetPassword(values),

    onSuccess() {
      toast.success("Перевірте пошту.", {
        description: "На вашу пошту був відправлений лист для підтвердження",
      });
    },

    onError(error: any) {
      // Якщо використовуєш axios, помилка лежить у error.response.data
      const err = error?.response?.data as ErrorResponse | undefined;

      toast.error(err?.message)
    },
  });

  return { resetPassword, isLoadingReset };
}
