"use client";

import { useState } from "react";

import { LogOut } from "lucide-react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui";
import { useProfileLogoutMutation } from "@/features/dashboard/profile/main/hooks";

export function LogoutButton() {
  const [open, setOpen] = useState(false);

  const { logout } = useProfileLogoutMutation();

  return (
    <>
      {/* Текст у стилі решти footerLinks */}
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 cursor-pointer text-sm text-red-600 dark:text-red-400 hover:underline"
      >
        <LogOut size={16} />
        Вийти
      </div>

      {/* Модальне підтвердження */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Вихід із системи</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Ви впевнені, що хочете вийти із системи?
          </p>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Ні
            </Button>
            <Button variant="destructive" onClick={() => logout()}>
              Так
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
