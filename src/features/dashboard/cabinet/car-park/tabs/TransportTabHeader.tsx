"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/shared/components/ui";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTransportQuery } from "../_model/hooks/useTransport";
import { DropdownItem, TransportCount, Transport } from "../_model/types/transport.type";

const TransportTabs = ({
  transportCount,
}: {
  transportCount: TransportCount;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabParam = searchParams.get("tab") as "TRUCK" | "TRAILER" | null;
  const [activeTab, setActiveTab] = useState<"TRUCK" | "TRAILER">(tabParam || "TRUCK");

  // Стан для збереження завантажених даних
  const [trucks, setTrucks] = useState<Transport[] | null>(null);
  const [trailers, setTrailers] = useState<Transport[] | null>(null);

  // Завантажуємо TRUCK одразу
  const { data: trucksData } = useTransportQuery("TRUCK");

  useEffect(() => {
    if (trucksData) setTrucks(trucksData);
  }, [trucksData]);

  // Ліниве завантаження TRAILER при перемиканні
  const { data: trailersData, refetch: fetchTrailers } = useTransportQuery("TRAILER");

  useEffect(() => {
    if (activeTab === "TRAILER" && !trailers && !trailersData) {
      fetchTrailers();
    }
  }, [activeTab, trailers, trailersData, fetchTrailers]);

  useEffect(() => {
    if (trailersData) setTrailers(trailersData);
  }, [trailersData]);

  const vehicleTypes: DropdownItem[] =
    trucks?.map((t) => ({
      id: t.id,
      name: `${t.brand_name} ${t.model_name}`,
    })) || [];

  const trailerTypes: DropdownItem[] =
    trailers?.map((t) => ({
      id: t.id,
      name: `${t.brand_name} ${t.model_name}`,
    })) || [];

  const handleTabChange = (tab: "TRUCK" | "TRAILER") => {
    setActiveTab(tab);

    // оновлюємо URL
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value: string) => {
        handleTabChange(value as "TRUCK" | "TRAILER");
      }}
    >
      <TabsList>
        <TabsTrigger value="TRUCK">
          Авто (тягачі) · {transportCount.count_truck}
        </TabsTrigger>
        <TabsTrigger value="TRAILER">
          Причепи · {transportCount.count_trailer}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="TRUCK">
        {vehicleTypes.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {vehicleTypes.map((v) => (
              <li key={v.id} className="p-2 border rounded">
                {v.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 text-center text-muted-foreground">
            Немає авто/тягачів
          </div>
        )}
      </TabsContent>

      <TabsContent value="TRAILER">
        {trailerTypes.length ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {trailerTypes.map((t) => (
              <li key={t.id} className="p-2 border rounded">
                {t.name}
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 text-center text-muted-foreground">
            Немає причепів
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default TransportTabs;
