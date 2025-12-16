"use client";
import React from "react";
import { useGetUserList } from "../hooks/useGetUserList";
import { UsersTable } from "./UsersTable";

export const UsersList = () => {
  const {
    users: usersList,
    isLoading: isLoadingUserList,
    error,
 
  } = useGetUserList();



  // return <UsersTable data={usersList} />
};

export default UsersList;
