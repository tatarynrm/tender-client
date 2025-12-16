"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerFooter,
} from "@/shared/components/ui/drawer";
import { ICargo } from "./CargoCard";
import { CargoMap } from "./CargoMap";
import { Button } from "@/shared/components/ui";

interface CargoDetailsDrawerProps {
  cargo?: ICargo;
  open: boolean;
  onClose: () => void;
}

export function CargoDetailsDrawer({
  cargo,
  open,
  onClose,
}: CargoDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState<"info" | "map">("info");

  if (!cargo) return null;

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="w-full h-[90vh] flex flex-col">
        <DrawerHeader>
          <DrawerTitle>Деталі вантажу #{cargo.id}</DrawerTitle>
          <DrawerClose />
        </DrawerHeader>

        {/* --- Таби --- */}
        <div className="flex border-b border-gray-200 dark:border-slate-700">
          <Button
            variant={"outline"}
            className={`flex-1 py-2 text-center ${
              activeTab === "info"
                ? "border-b-2 border-blue-500 font-bold text-teal-900"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("info")}
          >
            Інформація
          </Button>
          <Button
            variant={"outline"}
            className={`flex-1 py-2 text-center ${
              activeTab === "map"
                ? "border-b-2 border-blue-500 font-bold text-teal-900"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("map")}
          >
            Карта
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "info" && (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                  📋 Основна інформація
                </h3>
                <p>
                  👤 <strong>Менеджер:</strong> {cargo.author}
                </p>
                <p>
                  🏢 <strong>Компанія:</strong> {cargo.company_name}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded shadow-sm">
                <h3 className="text-lg font-semibold mb-2">🗺️ Маршрут</h3>
                <p>
                  🚚 <strong>З:</strong>{" "}
                  {cargo.crm_load_route_from.map((f) => f.city).join(", ")}
                </p>
                <p>
                  📍 <strong>До:</strong>{" "}
                  {cargo.crm_load_route_to.map((t) => t.city).join(", ")}
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded shadow-sm">
                <h3 className="text-lg font-semibold mb-2">🚛 Транспорт</h3>
                <p>
                  📦 <strong>Потрібно:</strong> {cargo.car_count_add}
                </p>
                <p className="text-blue-600 font-medium">
                  🔹 <strong>Фактично:</strong> {cargo.car_count_actual}
                </p>
                <p className="text-green-600 font-medium">
                  ✅ <strong>Закрито:</strong> {cargo.car_count_closed}
                </p>
                <p className="text-red-600 font-medium">
                  ❌ <strong>Відмінено:</strong> {cargo.car_count_canceled}
                </p>
              </div>
            </div>
          )}

          {activeTab === "map" && (
            <div className="w-full h-[60vh] min-h-[300px]">
              <CargoMap cargo={cargo} />
            </div>
          )}
        </div>

        <DrawerFooter />
      </DrawerContent>
    </Drawer>
  );
}
