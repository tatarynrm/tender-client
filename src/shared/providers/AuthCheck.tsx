"use client";
import { useEffect } from "react";
import { useAuth } from "@/shared/providers/AuthCheckProvider";

export const AuthCheck = () => {
  const { profile } = useAuth();

  useEffect(() => {
    if (profile?.id) {
      localStorage.setItem("socket", profile.id); // Зберігаємо userId в localStorage після логіну
    }
  }, [profile]);

  return null;
};
