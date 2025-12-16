import { Button } from "@/shared/components/ui";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { authService } from "../services";

const AuthSocial = () => {
  const router = useRouter();

  const { mutateAsync } = useMutation({
    mutationKey: ["oauth by provider"],
    mutationFn: async (provider: "google") => {
      const { data } = await authService.oauthByProvider(provider);
      return data;
    },
  });

  const onClick = async (provider: "google"): Promise<void> => {
    const response = await mutateAsync(provider);
    if (response.url) {
      router.push(response.url);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 py-2">
        <Button onClick={() => onClick("google")} variant={"outline"}>
          <FaGoogle />
          Google
        </Button>
      </div>
      <div className="relative mb-2 space-y-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs   text-muted-foreground">
          <span>або</span>
        </div>
      </div>
    </>
  );
};

export default AuthSocial;
