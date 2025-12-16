import api from "@/shared/api/instance.api";
import { TypeCreateUserSchema } from "../schemas";

class UserService {
  public async createNewUser(values: TypeCreateUserSchema) {
    const { data } = await api.post("/users/pre-register-user-create", values);

    return data;
  }
  public async getUsersList(values: TypeCreateUserSchema) {
    const { data } = await api.post("/company/create", values);

    return data;
  }
  public async blockUser(userId: number) {
    const { data } = await api.post(`/admin/block/${userId}`);

    return data;
  }
}

export const userService = new UserService();
