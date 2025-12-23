import { useQuery } from "@tanstack/react-query";
import api from "@/shared/api/instance.api";

export interface Phone {
  phone?: string;
  is_viber?: boolean;
  is_telegram?: boolean;
  is_whatsapp?: boolean;
}

export interface UserFromCompany {
  id: number;
  name: string;
  surname: string;
  last_name: string;
  email: string;
  is_admin: boolean;
  is_manager: boolean;
  is_director: boolean;
  is_accountant: boolean;
  usr_phone: Phone[];
}

// 👇 Підтримка пагінації
export const useGetUserList = (page?: number, pageSize?: number) => {
  const currentPage = page ?? 1; // якщо undefined -> 1
  const currentPageSize = pageSize ?? 1; // якщо undefined -> 10

  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["company-users", currentPage, currentPageSize],
    queryFn: async () => {
      const { data } = await api.post("/users/all", {
        pagination: {
          page_num: currentPage,
          page_rows: currentPageSize,
        },
      });

      console.log(data, "RESPONSE");

      return {
        users: data.content as UserFromCompany[],
        pageCount: data.props.pagination.page_count
      };
    },
  });

  return {
    users: data?.users ?? [],
    pageCount: data?.pageCount ?? 1,
    isLoading,
    refetch,
    error,
  };
};
