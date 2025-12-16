"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { SettingsCard } from "./SettingsCard";
import { toast } from "sonner";

// Валідація через Zod
const profileSchema = z.object({
  name: z.string().min(2, "Ім’я повинно містити щонайменше 2 символи"),
  email: z.string().email("Невірний email"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const ProfileTab = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Роман Татарин",
      email: "roman@example.com",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setLoading(true);
    try {
      // Відправка на сервер
      // await fetch("/api/user/profile", { method: "POST", body: JSON.stringify(data) })
      toast("Збережено ✅");
    } catch (error) {
      toast("Не вдалося зберегти дані");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingsCard title="Профіль">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <Label htmlFor="name" className="text-black dark:text-white">Ім’я</Label>
          <Input
            id="name"
            {...register("name")}
            className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="email" className="text-black dark:text-white">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-gradient-to-r from-teal-500 to-indigo-500 hover:scale-101 transition-transform "
            disabled={loading}
          >
            {loading ? "Збереження..." : "Зберегти"}
          </Button>
        </div>
      </form>
    </SettingsCard>
  );
};
