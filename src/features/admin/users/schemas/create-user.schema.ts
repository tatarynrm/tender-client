import z from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1, "Ім’я обов’язкове"),
  last_name: z.string().min(1, "По-батькові обов’язкове"),
  surname: z.string().min(1, "Прізвище обов’язкове"),
  email: z.string().email("Невірний email"),
  phone: z.string().optional(),
  id_company: z.number(),
  id_usr_pre_register: z.number(),

});

export type TypeCreateUserSchema = z.infer<typeof CreateUserSchema>;
