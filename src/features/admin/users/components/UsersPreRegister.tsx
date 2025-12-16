"use client";

import React, { useState, useMemo } from "react";
import { useGetUsersPreRegister } from "../hooks/useGetUSersPreRegister";
import { UsersFilters } from "./UsersFilters";
import { UsersTable } from "./UsersTable";

const UsersPreRegister = () => {
  const { usersPre, refetch } = useGetUsersPreRegister();
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("all");
  const [userExist, setUserExist] = useState("all");
  const [companyExist, setCompanyExist] = useState("all");

  // 🔹 Унікальні країни
  const countries = useMemo(() => {
    const unique = Array.from(new Set(usersPre.map((u) => u.country_name)));
    return unique.sort();
  }, [usersPre]);

  // 🔹 Повторення для тесту

  // 🔹 Фільтровані дані
  const filteredUsers = useMemo(() => {
    return usersPre.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.last_name.toLowerCase().includes(search.toLowerCase()) ||
        u.company_name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchCountry =
        country === "all" ? true : u.country_name === country;

      const matchUser =
        userExist === "all"
          ? true
          : userExist === "yes"
          ? !!u.id_usr
          : !u.id_usr;

      const matchCompany =
        companyExist === "all"
          ? true
          : companyExist === "yes"
          ? !!u.id_company
          : !u.id_company;

      return matchSearch && matchCountry && matchUser && matchCompany;
    });
  }, [usersPre, search, country, userExist, companyExist, refetch]);

  return (
    <div className="p-4 h-screen flex flex-col gap-4">
      <UsersFilters
        search={search}
        setSearch={setSearch}
        country={country}
        setCountry={setCountry}
        userExist={userExist}
        setUserExist={setUserExist}
        companyExist={companyExist}
        setCompanyExist={setCompanyExist}
        countries={countries}
      />

      <div className="flex-1 border rounded-md shadow-sm overflow-hidden">
        <UsersTable data={filteredUsers} />
      </div>
    </div>
  );
};

export default UsersPreRegister;
