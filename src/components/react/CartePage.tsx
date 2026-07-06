import ContainerBox from '@/components/react/ContainerBox';
import Footer from '@/components/react/Footer';
import Header from '@/components/react/Header';
import { Filter } from '@/components/react/Filter';
import ProductBox from '@/components/react/Product';
import carte from '@/data/carte.json';
import {
  ChakraProvider,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useState } from 'react';

export default function CartePage() {
  const [filteredProducts, setFilteredProducts] = useState(-1);
  const [carteList, setCarteList] = useState<typeof carte.products>(
    carte.products || [],
  );

  const categories = Array.from(
    new Set(
      carte.products
        .filter((product) => product.visible)
        .map((product) => product.category),
    ),
  );

  const changeFilteredProducts = async (index: number) => {
    setFilteredProducts(index);
    setCarteList(
      carte.products.filter(
        (it) => index < 0 || it.category === categories[index],
      ),
    );
  };

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
              style={{ objectFit: 'cover', width: '260px', height: '260px' }}
            />
          </Flex>
          <Filter
            categories={categories}
            filteredProducts={filteredProducts}
            onClick={changeFilteredProducts}
          />
          {carte && (
            <SimpleGrid minChildWidth="260px" spacing="20" paddingTop={16}>
              {carteList.map((prod) => {
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
                  )
                );
              })}
            </SimpleGrid>
          )}
        </ContainerBox>
      </Flex>
      <Footer />
    </ChakraProvider>
  );
}
