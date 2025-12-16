"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/shared/components/ui/card";
import { cn } from "@/shared/utils";
import {
  Truck,
  MessageCircle,
  User,
  Calendar,
  MapPin,
  Building2,
  Activity,
  ClipboardList,
  Clock,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import Flag from "react-flagkit";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
// 🔹 Тип із API, без перейменувань
export type Cargo = {
  id: number;
  author: string;
  company_name: string;
  car_count_add: number;
  car_count_actual?: number;
  car_count_closed?: number;
  car_count_canceled?: number;
  crm_load_trailer: string[];
  crm_load_route_from: { city: string; country?: string }[];
  crm_load_route_to: { city: string; country?: string }[];
  created_at?: string;
  status?: string;
  messages?: number;
  load_info?: string;
};

interface CargoCardProps {
  cargo: Cargo;
  onOpen?: (cargo: Cargo) => void;
  onOpenChat?: (cargo: Cargo) => void;
}

export function CargoCard({ cargo, onOpen, onOpenChat }: CargoCardProps) {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const statusColor =
    cargo.status === "active"
      ? "bg-emerald-600"
      : cargo.status === "closed"
      ? "bg-gray-500"
      : "bg-amber-500";

  return (
    <Card
      className={cn(
        "w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md dark:hover:shadow-slate-700/40 transition-all duration-200 rounded-lg cursor-pointer overflow-hidden"
      )}
      onDoubleClick={() => onOpen?.(cargo)}
    >
      {/* Header */}
      <CardHeader className="flex justify-between items-center p-1 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/40">
        <div className="flex items-center gap-2 justify-between w-full">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 justify-end">
            № {cargo.id}
          </span>
          <span className="text-gray-400 flex flex-row items-center text-center text-sm">
            <span className="text-sm">
              {cargo.created_at
                ? format(new Date(cargo.created_at), "dd.MM.yyyy HH:mm", {
                    locale: uk,
                  })
                : "невідомо"}
            </span>
          </span>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-1 text-sm space-y-1">
        {/* Верхній блок: менеджер і компанія */}
        <div className="grid grid-cols-2 gap-2"></div>

        {/* 🚚 Маршрут з прапорами */}
        <div className="flex flex-col gap-2 text-gray-700 dark:text-gray-300">
          {cargo.crm_load_route_from.length <= 1 &&
          cargo.crm_load_route_to.length <= 1 ? (
            // Один рядок
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />

              {/* FROM → TO */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1">
                  {cargo.crm_load_route_from.map((from, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 text-sm font-medium"
                    >
                      <Flag
                        country={from.country?.toUpperCase() || "UN"}
                        size={16}
                      />
                      <span>{from.city}</span>
                    </span>
                  ))}
                </div>

                <ArrowRight className="w-4 h-4 text-gray-400" />

                <div className="flex items-center gap-1">
                  {cargo.crm_load_route_to.map((to, idx) => (
                    <span key={idx} className="flex items-center gap-1 text-sm">
                      <Flag
                        country={to.country?.toUpperCase() || "UN"}
                        size={16}
                      />
                      <span>{to.city}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Два блоки вертикально
            <div className="flex flex-col gap-1">
              {/* FROM */}
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div className="flex items-center gap-1 flex-wrap">
                  {cargo.crm_load_route_from.map((from, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 text-sm font-medium"
                    >
                      <Flag
                        country={from.country?.toUpperCase() || "UN"}
                        size={16}
                      />
                      <span>{from.city}</span>
                    </span>
                  ))}
                </div>
              </div>

              <ArrowRight className="w-4 h-4 text-gray-400 mx-6" />

              {/* TO */}
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <div className="flex items-center gap-1 flex-wrap text-gray-600 dark:text-gray-400">
                  {cargo.crm_load_route_to.map((to, idx) => (
                    <span key={idx} className="flex items-center gap-1 text-sm">
                      <Flag
                        country={to.country?.toUpperCase() || "UN"}
                        size={16}
                      />
                      <span>{to.city}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Інфо по авто */}
        <div className="grid grid-cols-2 gap-2 text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Truck className="w-4 h-4 text-green-600" />
            <span>{cargo.car_count_add} авт.</span>
          </div>
          <div className="flex items-center gap-1">
            <ClipboardList className="w-4 h-4 text-amber-600" />
            <span>
              Закр: {cargo.car_count_closed ?? 0}, В процесі:{" "}
              {cargo.car_count_actual ?? 0}
            </span>
          </div>
        </div>

        {/* Причепи */}
        {cargo.crm_load_trailer?.length > 0 && (
          <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            <span className="font-bold">
              {" "}
              {cargo.crm_load_trailer.join(", ")}
            </span>
          </div>
        )}

        {/* Час + повідомлення */}
        <div className="flex justify-end items-center mt-1">
          <div
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 cursor-pointer"
            onClick={() => onOpenChat?.(cargo)}
          >
            <MessageCircle className="w-4 h-4" />
            <span>{cargo.messages ?? 0}</span>
          </div>
        </div>
        <div className="max-h-24 overflow-y-auto p-1 scrollbar-thin">
          <p>{cargo.load_info}</p>
        </div>
        {isMobile && (
          <button
            className="mt-1 text-blue-600 text-xs hover:underline"
            onClick={() => onOpen?.(cargo)}
          >
            Деталі
          </button>
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="mt-auto flex justify-between items-center border-t border-gray-100 dark:border-slate-700 px-1 py-1 text-gray-500 text-xs bg-gray-50 dark:bg-slate-900/30">
        <div className="flex items-center gap-1.5">
          <User className="w-4 h-4 text-rose-600" />
          <span className="truncate font-medium text-gray-800 dark:text-gray-100">
            {cargo.author}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
          <Building2 className="w-4 h-4" />
          <span className="truncate">{cargo.company_name}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
