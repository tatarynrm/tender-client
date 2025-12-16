import z from "zod";

export const createCompanySchema = z.object({
  company_name: z.string().min(1, "Назва компанії обов’язкова"),
  company_name_full: z.string().optional().nullable(),
  company_form: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  edrpou: z.string().optional().nullable(),
  id_country: z.number().optional(),
  email: z.string().email("Невірний email").optional().nullable(),
  is_carrier: z.boolean().optional(),
  is_expedition: z.boolean().optional(),
  is_client: z.boolean().optional(),
});

export type TypeCreateCompanySchema = z.infer<typeof createCompanySchema>;
