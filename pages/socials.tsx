import { Heading, Text, VStack, Flex } from '@chakra-ui/react'
import { CgInstagram, CgMail, CgSmartphone, CgSoftwareDownload, CgPin } from "react-icons/cg"
import Layout from '@/components/layout'
import SocialButton from '@/components/socialButton'
import ContainerBox from '@/components/containerBox'
import { Image } from '@chakra-ui/next-js'

export default function Home() {
  return (
    <Layout>
      <ContainerBox>
        {/* <Heading as={'h1'} textAlign={'center'}>Les Miches à Micha</Heading> */}
        <Flex as={'h1'} justify={'center'}>
          <Image src={'/miches_blanc.png'} alt={''} width={260} height={260} />
        </Flex>
        <Text fontSize='2xl' textAlign={'center'}>Micro-fournil artisanal</Text>
        <Text textAlign={'center'}>N’allez plus à la boulangerie<br />c’est elle qui vient à vous !</Text>
        <VStack align={'center'} paddingTop={16}>
          <SocialButton
            text={'.:*~*:._.:*~*:._.:*~*:. !! CARTE DES FÊTES 2023 !! .:*~*:._.:*~*:._.:*~*:.'}
            link={'carte_fetes_2023.pdf'}
            icon={<CgSoftwareDownload />}
            options={{download: true}} />
          <SocialButton
            text={'Télécharger le menu'}
            link={'les-miches-a-micha.pdf'}
            icon={<CgSoftwareDownload />}
            options={{download: true}} />
          <SocialButton
            text={'Contacter par email'}
            link={'mailto:lesmichesamicha@gmail.com'}
            icon={<CgMail />} />
          <SocialButton
            text={'Contacter par téléphone'}
            link={'tel:0663354314'}
            icon={<CgSmartphone />} />
          <SocialButton
            text={'S\'abonner à l\'instagram'}
            link={'https://www.instagram.com/lesmichesamicha/'}
            icon={<CgInstagram />} />
          <SocialButton
            text={'Laisser un avis sur google maps'}
            link={'https://g.page/r/CQP-U6UnJ-McEB0/review'}
            icon={<CgPin />} />
        </VStack>
      </ContainerBox>
    </Layout>
  )
}
