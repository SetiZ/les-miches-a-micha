import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import type * as React from 'react';
import Footer from './footer';
import Header from './header';

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
        <meta
          property="og:image"
          content="https://les-miches-a-micha.vercel.app/api/og"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Les Miches à Micha" />
        <meta property="og:title" content="Les Miches à Micha" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="N’allez plus à la boulangerie – c’est elle qui vient à vous ! Livraison à domicile, commande personnalisée, conseils de dégustation, créativité. . . Ici, tout est fait main, à partir de matières premières bio, locales et nobles, pour vous proposer des pains savoureux, sains et originaux."
        />
        <meta
          property="og:url"
          content="https://les-miches-a-micha.vercel.app"
        />
        <meta
          property="twitter:image"
          content="https://les-miches-a-micha.vercel.app/api/og"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="les-miches-a-micha.vercel.app"
        />
        <meta
          property="twitter:url"
          content="https://les-miches-a-micha.vercel.app/"
        />
        <meta name="twitter:title" content="Les Miches à Micha" />
        <meta
          property="twitter:title"
          content="https://les-miches-a-micha.vercel.app"
        />
        <meta
          property="twitter:description"
          content="N’allez plus à la boulangerie – c’est elle qui vient à vous ! Livraison à domicile, commande personnalisée, conseils de dégustation, créativité. . . Ici, tout est fait main, à partir de matières premières bio, locales et nobles, pour vous proposer des pains savoureux, sains et originaux."
        />
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
        minH={'calc(calc(100vh - calc(100vh - 100%)) - 56px)'}
        // h={'100vh'}
        // maxW={'1440'}
        // bgGradient='linear(yellow.100 0%, orange.100 25%, yellow.700 50%)'
        bgGradient="linear(yellow.800 0%, orange.100 25%, whiteAlpha.300 50%)"
        // removing background and adding gradient
        // bgImage='url("bread-bg.jpeg")'
        // bgAttachment={'fixed'}
        // bgPos={'center'}
        // bgRepeat={'no-repeat'}
        // bgSize={'cover'}
        justifyContent={'center'}
      >
        {children}
      </Flex>
      <Footer />
    </>
  );
}
