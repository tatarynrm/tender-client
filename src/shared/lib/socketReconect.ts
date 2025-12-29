import { useProfile } from "../hooks";
import { getSocket } from "./socket";

const namespaces = ["tender", "user", "chat", "load"] as const;

export function reconnectSocketsWithProfile() {
  const { profile } = useProfile();

  namespaces.forEach((ns) => {
    const socket = getSocket(ns);

    socket.auth = { userId: profile?.id };
    socket.disconnect();
    socket.connect();
  });
}
