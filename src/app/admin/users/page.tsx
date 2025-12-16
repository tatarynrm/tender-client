"use client";

import { useState, useMemo, useEffect } from "react";
import { DataTable } from "@/shared/components/DataTable/DataTable";
import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/components/ui";
import { ColumnDef } from "@tanstack/react-table";
import LinkButton from "@/shared/components/Buttons/LinkButton";
import { User } from "lucide-react";
import api from "@/shared/api/instance.api";
import { userService } from "@/features/admin/users/services";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const columns: ColumnDef<User>[] = [
  { accessorKey: "name", header: "Ім'я" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Роль" },
  {
    header: "Дії",
    cell: () => (
      <Button onClick={()=> userService.blockUser(1)} size="sm" variant="outline">
        Редагувати
      </Button>
    ),
  },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [isOpen, setIsOpen] = useState(false); // модальне вікно
  const [users, setUsers] = useState<User[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10); //
  const fetchCompanies = async (page = 1, rows = 10) => {
    // ⚡ Не очищаємо старі дані

    try {
      const { data } = await api.post("/users/all", {
        pagination: {
          page_num: page,
          page_rows: rows,
        },
      });

      const response = data.data;
      setUsers(response.list);
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
    <div className="space-y-4 w-full p-4">
      {/* Верхній блок */}
      <div className="flex justify-between flex-wrap gap-3">
        <h2 className="text-xl font-semibold">Користувачі</h2>
        <LinkButton
          title="Створити"
          href="/admin/users/create"
          icon={<User />}
        />
      </div>

      {/* Фільтри */}
      <div className="flex flex-wrap gap-3 items-center p-3 rounded-lg">
        <Input
          placeholder="Пошук за ім'ям або email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Роль" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всі ролі</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="Manager">Manager</SelectItem>
            <SelectItem value="User">User</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            setSearch("");
            setRole("all");
          }}
        >
          Скинути фільтри
        </Button>
      </div>

      {/* Таблиця */}
      <div className="border rounded-md shadow-sm overflow-hidden">
        <DataTable
          columns={columns}
          data={users}
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={(page) => {
            if (page > 0 && page <= pageCount) setCurrentPage(page);
          }}
          pageSize={pageSize}
        />
      </div>

      {/* Модальне вікно */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="w-full max-w-3xl h-screen p-6" width="w-700">
          <DialogHeader>
            <DialogTitle>Додати користувача</DialogTitle>
          </DialogHeader>

          {/* Форма */}
          <div className="space-y-4 mt-4">
            <Input placeholder="Ім'я" />
            <Input placeholder="Email" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="User">User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Відміна
            </Button>
            <Button>Зберегти</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
