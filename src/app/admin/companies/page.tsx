"use client";

import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Building2 } from "lucide-react";

import api from "@/shared/api/instance.api";
import { DataTable } from "@/shared/components/DataTable/DataTable";
import LinkButton from "@/shared/components/Buttons/LinkButton";
import { Button } from "@/shared/components/ui";

export interface Company {
  id?: number;
  company_name: string;
  company_name_full: string;
  edrpou: string;
  address: string;
  black_list?: boolean;
  is_carrier: boolean;
  is_client: boolean;
  is_expedition: boolean;
  lei?: string | null;
}

// 🧩 Стовпці таблиці
const columns: ColumnDef<Company>[] = [
  { accessorKey: "company_name", header: "Назва" },
  { accessorKey: "company_name_full", header: "Повна назва" },
  { accessorKey: "edrpou", header: "ЄДРПОУ" },
  { accessorKey: "address", header: "Адреса" },
  {
    accessorKey: "black_list",
    header: "У чорному списку",
    cell: ({ getValue }) => (getValue() ? "Так" : "Ні"),
  },
  {
    header: "Дії",
    cell: () => (
      <Button size="sm" variant="outline">
        Редагувати
      </Button>
    ),
  },
];

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize] = useState(10); // можна зробити динамічним

  // 🧠 Завантаження компаній з API
  const fetchCompanies = async (page = 1, rows = 10) => {
    // ⚡ Не очищаємо старі дані

    try {
      const { data } = await api.post("/company/all", {
        pagination: {
          page_num: page,
          page_rows: rows,
        },
      });

      const response = data.data;
      setCompanies(response.list);
      setPageCount(response.list_props.pagination.page_count);
    } catch (error) {
      console.error("Помилка при отриманні компаній:", error);
    } finally {
    }
  };

  useEffect(() => {
    fetchCompanies(currentPage, pageSize);
  }, [currentPage, pageSize]);

  return (
    <div className="space-y-4 w-full">
      {/* 🔹 Заголовок і кнопка створення */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Компанії</h2>

        <LinkButton
          href="/admin/companies/create"
          icon={<Building2 />}
          title="Створити"
        />
      </div>

      {/* 🔹 Таблиця з пагінацією */}
      <DataTable
        columns={columns}
        data={companies}
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={(page) => {
          if (page > 0 && page <= pageCount) setCurrentPage(page);
        }}
        pageSize={pageSize}
      />
    </div>
  );
}
