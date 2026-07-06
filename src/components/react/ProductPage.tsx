import ContainerBox from '@/components/react/ContainerBox';
import Footer from '@/components/react/Footer';
import Header from '@/components/react/Header';
import carte from '@/data/carte.json';
import { useCartStore } from '@/utils/store';
import { AddIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  ChakraProvider,
  Divider,
  Flex,
  HStack,
  Heading,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

interface ProductPageProps {
  id: number;
}

export default function ProductDetailPage({ id }: ProductPageProps) {
  const product = carte.products.find(
    (product) => product.id === id,
  );

  const fallbackSrc = '0000_miches.png';
  const { add: handleAddToCart } = useCartStore();

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
          <Box pb={4}>
            <a href={'/carte'} style={{ color: '#1a202c', textDecoration: 'underline' }}>
              Revenir à la Carte
            </a>
          </Box>
          {!product ? (
            <>Ya rien</>
          ) : (
            <Stack
              direction={{ base: 'column', lg: 'row' }}
              spacing={{ base: 8, lg: 16 }}
              align={{ base: 'center', lg: 'start' }}>
              <Box
                rounded="xl"
                overflow="hidden"
                flex="1"
                maxW={{ base: 'full', lg: '500px' }}
                boxShadow="2xl">
                <img
                  loading="lazy"
                  src={
                    product?.images && product.images.length > 0
                      ? `/images/${product.images}`
                      : `/images/${fallbackSrc}`
                  }
                  alt={product?.title ? product?.title : ''}
                  width={500}
                  height={500}
                  style={{ objectFit: 'cover', width: '500px', height: 'auto' }}
                />
              </Box>
              <VStack align="start" spacing={6} flex="1">
                <HStack spacing={4}>
                  <Badge
                    colorScheme="yellow"
                    px={3}
                    py={1}
                    rounded="full"
                    textTransform="capitalize"
                    fontSize="sm">
                    {product?.category}
                  </Badge>
                </HStack>
                <Heading as="h1" size="xl">
                  {product?.title}
                </Heading>
                <Stack
                  spacing={2}
                  width={'full'}
                  justify={'space-between'}
                  direction={{ base: 'column', lg: 'row' }}>
                  <HStack spacing={2} align="left">
                    <Text fontSize="3xl" fontWeight="bold">
                      {product?.prix.toFixed(2)}€
                    </Text>
                    {product.poids && (
                      <Text fontSize="3xl">
                        {product.poids} gr
                      </Text>
                    )}
                  </HStack>
                  <Spacer />
                  <Button
                    colorScheme="yellow"
                    leftIcon={<AddIcon />}
                    width={{ base: 'full', lg: 'fit-content' }}
                    onClick={() =>
                      handleAddToCart({
                        id: product.id,
                        name: product.title,
                        price: product.prix,
                      })
                    }>
                    Ajouter au panier
                  </Button>
                </Stack>
                <Divider />
                <VStack align="start" spacing={4}>
                  <Text fontSize="lg" lineHeight="tall">
                    {product?.description}
                  </Text>
                </VStack>
              </VStack>
            </Stack>
          )}
        </ContainerBox>
      </Flex>
      <Footer />
    </ChakraProvider>
  );
}
