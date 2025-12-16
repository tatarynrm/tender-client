import { IUser } from "@/features/auth/types";
import api from "@/shared/api/instance.api";


class TelegramService {
  public async findProfile() {
    const { data } = await api.get("/users/profile");

    return data;
  }

}

export const telegramService = new TelegramService();
