import ContainerBox from '@/components/containerBox';
import { Filter } from '@/components/filter';
import Layout from '@/components/layout';
import ProductBox from '@/components/product';
import carte from '@/data/carte.json';
import { Flex, SimpleGrid } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

export default function Carte() {
  const [filteredProducts, setFilteredProducts] = useState(-1);
  const [carteList, setCarteList] = useState<typeof carte.products>(
    carte.products || [],
  );
  const categories = [
    'pain du mois',
    'pain courant',
    'pains spéciaux',
    'autres pains spéciaux',
    'farines anciennes, semences paysannes',
    'brioches',
    'viennoiseries',
    'apéritif',
    'autres gourmandises',
  ];

  const changeFilteredProducts = async (index: number) => {
    setFilteredProducts(index);
    setCarteList(
      carte.products.filter(
        (it) => index < 0 || it.category === categories[index],
      ),
    );
  };

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
    </Layout>
  );
}
