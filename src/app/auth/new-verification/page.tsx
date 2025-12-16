import { NewVerificationForm } from "@/features/auth/components/NewVerificationForm";
import Loading from "@/shared/components/ui/Loading";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Підтвердження пошти",
};
const NewVerification = () => {
  return (
    <div className="flex min-h-screen justify-center items-center text-center">
      <Suspense fallback={<Loading />}>
        <NewVerificationForm />
      </Suspense>
    </div>
  );
};

export default NewVerification;
