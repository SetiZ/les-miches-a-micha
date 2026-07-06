import ContainerBox from '@/components/react/ContainerBox';
import SocialButton from '@/components/react/SocialButton';
import Footer from '@/components/react/Footer';
import Header from '@/components/react/Header';
import trusted from '@/data/trusted.json';
import {
  Box,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import {
  CgBrowse,
  CgInstagram,
  CgPin,
  CgSmileMouthOpen,
  CgSoftwareDownload,
} from 'react-icons/cg';

interface HomePageProps {
  title: string;
  tagline?: string;
  introHtml?: string;
}

export default function HomePage({ title, tagline, introHtml }: HomePageProps) {
  return (
    <ChakraProvider>
      <SpeedInsights />
      <Analytics />
      <Header />
      <Flex
        as={'main'}
        m={0}
        p={0}
        paddingTop={20}
        paddingBottom={2}
        paddingInline={4}
        minH={'calc(calc(100vh - calc(100vh - 100%)) - 56px)'}
        bgGradient="linear(yellow.800 0%, orange.100 25%, whiteAlpha.300 50%)"
        justifyContent={'center'}
      >
        <ContainerBox>
          <Flex as={'h1'} justify={'center'}>
            <img
              src={'/miches_blanc.png'}
              alt={''}
              width={260}
              height={260}
              loading="eager"
            />
          </Flex>
          <Heading as="h2" size="xl" textAlign={'center'}>
            {title}
          </Heading>
          <Text textAlign={'center'} fontSize="xl">
            {tagline?.split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {line}
              </span>
            ))}
          </Text>
          <VStack align={'center'} paddingTop={16} spacing={12}>
            <Container maxW="80vw" textAlign={'center'} fontSize="lg">
              <span dangerouslySetInnerHTML={{ __html: introHtml || '' }} />
            </Container>
            <Container maxW="80vw" textAlign={'center'}>
              <Heading as="h3" size="lg" textAlign={'center'}>
                Retrouvez notre carte
              </Heading>
              <VStack align={'center'} paddingTop={8}>
                <SocialButton
                  text={'Commander en ligne'}
                  link={'/carte'}
                  icon={<CgBrowse />}
                  options={{ in: true }}
                />
                <SocialButton
                  text={'Télécharger le menu'}
                  link={'les-miches-a-micha.pdf'}
                  icon={<CgSoftwareDownload />}
                  options={{ download: true }}
                />
                <SocialButton
                  text={'Vente de farines'}
                  link={'Carte_des_farines.pdf'}
                  icon={<CgSoftwareDownload />}
                  options={{ in: true }}
                />
                <SocialButton
                  text={'Les ateliers'}
                  link={'/ateliers'}
                  icon={<CgSmileMouthOpen />}
                  options={{ in: true }}
                />
                <SocialButton
                  text={'Télécharger la carte ateliers'}
                  link={'Ateliers_boulanj.pdf'}
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
                  {trusted.trusted.map((trust: { id: number; title?: string; url?: string; description?: string; order?: string }) => (
                    <WrapItem key={trust.id}>
                      <Box w="200px">
                        {trust.order === 'pre' ? (
                          <>
                            <a
                              href={trust.url}
                              target="_blank"
                              style={{ textDecoration: 'underline' }}>
                              {trust.title}
                            </a>
                            , {trust.description}
                          </>
                        ) : (
                          <>
                            {trust.description}{' '}
                            {trust.url && (
                              <a
                                href={trust.url}
                                target="_blank"
                                style={{ textDecoration: 'underline' }}>
                                {trust.title}
                              </a>
                            )}
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
                Plus d&rsquo;informations ou pour passer commande
              </Heading>
              <Stack
                direction={['column', 'row']}
                paddingTop={4}
                justify={'center'}>
                <a href={'tel:+33652394879'}>06.52.39.48.79</a>
                <a href={'mailto:lesmichesamicha@gmail.com'}>
                  lesmichesamicha@gmail.com
                </a>
              </Stack>
              <VStack align={'center'} paddingTop={8}>
                <SocialButton
                  text={"S'abonner à Instagram"}
                  link={'https://www.instagram.com/lesmichesamicha/'}
                  icon={<CgInstagram />}
                />
                <SocialButton
                  text={'Laisser un avis sur Google Maps'}
                  link={'https://g.page/r/CQP-U6UnJ-McEB0/review'}
                  icon={<CgPin />}
                />
              </VStack>
            </Container>
          </VStack>
        </ContainerBox>
      </Flex>
      <Footer />
    </ChakraProvider>
  );
}
