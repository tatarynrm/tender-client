import { ITender } from "@/features/log/types/tender.type";
import api from "@/shared/api/instance.api";


export const tenderClientsService = {
  getTenders: async (): Promise<ITender[]> => {
    const { data } = await api.get("/tender/client-list");
    return data.content;
  },

  getOneTender: async (id: number | string): Promise<ITender> => {
    const { data } = await api.get(`/tender/${id}`);
    return data.content[0]; // або data, залежно від твоєї відповіді бекенду
  },
};
