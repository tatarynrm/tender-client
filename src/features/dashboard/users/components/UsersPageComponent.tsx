"use client";
import React from "react";
import { UsersTable } from "./UsersTable";

import { CreateOrUpdateUserDialog } from "../forms/CreateOrUpdateUserDialog";

const UsersPageComponent = () => {
  return (
    <div className="p-1  flex flex-col gap-4">
      <div className="flex justify-end">
        <CreateOrUpdateUserDialog />
      </div>

      <UsersTable />
    </div>
  );
};

export default UsersPageComponent;
