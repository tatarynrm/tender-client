import api from "@/shared/api/instance.api";
import { TypeLoginSchema, TypeRegisterSchema } from "../schemes";
import { IUser } from "../types";

class AuthService {
  public async register(body: TypeRegisterSchema) {
    const response = await api.post<IUser>("/auth/pre-register", body);
    return response;
  }
  public async login(body: TypeLoginSchema) {
    const response = await api.post<IUser>("/auth/login", body);

    return response;
  }
  public async oauthByProvider(provider: "google") {
    const response = await api.get<{ url: string }>(
      `/auth/oauth/connect/${provider}`
    );
    return response;
  }

  public async logout() {
    const response = await api.post("/auth/logout");
    return response;
  }
}

export const authService = new AuthService();
