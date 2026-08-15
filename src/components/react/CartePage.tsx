import { useState } from 'react';
import ContainerBox from '@/components/react/ContainerBox';
import { Filter } from '@/components/react/Filter';
import PageShell from '@/components/react/PageShell';
import ProductBox from '@/components/react/Product';
import carte from '@/data/carte.json';

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
    <PageShell>
      <main className="min-h-screen pt-24 pb-12 px-margin-mobile md:px-margin-desktop flex justify-center">
        <div className="w-full max-w-container-max">
          <div className="text-center mb-12">
            <h1 className="font-headline text-hxl-mobile md:text-hxl text-aged-parchment ember-glow">
              La carte
            </h1>
            <div className="w-24 h-1 bg-fired-gold mx-auto mt-4" />
          </div>
          <ContainerBox>
            <div className="mb-8">
              <Filter
                categories={categories}
                filteredProducts={filteredProducts}
                onClick={changeFilteredProducts}
              />
            </div>
            {carte && (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-8 pt-8">
                {carteList.map((prod, index) => {
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
                        eager={index < 6}
                      />
                    )
                  );
                })}
              </div>
            )}
          </ContainerBox>
        </div>
      </main>
    </PageShell>
  );
}
