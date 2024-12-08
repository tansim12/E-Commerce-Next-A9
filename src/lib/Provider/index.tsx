"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "@/src/Context/user.context";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { AdditionalContextProvider } from "@/src/Context/aditional.context";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <AdditionalContextProvider>{children}</AdditionalContextProvider>
          </UserContextProvider>
        </QueryClientProvider>
        <Toaster />
      </NextThemesProvider>
    </NextUIProvider>
  );
}
