import ContainerBox from '@/components/react/ContainerBox';
import Footer from '@/components/react/Footer';
import Header from '@/components/react/Header';
import { ToastProvider } from '@/components/react/ToastProvider';
import carte from '@/data/carte.json';
import { useCartStore } from '@/utils/store';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { CgAdd } from 'react-icons/cg';

interface ProductPageProps {
  id: number;
}

export default function ProductDetailPage({ id }: ProductPageProps) {
  const product = carte.products.find((p) => p.id === id);
  const fallbackSrc = '0000_miches.png';
  const { add: handleAddToCart } = useCartStore();

  return (
    <ToastProvider>
      <SpeedInsights />
      <Analytics />
      <Header />
      <main
        className="m-0 p-0 pt-20 pb-2 px-4 flex justify-center"
        style={{ minHeight: 'calc(100vh - 56px)' }}
      >
        <div className="w-full"
          style={{ background: 'linear-gradient(to bottom, #b7791f 0%, #f6ad55 25%, rgba(255,255,255,0.3) 50%)' }}
        >
          <ContainerBox>
            <div className="pb-4">
              <a href="/carte" className="text-gray-800 underline">
                Revenir à la Carte
              </a>
            </div>
            {!product ? (
              <p>Ya rien</p>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start">
                <div className="rounded-xl overflow-hidden flex-1 max-w-full lg:max-w-[500px] shadow-2xl">
                  <img
                    loading="lazy"
                    src={
                      product.images && product.images.length > 0
                        ? `/images/${product.images}`
                        : `/images/${fallbackSrc}`
                    }
                    alt={product.title || ''}
                    width={500}
                    height={500}
                    style={{ objectFit: 'cover', width: '500px', height: 'auto' }}
                  />
                </div>
                <div className="flex flex-col items-start gap-6 flex-1">
                  <span className="badge badge-warning px-3 py-1 rounded-full capitalize text-sm">
                    {product.category}
                  </span>
                  <h1 className="text-3xl font-bold">{product.title}</h1>
                  <div className="flex flex-col lg:flex-row gap-2 w-full justify-between">
                    <div className="flex gap-2">
                      <span className="text-3xl font-bold">{product.prix.toFixed(2)}€</span>
                      {product.poids && (
                        <span className="text-3xl">{product.poids} gr</span>
                      )}
                    </div>
                    <button
                      className="btn btn-warning w-full lg:w-fit"
                      onClick={() =>
                        handleAddToCart({
                          id: product.id,
                          name: product.title,
                          price: product.prix,
                        })
                      }
                    >
                      <CgAdd className="size-4" />
                      Ajouter au panier
                    </button>
                  </div>
                  <div className="divider" />
                  <div className="flex flex-col items-start gap-4">
                    <p className="text-lg leading-relaxed">{product.description}</p>
                  </div>
                </div>
              </div>
            )}
          </ContainerBox>
        </div>
      </main>
      <Footer />
    </ToastProvider>
  );
}
