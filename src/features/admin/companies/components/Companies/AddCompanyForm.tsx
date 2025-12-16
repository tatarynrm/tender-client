"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@/shared/components/ui";
import api from "@/shared/api/instance.api";
import { useEffect, useState } from "react";
import { useCreateCompany } from "../../hooks";
import { CreateCompanyDto } from "../../types/company.types";

// 🧩 Zod-схема валідації
const formSchema = z.object({
  address: z.string().min(2, "Адреса обов’язкова"),
  company_name: z.string().min(2, "Назва компанії обов’язкова"),
  company_name_full: z.string().min(2, "Назва компанії обов’язкова").optional(),
  edrpou: z
    .string()
    .min(8, "ЄДРПОУ повинен містити мінімум 8 цифр")
    .max(10, "ЄДРПОУ може містити максимум 10 цифр"),
  id_country: z.number({
    message: "Виберіть країну реєстрації компанії",
  }),
  id_company_form: z.number(),
  is_carrier: z.boolean().optional(),
  is_expedition: z.boolean().optional(),
  is_client: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddCompanyFormProps {
  onSubmit: (values: CreateCompanyDto) => void;
  isLoadingRegister?: boolean;
}

export function AddCompanyForm({
  onSubmit,
  isLoadingRegister = false,
}: AddCompanyFormProps) {
  const { createCompany, isLoadingCreateCompany } = useCreateCompany();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      company_name: "",
      edrpou: "",
      is_carrier: false,
      is_expedition: false,
      is_client: false,
    },
  });
  const [preRegisterData, setPreRegisterData] = useState<any>({});
  const handleSubmit = async (values: FormValues) => {
    onSubmit(values);
    console.log(values, "VALUES");
    // const data = await api.post("/company/create", values);

    const data = createCompany({ values });

    console.log(data, "VALUES FROM CREATE");

    form.reset();
  };
  useEffect(() => {
    const getPreRegisterData = async () => {
      try {
        const { data } = await api.get("/auth/registerFormData");

        setPreRegisterData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPreRegisterData();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Назва компанії */}
        <FormField
          control={form.control}
          name="company_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Назва компанії</FormLabel>
              <FormControl>
                <Input placeholder="Наприклад: LogiTrans" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company_name_full"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Назва компанії</FormLabel>
              <FormControl>
                <Input placeholder="Наприклад: LogiTrans" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Адреса */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адреса</FormLabel>
              <FormControl>
                <Input
                  placeholder="Наприклад: Київ, вул. Хрещатик 10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* ЄДРПОУ */}
        <FormField
          control={form.control}
          name="edrpou"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ЄДРПОУ</FormLabel>
              <FormControl>
                <Input placeholder="Наприклад: 12345678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ваша країна */}
        <FormField
          control={form.control}
          name="id_country"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Країна</FormLabel>
              <FormControl>
                <Select
                  disabled={isLoadingRegister}
                  value={field.value?.toString() || ""}
                  onValueChange={(val) => field.onChange(Number(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Вкажіть країну" />
                  </SelectTrigger>
                  <SelectContent>
                    {preRegisterData?.country_dropdown?.map(
                      (
                        item: { value: any; id: any },
                        idx: React.Key | null | undefined
                      ) => (
                        <SelectItem key={idx} value={String(item.id)}>
                          {item.value}
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
        <FormField
          control={form.control}
          name="id_company_form"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Тип компанії</FormLabel>
              <FormControl>
                <Select
                  disabled={isLoadingRegister}
                  value={field.value?.toString() || ""}
                  onValueChange={(val) => field.onChange(Number(val))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Вкажіть тип компанії" />
                  </SelectTrigger>
                  <SelectContent>
                    {preRegisterData?.company_form_dropdown?.map(
                      (
                        item: { value: any; id: any },
                        idx: React.Key | null | undefined
                      ) => (
                        <SelectItem key={idx} value={String(item.id)}>
                          {item.value}
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

        {/* Тип компанії */}
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="is_carrier"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel>Перевізник</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoadingRegister}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_expedition"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormLabel>Експедитор</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoadingRegister}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_client"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 ">
                <FormLabel>Замовник</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoadingRegister}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoadingRegister}>
          {isLoadingRegister ? "Збереження..." : "Зберегти"}
        </Button>
      </form>
    </Form>
  );
}
