import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Header } from '@/components/Header';
import { LayoutContainer } from '@/components/LayoutContainer';
import '@/styles/global.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head><title>TRACTIAN | Painel de Gerência</title></Head>
      <Header/>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <LayoutContainer contentPage={<Component {...pageProps} />}/>
      </div>
    </>
  )
}