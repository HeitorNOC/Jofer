import { Navbar } from '@/components/navbar'
import { ReactNode } from 'react'
import { Footer } from '@/components/footer'

interface LayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Navbar />

      <div className="flex flex-1 flex-col gap-4 pt-6">
        {children}
      </div>
      <Footer />
    </div>
  )
}
