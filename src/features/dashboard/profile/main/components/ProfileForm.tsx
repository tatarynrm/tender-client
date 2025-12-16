"use client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Switch,
} from "@/shared/components/ui";
import { useProfile } from "@/shared/hooks";
import React from "react";
import UserButton, { UserButtonLoading } from "./UserButton";
import Loading from "@/shared/components/ui/Loading";
import { Form, FormProvider, useForm } from "react-hook-form";
import { ProfileSchema, TypeProfileSchema } from "../schemes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProfileMutation } from "../hooks/useUpdateProfileMutation";
import Link from "next/link";
import ProfileFormSkeleton from "./skeletons/ProfileFormSkeleton";

const ProfileForm = () => {
  const { profile, isProfileLoading } = useProfile();

  const form = useForm<TypeProfileSchema>({
    resolver: zodResolver(ProfileSchema),
    values: {
      name: profile?.name || "",
      email: profile?.email || "",
      isTwoFactorEnabled: profile?.isTwoFactorEnabled || false,
    },
  });
  const { updateProfile, isLoadingUpdateProfile } = useUpdateProfileMutation();
  const onSubmit = async (values: TypeProfileSchema) => {
    updateProfile(values);
  };
  if (isProfileLoading) {
    return <ProfileFormSkeleton />;
  }
  if (!profile) return null;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Налаштування профілю</CardTitle>
        {isProfileLoading ? (
          <UserButtonLoading />
        ) : (
          <UserButton profile={profile} />
        )}
      </CardHeader>

      <CardContent>
        {isProfileLoading ? (
          <Loading />
        ) : (
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-2 space-y-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ім'я</FormLabel>
                    <FormControl>
                      <Input placeholder="Напишіть ваше ім'я" {...field} />
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
                    <FormLabel>Ім'я</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isTwoFactorEnabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>Двухфакторна автентифікація</FormLabel>
                      <FormDescription>
                        Включіть двухфакторну авторизацію для вашого аккаунту
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                disabled={isLoadingUpdateProfile}
                loading={isLoadingUpdateProfile}
                type="submit"
              >
                Зберегти
              </Button>
            </form>
          </FormProvider>
        )}

        <Link
          className="ml-auto inline-block text-sm underline "
          href={"/dashboard/profile/sessions"}
        >
          Перейти до сесій
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
