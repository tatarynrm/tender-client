"use client";
import { type PropsWithChildren } from "react";
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";

import { AuthCheckProvider } from "./AuthCheckProvider";
import ClientOnlyProvider from "./ClientOnlyProvider";
import { SocketProvider } from "./SocketProvider";
import { AuthCheck } from "./AuthCheck";

export function MainProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <TanstackQueryProvider>
      <ThemeProvider
        attribute={"class"}
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
        storageKey="ictender-theme"
      >
        <AuthCheckProvider>
          <AuthCheck/>
          <SocketProvider>
            <ClientOnlyProvider>{children}</ClientOnlyProvider>
          </SocketProvider>
        </AuthCheckProvider>
        <ToastProvider />
      </ThemeProvider>
    </TanstackQueryProvider>
  );
}
