import * as React from "react";
import { cn } from "@/shared/utils/index";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {}

const Input = ({ className, type, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const isPassword = type === "password";
  const isNumber = type === "number";

  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  // Заборона введення букв для number
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isNumber) {
      // дозволяємо цифри, Backspace, Delete, Tab, Enter, точки та мінус
      const allowedKeys = [
        "Backspace",
        "Delete",
        "Tab",
        "Enter",
        "ArrowLeft",
        "ArrowRight",
        ".",
        "-",
      ];
      if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        data-slot="input"
        onKeyDown={handleKeyDown}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-8 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          isNumber && "appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          className
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  );
};

export { Input };
