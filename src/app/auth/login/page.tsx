import LoginForm from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

import Logo from "@/shared/components/Logo/Logo";

// import { LoginForm } from "@/components/login-form"
export const metadata: Metadata = {
  title: "Увійти в аккаунт",
  description: "",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="logo mb-6">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center ">
          <LoginForm />
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/images/auth/login.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
