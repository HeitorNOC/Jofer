"use client"

import { useState } from 'react'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { AppLayout } from '@/_layouts/app'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
      <QueryClientProvider client={queryClient}>
        <SessionProvider refetchOnWindowFocus={false}>
          <AppLayout>{children}</AppLayout>
          <Toaster richColors />
        </SessionProvider>
      </QueryClientProvider>
  )
}
