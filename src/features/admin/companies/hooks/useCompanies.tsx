// hooks/useCompanies.ts
"use client";

import { useEffect, useState } from "react";
import api from "@/shared/api/instance.api";


export function useCompanies() {
  const [companies, setCompanies] = useState<any>([]);
  const [pageIndex, setPageIndex] = useState(0); // TanStack починає з 0
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setIsLoading(true);
      try {
        const { data } = await api.get(`/company/all?page=${pageIndex + 1}`);
        setCompanies(data.data.list);
        setPageCount(data.data.list_props.pagination.page_count);
      } catch (err) {
        console.error("Помилка при отриманні компаній:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, [pageIndex]);

  return {
    companies,
    pageIndex,
    setPageIndex,
    pageCount,
    isLoading,
  };
}
