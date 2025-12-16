"use client";
import { type PropsWithChildren } from "react";
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";

import { AuthCheckProvider } from "./AuthCheckProvider";
import ClientOnlyProvider from "./ClientOnlyProvider";

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
          <ClientOnlyProvider>{children}</ClientOnlyProvider>
        </AuthCheckProvider>
        <ToastProvider />
      </ThemeProvider>
    </TanstackQueryProvider>
  );
}
