"use client";
import React, { useState } from "react";
import AuthWrapper from "./AuthWrapper";
import { useForm } from "react-hook-form";
import { ResetPasswordSchema, TypeResetPasswordSchema } from "../schemes";
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
import { useResetPasswordMutation } from "../hooks";

const ResetPasswordForm = () => {
  const { theme } = useTheme();

  const form = useForm<TypeResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { resetPassword, isLoadingReset } = useResetPasswordMutation();
  const onSubmit = (values: TypeResetPasswordSchema) => {
    resetPassword({ values });
  };
  return (
    <AuthWrapper
      heading="Скидання паролю"
      description="Введіть вашу електронну адресу щобю ми могли надіслати вам електронний лист з інструкціями"
      backButtonLabel="Увійти в аккаунт"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingReset}
                    placeholder="Ваша електронна адреса"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            loading={isLoadingReset}
            disabled={isLoadingReset}
            type="submit"
          >
            Скинути пароль
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default ResetPasswordForm;
