"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CreateUserSchema, TypeCreateUserSchema } from "../schemas";
import { useCreateUser } from "../hooks";

interface Props {
  userData?: {
    id: number;

    name?: string;
    surname?: string;
    last_name?: string;
    email?: string;
    phone?: string;

    company_name?: string;
    company_edrpou?: string;
    company_address?: string;
    company_carrier?: boolean;
    company_expedition?: boolean;
    company_freighter?: boolean;
    country_idnt?: string;
    country_name?: string;
    id_company?: number;
  };
}

// Схема валідації

export function CreateUserDialog({ userData }: Props) {
  const [open, setOpen] = React.useState(false);

  // Ініціалізація форми
  const form = useForm<TypeCreateUserSchema>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      surname: userData?.surname ?? "",
      name: userData?.name ?? "",
      last_name: userData?.last_name ?? "",
      email: userData?.email ?? "",
      phone: userData?.phone ?? "",
      id_usr_pre_register: userData?.id,
      id_company: userData?.id_company,
    },
  });
  console.log(userData, "user data in modal");

  // Використовуємо хук для сабміту
  const { createUserFromPreRegister, isLoadingUserPreRegister } =
    useCreateUser();

  const onSubmit: SubmitHandler<TypeCreateUserSchema> = (data) => {
    createUserFromPreRegister({ values: data });
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          size="sm"
          variant="outline"
          className="text-xs"
        >
          Створити користувача
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Створення користувача</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Прізвище</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Ім’я</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Телефон</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoadingUserPreRegister}
              >
                {isLoadingUserPreRegister ? "Створюємо..." : "Створити"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
