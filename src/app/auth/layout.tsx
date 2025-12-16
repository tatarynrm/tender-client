// app/log/layout.tsx
import { redirect } from "next/navigation";

import { AuthCheckProvider } from "@/shared/providers/AuthCheckProvider";
import { getProfile } from "@/shared/server/getProfile";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();
  if (profile) redirect("/dashboard");
  if (!profile) return <>{children}</>;
}
