"use client";
import { ReactNode } from "react";
import { useIsClient } from "@/shared/hooks/useIsClient";
import Loader from "@/shared/components/Loaders/MainLoader";

export default function ClientOnlyProvider({ children }: { children: ReactNode }) {
  const isClient = useIsClient();

  if (!isClient) return <Loader />;

  return <>{children}</>;
}
