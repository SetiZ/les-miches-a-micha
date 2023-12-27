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
          <Image src={'/miches_blanc.png'} alt={''} width={260} height={260} />
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
          {/* <Container maxW="80vw" textAlign={'center'}>
						{!data && <p>Loading...</p>}
						{error && <p>Loading failed : {error}</p>}
						{data && (
							<SimpleGrid minChildWidth="120px" spacing="40px">
								{data.products.map((prod: any, index: any) => (
									<Box key={index} p="5" maxW="320px" borderWidth="1px">
										{prod.title}
										<AspectRatio maxW="260px" ratio={1}>
											<Image
												src={'/miches_blanc.png'}
												alt={''}
												width={260}
												height={260}
												borderRadius="md"
											/>
										</AspectRatio>
										{prod.prix}€ - {prod.poids}gr
									</Box>
								))}
							</SimpleGrid>
						)}
					</Container> */}
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
