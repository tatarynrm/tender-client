import api from "@/shared/api/instance.api";

import { IUser } from "../types";
import { TypeNewPasswordSchema, TypeResetPasswordSchema } from "../schemes";

class PasswordRecoveryService {
  public async resetPassword(body: TypeResetPasswordSchema) {
    const response = await api.post<IUser>(
      "/auth/password-recovery/reset",
      body
    );
    return response;
  }
  public async newPassword(body: TypeNewPasswordSchema, token: string | null) {
    const response = await api.post<IUser>(
      `/auth/password-recovery/new/${token}`,
      body
    );
    return response;
  }
}

export const passwordRecoveryService = new PasswordRecoveryService();
