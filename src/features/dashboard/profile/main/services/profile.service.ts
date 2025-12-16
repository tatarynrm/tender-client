import { IUser } from "@/features/auth/types";
import api from "@/shared/api/instance.api";
import { TypeProfileSchema } from "../schemes";
import { IUserProfile } from "@/shared/types/user.types";

class ProfileService {
  public async findProfile() {
    const { data } = await api.get<IUserProfile>("/users/profile");

    return data;
  }
  public async updateProfile(body: TypeProfileSchema) {
    const { data } = await api.patch<IUser>("/users/profile", body);

    return data;
  }
}

export const profileService = new ProfileService();
