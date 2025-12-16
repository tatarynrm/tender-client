// app/log/layout.tsx
import { redirect } from "next/navigation";
import LogShell from "@/features/log/LogShell";
import { AuthCheckProvider } from "@/shared/providers/AuthCheckProvider";
import { getProfile } from "@/shared/server/getProfile";

export default async function BlockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  if (!profile) redirect("/auth/login");
  if (!profile.is_blocked) redirect("/dashboard");


  return (
    <AuthCheckProvider profile={profile}>
     {children}
    </AuthCheckProvider>
  );
}
