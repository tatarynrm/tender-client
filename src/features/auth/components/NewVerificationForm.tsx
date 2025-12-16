"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import AuthWrapper from "./AuthWrapper";
import Loading from "@/shared/components/ui/Loading";
import { useVerificationMutation } from "../hooks";

export function NewVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { verificationMutate } = useVerificationMutation();

  useEffect(() => {
    if (token) {
      verificationMutate(token);
    }
  }, [token, verificationMutate]);

  return (
    <AuthWrapper heading="Підтвердження пошти">
      <div className="flex justify-center items-center h-32">
        <Loading />
      </div>
    </AuthWrapper>
  );
}
