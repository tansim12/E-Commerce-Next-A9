"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "@/src/Context/user.context";

export interface ProvidersProps {
  children: React.ReactNode;
  //   themeProps?: ThemeProviderProps;
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();
  const queryClient = new QueryClient();
  return (
    <NextUIProvider navigate={router.push}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>{children}</UserContextProvider>
      </QueryClientProvider>
      <Toaster />
    </NextUIProvider>
  );
}
