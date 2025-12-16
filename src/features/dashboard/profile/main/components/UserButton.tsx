import { useLoginMutation } from "@/features/auth/hooks";
import { useProfile } from "@/shared/hooks";
import React from "react";
import { useProfileLogoutMutation } from "../hooks";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
} from "@/shared/components/ui";
import { LogOut } from "lucide-react";
import { IUser } from "@/features/auth/types";
import { IUserProfile } from "@/shared/types/user.types";

interface UserButtonProps {
  profile: IUserProfile;
}
const UserButton = ({ profile }: UserButtonProps) => {
  const { logout, isLoadingLogout } = useProfileLogoutMutation();

  if (!profile) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          {/* <AvatarImage src={profile.picture} /> */}
          <AvatarFallback>{profile.name.slice(0, 1)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-40 align="end" cursor-pointer'>
        <DropdownMenuItem onClick={() => logout()} disabled={isLoadingLogout} className="cursor-pointer">
          <LogOut className="mr-2 size-4" />
          Вийти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;

export function UserButtonLoading() {
  return <Skeleton className="h-10 w-10 rounded-full" />;
}
