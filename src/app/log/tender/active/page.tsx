"use client";

import { useState } from "react";

import { useTenders } from "@/features/log/hooks/useTenders";
import { ITender } from "@/features/log/types/tender.type";

import Loader from "@/shared/components/Loaders/MainLoader";
import { ErrorState } from "@/shared/components/Loaders/ErrorState";

import { TenderCardManagers } from "@/features/log/tenders/components/TenderCard";
import TenderModal from "@/features/log/tenders/components/TenderModal";

export default function DashboardPage() {
  const { tenders, isLoading, error } = useTenders();
  const [selectedTender, setSelectedTender] = useState<ITender | null>(null);

  if (isLoading) return <Loader />;
  if (error) return <ErrorState />;

  return (
    <div className="p-4">
      {/* Повноекранна модалка */}
      {/* <TenderModal
        tender={selectedTender}
        onClose={() => setSelectedTender(null)}
      /> */}
      <TenderModal
        tenderId={selectedTender?.id}
        onClose={() => setSelectedTender(null)}
      />

      {/* Список карток */}
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-slate-700">
        {tenders.map((item: ITender) => (
          <div key={item.id} className="py-2">
            <TenderCardManagers
              cargo={item}
              onOpenDetails={() => setSelectedTender(item)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
