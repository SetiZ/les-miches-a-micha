import ContainerBox from '@/components/react/ContainerBox';
import SocialButton from '@/components/react/SocialButton';
import Footer from '@/components/react/Footer';
import Header from '@/components/react/Header';
import ateliers from '@/data/ateliers.json';
import {
  Box,
  ChakraProvider,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { CgMail, CgPhone, CgSmileMouthOpen } from 'react-icons/cg';

interface Workshop {
  title: string;
  description: string;
}

interface Format {
  title: string;
  description: string;
  price: string;
}

export default function AteliersPage() {
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
          <Flex justify={'center'} direction={'column'} align={'center'}>
            <img
              src={'/miches_blanc.png'}
              alt={''}
              width={260}
              height={260}
              loading="eager"
            />
            <Heading as="h1" size="xl" textAlign={'center'}>
              {ateliers.heroTitle}
            </Heading>
          </Flex>
          <VStack align={'center'} paddingTop={16} spacing={12}>
            <Heading as="h2" size="lg" textAlign={'center'}>
              {ateliers.heroSubtitle}
            </Heading>
            <Container maxW="80vw" textAlign={'center'} fontSize="lg">
              {ateliers.intro}
            </Container>
            <Container maxW="80vw" fontSize="lg">
              <Heading as="h3" size="lg" textAlign={'center'}>
                Des idées d'ateliers :
              </Heading>
              <Box mt={10}>
                <Stack
                  spacing={{ base: 10, md: 0 }}
                  display={{ md: 'grid' }}
                  gridTemplateColumns={{ md: 'repeat(2,1fr)' }}
                  gridColumnGap={{ md: 8 }}
                  gridRowGap={{ md: 10 }}
                >
                  {ateliers.workshops.map((workshop: Workshop) => (
                    <Box key={workshop.title}>
                      <Text fontWeight="bold" fontSize="lg">
                        {workshop.title}
                      </Text>
                      <Text mt={2}>{workshop.description}</Text>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Container>
            <Container maxW="80vw" textAlign={'center'}>
              <Heading as="h3" size="lg" textAlign={'center'}>
                <b>Tarifs :</b>
              </Heading>
              <VStack align={'center'} paddingTop={8} spacing={8}>
                {ateliers.formats.map((format: Format) => (
                  <Box key={format.title}>
                    <Text fontWeight="bold">{format.title}</Text>
                    <Text mt={2}>{format.description}</Text>
                    <Text mt={2} fontStyle="italic">
                      {format.price}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Container>
            <Container maxW="80vw" textAlign={'center'}>
              <Heading as="h3" size="lg" textAlign={'center'}>
                <b>{ateliers.ctaText}</b>
              </Heading>
              <VStack align={'center'} paddingTop={8}>
                <SocialButton
                  text={`appelez au ${ateliers.contactPhone}`}
                  link={`tel:${ateliers.contactPhone.replace(/[^0-9]/g, '')}`}
                  icon={<CgPhone />}
                />
                <SocialButton
                  text={`écrivez-nous à ${ateliers.contactEmail}`}
                  link={`mailto:${ateliers.contactEmail}`}
                  icon={<CgMail />}
                />
                <SocialButton
                  text={'Téléchargez notre carte ateliers'}
                  link={ateliers.pdfUrl}
                  icon={<CgSmileMouthOpen />}
                  options={{ download: true }}
                />
              </VStack>
            </Container>
            <Container maxW="80vw" textAlign={'center'} fontSize="lg">
              {ateliers.outro}
            </Container>
          </VStack>
        </ContainerBox>
      </Flex>
      <Footer />
    </ChakraProvider>
  );
}
