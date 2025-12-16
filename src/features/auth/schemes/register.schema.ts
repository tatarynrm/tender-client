import z from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
export const RegisterSchema = z
  .object({
    surname: z.string({ message: `Прізвище - обов'язкове поле` }).min(1, {
      message: "Введіть прізвище",
    }),
    name: z.string({ message: `Ім'я - обов'язкове поле` }).min(1, {
      message: "Введіть ім'я",
    }),
    last_name: z.string({ message: `По-батькові - обов'язкове поле` }).min(1, {
      message: "Введіть по-батькові",
    }),
    email: z.string().email({
      message: "Некоректна пошта",
    }),
    password: z.string().min(6, {
      message: "Мінімум 6 символів",
    }),
    passwordRepeat: z.string().min(6, {
      message: "Пароль підтвердження мінімум 6 символів",
    }),
    phone: z
      .string()
      .min(1, "Введіть номер телефону")
      .refine((val) => isValidPhoneNumber(val || ""), {
        message: "Некоректний номер телефону",
      }),
    // Company
    company_name: z.string().min(2, "Введіть назву компанії"),
    company_address: z
      .string({ message: `Адреса є обов'язковим полем` })
      .min(2, "Введіть юридичну адресу компанії"),
    company_form: z.string(),
    ids_country: z.string({
      message: "Виберіть країну реєстрації компанії",
    }),

    company_edrpou: z
      .string()
      .regex(/^\d+$/, "Код має містити лише цифри")
      .min(8, "Код ЄДРПОУ має містити мінімум 8 цифр")
      .max(10, "Код ЄДРПОУ не може перевищувати 10 цифр"),
    company_vat_payer: z.boolean().optional(), // нове поле для Switch
    company_expedition: z.boolean().optional(), // нове поле для Switch
    company_carrier: z.boolean().optional(), // нове поле для Switch
    company_freighter: z.boolean().optional(), // нове поле для Switch
  })
  .refine((data) => data.password === data.passwordRepeat, {
    message: "Паролі не співпадають",
    path: ["passwordRepeat"],
  });

export type TypeRegisterSchema = z.infer<typeof RegisterSchema>;
