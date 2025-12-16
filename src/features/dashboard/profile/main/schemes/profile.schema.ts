import z from "zod";

export const ProfileSchema = z.object({
  email: z.string().email({
    message: "Некоректна пошта",
  }),

  name: z.string().min(1, {
    message: "Введіть ім'я",
  }),

  isTwoFactorEnabled: z.boolean(),
});

export type TypeProfileSchema = z.infer<typeof ProfileSchema>;
