"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/shared/components/ui/sheet";

type ChatMessage = {
  id: number;
  user: string;
  text: string;
  time: string;
};

interface CargoChatProps {
  cargoId: number;
  open: boolean;
  onClose: () => void;
}

export default function CargoChat({ cargoId, open, onClose }: CargoChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, user: "Менеджер", text: "Привіт! Вантаж готовий?", time: "09:10" },
    { id: 2, user: "Водій", text: "Так, виїжджаю", time: "09:12" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: ChatMessage = {
      id: messages.length + 1,
      user: "Я",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  // Прокрутка вниз при новому повідомленні
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
      
    
    className="flex flex-col h-full 
             w-1/2         /* завжди на всю ширину для мобільних */
             sm:max-w-sm     /* планшети: максимум ширина small */
             md:max-w-md     /* десктопи: максимум ширина medium */
             lg:max-w-lg     /* великі екрани: максимум ширина large */
             xl:max-w-xl
             2xl:max-w-2xl"
      >
        <SheetHeader className="flex justify-between items-center border-b p-2">
          <SheetTitle>Чат вантажу #{cargoId}</SheetTitle>
          <SheetClose />
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.user === "Я" ? "items-end" : "items-start"}`}
            >
              <div
                className={`px-3 py-1 rounded-lg max-w-xs break-words ${
                  msg.user === "Я"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-0.5">{msg.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <SheetFooter className="p-2 border-t flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Написати повідомлення..."
            className="flex-1 border rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="px-3 py-1 bg-teal-400 text-white rounded hover:bg-teal-700 transition"
          >
            Відправити
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
