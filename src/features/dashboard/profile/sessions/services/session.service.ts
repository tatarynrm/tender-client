import { IUser } from "@/features/auth/types";
import api from "@/shared/api/instance.api";
import { ISession } from "../types";

interface IGetSessionsPayload {
    current:ISession,
    others:ISession[]
}

class SessionSerivce {
  public async getSessions() {
    const { data } = await api.get<IGetSessionsPayload>("/auth/sessions");

    return data;
  }
  public async deleteSessionById(id:string) {
    const { data } = await api.delete(`/auth/sessions/${id}`);

    return data;
  }
}

export const sessionSerivce = new SessionSerivce();
