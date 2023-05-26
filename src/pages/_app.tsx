import Layout from '@/components/layout'
import type { AppProps } from 'next/app'
import { globalStyles } from './styles/global'
import { SessionProvider } from 'next-auth/react';
import { Lora } from '@next/font/google';

const lora = Lora({
  subsets: ['latin', 'latin-ext']
})

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  globalStyles()
  return (
    <SessionProvider session={session}>
      <div className={`${lora.className}`}>

        <div id='container'>

          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </div>
    </SessionProvider>
  )
}
