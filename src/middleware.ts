// import { NextRequest, NextResponse } from "next/server";
// import { getProfile } from "./shared/server/getProfile";

// export default async function middleware(request: NextRequest) {
//   const url = request.nextUrl;

//   const isAuthPage = url.pathname.startsWith("/auth");
//   const isAdminPage = url.pathname.startsWith("/admin");
//   const isEmployeePage = url.pathname.startsWith("/log");
//   const isClientPage = url.pathname.startsWith("/dashboard");
//   const isBlockedPage = url.pathname.startsWith("/blocked");

//   // Отримуємо профіль користувача
//   const user = await getProfile();

//   // 🚨 Якщо користувач не авторизований і не на сторінці логіну
//   if (!user && !isAuthPage) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   // Якщо користувач намагається зайти на auth сторінку, коли вже авторизований
//   if (user && isAuthPage) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Якщо користувач заблокований — редірект на /blocked
//   if (user?.is_blocked && !isBlockedPage) {
//     return NextResponse.redirect(new URL("/blocked", request.url));
//   }

//   // Якщо користувач не заблокований, але намагається зайти на /blocked
//   if (user && !user.is_blocked && isBlockedPage) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // Якщо користувач не має прав на /admin або /log
//   if (user && !user.is_ict_admin && isAdminPage) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }
//   // Якщо користувач не має прав на /admin або /log
//   if (user && user.is_ict && isClientPage) {
//     return NextResponse.redirect(new URL("/log", request.url));
//   }

//   // Все добре — продовжуємо запит
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/auth/:path*",
//     "/dashboard/:path*",
//     "/admin/:path*",
//     "/log/:path*",
//     "/blocked",
//   ],
// };

// import { NextRequest, NextResponse } from "next/server";
// import { getProfile } from "./shared/server/getProfile";

// export default async function middleware(request: NextRequest) {
//   const url = request.nextUrl;
//   const path = url.pathname;

//   const isAuthPage = path.startsWith("/auth");
//   const isAdminPage = path.startsWith("/admin");
//   const isEmployeePage = path.startsWith("/log");
//   const isClientPage = path.startsWith("/dashboard");
//   const isBlockedPage = path.startsWith("/blocked");

//   const user = await getProfile();

//   // --- 1. Неавторизований користувач ---
//   if (!user && !isAuthPage) {
//     return NextResponse.redirect(new URL("/auth/login", request.url));
//   }

//   // --- 2. Авторизований, але намагається відкрити /auth ---
//   if (user && isAuthPage) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // --- 3. Заблокований користувач ---
//   if (user?.is_blocked && !isBlockedPage) {
//     return NextResponse.redirect(new URL("/blocked", request.url));
//   }

//   if (user && !user.is_blocked && isBlockedPage) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // --- 4. Правила доступу за ролями ---
//   if (user) {
//     // 👑 Адмін — має доступ до всього
//     if (user.is_ict_admin) {
//       return NextResponse.next();
//     }

//     // 👷‍♂️ Працівник ICT — тільки /log
//     if (user.is_ict) {
//       if (!isEmployeePage) {
//         return NextResponse.redirect(new URL("/log", request.url));
//       }
//       return NextResponse.next();
//     }

//     // 👤 Клієнт — тільки /dashboard
//     if (!user.is_ict && !user.is_ict_admin) {
//       if (!isClientPage) {
//         return NextResponse.redirect(new URL("/dashboard", request.url));
//       }
//       return NextResponse.next();
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/auth/:path*",
//     "/dashboard/:path*",
//     "/admin/:path*",
//     "/log/:path*",
//     "/blocked",
//   ],
// };
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  // const url = req.nextUrl;
  // const path = url.pathname;
  // const isAuthPage = path.startsWith("/auth");

  // const token = req.cookies.get("centrifuge")?.value;

  // console.log(token,'TOKEN');

  // if (!token && !isAuthPage) {
  //   return NextResponse.redirect(new URL("/auth/login", req.url));
  // }

  // if (token && isAuthPage) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }
// console.log(1);

  return NextResponse.next();
}
