import { useMutation } from "@tanstack/react-query";

import { toastMessageHandler } from "@/shared/utils";
import { toast } from "sonner";
import { ErrorResponse } from "@/shared/api";
import { TypeCreateCompanySchema } from "../schemas";
import { companyService } from "../services";

export function useCreateCompany() {
  const { mutate: createCompany, isPending: isLoadingCreateCompany } =
    useMutation({
      mutationKey: ["create company"],
      mutationFn: ({ values }: { values: TypeCreateCompanySchema }) =>
        companyService.createNewCompany(values),

      onSuccess() {
        toast.success("Успішне створення компанії", {
          description: "Очікуйте на підтвердження модератором.",
        });
      },

      onError(error: any) {
        // Якщо використовуєш axios, помилка лежить у error.response.data
        const err = error?.response?.data as ErrorResponse | undefined;

        toast.error(err?.message);
      },
    });

  return { createCompany, isLoadingCreateCompany };
}
