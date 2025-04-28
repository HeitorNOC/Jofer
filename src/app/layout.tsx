import { Inter as FontSans } from 'next/font/google'
import { ClientLayout } from '@/_layouts/client-layout'
import './index.css'

import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <title>Jofer</title>
        <meta name="description" content="Jofer" />
        <link rel="icon" href="/vercel.svg" sizes="32x32" type="image/png" />
      </head>
      <body className={cn('font-sans antialiased', fontSans.variable)}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
