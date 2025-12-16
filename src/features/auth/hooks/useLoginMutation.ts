import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";
import { TypeLoginSchema } from "../schemes";
import { toast } from "sonner";
import { ErrorResponse } from "@/shared/api";
import { useRouter } from "next/navigation";
import { Dispatch } from "react";

export function useLoginMutation(
  setIsShowTwoFactor: Dispatch<React.SetStateAction<boolean>>
) {
  const router = useRouter();

  const { mutate: login, isPending: isLoadingLogin } = useMutation({
    mutationKey: ["login user"],
    mutationFn: async ({ values }: { values: TypeLoginSchema }) => {
      // Виклик API
      return authService.login(values);
    },
    onSuccess(data: any) {
      // Якщо бекенд каже, що треба двофакторка
      if (data?.data?.message?.includes("Перевірте вашу пошту")) {
        setIsShowTwoFactor(true);
        toast.info("Перевірте пошту. Введіть код 2FA");
        return;
      }

      // Якщо логін успішний — переходимо далі
      toast.success("Успішний вхід!");
      router.push("/dashboard");
    },
    onError(error: any) {
      const err = error?.response?.data as ErrorResponse | undefined;
      toast.error(err?.message || "Помилка входу");
    },
  });

  return { login, isLoadingLogin };
}
