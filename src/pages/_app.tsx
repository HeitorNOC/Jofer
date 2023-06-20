import Layout from '@/components/layout'
import type { AppProps } from 'next/app'
import { globalStyles } from './styles/global'
import { SessionProvider } from 'next-auth/react';
import { Lora } from '@next/font/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

const lora = Lora({
  subsets: ['latin', 'latin-ext']
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  globalStyles()
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>

        <div className={`${lora.className}`}>

          <div id='container'>

            <Layout>
              <Component {...pageProps} />
              <ReactQueryDevtools />
            </Layout>
          </div>
        </div>
      </SessionProvider>
    </QueryClientProvider>
  )
}
