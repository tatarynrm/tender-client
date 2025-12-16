// приклад: MyTooltip
"use client";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/shared/components/ui/tooltip";
import { useAuth } from "@/shared/providers/AuthCheckProvider";
import { FiHelpCircle } from "react-icons/fi";

interface CustomTooltipProps {
  text: string;
  important?: boolean;
}

export function MyTooltip({ text, important }: CustomTooltipProps) {
  const { profile } = useAuth();


  if (profile?.is_manager) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <FiHelpCircle
          className={`text-gray-400 hover:text-gray-600 cursor-pointer w-3 h-3`}
          color={important ? "red" : ""}
        />
      </TooltipTrigger>
      <TooltipContent className="bg-gray-800 text-white text-sm p-3 rounded-lg shadow-lg max-w-xs md:max-w-sm animate-fade-in">
        {text}
      </TooltipContent>
    </Tooltip>
  );
}
