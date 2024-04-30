import ContainerBox from '@/components/containerBox';
import Layout from '@/components/layout';
import ProductBox from '@/components/product';
import carte from '@/data/carte.json';
import { supabase } from '@/utils/api';
import { imageLoader, supabaseLoader } from '@/utils/image-loader';
import { Image } from '@chakra-ui/next-js';
import {
  Badge,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  WrapItem,
} from '@chakra-ui/react';
import { QueryData } from '@supabase/supabase-js';
import NextImage from 'next/image';
import { useState, useEffect } from 'react';

export default function Carte() {
  const productsWithCategoryQuery = supabase
    .from('product')
    .select(`
        id,
        name,
        description,
        price,
        weight,
        visible,
        category (id, name)
      `)
    .eq('visible', true);
  type ProductsWithCategories = QueryData<typeof productsWithCategoryQuery>;

  const [products, setProducts] = useState<ProductsWithCategories>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    // const productsWithCategoryQuery = supabase
    //   .from('product')
    //   .select(`
    //     id,
    //     name,
    //     description,
    //     price,
    //     weight,
    //     visible,
    //     category (id, name)
    //   `)
    //   .eq('visible', true)
    // type ProductsWithCategories = QueryData<typeof productsWithCategoryQuery>
    const { data, error } = await productsWithCategoryQuery;
    setProducts(data as ProductsWithCategories);
    setLoading(false);
    if (error) throw error;
  }

  console.log(products);

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
        {/* <Heading as="h2" size="xl" textAlign={'center'}>
          Micro-fournil artisanal
        </Heading> */}
        {carte && (
          <SimpleGrid minChildWidth="260px" spacing="20" paddingTop={16}>
            {carte.products.map((prod: any) => {
              return (
                prod.visible && (
                  <ProductBox
                    key={prod.id}
                    id={prod.id}
                    title={prod.title}
                    category={prod.category}
                    images={prod.images}
                    poids={prod.poids}
                    prix={prod.prix}
                  />
                  // <Box
                  //   key={index}
                  //   bgColor="white"
                  //   boxShadow="md"
                  //   rounded="md"
                  //   width={"260px"}
                  // >
                  //   {/* <Box position={"relative"} width={"260px"} height={"260px"}> */}
                  //   <Image
                  //     as={NextImage}
                  //     loader={supabaseLoader}
                  //     loading="lazy"
                  //     src={prod.images}
                  //     alt={""}
                  //     width={260}
                  //     height={260}
                  //     borderTopRadius="md"
                  //     placeholder="empty"
                  //     objectFit="cover"
                  //   />
                  //   {/* </Box> */}
                  //   <Box p="4">
                  //     <Text
                  //       as="h3"
                  //       mt={2}
                  //       fontSize="xl"
                  //       fontWeight="semibold"
                  //       lineHeight="short"
                  //     >
                  //       {prod.title}
                  //     </Text>
                  //     <Badge>{prod.category}</Badge>
                  //     <Box display="flex" alignItems="baseline" gap={2}>
                  //       <Text>{prod.prix}€</Text>
                  //       <Text>{prod.poids}gr</Text>
                  //     </Box>
                  //   </Box>
                  // </Box>
                )
              );
            })}
          </SimpleGrid>
        )}
      </ContainerBox>
    </Layout>
  );
}
