import { Box, Heading, Icon, Text, VStack, Button } from '@chakra-ui/react'
import Layout from '../components/layout'
import { CgInstagram, CgMail, CgSmartphone, CgSoftwareDownload, CgPin } from "react-icons/cg"

export default function Home() {
  return (
    <Layout>
      <Box
        // backgroundColor="rgba(255, 255, 255, 0.5)"
        backdropFilter="saturate(180%) blur(3px)"
        bgGradient='linear(to-b, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7), yellow.100)'
        p={'4'}
        maxW={'1440'}
        width={'full'}>
        <Heading as={'h1'} textAlign={'center'}>Les Miches à Micha</Heading>
        <Text fontSize='2xl' textAlign={'center'}>Micro-fournil artisanal</Text>
        <Text textAlign={'center'}>N’allez plus à la boulangerie<br />c’est elle qui vient à vous !</Text>
        {/* <Text>
          Livraison à domicile, commande personnalisée, conseils de dégustation, créativité. . .
          Ici, tout est fait main, à partir de matières premières bio, locales et nobles, pour vous proposer des pains savoureux, sains et originaux.
        </Text> */}
        <VStack align={'center'} paddingTop={16}>
          <Button
            as={'a'}
            maxW={'sm'}
            width={'full'}
            variant='outline'
            colorScheme='black'
            leftIcon={<CgSoftwareDownload />}
            href={'les-miches-a-micha.pdf'}
            download='download'
            target='_blank'>
            Télécharger le menu
          </Button>
          <Button
            as={'a'}
            maxW={'sm'}
            width={'full'}
            variant='outline'
            colorScheme='black'
            leftIcon={<CgMail />}
            href={'mailto:lesmichesamicha@gmail.com'}
            target='_blank'>
            Contacter par email
          </Button>
          <Button
            as={'a'}
            maxW={'sm'}
            width={'full'}
            variant='outline'
            colorScheme='black'
            leftIcon={<CgSmartphone />}
            href={'tel:0663354314'}
            target='_blank'>
            Contacter par téléphone
          </Button>
          <Button
            as={'a'}
            maxW={'sm'}
            width={'full'}
            variant='outline'
            colorScheme='black'
            leftIcon={<CgInstagram />}
            href={'https://www.instagram.com/lesmichesamicha/'}
            target='_blank'>
            {'S\'abonner à l\'instagram'}
          </Button>
          <Button
            as={'a'}
            maxW={'sm'}
            width={'full'}
            variant='outline'
            colorScheme='black'
            leftIcon={<CgPin />}
            href={'https://g.page/r/CQP-U6UnJ-McEAI/review/'}
            target='_blank'>
            {'Laisser un avis sur google maps'}
          </Button>
        </VStack>
      </Box>
    </Layout>
  )
}
