import { Box, Heading, Text } from '@chakra-ui/react'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <Box
        h={'100vh'}
        // w={'full'}
        bgImage={'url("bread-bg.jpeg")'}
        bgAttachment={'fixed'}
        bgPos={'center'}
        bgRepeat={'no-repeat'}
        bgSize={'cover'}
        paddingTop={'20'}
        paddingInline={'4'}
      >
        <Heading as={'h2'}>Les Miches à Micha</Heading>
        <Text fontSize='2xl'>Micro-fournil artisanal</Text>
        <Text>N’allez plus à la boulangerie – c’est elle qui vient à vous ! Livraison à domi- cile, commande personnalisée, conseils de dégustation, créativité. . . Ici, tout est fait main, à partir de matières premières bio, locales et nobles, pour vous proposer des pains savoureux, sains et originaux.</Text>
      </Box>
    </Layout>
  )
}
