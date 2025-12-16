// shared/server/fetchServer.ts
import { cookies } from "next/headers";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface FetchOptions extends RequestInit {
  body?: any;
}

const SERVER_URL = process.env.SERVER_URL;
if (!SERVER_URL) throw new Error("SERVER_URL not defined in env");

export const fetchServer = {
  request: async <T = any>(
    path: string,
    method: HttpMethod = "GET",
    options: FetchOptions = {}
  ): Promise<T> => {
    const cookieStore = cookies();
    const allCookies = (await cookieStore).getAll();
    const cookieHeader = allCookies.map(c => `${c.name}=${c.value}`).join("; ");

    const headers = new Headers(options.headers || {});
    if (cookieHeader) headers.set("Cookie", cookieHeader);

    let body = options.body;
    if (body && typeof body === "object") {
      body = JSON.stringify(body);
      if (!headers.has("Content-Type")) headers.set("Content-Type", "application/json");
    }

    const res = await fetch(`${SERVER_URL}${path}`, {
      ...options,
      method,
      headers,
      body,
      cache: "no-store",
    });

    const contentType = res.headers.get("content-type");
    if (contentType?.includes("application/json")) return (await res.json()) as T;
    return (await res.text()) as unknown as T;
  },

  get: async <T = any>(path: string, options?: FetchOptions) => {
    return fetchServer.request<T>(path, "GET", options);
  },
  post: async <T = any>(path: string, body?: any, options?: FetchOptions) => {
    return fetchServer.request<T>(path, "POST", { ...options, body });
  },
  put: async <T = any>(path: string, body?: any, options?: FetchOptions) => {
    return fetchServer.request<T>(path, "PUT", { ...options, body });
  },
  delete: async <T = any>(path: string, options?: FetchOptions) => {
    return fetchServer.request<T>(path, "DELETE", options);
  },
  patch: async <T = any>(path: string, body?: any, options?: FetchOptions) => {
    return fetchServer.request<T>(path, "PATCH", { ...options, body });
  },
};
