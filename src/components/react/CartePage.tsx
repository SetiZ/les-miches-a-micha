import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useState } from 'react';
import ContainerBox from '@/components/react/ContainerBox';
import { Filter } from '@/components/react/Filter';
import Footer from '@/components/react/Footer';
import Header from '@/components/react/Header';
import ProductBox from '@/components/react/Product';
import { ToastProvider } from '@/components/react/ToastProvider';
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
    <ToastProvider>
      <SpeedInsights />
      <Analytics />
      <Header />
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
              </div>
            )}
          </ContainerBox>
        </div>
      </main>
      <Footer />
    </ToastProvider>
  );
}
