"use client";
import React, { useEffect, useState } from "react";
import AuthWrapper from "./AuthWrapper";
import { useForm } from "react-hook-form";
import { RegisterSchema, TypeRegisterSchema } from "../schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PhoneInput,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@/shared/components/ui";
import { useTheme } from "next-themes";


import { userRegisterMutation } from "../hooks";
import api from "@/shared/api/instance.api";

const RegisterForm = () => {
  const { theme } = useTheme();

  const [preRegisterData, setPreRegisterData] = useState<any>({});

  const form = useForm<TypeRegisterSchema>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      surname: "",
      name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      passwordRepeat: "",
      company_name: "",
      company_edrpou: "",
      company_vat_payer: false,
    },
  });

  const { register, isLoadingRegister } = userRegisterMutation();

  const onSubmit = (values: TypeRegisterSchema) => {

    register({ values });
    // form.reset();
  };
  useEffect(() => {
    const getPreRegisterData = async () => {
      try {
        const { data } = await api.get("/auth/registerFormData");

        console.log(data, "DATA REGISTER PRE DATA");
        console.log(data.status, "DATA STATUS");
        setPreRegisterData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPreRegisterData();
  }, []);

  return (
    <AuthWrapper
      heading="Реєстрація"
      description="Зареєструйтесь щоб мати можливість увійти на сайт"
      backButtonLabel="Вже є аккаунт ? Увійти"
      backButtonHref="/auth/login"
      isShowSocial
      isFullSize
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 flex flex-col"
          onChange={() => console.log(form.getValues())}
        >
          <div className="flex flex-col justify-between md:flex-row gap-3">
            {/* User Section */}
            <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-2xl space-y-4 w-full">
              <h2 className="text-lg font-semibold mb-2">Дані користувача</h2>
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Прізвище</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoadingRegister}
                        placeholder="Прізвище"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ім'я</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoadingRegister}
                        placeholder="Ім'я"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>По-батькові</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoadingRegister}
                        placeholder="По-батькові"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Контактний номер телефону</FormLabel>
                    <FormControl>
                      <PhoneInput
                        defaultCountry="UA" // встановлює +380 для України
                        international
                        disabled={isLoadingRegister}
                        value={field.value} // передаємо значення з RHF
                        onChange={field.onChange} // передаємо onChange з RHF
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoadingRegister}
                        placeholder="Ваша електронна адреса"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoadingRegister}
                        placeholder="******"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordRepeat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Повторіть пароль</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoadingRegister}
                        placeholder="******"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Company Section */}
            <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-2xl space-y-4 w-full">
              <h2 className="text-lg font-semibold mb-2">Дані компанії</h2>
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Назва компанії</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoadingRegister}
                        placeholder="Назва компанії"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company_edrpou"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ЄДРПОУ / ІПН</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoadingRegister}
                        placeholder="ЄДРПОУ код"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company_address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Юридична адреса компанії</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoadingRegister}
                        placeholder="Адреса, вул"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col xl:flex-row md:gap-4 gap-6">
                {/* Форма власності компанії */}
                <FormField
                  control={form.control}
                  name="company_form"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Форма власності компанії</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="ФОП / ТОВ ..."
                          disabled={isLoadingRegister}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ваша країна */}
                <FormField
                  control={form.control}
                  name="ids_country"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Країна</FormLabel>
                      <FormControl>
                        <Select
                          disabled={isLoadingRegister}
                          value={field.value?.toString() || ""}
                          onValueChange={(val) => field.onChange(val)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Вкажіть країну" />
                          </SelectTrigger>
                          <SelectContent>
                            {preRegisterData?.country_dropdown?.map(
                              (
                                item: { country_name: any; ids: any },
                                idx: React.Key | null | undefined
                              ) => (
                                <SelectItem key={idx} value={String(item.ids)}>
                                  {item.country_name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Платник ПДВ */}
                <FormField
                  control={form.control}
                  name="company_vat_payer"
                  render={({ field }) => (
                    <FormItem className="flex items-center mt-4 md:mt-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoadingRegister}
                        />
                      </FormControl>
                      <FormLabel className="mr-2">Платник ПДВ?</FormLabel>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col justify-between md:flex-row">
                <FormField
                  control={form.control}
                  name="company_carrier"
                  render={({ field }) => (
                    <FormItem className="flex items-center mt-4 md:mt-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoadingRegister}
                        />
                      </FormControl>
                      <FormLabel className="mr-2">Я перевізник</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_expedition"
                  render={({ field }) => (
                    <FormItem className="flex items-center mt-4 md:mt-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoadingRegister}
                        />
                      </FormControl>
                      <FormLabel className="mr-2">Я експедитор</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company_freighter"
                  render={({ field }) => (
                    <FormItem className="flex items-center mt-4 md:mt-0">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoadingRegister}
                        />
                      </FormControl>
                      <FormLabel className="mr-2">Я замовник</FormLabel>
                    </FormItem>
                  )}
                />
              </div>


            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center">
            <Button
              disabled={isLoadingRegister}
              type="submit"
              loading={isLoadingRegister}
              className="w-full md:w-auto"
            >
              Створити аккаунт
            </Button>
          </div>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default RegisterForm;
