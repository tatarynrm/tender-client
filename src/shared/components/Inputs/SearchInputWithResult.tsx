import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/shared/components/ui/input";
import { FaSearch } from "react-icons/fa";
import { useDebounce } from "@/shared/hooks/useDebounce";
import api from "@/shared/api/instance.api";
import { Button } from "../ui";

export interface Company {
  id: number;
  company_name: string;
  company_name_full: string;
  company_form: string;
  edrpou: string;
  ukey_edrpou: string;
  id_country: number;
  address: string | null;
  gps_lat: number | null;
  gps_lon: number | null;
  is_client: boolean;
  is_carrier: boolean;
  is_expedition: boolean;
  black_list: boolean;
  lei: string | null;
  migrate_company: string | null;
  migrate_id: number | null;
  created_at: string | null;
  updated_at: string | null;
  use_medok: boolean;
  use_vchasno: boolean;
  id_accounter: number | null;
  id_director: number | null;
  web_site: string | null;
  dt_blocked: string | null;
  devid: string | null;
}

interface SearchInputProps<T> {
  url: string;
  placeholder: string;
  onChange: (selectedData: T | null) => void;
  label?: string;
  debounceTime?: number;
  value?: string;
}

export function SearchInput<T extends Company>({
  url,
  placeholder,
  onChange,
  label,
  value = "",
  debounceTime = 300,
}: SearchInputProps<T>) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<T | null>(null);

  const debouncedQuery = useDebounce(query, debounceTime);

  const fetchResults = useCallback(
    async (q: string) => {
      setLoading(true);
      try {
        const response = await api.get(`${url}/${q}`);
        if (Array.isArray(response.data)) {
          setResults(response.data);
        } else {
          setResults([]);
        }
      } catch (err) {
        setError("Помилка при завантаженні даних");
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    if (debouncedQuery.trim() !== "") {
      fetchResults(debouncedQuery);
    } else {
      setResults([]);
    }
  }, [debouncedQuery, fetchResults]);
  useEffect(() => {
    setQuery(value);
  }, [value]);

  const handleSelect = (item: T) => {
    setSelectedCompany(item);
    setResults([]);
    setQuery("");
    onChange(item);
  };

  const handleClear = () => {
    setSelectedCompany(null);
    onChange(null);
  };

  return (
    <div className="relative">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}

      {selectedCompany ? (
        // Карточка обраної компанії
        <div className="flex flex-col p-2 bg-white rounded-lg shadow-md border border-gray-200 w-full max-w-sm">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedCompany.company_name}
              </h3>
              <p className="text-sm text-gray-500">
                ({selectedCompany.company_form})
              </p>
            </div>
            <Button
              onClick={handleClear}
              variant="ghost"
              className="text-gray-400 hover:text-gray-600 ml-2"
            >
              ✕
            </Button>
          </div>

          <div className="mt-2 text-sm text-gray-700 space-y-1">
            <p>
              <span className="font-medium">ЄДРПОУ:</span>{" "}
              {selectedCompany.edrpou}
            </p>

            {selectedCompany.lei && (
              <p>
                <span className="font-medium">LEI:</span> {selectedCompany.lei}
              </p>
            )}
            {selectedCompany.address && (
              <p>
                <span className="font-medium">Адреса:</span>{" "}
                {selectedCompany.address}
              </p>
            )}
          </div>

          <div className="flex gap-2 mt-3 flex-wrap">
            {selectedCompany.is_client && (
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                Клієнт
              </span>
            )}
            {selectedCompany.is_carrier && (
              <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                Перевізник
              </span>
            )}
            {selectedCompany.is_expedition && (
              <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                Експедитор
              </span>
            )}
            {selectedCompany.black_list && (
              <span className="text-[10px] bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                Чорний список
              </span>
            )}
          </div>
        </div>
      ) : (
        // Інпут для пошуку
        <div className="relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="text-sm pr-8"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
          {loading && !query && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaSearch />
            </div>
          )}
          {results.length === 0 && query && !loading && (
            <div className="absolute left-0 right-0 bg-white shadow-md mt-1 max-h-60 overflow-auto z-50 border border-gray-200 rounded-md p-3">
              Пошук не дав результатів
            </div>
          )}

          {results.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white shadow-md mt-1 max-h-60 overflow-auto z-50 border border-gray-200 rounded-md">
              {results.map((item: T, index) => (
                <li
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => handleSelect(item)}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">
                      {item.company_name}{" "}
                      <span className="text-gray-500 text-xs">
                        ({item.company_form})
                      </span>
                    </span>
                    <span className="text-xs text-gray-500">
                      ЄДРПОУ: {item.edrpou}
                    </span>
                    <div className="flex gap-2 mt-1">
                      {item.is_client && (
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded">
                          Клієнт
                        </span>
                      )}
                      {item.is_carrier && (
                        <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                          Перевізник
                        </span>
                      )}
                      {item.is_expedition && (
                        <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded">
                          Експедитор
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}
