import { Box, Heading, Text } from '@chakra-ui/react'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <Box backgroundColor="rgba(255, 255, 255, 0.5)"
        backdropFilter="saturate(180%) blur(3px)"
        p={'4'}>
        <Heading as={'h2'}>Les Miches à Micha</Heading>
        <Text fontSize='2xl'>Micro-fournil artisanal</Text>
        <Text>N’allez plus à la boulangerie – c’est elle qui vient à vous ! Livraison à domicile, commande personnalisée, conseils de dégustation, créativité. . . Ici, tout est fait main, à partir de matières premières bio, locales et nobles, pour vous proposer des pains savoureux, sains et originaux.</Text>
      </Box>
    </Layout>
  )
}
