"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "sonner"
import { useState } from "react"

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <ThemeProvider storageKey="jofer-theme" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {children}
          <Toaster richColors />
        </SessionProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
