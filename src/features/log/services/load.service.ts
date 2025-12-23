import { LoadApiItem } from "@/app/log/cargo/active/page";
import api from "@/shared/api/instance.api";


export const loadService = {
  getLoads: async (): Promise<LoadApiItem[]> => {
    const { data } = await api.get("/crm/load/list");
    return data.content
  },
};
