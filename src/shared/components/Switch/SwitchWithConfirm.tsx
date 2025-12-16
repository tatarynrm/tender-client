"use client";

import { useState } from "react";
import { Switch } from "@/shared/components/ui/switch";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/shared/components/ui/tooltip";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { FaLaptopCode } from "react-icons/fa";
import { MyTooltip } from "../Tooltips/MyTooltip";
import { Label } from "../ui";

interface Props {
  field: any;
  text?: string;
  label?: string;
}

export function IctSwitchWithConfirm({ field, text, label }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [pendingValue, setPendingValue] = useState(false);

  const handleChange = (val: boolean) => {
    if (val) {
      // Якщо користувач увімкнув — відкриваємо діалог підтвердження
      setPendingValue(true);
      setOpenDialog(true);
    } else {
      // Вимкнення не потребує підтвердження
      field.onChange(false);
    }
  };

  const confirmEnable = () => {
    field.onChange(true);
    setOpenDialog(false);
  };
  const switchId = `switch-${Math.random().toString(36).substring(2, 9)}`;
  return (
    <>
      <Switch
        checked={field.value ?? false}
        onCheckedChange={handleChange}
        className="bg-teal-600"
      />
      <Label className="text-xs" htmlFor={switchId}>{label ?? ""}</Label>
      {/* Dialog для підтвердження */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Підтвердьте увімкнення</DialogTitle>
            <DialogDescription>{text}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Відмінити
            </Button>
            <Button onClick={confirmEnable}>Підтвердити</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
