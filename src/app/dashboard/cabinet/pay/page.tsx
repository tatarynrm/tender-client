// app/pay/page.tsx
import { fetchServer } from "@/shared/server/fetchServer";
import { IUserProfile } from "@/shared/types/user.types";
import React from "react";

const PayPage = async () => {
  const user = await fetchServer.get<IUserProfile>("/auth/me");
  console.log(user, "USER");
if (!user) {
  return null
}
  return (
    <div>
      <h1>Pay Page</h1>
      <p>Company Name: {user.company_name || "не вказано"}</p>
      <p>Name: {user.name}</p>
      <p>Surname: {user.surname}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default PayPage;
