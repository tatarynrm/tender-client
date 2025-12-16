import Logo from "@/shared/components/Logo/Logo";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Змінити пароль",
  description: "",
};

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left column */}
      <div className="flex flex-col p-6 sm:p-10">
        {/* Лого */}
        <div className="flex justify-center sm:justify-start mb-8">
          <Logo />
        </div>

        {/* Контейнер форми */}
        <div className="flex flex-1 justify-center items-center overflow-auto">
          <ResetPasswordForm />
        </div>
      </div>

      {/* Right image column */}
      <div className="relative hidden lg:block">
        <img
          src="/images/auth/forgot-password.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.4] dark:grayscale"
        />
      </div>
    </div>
  );
}
