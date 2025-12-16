"use client";

import React from "react";
import {
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/shared/components/ui";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;
  userExist: string;
  setUserExist: (v: string) => void;
  companyExist: string;
  setCompanyExist: (v: string) => void;
  countries: string[];
}

export const UsersFilters = ({
  search,
  setSearch,
  country,
  setCountry,
  userExist,
  setUserExist,
  companyExist,
  setCompanyExist,
  countries,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <Input
        placeholder="Пошук за ім’ям, компанією або email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-64"
      />

      <Select onValueChange={setCountry} value={country}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Країна" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Всі країни</SelectItem>
          {countries.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={setUserExist} value={userExist}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Користувач" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Всі</SelectItem>
          <SelectItem value="yes">Існує</SelectItem>
          <SelectItem value="no">Не існує</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setCompanyExist} value={companyExist}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Компанія" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Всі</SelectItem>
          <SelectItem value="yes">Існує</SelectItem>
          <SelectItem value="no">Не існує</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        onClick={() => {
          setSearch("");
          setCountry("all");
          setUserExist("all");
          setCompanyExist("all");
        }}
      >
        Скинути фільтри
      </Button>
    </div>
  );
};
