// // // utils/getUser.ts
// // import { cookies } from "next/headers";

// // export async function getUser() {
// //   const sessionId = (await cookies()).get("centrifuge")?.value;
// //   console.log(sessionId, "SESSION ID 6 line in getUser server");

// //   if (!sessionId) return null;

// //   const res = await fetch(`${process.env.SERVER_URL!}/auth/me`, {
// //     headers: { Cookie: `centrifuge=${sessionId}` },
// //   });

// //   if (!res.ok) return null;

// //   return res.json();
// // }
// import { cookies } from "next/headers";

// export async function getUser() {
//   const cookieStore = cookies();
//   const sessionId = (await cookieStore).get("centrifuge")?.value;

//   console.log(sessionId, "SESSION ID in getUser");

//   if (!sessionId) return null;

//   try {
//     const res = await fetch(`${process.env.SERVER_URL}/auth/me`, {
//       headers: {
//         Cookie: `centrifuge=${sessionId}`,
//       },
//       cache: "no-store",
//     });

//     if (!res.ok) return null;

//     return await res.json();
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return null;
//   }
// }