"use client";

import { useEffect, useRef, useState } from "react";

import GridColumnSelector from "@/shared/components/GridColumnSelector/GridColumnSelector";
import { useGridColumns } from "@/shared/hooks/useGridColumns";

import { CargoCard } from "@/features/log/active/ui/CargoCard";
import { useLoads } from "@/features/log/hooks/useLoads";
import Loader from "@/shared/components/Loaders/MainLoader";
import { ErrorState } from "@/shared/components/Loaders/ErrorState";

import { useAuth } from "@/shared/providers/AuthCheckProvider";


// 🔹 Тип даних із API
export type LoadApiItem = {
  id: number;
  author: string;
  company_name: string;
  car_count_add: number;
  car_count_actual?: number;
  car_count_closed?: number;
  car_count_canceled?: number;
  crm_load_trailer: string[];
  crm_load_route_from: {
    id: number;
    lat: number;
    lon: number;
    city: string;
    address: string;
    country: string;
    id_parent: number;
    order_num: number;
    id_country: number;
    ids_route_type: string;
  }[];
  crm_load_route_to: {
    id: number;
    lat: number;
    lon: number;
    city: string;
    address: string;
    country: string;
    id_parent: number;
    order_num: number;
    id_country: number;
    ids_route_type: string;
  }[];
  created_at?: string;
  updated_at?: string;
  status?: string;
  messages?: number;
  load_info?: string;
};

export default function DashboardPage() {
  const { profile } = useAuth();

  const [gridCols, setGridCols, gridClass, columnOptions] = useGridColumns(
    "dashboardGridCols",
    3
  );

  const { loads, isLoading, error, refetch } = useLoads();



  if (isLoading) return <Loader />;
  if (error) return <ErrorState />;

  return (
    <div className="p-4">
      {/* Панель керування */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Панель вантажів
        </h2>
        <GridColumnSelector
          gridCols={gridCols}
          setGridCols={setGridCols}
          columnOptions={columnOptions}
        />
      </div>

      {/* Сітка карток */}
      <div className={`grid ${gridClass} gap-10 mb-20`}>
        {loads.map((item: LoadApiItem) => (
          <CargoCard key={item.id} cargo={item} />
        ))}
      </div>
    </div>
  );
}
