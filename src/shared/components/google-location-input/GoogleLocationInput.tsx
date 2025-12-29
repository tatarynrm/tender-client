"use client";

import { useState, useEffect } from "react";
import debounce from "lodash.debounce";
import { Input } from "../ui";
import api from "@/shared/api/instance.api";

interface GoogleLocationInputProps {
  value?: string;
  onChange: (location: any) => void; // можна типізувати NormalizedLocation
  placeholder?: string;
  defaultValue?: string;
}

export const GoogleLocationInput = ({
  value,
  onChange,
  placeholder,
  defaultValue,
}: GoogleLocationInputProps) => {
  const [query, setQuery] = useState(value || defaultValue || "");
  const [results, setResults] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(value || null);

  // ---------------- Debounced search ----------------
  const searchPlaces = debounce(async (q: string) => {
    if (q.length < 3 || selected) return;
    try {
      const { data } = await api.get(`/location/autocomplete`, {
        params: { input: q },
        
      });
      setResults(data.predictions || []);
    } catch (err) {
      console.error(err);
    }
  }, 300);

  useEffect(() => {
    searchPlaces(query);
    return () => searchPlaces.cancel();
  }, [query, selected]);

  // ---------------- Render ----------------
  return (
    <div className="relative">
      <Input
        value={query}
        placeholder={placeholder}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(null);
        }}
      />

      {results.length > 0 && !selected && (
        <ul className="absolute z-10 bg-white border w-full max-h-60 overflow-auto mt-1 rounded shadow">
          {results.map((r) => (
            <li
              key={r.place_id}
              className="p-1 cursor-pointer hover:bg-teal-100 text-black dark:text-white bg-background"
              onClick={async () => {
                try {
                  // POST через axios
                  const { data: location } = await api.post(
                    "/location/resolve",
                    {
                      placeId: r.place_id,
                    }
                  );

                  onChange(location); // передаємо normalized обʼєкт
                  setQuery(location.city || location.street || r.description);
                  setSelected(
                    location.city || location.street || r.description
                  );
                  setResults([]);
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {r.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
