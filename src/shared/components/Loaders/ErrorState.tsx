"use client";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import React from "react";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = "Сталася помилка під час завантаження даних.",
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center bg-red-50 border border-red-200 rounded-lg shadow-sm">
      <AlertTriangle className="w-10 h-10 text-red-500 mb-3" />
      <h2 className="text-lg font-semibold text-red-700 mb-1">Помилка</h2>
      <p className="text-sm text-red-600 mb-4">{message}</p>

      {onRetry && (
        <Button
          variant="outline"
          className="flex items-center gap-2 border-red-400 text-red-700 hover:bg-red-100"
          onClick={onRetry}
        >
          <RotateCcw size={16} />
          Спробувати знову
        </Button>
      )}
    </div>
  );
};
