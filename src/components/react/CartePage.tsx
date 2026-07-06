import ContainerBox from '@/components/react/ContainerBox';
import Footer from '@/components/react/Footer';
import Header from '@/components/react/Header';
import { Filter } from '@/components/react/Filter';
import ProductBox from '@/components/react/Product';
import { ToastProvider } from '@/components/react/ToastProvider';
import carte from '@/data/carte.json';
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
    <ToastProvider>
      <SpeedInsights />
      <Analytics />
      <Header />
      <main
        className="m-0 p-0 pt-20 pb-2 px-4 flex justify-center"
        style={{ minHeight: 'calc(100vh - 56px)' }}
      >
        <div
          className="w-full"
          style={{
            background: 'linear-gradient(to bottom, #b7791f 0%, #f6ad55 25%, rgba(255,255,255,0.3) 50%)',
          }}
        >
          <ContainerBox>
            <div className="flex justify-center">
              <img
                src="/miches_blanc.png"
                alt=""
                width={260}
                height={260}
                loading="eager"
                style={{ objectFit: 'cover', width: '260px', height: '260px' }}
              />
            </div>
            <Filter
              categories={categories}
              filteredProducts={filteredProducts}
              onClick={changeFilteredProducts}
            />
            {carte && (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-20 pt-16">
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
