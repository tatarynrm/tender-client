// shared/server/getProfile.ts
import { cookies } from "next/headers";
import { IUserProfile } from "../types/user.types";

export async function getProfile(): Promise<IUserProfile | null> {
  // беремо cookie з запиту
  const cookieStore = cookies();
  const sessionId = (await cookieStore).get("centrifuge")?.value;

  if (!sessionId) return null;

  try {
    const res = await fetch(`${process.env.SERVER_URL}/auth/me`, {
      headers: {
        Cookie: `centrifuge=${sessionId}`, // передаємо cookie в NestJS
      },
      cache: "no-store", // завжди актуальні дані
      // cache: "force-cache", // ⚡ кешує результат на сервері
      // next: { revalidate: 10 }, // кеш на 60 секунд
    });

    if (!res.ok) return null;

    const user: IUserProfile = await res.json();

    return user;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}
