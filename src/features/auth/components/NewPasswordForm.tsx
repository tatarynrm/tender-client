"use client";
import React, { useState } from "react";
import AuthWrapper from "./AuthWrapper";
import { useForm } from "react-hook-form";
import {
  NewPasswordSchema,
  ResetPasswordSchema,
  TypeNewPasswordSchema,
  TypeResetPasswordSchema,
} from "../schemes";
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


import { useNewPasswordMutation } from "../hooks";

const NewPasswordForm = () => {
  const { theme } = useTheme();


  const form = useForm<TypeNewPasswordSchema>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const { newPassword, isLoadingNew } = useNewPasswordMutation();
  const onSubmit = (values: TypeNewPasswordSchema) => {

      newPassword({ values });
  
  };
  return (
    <AuthWrapper
      heading="Новий пароль"
      description="Придумайте новий пароль для вашого аккаунту"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoadingNew}
                    placeholder="******"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button loading={isLoadingNew} disabled={isLoadingNew} type="submit">
            Скинути пароль
          </Button>
        </form>
      </Form>
    </AuthWrapper>
  );
};

export default NewPasswordForm;
