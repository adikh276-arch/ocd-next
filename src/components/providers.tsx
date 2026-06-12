"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth";
import "@/lib/i18n";
import { LanguageSyncProvider } from "@/components/LanguageSyncProvider";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
          <TooltipProvider>
            <LanguageSyncProvider>
              {children}
            </LanguageSyncProvider>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
