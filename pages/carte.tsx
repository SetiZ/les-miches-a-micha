import useSWR from 'swr';
import Layout from '@/components/layout'
import ContainerBox from '@/components/containerBox';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { Image } from '@chakra-ui/next-js'

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Carte() {
  const { data, error } = useSWR("/api/static", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Layout>
      <ContainerBox>
        {/* <Flex as={'h1'} justify={'center'}>
          <Image src={'/miches_blanc.png'} alt={''} width={260} height={260} />
        </Flex> */}
        {!data && <p>Loading...</p>}
        {error && <p>Loading failed : {error}</p>}
        {data &&
          <SimpleGrid minChildWidth='120px' spacing='40px'>
            {data.products.map((prod: any, index: any) => (
              <Box key={index} p="5" maxW="320px" borderWidth="1px">
                {prod.title}
                <Image src={'/miches_blanc.png'} alt={''} width={260} height={260} borderRadius="md" />
                </Box>
            ))}
          </SimpleGrid>
        }
      </ContainerBox>
    </Layout>
  );
}
