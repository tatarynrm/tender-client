"use client";

import * as React from "react";
import { Button } from "@/shared/components/ui/button";
import {
  FormProvider,
  useForm,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";

import { useState } from "react";

import { Switch } from "@/shared/components/ui/switch";
import {
  FaLock,
  FaKey,
  FaUserShield,
  FaMoneyBill,
  FaChalkboardTeacher,
  FaLaptopCode,
} from "react-icons/fa";
import { SearchInput } from "@/shared/components/Inputs/SearchInputWithResult";

import { MyTooltip } from "@/shared/components/Tooltips/MyTooltip";
import { IctSwitchWithConfirm } from "@/shared/components/Switch/SwitchWithConfirm";
import { Card } from "@/shared/components/ui";
import api from "@/shared/api/instance.api";
// Створення Zod схеми для валідації

const userSchema = z.object({
  email: z
    .string("Невірний формат")
    .email("Невірний формат електронної пошти")
    .min(5, "Електронна пошта повинна містити хоча б 5 символів"),
  // password: z
  //   .string()
  //   .min(6, "Пароль повинен містити хоча б 6 символів")
  //   .max(20, "Пароль не повинен перевищувати 20 символів"),
  // confirmPassword: z
  //   .string()
  //   .min(6, "Пароль підтвердження повинен містити хоча б 6 символів")
  //   .max(20, "Пароль підтвердження не повинен перевищувати 20 символів"),
  lastName: z
    .string({ message: "Введіть прізвище" })
    .min(1, "Введіть прізвище"),
  firstName: z.string(`Заповніть ім'я`).min(1, "Введіть ім'я"),
  surname: z
    .string({ message: "Введіть прізвище" })
    .min(1, "Введіть по батькові"),
  isBlocked: z.boolean().optional(),
  twoFactorEnabled: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  isAccountant: z.boolean().optional(),
  isManager: z.boolean().optional(),
  isDirector: z.boolean().optional(),
  isIct: z.boolean().optional(),
  id_company: z.number({ message: `Компанія - обов'язкове поле` }),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Паролі не співпадають",
//   path: ["confirmPassword"],
// });

type UserFormData = z.infer<typeof userSchema>;
interface User {
  id: number;
  name: string;
}

export default function CreateUserPage() {
  const [formStatus, setFormStatus] = useState<string | null>(null);

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = form;
  // const passwordWatch = watch("password");
  // const passwordRepeatWatch = watch("confirmPassword");
  // Обробка відправки форми
  const onSubmit: SubmitHandler<UserFormData> = async (data) => {
    try {
      // Формування даних для запиту
      const userData = {
        email: data.email,
        // password_hash: data.password,
        last_name: data.lastName,
        name: data.firstName,
        surname: data.surname,

        is_blocked: data.isBlocked ?? false,
        two_factor_enabled: data.twoFactorEnabled ?? false,
        is_admin: data.isAdmin ?? false,
        is_accountant: data.isAccountant ?? false,
        is_manager: data.isManager ?? false,
        is_director: data.isDirector ?? false,
        is_ict: data.isIct ?? false,
        // verified: true, // Можливо, ти хочеш, щоб користувач був верифікований
        id_company: data.id_company,
      };
      const res = await api.post("/users/admin/create-user", userData);
      console.log(res.data, "res");
      if (res.data.status === "ok") {
        form.reset();
      }
      // Тут можна зробити запит до API для створення нового користувача
      console.log("Нового користувача створено:", userData);
      setFormStatus("Користувача створено успішно!");
    } catch (error) {
      setFormStatus("Помилка при створенні користувача.");
    }
  };

  interface Company {
    id: number;
    company_name: string;
    company_name_full: string;
    company_form: string;
    edrpou: string;
    address: string | null;
    is_client: boolean;
    is_carrier: boolean;
    is_expedition: boolean;
    black_list: boolean;
    country_idnt: string;
    id_country: number;
    lei: string | null;
  }
  return (
    <div className="px-4 py-6 w-full overflow-y-auto pb-20">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto">
          <FormField
            control={control}
            name="id_company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <span>Компанія</span>
                  <MyTooltip text="Оберіть компанію зі списку, щоб прив’язати користувача.Почніть вводити назву та оберіть коли знайдете відповідність" />
                </FormLabel>
                <FormControl>
                  <SearchInput
                    url="/company/name"
                    placeholder="Пошук компанії..."
                    onChange={(selectedCompany) =>
                      field.onChange(selectedCompany?.id)
                    }
                  />
                </FormControl>
                <FormMessage>{errors.id_company?.message}</FormMessage>
              </FormItem>
            )}
          />
          <div className="flex flex-col md:flex-row gap-4 mb-2">
            {/* Прізвище */}
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/3">
                  <FormLabel>Прізвище</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Прізвище"
                      value={field.value ?? ""}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage>{errors.lastName?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Ім'я */}
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/3">
                  <FormLabel>Ім'я</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ім'я"
                      value={field.value ?? ""}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage>{errors.firstName?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* По батькові */}
            <FormField
              control={control}
              name="surname"
              render={({ field }) => (
                <FormItem className="w-full sm:w-1/3">
                  <FormLabel>По батькові</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="По батькові"
                      value={field.value ?? ""}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage>{errors.surname?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Електронна пошта */}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Електронна пошта</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Електронна пошта"
                      value={field.value ?? ""}
                      className="text-sm w-full"
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />

            {/* Пароль */}
            {/* <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Пароль"
                      value={field.value ?? ""}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage>{errors.password?.message}</FormMessage>
                </FormItem>
              )}
            /> */}
            {/* Підтвердження пароля */}

            {/* <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пароль</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Пароль"
                      value={field.value ?? ""}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage>{errors.confirmPassword?.message}</FormMessage>{" "}
                 
                </FormItem>
              )}
            /> */}
          </div>

          <div>
            {/* Розділ 1: Загальні налаштування */}
            <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2 border-1 border-gray-300 rounded-2xl p-4 mt-2">
              <h2 className=" text-2xl font-semibold ">
                Загальні налаштування
              </h2>

              {/* Заблокований */}

              <FormField
                control={control}
                name="isBlocked"
                render={({ field }) => (
                  <FormItem className="flex flex-row w-full items-center text-center">
                    <FormLabel className="flex items-center space-x-2">
                      <FaLock className="text-lg text-gray-500" />

                      <span>Заблокований</span>
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value ?? false}
                        onCheckedChange={(val) => field.onChange(val)}
                        className="bg-blue-600"
                      />
                    </FormControl>
                    <MyTooltip text="Оберіть компанію зі списку, щоб прив’язати користувача.Почніть вводити назву та оберіть коли знайдете відповідність" />
                  </FormItem>
                )}
              />

              {/* Двофакторна автентифікація */}
              <FormField
                control={control}
                name="twoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row w-full items-center text-center">
                    <FormLabel className="flex items-center space-x-2">
                      <FaKey className="text-lg text-gray-500" />
                      <span>Two Factor</span>
                    </FormLabel>
                    <FormControl>
                      <IctSwitchWithConfirm
                        field={field}
                        text={`Користувач в налаштуваннях може сам включити цю функцію.`}
                      />
                    </FormControl>
                    <MyTooltip
                      important
                      text="Підключити зразу двухфакторну автентифікацію щоб користувач заходив на сервіс через логін + пароль + код авторизації який приходить йому на пошту"
                    />
                  </FormItem>
                )}
              />
              {/* Розділ 2: Ролі користувача */}

              {/* Адміністратор */}
              <FormField
                control={control}
                name="isAdmin"
                render={({ field }) => (
                  <FormItem className="flex flex-row w-full items-center text-center">
                    <FormLabel className="flex items-center space-x-2">
                      <FaUserShield className="text-lg text-gray-500" />
                      <span>Адміністратор</span>
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value ?? false}
                        onCheckedChange={(val) => field.onChange(val)}
                        className="bg-red-600"
                      />
                    </FormControl>
                    <MyTooltip text="Адміністратор може створювати нових користувачів та керує в принциипі усіма процесами" />
                  </FormItem>
                )}
              />

              {/* Бухгалтер */}
              <FormField
                control={control}
                name="isAccountant"
                render={({ field }) => (
                  <FormItem className="flex flex-row w-full items-center text-center">
                    <FormLabel className="flex items-center space-x-2">
                      <FaMoneyBill className="text-lg text-gray-500" />
                      <span>Бухгалтер</span>
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value ?? false}
                        onCheckedChange={(val) => field.onChange(val)}
                        className="bg-yellow-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              {/* Розділ 3: Інші ролі */}

              {/* Менеджер */}
              <FormField
                control={control}
                name="isManager"
                render={({ field }) => (
                  <FormItem className="flex flex-row w-full items-center text-center">
                    <FormLabel className="flex items-center space-x-2">
                      <FaChalkboardTeacher className="text-lg text-gray-500" />
                      <span>Менеджер</span>
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value ?? false}
                        onCheckedChange={(val) => field.onChange(val)}
                        className="bg-indigo-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Директор */}
              <FormField
                control={control}
                name="isDirector"
                render={({ field }) => (
                  <FormItem className="flex flex-row w-full items-center text-center">
                    <FormLabel className="flex items-center space-x-2">
                      <FaUserShield className="text-lg text-gray-500" />
                      <span>Директор</span>
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value ?? false}
                        onCheckedChange={(val) => field.onChange(val)}
                        className="bg-purple-600"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <h2 className="col-span-2 text-2xl font-semibold ">
                ІСТ користувач
              </h2>

              <FormField
                control={control}
                name="isIct"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel className="flex items-center gap-1">
                      <FaLaptopCode className="text-lg text-gray-500" />
                      <span>ІСТ</span>
                    </FormLabel>

                    <FormControl>
                      <IctSwitchWithConfirm
                        field={field}
                        text={`Ви впевнені, що хочете зробити цього користувача ІТ-адміном? Ця дія може вплинути на доступ до системи.`}
                      />
                    </FormControl>
                    <MyTooltip
                      important
                      text="Якщо включити — користувач стане ІСТ-адміном. Будьте обережні!"
                    />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {/* Кнопка відправки */}
          <div className="mt-4 flex justify-end underline border-t-3 border-teal-500 p-2">
            <Button
              type="submit"
              className="w-1/2 md:w-1/5"
              disabled={formStatus === "Завантаження..."}
            >
              Створити користувача
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
