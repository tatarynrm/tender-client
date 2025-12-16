import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Некоректна пошта",
  }),
  password: z.string().min(6, {
    message: "Мінімум 6 символів",
  }),
  code: z.optional(z.string()),
});

export type TypeLoginSchema = z.infer<typeof LoginSchema>;
