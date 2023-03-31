import Head from 'next/head'
import Header from '@/components/header'

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Les Miches à Micha</title>
        <meta name="description" content="Les miches à Micha" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        navbar
      </main>
    </>
  )
}
