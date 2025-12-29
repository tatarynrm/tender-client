"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function TenderFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // applied (з URL)
  const appliedSearch = searchParams.get("search") ?? "";
  const appliedStatus = searchParams.get("status") ?? "";

  // draft (локально)
  const [search, setSearch] = useState(appliedSearch);
  const [status, setStatus] = useState(appliedStatus);

  // 🔄 синхронізація якщо URL змінився (back/forward)
  useEffect(() => {
    setSearch(appliedSearch);
    setStatus(appliedStatus);
  }, [appliedSearch, appliedStatus]);

  function applyFilters() {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (status) params.set("status", status);

    router.push(`?${params.toString()}`, { scroll: false });
  }

  function resetFilters() {
    setSearch("");
    setStatus("");
    router.push("?", { scroll: false });
  }

  return (
    <div className="mb-4 flex flex-wrap items-end gap-3">
      <div className="flex flex-col">
        <label className="text-sm text-gray-500">Пошук</label>
        <input
          className="input input-bordered"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Місто / назва..."
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-gray-500">Статус</label>
        <select
          className="select select-bordered"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Всі</option>
          <option value="new">Нові</option>
          <option value="in_progress">В роботі</option>
          <option value="done">Завершені</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={applyFilters}>
        Застосувати
      </button>

      <button className="btn btn-ghost" onClick={resetFilters}>
        Скинути
      </button>
    </div>
  );
}
