import ContainerBox from "@/components/containerBox";
import Choc from "@/components/cours";
import Layout from "@/components/layout";
import { Container, Flex, Heading, VStack } from "@chakra-ui/react";
import Image from 'next/image';

export default function Ateliers() {
  return (
    <Layout>
      <ContainerBox>
        <Flex justify={'center'} direction={'column'} align={'center'}>
          <Image
            src={'/miches_blanc.png'}
            alt={''}
            width={260}
            height={260}
            loading="eager"
          />
          <Heading as="h1" size="xl" textAlign={'center'}>
            Les Ateliers
          </Heading>
        </Flex>
        <VStack align={'center'} paddingTop={16} spacing={12}>
          <Container maxW="80vw" textAlign={'center'} fontSize="lg">
            En plus de commander nos pains, nous vous proposons d’apprendre à les faire ! À chaque fois, le cours sera entièrement personnalisé, en fonction de vos envies et connaissances préalables. Nous pourrons plonger dans la chimie organique et la techno boulangère, voir plusieurs techniques, partager des conseils pour organiser au mieux sa journée, comprendre ce qui rend un pain sain et digeste... Nous pourrons également nous déplacer chez vous, pour que vous puissiez en toute simplicité répéter directement ce que vous avez appris lors de votre atelier !
          </Container>
          <Container maxW="80vw" textAlign={'center'} fontSize="lg">
            Les matières premières et le matériel sera mis à disposition, et vous re-partirez avec votre production. Sur demande, nous pouvons également pré- voir l’achat de matériel de professionnel (balance, corne, coupe-pâtes, lames, moules, etc.). Comme pour notre production, les matières premières sont bio ou issues de l’agriculture biologique, produites localement et de qualité re- connue.
          </Container>
          <Container maxW="80vw" fontSize="lg">
            <Choc />
          </Container>
        </VStack>
      </ContainerBox>
    </Layout>
  )
}
