"use client";
import { useEffect, useState } from "react";

import api from "@/shared/api/instance.api";
import { useParams } from "next/navigation";

import LoadForm from "@/features/log/load/LoadForm";
import Loading from "@/shared/components/ui/Loading";

export default function EditCargoPage() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/crm/load/edit/${id}`); // 👈 твій ендпоїнт
        console.log(data, "response");

        setData(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <Loading />;
  if (!data) return <div>Заявку не знайдено</div>;

  return <LoadForm defaultValues={data} isEdit />;
}
