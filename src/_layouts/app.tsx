import { Header } from '../components/header'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function AppLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <Header />

      <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
        {children}
      </div>
    </div>
  )
}
