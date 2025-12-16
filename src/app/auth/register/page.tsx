import RegisterForm from "@/features/auth/components/RegisterForm";
import Logo from "@/shared/components/Logo/Logo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Створити аккаунт",
  description: "",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col">
      <Logo />
      <div className="p-3 relative z-10 bg-background">
        <RegisterForm />
      </div>
    </div>
  );
}
