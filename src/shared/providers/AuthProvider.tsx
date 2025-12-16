// "use client";

// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import api from "../api/instance.api";

// export interface User {
//   id: number;
//   email: string;
//   name?: string;
//   role?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   accessToken: string | null;
//   refreshUser: () => Promise<void>;
//   logout: () => void;
//   setUser: (user: User | null) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   // 🔁 Отримати користувача при завантаженні (через refresh токен)
//   const refreshUser = async () => {
//     try {
//       setLoading(true);
//       const { data } = await api.get("/users/profile");

//       setUser(data);
//     } catch (err) {
//       setUser(null);
//       setAccessToken(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     refreshUser();
//   }, []);

//   const logout = async () => {
//     try {
//       await api.post("/auth/logout", {}, { withCredentials: true });
//     } finally {
//       setUser(null);
//       setAccessToken(null);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, loading, accessToken, refreshUser, logout, setUser }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuthContext() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
//   return ctx;
// }
