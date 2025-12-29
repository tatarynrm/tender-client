import { ITender } from "@/features/log/types/tender.type";
import api from "@/shared/api/instance.api";

export const tenderClientsService = {
  getTenders: async (
    params?: URLSearchParams
  ): Promise<ITender[]> => {
    const query = params?.toString();
    const { data } = await api.get(
      `/tender/client-list${query ? `?${query}` : ""}`
    );
    return data.content;
  },

  getOneTender: async (id: number | string): Promise<ITender> => {
    const { data } = await api.get(`/tender/${id}`);
    return data.content[0];
  },
};
