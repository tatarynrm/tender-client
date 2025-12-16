"use client";

import { Card, CardHeader, CardContent } from "@/shared/components/ui/card";
import {
  MapPin,
  Truck,
  ClipboardList,
  GripVertical,
  User,
  Building2,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import Flag from "react-flagkit";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { cn } from "@/shared/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/shared/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { ITender } from "../../types/tender.type";

export function TenderCardManagers({
  cargo,
  onOpenDetails,
}: {
  cargo: ITender;
  onOpenDetails: () => void;
}) {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isMobile = windowWidth <= 768;

  // const fromPoints = cargo.tender_route?.filter(
  //   (r) => r.ids_point === "LOAD_FROM"
  // ) || [];

  // const toPoints = cargo.tender_route?.filter(
  //   (r) => r.ids_point === "LOAD_TO"
  // ) || [];

  const trailerList =
    cargo.tender_trailer?.map((t) => t.trailer_type_name).join(", ") || "-";
  const trailerLoadList =
    cargo.tender_load?.map((t) => t.load_type_name).join(", ") || "-";
  console.log(trailerLoadList, "LAOD LIST");

  const carCount = cargo.car_count ?? 0;
  const carCountActual = cargo.car_count_actual ?? 0;
  const carCountClosed = cargo.car_count_closed ?? 0;
  const carCountCanceled = cargo.car_count_canceled ?? 0;

  const weight = cargo.weight ?? 0;
  const volume = cargo.volume ?? 0;

  const formattedStartDate = cargo.time_start
    ? format(new Date(cargo.time_start), "dd.MM.yyyy", { locale: uk })
    : "Без дати";

  const formattedEndDate = cargo.time_end
    ? format(new Date(cargo.time_end), "dd.MM.yyyy", { locale: uk })
    : "Без дати";
  const fromPoints = cargo.tender_route.filter(
    (p) => p.ids_point === "LOAD_FROM"
  );
  const customUp = cargo.tender_route.filter(
    (p) => p.ids_point === "CUSTOM_UP"
  );
  const customDown = cargo.tender_route.filter(
    (p) => p.ids_point === "CUSTOM_DOWN"
  );
  const border = cargo.tender_route.filter((p) => p.ids_point === "BORDER");
  const toPoints = cargo.tender_route.filter((p) => p.ids_point === "LOAD_TO");

  console.log(fromPoints, "FROM POINTS");

  return (
    <Card
      className={cn(
        "w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800",
        "hover:shadow-md transition-all duration-200 rounded-lg cursor-pointer overflow-hidden"
      )}
      onClick={onOpenDetails}
    >
      {/* HEADER */}
      <CardHeader className="flex justify-between items-center p-2 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/40">
        <div className="flex items-center justify-between w-full gap-2">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Тендер № {cargo.id ?? "-"} ({cargo.tender_type})
          </span>

          <span className="text-gray-400 text-sm">
            {formattedStartDate} - {formattedEndDate}
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <GripVertical className="cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuItem
                onClick={() => router.push(`/log/tender/edit/${cargo.id}`)}
              >
                Редагувати
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => console.log("Видалити", cargo.id)}
              >
                Видалити
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* DESKTOP TABLE ROW */}
        <div
          className={cn(
            "hidden md:grid grid-cols-10 text-sm divide-x divide-gray-200 dark:divide-slate-700",
            "hover:bg-gray-50 dark:hover:bg-slate-900/20 transition"
          )}
        >
          {/* FROM */}
          <div className="p-3 flex items-center gap-2">
            {fromPoints.length
              ? fromPoints.map((p) => (
                  <span
                    key={p.id}
                    className="flex items-center gap-1 font-medium"
                  >
                    <Flag country={p.ids_country ?? "UA"} size={16} />
                    {p.city || "-"}
                  </span>
                ))
              : "-"}
          </div>
          {/* ZAMYTNENNYA */}
          <div className="p-3 flex items-center gap-2">
            {fromPoints.length
              ? customUp.map((p) => (
                  <span
                    key={p.id}
                    className="flex items-center gap-1 font-medium"
                  >
                    <Flag country={p.ids_country ?? "UA"} size={16} />
                    {p.city || "-"}
                  </span>
                ))
              : "-"}
          </div>
          {/* BORDER */}
          <div className="p-3 flex items-center gap-2">
            {fromPoints.length
              ? border.map((p) => (
                  <span
                    key={p.id}
                    className="flex items-center gap-1 font-medium"
                  >
                    <Flag country={p.ids_country ?? "UA"} size={16} />
                    {p.city || "-"}
                  </span>
                ))
              : "-"}
          </div>
          {/* CUSTOM DOWN - ROZMYTNENNYA */}
          <div className="p-3 flex items-center gap-2">
            {fromPoints.length
              ? customDown.map((p) => (
                  <span
                    key={p.id}
                    className="flex items-center gap-1 font-medium"
                  >
                    <Flag country={p.ids_country ?? "UA"} size={16} />
                    {p.city || "-"}
                  </span>
                ))
              : "-"}
          </div>
          {/* TO */}
          <div className="p-3 flex items-center gap-2">
            {toPoints.length
              ? toPoints.map((p) => (
                  <span key={p.id} className="flex items-center gap-1">
                    <Flag country={p.ids_country ?? "UA"} size={16} />
                    {p.city || "-"}
                  </span>
                ))
              : "-"}
          </div>

          {/* AUTOS */}
          <div className="p-3 flex flex-col gap-1 text-gray-700 dark:text-gray-300">
            <div>
              <Truck className="w-4 h-4 text-green-600 inline-block" />{" "}
              {carCount} авт.
            </div>
            <div>
              Фактично: {carCountActual} | Закрито: {carCountClosed} |
              Скасовано: {carCountCanceled}
            </div>
          </div>

          {/* WEIGHT / VOLUME */}
          <div className="p-3 flex flex-col gap-1 text-gray-700 dark:text-gray-300">
            <div>
              <ClipboardList className="w-4 h-4 text-amber-600 inline-block" />{" "}
              {weight} кг
            </div>
            <div>Об'єм: {volume} м³</div>
          </div>

          {/* TRAILERS */}
          <div className="flex flex-col">
            <div className="p-3 text-xs text-gray-700 dark:text-gray-300">
              {trailerList}
            </div>
            <div className="p-3 text-xs text-gray-700 dark:text-gray-300">
              {trailerLoadList}
            </div>
          </div>

          {/* CARGO + NOTES */}
          <div className="p-3 max-h-16 overflow-y-auto text-gray-800 dark:text-gray-200">
            {cargo.cargo || "-"}
            {cargo.notes && (
              <span className="block text-xs opacity-70">{cargo.notes}</span>
            )}
          </div>

          {/* AUTHOR */}
          <div className="p-3 flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <User className="w-4 h-4 text-rose-600" />
            <span className="truncate">{cargo.author || "-"}</span>
          </div>

          {/* COMPANY */}
          <div className="p-3 flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <Building2 className="w-4 h-4" />
            <span className="truncate">{cargo.company_name || "-"}</span>
          </div>

          {/* COST */}
          <div className="p-3 text-gray-700 dark:text-gray-300">
            {cargo.cost_start} {cargo.valut_name}{" "}
            {cargo.without_vat ? "(без ПДВ)" : ""}
          </div>

          {/* STATUS */}
          <div className="p-3 text-gray-700 dark:text-gray-300">
            {cargo.tender_status || "-"}
          </div>
        </div>

        {/* MOBILE CARD */}
        <div className="md:hidden p-3 space-y-3 text-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            {fromPoints.map((p) => (
              <span key={p.id} className="flex items-center gap-1 font-medium">
                <Flag country={p.ids_country || "UN"} size={14} />{" "}
                {p.city || "-"}
              </span>
            ))}
            <ArrowRight className="w-4 h-4 text-gray-500" />
            {toPoints.map((p) => (
              <span key={p.id} className="flex items-center gap-1">
                <Flag country={p.ids_country || "UN"} size={14} />{" "}
                {p.city || "-"}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col text-gray-700 dark:text-gray-300">
              <div>
                <Truck className="w-4 h-4 text-green-600 inline-block" />{" "}
                {carCount} авт.
              </div>
              <div>
                Фактично: {carCountActual} | Закрито: {carCountClosed} |
                Скасовано: {carCountCanceled}
              </div>
            </div>
            <div className="flex flex-col text-gray-700 dark:text-gray-300">
              <div>
                <ClipboardList className="w-4 h-4 text-amber-600 inline-block" />{" "}
                {weight} кг
              </div>
              <div>Об'єм: {volume} м³</div>
            </div>
          </div>

          <div className="text-xs text-gray-600 dark:text-gray-400">
            <span className="font-semibold">{trailerList}</span>
          </div>

          <div className="max-h-24 overflow-y-auto p-1 scrollbar-thin">
            <p className="text-gray-700 dark:text-gray-300">
              {cargo.cargo || "-"}
              {cargo.notes && (
                <span className="block text-xs mt-1 opacity-80">
                  {cargo.notes}
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-slate-700">
            <div className="flex flex-col gap-1 text-gray-700 dark:text-gray-300">
              <div>
                <User className="w-4 h-4 text-rose-600" /> {cargo.author || "-"}
              </div>
              <div>
                {cargo.cost_start} {cargo.valut_name}{" "}
                {cargo.without_vat ? "(без ПДВ)" : ""}
              </div>
              <div>{cargo.tender_status}</div>
            </div>
            <div className="flex flex-col gap-1 text-gray-600 dark:text-gray-400">
              <div>
                <Building2 className="w-4 h-4" /> {cargo.company_name || "-"}
              </div>
              <div>Тип: {cargo.tender_type}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
