import {
  AspectRatio,
  Box,
  Flex,
  SimpleGrid,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Image } from '@chakra-ui/next-js';
import Layout from '@/components/layout';
import ContainerBox from '@/components/containerBox';
import carte from '@/data/carte.json';

export default function Carte() {
  return (
    <Layout>
      <ContainerBox>
        {/* <Flex as={'h1'} justify={'center'}>
          <Image src={'/miches_blanc.png'} alt={''} width={260} height={260} />
        </Flex> */}
        {carte && (
          <Wrap spacing="40px">
            {carte.products.map((prod: any, index: any) => (
              <WrapItem key={index}>
                <Box bgColor="white" p="5" borderRadius="md" borderWidth="1px">
                  <Text
                    mt={2}
                    fontSize="xl"
                    fontWeight="semibold"
                    lineHeight="short">
                    {prod.title}
                  </Text>
                  {/* <Image
                  src={'/miches_blanc.png'}
                  alt={''}
                  width={260}
                  height={260}
                  borderRadius="md"
                /> */}
                  {/* <AspectRatio maxW="260px" ratio={1}> */}
                  <Image
                    src={'/miches_blanc.png'}
                    alt={''}
                    width={260}
                    height={260}
                    borderRadius="md"
                  />
                  {/* </AspectRatio> */}
                  {prod.prix}€ - {prod.poids}gr
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        )}
      </ContainerBox>
    </Layout>
  );
}
