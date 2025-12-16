import api from "@/shared/api/instance.api";
import { Transport } from "../types/transport.type";
// Типізація відповіді API
type TransportListResponse = {
  data: {
    list: Transport[];
    list_props: {
      sort: any;
      filter: any[];
      pagination: {
        page_num: number;
        rows_all: number;
        page_rows: number;
        page_count: number;
      };
    };
  };
  status: string;
};
export const getTransport = async (
  type: "TRUCK" | "TRAILER"
): Promise<Transport[]> => {
  const {data} = await api.get<TransportListResponse>("/transport/list", {
    params: { type },
  });
  console.log(data.data.list, "DATA");

  return data.data.list
};
