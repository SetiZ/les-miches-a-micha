import ContainerBox from '@/components/containerBox';
import Layout from '@/components/layout';
import SocialButton, { Events } from '@/components/socialButton';
import { Image } from '@chakra-ui/next-js';
import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import {
  CgInstagram,
  CgMail,
  CgPin,
  CgSmartphone,
  CgSoftwareDownload,
} from 'react-icons/cg';

export default function Home() {
  return (
    <Layout>
      <ContainerBox>
        {/* <Heading as={'h1'} textAlign={'center'}>Les Miches à Micha</Heading> */}
        <Flex as={'h1'} justify={'center'}>
          <Image
            src={'/miches_blanc.png'}
            alt={''}
            width={260}
            height={260}
            loading="eager"
          />
        </Flex>
        <Heading as="h2" size="xl" textAlign={'center'}>
          Micro-fournil artisanal
        </Heading>
        <Text textAlign={'center'} fontSize="xl">
          N’allez plus à la boulangerie
          <br />
          c’est elle qui vient à vous !
        </Text>
        <VStack align={'center'} paddingTop={16}>
          <SocialButton
            text={'Pour commander en ligne'}
            link={'/carte'}
          />
          <SocialButton
            text={'Télécharger le menu'}
            link={'les-miches-a-micha.pdf'}
            icon={<CgSoftwareDownload />}
            options={{ download: true }}
          />
          <SocialButton
            text={'Contacter par email'}
            link={'mailto:lesmichesamicha@gmail.com'}
            icon={<CgMail />}
          />
          <SocialButton
            text={'Contacter par téléphone'}
            link={'tel:0663354314'}
            icon={<CgSmartphone />}
          />
          <SocialButton
            text={"S'abonner à l'instagram"}
            link={'https://www.instagram.com/lesmichesamicha/'}
            icon={<CgInstagram />}
          />
          <SocialButton
            text={'Laisser un avis sur google maps'}
            link={'https://g.page/r/CQP-U6UnJ-McEB0/review'}
            icon={<CgPin />}
          />
        </VStack>
      </ContainerBox>
    </Layout>
  );
}
