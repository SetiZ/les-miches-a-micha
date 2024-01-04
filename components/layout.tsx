import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import Header from './header';
import Footer from './footer';

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>Les Miches à Micha - Micro-fournil artisanal</title>
        <meta
          name="description"
          content="N’allez plus à la boulangerie – c’est elle qui vient à vous ! Livraison à domicile, commande personnalisée, conseils de dégustation, créativité. . . Ici, tout est fait main, à partir de matières premières bio, locales et nobles, pour vous proposer des pains savoureux, sains et originaux."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Flex
        as={'main'}
        m={0}
        p={0}
        paddingTop={20}
        // paddingBottom={16}
        paddingBottom={2}
        paddingInline={4}
        minH={'calc(100vh - calc(100vh - 100%))'}
        // h={'100vh'}
        // maxW={'1440'}
        bgImage='url("bread-bg.jpeg")'
        bgAttachment={'fixed'}
        bgPos={'center'}
        bgRepeat={'no-repeat'}
        bgSize={'cover'}
        justifyContent={'center'}>
        {children}
      </Flex>
      <Footer />
    </>
  );
}
