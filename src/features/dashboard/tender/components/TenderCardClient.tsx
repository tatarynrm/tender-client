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
  ChevronDown,
  ArrowBigDownDash,
} from "lucide-react";
import { useEffect, useState } from "react";
import Flag from "react-flagkit";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { cn } from "@/shared/utils";

import { useRouter } from "next/navigation";
import { ITender } from "@/features/log/types/tender.type";
import api from "@/shared/api/instance.api";
import { Button } from "@/shared/components/ui";

export function TenderCardClients({
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

  const trailerList =
    cargo.tender_trailer?.map((t) => t.trailer_type_name).join(", ") || "-";
  const trailerLoadList =
    cargo.tender_load?.map((t) => t.load_type_name).join(", ") || "-";
  console.log(trailerLoadList, "LAOD LIST");

  const carCount = cargo.car_count_actual ?? 0;
  const carCountActual = cargo.car_count_actual ?? 0;

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

  return (
    <Card
      className={cn(
        "w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800",
        "hover:shadow-md transition-all duration-200 rounded-lg cursor-pointer overflow-hidden"
      )}
      onDoubleClick={onOpenDetails}
    >
      {/* HEADER */}
      <CardHeader className="flex justify-between items-center p-1 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/40">
        <div className="flex items-center justify-between w-full gap-2">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Тендер № {cargo.id ?? "-"} ({cargo.tender_type})
          </span>

          <span className="text-gray-400 text-sm">
            {formattedStartDate} - {formattedEndDate}
          </span>
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
          <div className="p-3 flex flex-col items-center gap-2">
            {fromPoints.length > 0 ? (
              <span className={`text-xs text-teal-400`}>Завантаження</span>
            ) : null}
            {fromPoints.length
              ? fromPoints.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-1 font-medium"
                  >
                    <Flag country={p.ids_country ?? "UA"} size={16} />
                    {p.city || "-"}
                  </div>
                ))
              : "-"}
          </div>
          {/* ZAMYTNENNYA */}

          <div className="p-3 flex flex-col items-center gap-2">
            {customUp.length > 0 ? (
              <span className={`text-xs text-teal-400`}>Замитнення</span>
            ) : null}
            {fromPoints.length
              ? customUp.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-1 font-medium"
                  >
                    <Flag country={p.ids_country ?? "UA"} size={16} />
                    {p.city || "-"}
                  </div>
                ))
              : "-"}
          </div>
          {/* BORDER */}
          <div className="p-3 flex flex-col items-center gap-2">
            {border.length > 0 ? (
              <span className={`text-xs text-teal-400`}>Кордон / Перехід</span>
            ) : null}
            {fromPoints.length
              ? border.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-1 font-medium"
                  >
                    <Flag country={p.ids_country ?? "UA"} size={16} />
                    {p.city || "-"}
                  </div>
                ))
              : "-"}
          </div>
          {/* CUSTOM DOWN - ROZMYTNENNYA */}
          <div className="p-3 flex flex-col items-center gap-2">
            {customDown.length > 0 ? (
              <span className={`text-xs text-teal-400`}>Розмитнення</span>
            ) : null}
            {fromPoints.length
              ? customDown.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-1 font-medium"
                  >
                    <Flag country={p.ids_country ?? "UA"} size={16} />
                    {p.city || "-"}
                  </div>
                ))
              : "-"}
          </div>
          {/* TO */}
          <div className="p-3 flex flex-col items-center gap-2">
            {toPoints.length > 0 ? (
              <span className={`text-xs text-teal-400`}>Розвантаження</span>
            ) : null}
            {toPoints.length
              ? toPoints.map((p) => (
                  <div key={p.id} className="flex items-center gap-1">
                    <Flag country={p.ids_country ?? "UA"} size={16} />
                    {p.city || "-"}
                  </div>
                ))
              : "-"}
          </div>

          {/* WEIGHT / VOLUME */}
          <div className="p-3 flex flex-col gap-1 text-gray-700 dark:text-gray-300">
            {/* AUTOS */}
            <div className=" flex flex-col gap-1 text-gray-700 dark:text-gray-300">
              <div>
                <Truck className="w-4 h-4 text-green-600 inline-block" />{" "}
                {carCount} авт.
              </div>
            </div>
            <div>
              <ClipboardList className="w-4 h-4 text-amber-600 inline-block" />{" "}
              {weight} т.
            </div>
            <div>Об'єм: {volume} м³</div>
            {/* TRAILERS */}
            <div className="flex flex-col">
              <div className=" text-xs text-gray-700 dark:text-gray-300">
                {trailerList}
              </div>
              <div className=" text-xs text-gray-700 dark:text-gray-300">
                {trailerLoadList}
              </div>
            </div>
          </div>

          {/* CARGO + NOTES */}
          <div className="p-3 max-h-40 overflow-y-auto text-gray-800 dark:text-gray-200 text-xs ">
            {cargo.cargo || "-"}
            {cargo.notes && (
              <div>
                <h3 className="text-xs">Примітки</h3>
                <span className="block text-xs opacity-70">{cargo.notes}</span>
              </div>
            )}
          </div>

          {/* AUTHOR */}
          <div className="p-3 flex items-center gap-1 text-gray-700 dark:text-gray-300">
            <User className="w-4 h-4 text-rose-600" />
            <span className="truncate">{cargo.author || "-"}</span>
          </div>

          {/* COST */}
          <div>
            <div className="p-3 text-gray-700 dark:text-gray-300">
              {cargo.price_start} {cargo.valut_name?.toUpperCase()}{" "}
              {cargo.without_vat ? "(без ПДВ)" : ""}
            </div>
            {cargo.price_proposed && (
              <div className="p-3 text-red-700 dark:text-red-300">
                {cargo.price_proposed} {cargo.valut_name?.toUpperCase()}{" "}
                {cargo.without_vat ? "(без ПДВ)" : ""}
              </div>
            )}
          </div>

          {/* Buttons */}

          <div className="p-3 text-gray-700 dark:text-gray-300">
            <Button
              onClick={async () => {
                await api.post("/tender/set-rate", {
                  id_tender: cargo.id,
                  ids_redemption_price: "reduction",
                  price_proposed: cargo.price_next,
                  notes: "---",
                  car_count: 1,
                });
              }}
              variant="default"
              className="flex items-center gap-2 rounded-xl px-6 py-5 text-base shadow-md hover:shadow-lg transition"
            >
              <span>Підтвердити {cargo?.price_next}</span>
              <ArrowBigDownDash className="h-5 w-5 opacity-80" />
            </Button>
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

          <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-slate-700 ">
            <div className="flex flex-col gap-1 text-gray-700 dark:text-gray-300">
              <div>
                <User className="w-4 h-4 text-rose-600" /> {cargo.author || "-"}
              </div>
              <div>
                {cargo.price_start} {cargo.valut_name?.toUpperCase()}{" "}
                {cargo.without_vat ? "(без ПДВ)" : ""}
              </div>
              {/* <div>{cargo.tender_status}</div> */}
            </div>
            <div className="flex flex-col gap-1 text-gray-600 dark:text-gray-400">
              <div>Тип: {cargo.tender_type}</div>
            </div>
          </div>
          {/* Buttons */}

          <div className="p-3 text-gray-700 dark:text-gray-300">
            <button
              onClick={async () => {
                await api.post("/tender/set-rate");
              }}
            >
              Підтвердити {}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
