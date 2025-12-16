"use client";
import React, { useState } from "react";
import AuthWrapper from "./AuthWrapper";
import { useForm } from "react-hook-form";
import { LoginSchema, TypeLoginSchema } from "../schemes";
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
} from "@/shared/components/ui";
import { useTheme } from "next-themes";

import { useLoginMutation } from "../hooks";
import Link from "next/link";

const LoginForm = () => {
  const { theme } = useTheme();

  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [isShowTwoFactor, setIsShhowTwoFactor] = useState(false);
  const form = useForm<TypeLoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code:''
    },
  });
  const { login, isLoadingLogin } = useLoginMutation(setIsShhowTwoFactor);
  const onSubmit = (values: TypeLoginSchema) => {
    login({ values });
  };
    // ✅ Отримуємо поточне значення поля
  const codeValue = form.watch("code");

  const isCodeValid = codeValue && codeValue.length === 6 && /^\d+$/.test(codeValue);

  return (
    <AuthWrapper
      heading="Увійти"
      description="Щоб увійти на сайт введіть ваш логін та пароль"
      backButtonLabel="Немає аккаунту? Зареєструватись"
      backButtonHref="/auth/register"
      isShowSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
        {isShowTwoFactor && (
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>TWO FACTOR CODE</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingLogin}
                    placeholder="123456"
                    maxLength={6} // ✅ обмеження
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
          {!isShowTwoFactor && (
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoadingLogin}
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Пароль</FormLabel>
                      <Link
                        className="ml-auto inline-block text-sm underline"
                        href={"/auth/reset-password"}
                      >
                        Забули пароль ?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        disabled={isLoadingLogin}
                        placeholder="******"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

        <Button
          type="submit"
          disabled={isShowTwoFactor && !isCodeValid || isLoadingLogin}
          className="w-full"
        >
          {isShowTwoFactor ? 'Підтвердити код' : 'Увійти'}
        </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default LoginForm;
