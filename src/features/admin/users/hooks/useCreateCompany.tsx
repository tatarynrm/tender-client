"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { companyService } from "../services/company.service";
import { TypeCreateCompanySchema } from "../schemas/create-company.schema";

// 🔹 Хук для форми
export function useCreateCompany() {
  const { mutate: createCompany, isPending } = useMutation({
    mutationKey: ["create company"],
    mutationFn: async (values: TypeCreateCompanySchema) =>
      companyService.createNewCompany(values),

    onSuccess: () => {
      toast.success("Компанію створено!", {
        description: "Пеерезавантажте сторінку для коректної роботи.",
      });
    },

    onError: (error: any) => {
      const message =
        error?.response?.data?.message || "Помилка при створенні компанії";
      toast.error(message);
    },
  });

  const onSubmit = (data: TypeCreateCompanySchema) => createCompany(data);

  return { onSubmit, isPending };
}
