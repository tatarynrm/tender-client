"use client";

import { useState } from "react";

import { useTenders } from "@/features/log/hooks/useTenders";
import { ITender } from "@/features/log/types/tender.type";

import Loader from "@/shared/components/Loaders/MainLoader";
import { ErrorState } from "@/shared/components/Loaders/ErrorState";

import { TenderCardManagers } from "@/features/log/tenders/components/TenderCard";
import TenderModal from "@/features/log/tenders/components/TenderModal";
import { TenderCardClients } from "@/features/dashboard/tender/components/TenderCardClient";
import { useTenderListClient } from "@/features/dashboard/hooks/useTenderListClient";
import { TenderFilters } from "@/features/log/tenders/components/TenderFilters";

export default function ClientsTenderPage() {
  const { tenders, isLoading, error } = useTenderListClient();
  const [selectedTender, setSelectedTender] = useState<ITender | null>(null);

  if (isLoading) return <Loader />;
  if (error) return <ErrorState />;

  return (
    <div className="p-4">
      <TenderModal
        tenderId={selectedTender?.id}
        onClose={() => setSelectedTender(null)}
      />

      <TenderFilters/>

      {/* Список карток */}
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-slate-700">
        {tenders.map((item: ITender) => (
          <div key={item.id} className="py-2">
            <TenderCardClients
              cargo={item}
              onOpenDetails={() => setSelectedTender(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
