import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";
import { TypeRegisterSchema } from "../schemes";
import { toastMessageHandler } from "@/shared/utils";
import { toast } from "sonner";
import { ErrorResponse } from "@/shared/api";

export function userRegisterMutation() {
  const { mutate: register, isPending: isLoadingRegister } = useMutation({
    mutationKey: ["register user"],
    mutationFn: ({
      values,

    }: {
      values: TypeRegisterSchema;

    }) => authService.register(values),

    onSuccess() {
      toast.success("Успішна реєстрація", {
        description: "Очікуйте на підтвердження модератором.",
      });
    },

    onError(error: any) {
      // Якщо використовуєш axios, помилка лежить у error.response.data
      const err = error?.response?.data as ErrorResponse | undefined;

      toast.error(err?.message);
    },
  });

  return { register, isLoadingRegister };
}
