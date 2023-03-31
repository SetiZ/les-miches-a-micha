import Head from 'next/head'
import Header from './header'
// import Footer from './footer'

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Les Miches à Micha</title>
        <meta name="description" content="Les miches à Micha" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}