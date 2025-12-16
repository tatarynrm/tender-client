import z from "zod";

export const NewPasswordSchema = z
  .object({

    password: z.string().min(6,{
      message: "Некоректна пошта",
    }),

  })


export type TypeNewPasswordSchema = z.infer<typeof NewPasswordSchema>;
