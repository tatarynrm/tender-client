import NewPasswordForm from "@/features/auth/components/NewPasswordForm";
import Loader from "@/shared/components/Loaders/MainLoader";

import Logo from "@/shared/components/Logo/Logo";
import { Metadata } from "next";

import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Новий пароль",
};

const NewPasswordPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Ліва колонка */}
      <div className="flex flex-col p-6 sm:p-10">
        {/* Логотип */}
        <div className="flex justify-center sm:justify-start mb-8">
          <Logo />
        </div>

        <div className="flex flex-1 justify-center items-center overflow-auto ">
          <Suspense fallback={<Loader />}>
            <NewPasswordForm />
          </Suspense>
        </div>
      </div>

      {/* Права колонка з картинкою */}
      <div className="relative hidden lg:block">
        <img
          src="/images/auth/new-account.jpeg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default NewPasswordPage;
