"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/DataTable/DataTable";
import {
  UserFromCompany,
  Phone,
  useGetUserList,
} from "../hooks/useGetUserList";
import {
  Edit2,
  GripVertical,
  Phone as PhoneIcon,
  Trash2,
  User as UserIcon,
  UserLock,
} from "lucide-react";
import { FaTelegramPlane, FaViber, FaWhatsapp } from "react-icons/fa";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui";
import { CreateOrUpdateUserDialog } from "../forms/CreateOrUpdateUserDialog";
import { useProfile } from "@/shared/hooks";

const MAX_VISIBLE_PHONES = 1;

export const UsersTable = React.memo(() => {
  const [expandedPhones, setExpandedPhones] = useState<Record<number, boolean>>(
    {}
  );

  const { profile } = useProfile();

  const [currentPage, setCurrentPage] = useState(1);

  const [pageSize] = useState(10); // можна зробити динамічним

  const { users,pageCount, isLoading } = useGetUserList(currentPage, pageSize);
console.log(users,'USER 45 line');

  const togglePhones = (id: number) => {
    setExpandedPhones((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const columns: ColumnDef<UserFromCompany>[] = [
    {
      accessorKey: "name",
      header: "Ім’я",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <UserIcon className="w-4 h-4 text-gray-500" />
          {row.original.name}
        </div>
      ),
    },
    { accessorKey: "surname", header: "Прізвище" },
    { accessorKey: "last_name", header: "По-батькові" },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <a
          href={`mailto:${row.original.email}`}
          className="text-blue-600  hover:underline"
        >
          {row.original.email}
        </a>
      ),
    },
    {
      id: "phones",
      header: "Телефони",
      cell: ({ row }) => {
        const phones = row.original.usr_phone.filter(
          (p) => p.phone?.trim() !== ""
        );
        if (!phones.length)
          return <span className="text-gray-400">Немає телефонів</span>;

        const isExpanded = expandedPhones[row.original.id];
        const phonesToShow = isExpanded
          ? phones
          : phones.slice(0, MAX_VISIBLE_PHONES);

        return (
          <div className="flex flex-col gap-1">
            {phonesToShow.map((phone: Phone, idx: number) => (
              <div key={idx} className="flex items-center gap-1">
                <PhoneIcon className="w-4 h-4 text-gray-500" />
                <span>{phone.phone}</span>
                {phone.is_viber && (
                  <FaViber className="w-4 h-4 text-purple-500" title="Viber" />
                )}
                {phone.is_telegram && (
                  <FaTelegramPlane
                    className="w-4 h-4 text-blue-500"
                    title="Telegram"
                  />
                )}
                {phone.is_whatsapp && (
                  <FaWhatsapp
                    className="w-4 h-4 text-green-500"
                    title="WhatsApp"
                  />
                )}
              </div>
            ))}
            {phones.length > MAX_VISIBLE_PHONES && (
              <button
                className="text-xs text-blue-500 hover:underline self-start"
                onClick={() => togglePhones(row.original.id)}
              >
                {isExpanded
                  ? "Згорнути"
                  : `+${phones.length - MAX_VISIBLE_PHONES} ще`}
              </button>
            )}
          </div>
        );
      },
    },
    {
      id: "roles",
      header: "Ролі",
      cell: ({ row }) => (
        <div className="flex gap-2 flex-wrap">
          {row.original.is_admin && (
            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
              Адміністратор
            </span>
          )}
          {row.original.is_manager && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
              Менеджер
            </span>
          )}
          {row.original.is_director && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
              Директор
            </span>
          )}
          {row.original.is_accountant && (
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
              Бухгалтер
            </span>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Дії",
      cell: ({ row }) => {
        // Якщо профіль не адміністратор, то нічого не показуємо
        if (!profile?.is_admin) {
          return "⛔";
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Вибір дії">
                <GripVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
              {/* Редагувати */}
              <CreateOrUpdateUserDialog
                user={{
                  ...row.original,
                  usr_phone: row.original.usr_phone.map((p) => ({
                    phone: p.phone || "",
                    is_viber: !!p.is_viber,
                    is_telegram: !!p.is_telegram,
                    is_whatsapp: !!p.is_whatsapp,
                  })),
                }}
                triggerButton={
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full items-center text-center text-xs"
                  >
                    <Edit2 color="blue" />
                    Редагувати
                  </Button>
                }
              />

              {/* Видалити */}
              <DropdownMenuItem asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full items-center text-center cursor-pointer text-xs"
                >
                  <Trash2 color={"red"} />
                  Видалити
                </Button>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Заблокувати */}
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full items-center text-center text-xs"
                >
                  <UserLock color="red" />
                  Заблокувати
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      pageSize={pageSize}
      currentPage={currentPage}
      pageCount={pageCount}
      onPageChange={(page) => {
        if (page > 0 && page <= pageCount) setCurrentPage(page);
      }}
    />
  );
});
