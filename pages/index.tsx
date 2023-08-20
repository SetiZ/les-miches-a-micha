import { Box, Heading, Icon, Text, VStack } from '@chakra-ui/react'
import Layout from '../components/layout'
import { Link } from "@chakra-ui/next-js"
import { CgInstagram, CgMail, CgSmartphone, CgSoftwareDownload } from "react-icons/cg"

export default function Home() {
  return (
    <Layout>
      <Box backgroundColor="rgba(255, 255, 255, 0.5)"
        backdropFilter="saturate(180%) blur(3px)"
        p={'4'}>
        <Heading as={'h2'}>Les Miches à Micha</Heading>
        <Text fontSize='2xl'>Micro-fournil artisanal</Text>
        <Text>N’allez plus à la boulangerie – c’est elle qui vient à vous !</Text>
        <Text>
          Livraison à domicile, commande personnalisée, conseils de dégustation, créativité. . .
          Ici, tout est fait main, à partir de matières premières bio, locales et nobles, pour vous proposer des pains savoureux, sains et originaux.
        </Text>
        <VStack align={'center'} paddingTop={16}>
          <Link href={'les-miches-a-micha.pdf'} download='download' target='_blank'>
            <Icon as={CgSoftwareDownload} /> Télécharger le menu
          </Link>
          <Link href={'mailto:lesmichesamicha@gmail.com'}>
            <Icon as={CgMail} /> Contacter par email
          </Link>
          <Link href={'tel:0663354314'}>
            <Icon as={CgSmartphone} /> Contacter par téléphone
          </Link>
          <Link href={'https://www.instagram.com/lesmichesamicha/'} target='_blank'>
            <Icon as={CgInstagram} /> {'S\'abonner à l\'instagram'}
          </Link>
          <Link href={'https://g.page/r/CQP-U6UnJ-McEAI/review/'} target='_blank'>
            <Icon as={CgInstagram} /> {'Laisser un avis sur google maps (ou chercher "Les Miches à Micha" sur google}
          </Link>         
        </VStack>
      </Box>
    </Layout>
  )
}
