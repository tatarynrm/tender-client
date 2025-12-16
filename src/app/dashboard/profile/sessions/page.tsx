// app/dashboard/sessions/page.tsx
// import { cookies } from 'next/headers';
// async function deleteSession(id: string) {
//   "use server"; // ✅ Next.js server action

//   const cookieStore = await cookies();
//   await fetch(`${process.env.SERVER_URL}/auth/sessions/${id}`, {
//     method: 'DELETE',
//     credentials: 'include',
//     headers: {
//       Cookie: cookieStore.toString(),
//     },
//   });
// }
"use client";

import { useDeleteSession } from "@/features/dashboard/profile/sessions/hooks/useDeleteSession";
import { useGetSessions } from "@/features/dashboard/profile/sessions/hooks/useGetSessions";

export default function SessionsPage() {
  // const cookieStore =await  cookies();
  // const res = await fetch(`${process.env.SERVER_URL}/auth/sessions`, {
  //   method: 'GET',
  //   credentials: 'include',
  //   headers: {
  //     Cookie: cookieStore.toString(),
  //   },
  //   cache: 'no-store',
  // });

  // if (!res.ok) {
  //   throw new Error('Не вдалося отримати сесії');
  // }

  // const { current, others } = await res.json();

  const { sessions, isLoadingSessions } = useGetSessions();
  const { deleteSession, isDeleting } = useDeleteSession();

  if (!sessions) {
    return <div>Не вдалось завантажити сесії</div>;
  }

  console.log(sessions, "SESSIONS");

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-black">
      <h1 className="text-3xl font-bold mb-6">Мої сесії</h1>

      {sessions.current && (
        <>
          <h2>Поточна сесія</h2>
          <ul>
            <li key={sessions.current.id}>
              {sessions.current.browser} — {sessions.current.os} —{" "}
              {sessions.current.ip} ({sessions.current.createdAt})
            </li>
          </ul>
        </>
      )}

      {sessions.others?.length > 0 && (
        <>
          <h2>Інші сесії</h2>
          <ul>
            {sessions.others.map((s: any) => (
              <li key={s.id}>
                {s.browser} — {s.os} — {s.ip} ({s.createdAt})
                <button
                  onClick={() => deleteSession(s.id)}
                  style={{ marginLeft: "8px" }}
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
