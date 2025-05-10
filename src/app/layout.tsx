import { ClientLayout } from '@/_layouts/client-layout'
import { ClientThemeProvider } from '@/components/theme/client-theme-provider'
import { Inter as FontSans } from 'next/font/google'
import './index.css'

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <title>Jofer</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              const theme = localStorage.getItem('jofer-theme');
              const classList = document.documentElement.classList;
              if (theme === 'dark') {
                classList.add('dark');
              } else {
                classList.remove('dark');
              }
            })();`,
          }}
        />
      </head>
      <body className={`font-sans antialiased ${fontSans.variable}`}>
        <ClientThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ClientThemeProvider>
      </body>
    </html>
  )
}
