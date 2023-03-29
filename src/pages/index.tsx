import Head from 'next/head';
import { LayoutContainer } from '@/components/LayoutContainer/index';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <>
    <Head><title>TRACTIAN | Painel de Gerência</title></Head>
    <Header/>
    <LayoutContainer/>
    </>
  )
}
