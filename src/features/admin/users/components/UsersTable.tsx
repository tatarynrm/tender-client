"use client";

import React, { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/DataTable/DataTable";
import { Button } from "@/shared/components/ui";
import { useRouter } from "next/navigation";
import { UserPreRegister } from "../hooks/useGetUSersPreRegister";
import { CreateUserDialog } from "./CreateUserDialog";
import { CreateCompanyDialog } from "./CreateCompanyDialog";

interface Props {
  data: UserPreRegister[];
}

export const UsersTable = ({ data }: Props) => {
  const router = useRouter();

  const columns: ColumnDef<UserPreRegister>[] = [
    { accessorKey: "name", header: "Ім'я" },
    { accessorKey: "last_name", header: "Прізвище" },
    { accessorKey: "company_name", header: "Компанія" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Телефон" },
    { accessorKey: "country_name", header: "Країна" },
    {
      accessorKey: "id_usr",
      header: "Користувач",
      cell: ({ row }) =>
        row.original.id_usr ? (
          "✅"
        ) : row.original.id_company ? (
          <CreateUserDialog
            userData={{
              ...row.original,
              id_company: row.original.id_company ?? undefined, // замість null ставимо undefined
            }}
          />
        ) : (
          <span className="text-red-900">Потрібна компанія</span>
        ),
    },
    {
      accessorKey: "id_company",
      header: "Компанія",
      cell: ({ row }) =>
        row.original.id_company ? (
          "✅"
        ) : (
          <CreateCompanyDialog companyData={row.original} />
        ),
    },
  ];

  return <DataTable columns={columns} data={data} pageSize={20} />;
};
