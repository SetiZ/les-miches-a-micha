import Head from 'next/head'
import { Container } from '@chakra-ui/react'
import Header from './header'
import Footer from './footer'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Les Miches à Micha | Micro-fournil artisanal</title>
        <meta name="description" content="N’allez plus à la boulangerie – c’est elle qui vient à vous ! Livraison à domi- cile, commande personnalisée, conseils de dégustation, créativité. . . Ici, tout est fait main, à partir de matières premières bio, locales et nobles, pour vous proposer des pains savoureux, sains et originaux." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <main>{children}</main> */}
      <Container as={'main'}m={0} p={0} maxW={'1440'} minH={'100vh'}>{children}</Container>
      <Footer />
    </>
  )
}