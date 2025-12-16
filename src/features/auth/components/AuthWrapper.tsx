import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ToggleTheme,
} from "@/shared/components/ui";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import AuthSocial from "./AuthSocial";

interface AuthWrapperProps {
  heading: string;
  description?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  isShowSocial?: boolean;
  isFullSize?:boolean
}
const AuthWrapper = ({
  children,
  heading,
  description,
  backButtonHref,
  backButtonLabel,
  isShowSocial,
  isFullSize
  
}: PropsWithChildren<AuthWrapperProps>) => {
  return (
    <Card className={`${isFullSize ? 'w-full' : 'w-[400px]'} relative `}>
      <div className="absolute top-1 right-1">
        <ToggleTheme/>
      </div>
      <CardHeader className="space-y-2">
        <CardTitle>{heading}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {/* {isShowSocial && <AuthSocial/>} */}
        {children}
      </CardContent>

      <CardFooter>
        {backButtonLabel && backButtonHref && (
          <Button variant={"link"} className="w-full font-normal">
            <Link href={backButtonHref}>{backButtonLabel}</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthWrapper;
