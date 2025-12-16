"use client";

import * as React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { DropdownMenuItem, PhoneInput, Switch } from "@/shared/components/ui";
import { CircleX, Plus, UserRoundPlus } from "lucide-react";
import { isValidPhoneNumber } from "react-phone-number-input";
import { SiViber, SiTelegram, SiWhatsapp } from "react-icons/si";
import api from "@/shared/api/instance.api";
import { useGetUserList } from "../hooks/useGetUserList";
import { toast } from "sonner";
import { useProfile } from "@/shared/hooks";
import { handleApiResponse } from "@/shared/utils/handlerApiError";
import { IctSwitchWithConfirm } from "@/shared/components/Switch/SwitchWithConfirm";

// Zod для телефонів
const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, "Введіть номер телефону")
    .refine((val) => isValidPhoneNumber(val || ""), {
      message: "Некоректний номер телефону",
    }),
  is_viber: z.boolean(),
  is_telegram: z.boolean(),
  is_whatsapp: z.boolean(),
});

// Основна схема без refine для ролей
const formSchema = z.object({
  id: z.number().optional(), // додаємо id для редагування
  name: z.string().min(2, "Введіть ім'я"),
  surname: z.string().min(2, "Введіть прізвище"),
  last_name: z.string().min(2, `Введіть по-батькові`),
  email: z.string().email("Невірний email"),
  usr_phone: z.array(phoneSchema).min(1, "Додайте хоча б один телефон"),
  is_manager: z.boolean().optional(), // тут просто boolean, перевірка обов'язковості через RHF
  is_admin: z.boolean().optional(),
  is_accountant: z.boolean().optional(),
  is_director: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;
interface Props {
  user?: FormValues;
  triggerButton?: React.ReactNode; // Додатково можна передавати кастомну кнопку
}
export const CreateOrUpdateUserDialog = ({ user, triggerButton }: Props) => {
  const { refetch } = useGetUserList();
  const { profile } = useProfile();
  // ✅ state для контролю відкриття діалогу
  const [open, setOpen] = React.useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: user ?? {
      name: "",
      surname: "",
      last_name: "",
      email: "",
      is_accountant: false,
      is_admin: false,
      is_director: false,
      is_manager: false,
      usr_phone: [
        { phone: "", is_viber: false, is_telegram: false, is_whatsapp: false },
      ],
    },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "usr_phone",
  });

  const onSubmit = async (data: FormValues) => {
    // Перевірка телефонів
    const invalidPhones = data.usr_phone.filter(
      (p) => !p.phone || !isValidPhoneNumber(p.phone)
    );
    if (invalidPhones.length > 0) {
      invalidPhones.forEach((p, idx) => {
        form.setError(`usr_phone.${idx}.phone`, {
          type: "manual",
          message: "Некоректний номер телефону",
        });
      });
      return;
    }

    try {
      // 🟢 Створення нового користувача
      const register = await api.post("/users/register-from-company", data);
      console.log(register, "register");

      // if (register.data.data.message) {
      //   toast.error(register?.message);
      //   return;
      // }
      if (register.data.data.id && data.id) {
        toast.success("Успішне редагування користувача!");
      } else {
        toast.success("Успішне створення користувача!");
      }

      refetch();
      form.reset();
      setOpen(false);
    } catch (error) {
      handleApiResponse(error);
    }
  };

  // Очистка помилки менеджера при зміні
  React.useEffect(() => {
    const subscription = form.watch((values) => {
      if (values.is_manager && form.formState.errors.is_manager) {
        form.clearErrors("is_manager");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton ? (
          triggerButton
        ) : user ? (
          <DropdownMenuItem>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
              >
                Редагувати
              </Button>
            </DialogTrigger>
          </DropdownMenuItem>
        ) : (
          <Button size="icon" variant={"outline"}>
            <UserRoundPlus color="teal" />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            Додати користувача
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto pr-2"
        >
          {/* Прізвище */}
          <div>
            <Label htmlFor="surname">Прізвище</Label>
            <Input {...form.register("surname")} placeholder="Прізвище" />
            {form.formState.errors.surname && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.surname.message}
              </p>
            )}
          </div>

          {/* Ім'я */}
          <div>
            <Label htmlFor="name">Ім'я</Label>
            <Input {...form.register("name")} placeholder="Ім'я" />
            {form.formState.errors.name && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* По-батькові */}
          <div>
            <Label htmlFor="last_name">По-батькові</Label>
            <Input {...form.register("last_name")} placeholder="По-батькові" />
            {form.formState.errors.last_name && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.last_name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input {...form.register("email")} placeholder="Email" />
            {form.formState.errors.email && (
              <p className="text-red-500 text-xs">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Телефони */}
          <div>
            <Label>Телефони</Label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border p-2 rounded-md mb-2 space-y-1"
              >
                <Controller
                  control={form.control}
                  name={`usr_phone.${index}.phone`}
                  render={({ field: controllerField }) => {
                    const error =
                      form.formState.errors.usr_phone?.[index]?.phone;
                    return (
                      <div>
                        <PhoneInput
                          placeholder="Номер телефону"
                          value={controllerField.value}
                          onChange={controllerField.onChange}
                          className={`text-sm w-full ${
                            error ? "border-red-500" : ""
                          }`}
                          defaultCountry="UA"
                          international
                        />
                        {error && (
                          <p className="text-red-500 text-xs mt-1">
                            {error.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />

                <div className="flex gap-3 mt-1 flex-wrap items-center">
                  <Controller
                    control={form.control}
                    name={`usr_phone.${index}.is_viber`}
                    render={({ field }) => (
                      <Switch
                        id={`phones.${index}.is_viber`}
                        checked={field.value}
                        onCheckedChange={field.onChange} // тут потрібен onCheckedChange
                      />
                    )}
                  />
                  <Label
                    htmlFor={`phones.${index}.is_viber`}
                    className="text-xs"
                  >
                    <SiViber className="w-4 h-4 text-purple-600" /> Viber
                  </Label>
                  <Controller
                    control={form.control}
                    name={`usr_phone.${index}.is_telegram`}
                    render={({ field }) => (
                      <Switch
                        id={`phones.${index}.is_telegram`}
                        checked={field.value}
                        onCheckedChange={field.onChange} // тут потрібен onCheckedChange
                      />
                    )}
                  />
                  <Label
                    htmlFor={`phones.${index}.is_telegram`}
                    className="text-xs"
                  >
                    <SiTelegram className="w-4 h-4 text-blue-600" /> Telegram
                  </Label>
                  <Controller
                    control={form.control}
                    name={`usr_phone.${index}.is_whatsapp`}
                    render={({ field }) => (
                      <Switch
                        id={`phones.${index}.is_whatsapp`}
                        checked={field.value}
                        onCheckedChange={field.onChange} // тут потрібен onCheckedChange
                      />
                    )}
                  />
                  <Label
                    htmlFor={`phones.${index}.is_whatsapp`}
                    className="text-xs"
                  >
                    <SiWhatsapp className="w-4 h-4 text-green-600" /> Whatsapp
                  </Label>

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                    >
                      <CircleX size={16} />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {fields.length < 3 && (
              <Button
                type="button"
                onClick={() =>
                  append({
                    phone: "",
                    is_viber: false,
                    is_telegram: false,
                    is_whatsapp: false,
                  })
                }
                size="sm"
                className="flex items-center gap-1"
              >
                <Plus size={14} /> Додати телефон
              </Button>
            )}
          </div>

          {/* Ролі */}
          <div className="flex gap-4 flex-wrap mt-2 flex-col">
            <div className="flex gap-4 flex-wrap md:flex-row mt-4 mb-4">
              <div className="flex items-center gap-1">
                <Controller
                  control={form.control}
                  name="is_admin"
                  render={({ field }) => (
                    // <Switch
                    //   id="is_admin"
                    //   checked={field.value}
                    //   onCheckedChange={field.onChange}
                    //   disabled={profile?.id === user?.id && true}
                    // />
                    <IctSwitchWithConfirm
                      field={field}
                      text={`Функція яка дозволить користувачу змінювати усі налаштування`}
                      label="Адміністратор"
                    />
                  )}
                />
                {/* <Label htmlFor="is_admin" className="text-xs">
                  Адміністратор
                </Label> */}
              </div>
              <div className="flex items-center gap-1">
                <Controller
                  control={form.control}
                  name="is_accountant"
                  render={({ field }) => (
                    <Switch
                      id="is_accountant"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="is_accountant" className="text-xs">
                  Бухгалтер
                </Label>
              </div>
              <div className="flex items-center gap-1">
                <Controller
                  control={form.control}
                  name="is_manager"
                  render={({ field }) => (
                    <Switch
                      id={`is_manager`}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="is_manager" className="text-xs">
                  Менеджер
                </Label>
              </div>
              <div className="flex items-center gap-1">
                <Controller
                  control={form.control}
                  name="is_director"
                  render={({ field }) => (
                    <Switch
                      id={`is_director`}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <Label htmlFor="is_director" className="text-xs">
                  Директор
                </Label>
              </div>
            </div>
            {form.formState.errors.is_manager && (
              <p className="text-red-500 text-xs mt-1">
                {form.formState.errors.is_manager.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full sm:w-auto">
              {user ? "Редагувати" : "Створити"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
