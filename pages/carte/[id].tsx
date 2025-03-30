import ContainerBox from '@/components/containerBox';
import Layout from '@/components/layout';
import carte from '@/data/carte.json';
import { useCartStore } from '@/utils/store';
import { AddIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Heading,
  Spacer,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Carte() {
  const router = useRouter();
  const product = carte.products.find(
    (product) => product.id === Number(router.query.id),
  );

  const fallbackSrc = '0000_miches.png';
  const { add: handleAddToCart } = useCartStore();

  return (
    <Layout>
      <ContainerBox>
        <Box pb={4}>
          <Button colorScheme="black" variant="link" as={'a'} href={'/carte'}>
            Revenir à la Carte
          </Button>
        </Box>
        {!product ? (
          <> Ya rien </>
        ) : (
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            spacing={{ base: 8, lg: 16 }}
            align={{ base: 'center', lg: 'start' }}>
            {/* Image Section */}
            <Box
              rounded="xl"
              overflow="hidden"
              flex="1"
              maxW={{ base: 'full', lg: '500px' }}
              boxShadow="2xl">
              <Image
                loading="lazy"
                src={
                  product?.images && product.images.length > 0
                    ? `/images/${product.images}`
                    : `/images/${fallbackSrc}`
                }
                placeholder="blur"
                blurDataURL={`/images/${fallbackSrc}`}
                alt={product?.title ? product?.title : ''}
                width={500}
                height={500}
                // objectFit="cover"
                style={{ objectFit: 'cover', width: '500px', height: 'auto' }}
              />
            </Box>

            {/* Content Section */}
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
                {/* {product?.visible && (
                <Badge colorScheme="blue" px={3} py={1} rounded="full">
                  En stock
                </Badge>
              )} */}
              </HStack>

              <Heading
                as="h1"
                size="xl"
                // color={useColorModeValue('gray.900', 'white')}
              >
                {product?.title}
              </Heading>
              <Stack
                spacing={2}
                width={'full'}
                justify={'space-between'}
                direction={{ base: 'column', lg: 'row' }}>
                <HStack spacing={2} align="left">
                  {/* <Euro size={24} /> */}
                  <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    // color={useColorModeValue('blue.600', 'blue.300')}
                  >
                    {product?.prix.toFixed(2)}€
                  </Text>
                  {product.poids && (
                    <Text
                      fontSize="3xl"
                      // color={useColorModeValue('gray.600', 'gray.400')}
                    >
                      {product.poids} gr
                    </Text>
                  )}
                </HStack>
                <Spacer />
                <Button
                  colorScheme="yellow"
                  leftIcon={<AddIcon />}
                  // width={'fit-content'}
                  width={{ base: 'full', lg: 'fit-content' }}
                  onClick={() =>
                    handleAddToCart({
                      id: product.id,
                      name: product.title,
                      price: +product.prix,
                    })
                  }>
                  Ajouter au panier
                </Button>
              </Stack>

              <Divider />

              <VStack align="start" spacing={4}>
                <Text
                  fontSize="lg"
                  // color={useColorModeValue('gray.600', 'gray.300')}
                  lineHeight="tall"
                >
                  {product?.description}
                </Text>
              </VStack>
            </VStack>
          </Stack>
        )}
      </ContainerBox>
    </Layout>
  );
}
