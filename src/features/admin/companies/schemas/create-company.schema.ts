import z from "zod";

export const CreateCompanySchema = z.object({
  address: z.string().min(2, "Адреса обов’язкова"),
  company_name: z.string().min(2, "Назва компанії обов’язкова"),
  company_name_full: z.string().min(2, "Назва компанії обов’язкова").optional(),
  edrpou: z
    .string()
    .min(8, "ЄДРПОУ повинен містити мінімум 8 цифр")
    .max(10, "ЄДРПОУ може містити максимум 10 цифр"),
  id_country: z.number({
    message: "Виберіть країну реєстрації компанії",
  }),
  id_company_form: z.number(),
  is_carrier: z.boolean().optional(),
  is_expedition: z.boolean().optional(),
  is_client: z.boolean().optional(),
});

export type TypeCreateCompanySchema = z.infer<typeof CreateCompanySchema>;
