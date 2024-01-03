import ContainerBox from '@/components/containerBox';
import Layout from '@/components/layout';
import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Image, Link } from '@chakra-ui/next-js';
import { CgSoftwareDownload } from 'react-icons/cg';
import SocialButton, { Events } from '@/components/socialButton';
import trusted from '@/data/trusted.json';

export default function Home() {
  // if (typeof window !== 'undefined') {
  // 	window.location.replace('/socials');
  // }

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
        <VStack align={'center'} paddingTop={16} spacing={12}>
          <Container maxW="80vw" textAlign={'center'} fontSize="lg">
            Livraison à domicile, commande personnalisée, conseils de
            dégustation, créativité. . . Ici, tout est fait main, à partir de
            matières premières bio, locales et nobles, pour vous proposer des
            pains savoureux, sains et originaux.
          </Container>
          <Container maxW="80vw" textAlign={'center'}>
            <Heading as="h3" size="lg" textAlign={'center'}>
              Retrouvez notre carte
            </Heading>
            <VStack align={'center'} paddingTop={16}>
              <SocialButton
                text={'.: !! CARTE DES FÊTES 2023 !! :.'}
                link={'carte_fetes_2023.pdf'}
                event={Events.Christmas}
                options={{ download: true }}
              />
              <SocialButton
                text={'Télécharger le menu'}
                link={'les-miches-a-micha.pdf'}
                icon={<CgSoftwareDownload />}
                options={{ download: true }}
              />
            </VStack>
          </Container>
          <Container maxW="80vw" textAlign={'center'}>
            <Heading as="h3" size="lg" textAlign={'center'}>
              Ils nous font confiance
            </Heading>
            {trusted && (
              <Wrap spacing="30px" paddingTop={8} justify={'center'}>
                {trusted.trusted.map((trust: any, index: any) => (
                  <WrapItem key={index}>
                    <Box w="200px">
                      {trust.order === 'pre' ? (
                        <>
                          <Link href={trust.url} target="_blank">
                            {trust.title}
                          </Link>
                          , {trust.description}
                        </>
                      ) : (
                        <>
                          {trust.description}{' '}
                          <Link href={trust.url} target="_blank">
                            {trust.title}
                          </Link>
                        </>
                      )}
                    </Box>
                  </WrapItem>
                ))}
              </Wrap>
            )}
          </Container>
          <Container maxW="80vw" textAlign={'center'}>
            <Heading as="h3" size="md" textAlign={'center'}>
              Plus d’informations ou pour passer commande
            </Heading>
            <Stack
              direction={['column', 'row']}
              paddingTop={4}
              justify={'center'}>
              <Link href={'tel:0663354314'}>06.63.35.43.14</Link>
              <Link href={'mailto:lesmichesamicha@gmail.com'}>
                lesmichesamicha@gmail.com
              </Link>
            </Stack>
          </Container>
        </VStack>
      </ContainerBox>
    </Layout>
  );
}
