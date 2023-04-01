import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { LayoutContainer } from '@/components/LayoutContainer';
// import { Provider } from "react-redux";
// import store from "@/store2";
import { SessionProvider } from 'next-auth/react'

import '@/styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* <Provider store={store}> */}
        <Head><title>TRACTIAN | Painel de Gerência</title></Head>
        <Header/>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <LayoutContainer contentPage={<Component {...pageProps} />}/>
        </div>
      {/* </Provider> */}
    </SessionProvider>
  )
}