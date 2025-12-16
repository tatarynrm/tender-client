import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Calendar } from "lucide-react";

import { registerLocale } from "react-datepicker";
import { uk } from "date-fns/locale";

registerLocale("uk", uk);

type DateTimePickerProps = {
  value?: Date | null;                // значення ззовні (наприклад із RHF)
  onChange?: (date: Date | null) => void; // передаємо дату назовні
  label?: string;
  placeholder?: string;
  showSeconds?: boolean;
  timeIntervals?: number;
};

export default function DateTimePicker({
  value = null,
  onChange,
  label = "Дата і час",
  placeholder = "Оберіть дату та час",
  showSeconds = false,
  timeIntervals = 15,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Date | null>(value);

  // коли зовнішнє значення змінюється — оновлюємо локальний стейт
  useEffect(() => {
    setSelected(value ?? null);
  }, [value]);

  function handleChange(date: Date | null) {
    setSelected(date);
    onChange?.(date); // повідомляємо форму
  }

  const timeFormat = showSeconds ? "HH:mm:ss" : "HH:mm";

  return (
    <div className="w-full max-w-sm">
      <Label className="mb-1 block">{label}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between"
            aria-label={placeholder}
          >
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">
                {selected
                  ? selected.toLocaleString("uk-UA", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: showSeconds ? "2-digit" : undefined,
                    })
                  : placeholder}
              </span>
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[350px] p-2">
          <DatePicker
            selected={selected}
            onChange={handleChange}
            inline
            showTimeSelect
            timeFormat={timeFormat}
            timeIntervals={timeIntervals}
            timeCaption="Час"
            dateFormat={`dd.MM.yyyy ${timeFormat}`}
            locale="uk"
            shouldCloseOnSelect={false}
          />

          <div className="mt-3 flex gap-2 justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelected(null);
                onChange?.(null);
                setOpen(false);
              }}
            >
              Очистити
            </Button>

            <Button size="sm" onClick={() => setOpen(false)}>
              Готово
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <input
        type="hidden"
        value={selected ? selected.toISOString() : ""}
        readOnly
        name="datetime"
      />
    </div>
  );
}
