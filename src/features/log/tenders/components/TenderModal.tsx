"use client";

import { useEffect, useState } from "react";
import { ITender } from "../../types/tender.type";
import { tenderService } from "../../services/tender.service";
import { X } from "lucide-react";

export default function TenderModal({
  tenderId,
  onClose,
}: {
  tenderId: number | null | undefined;
  onClose: () => void;
}) {
  const [tender, setTender] = useState<ITender | null>(null);

  useEffect(() => {
    if (!tenderId) return;

    const loadTender = async () => {
      try {
        const data = await tenderService.getOneTender(tenderId);
        setTender(data);
      } catch (err) {
        console.log(err);
      }
    };

    loadTender();
  }, [tenderId]);

  return (
    <>
      {/* Тінь фона */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity
        ${tenderId ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Модальне вікно */}
      <div
        className={`
          fixed inset-0 z-50 p-6 
          flex flex-col 
          bg-white dark:bg-slate-900 
          shadow-xl overflow-y-auto

          transition-transform duration-300
          ${tenderId ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold">
            Тендер № {tender?.id}
          </h2>

          <X
            className="w-6 h-6 cursor-pointer hover:text-red-500"
            onClick={onClose}
          />
        </div>

        {/* CONTENT */}
        {!tender ? (
          <div className="mt-6 text-center">Завантаження...</div>
        ) : (
          <div className="mt-6 space-y-6">
            {/* Маршрут */}
            <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Маршрут</h3>
              {tender.tender_route?.map((r) => (
                <div key={r.id} className="text-sm flex gap-2">
                  <span className="font-medium">
                    {r.ids_point === "LOAD_FROM" ? "Завантаження:" : "Вивантаження:"}
                  </span>
                  <span>{r.locality}</span>
                </div>
              ))}
            </div>

            {/* Параметри */}
            <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl">
              <h3 className="font-semibold mb-2">Параметри</h3>
              <p>Авто: {tender.car_count}</p>
              <p>Вага: {tender.weight} кг</p>
            </div>

            {/* Примітки */}
            {tender.notes && (
              <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-xl">
                <h3 className="font-semibold mb-2">Примітки</h3>
                <p>{tender.notes}</p>
              </div>
            )}

            {/* Місце під карту */}
            <div className="bg-gray-200 dark:bg-slate-800 rounded-xl h-[400px] flex items-center justify-center">
              <span className="text-gray-600 dark:text-gray-400">
                Тут буде карта маршруту
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
