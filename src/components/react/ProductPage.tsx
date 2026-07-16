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

  if (!product) {
    return (
      <ToastProvider>
        <SpeedInsights />
        <Analytics />
        <Header />
        <main className="min-h-screen pt-24 pb-12 px-margin-mobile md:px-margin-desktop flex justify-center">
          <p className="font-headline text-hmd text-aged-parchment">Produit introuvable</p>
        </main>
        <Footer />
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <SpeedInsights />
      <Analytics />
      <Header />
      <main className="min-h-screen pt-24 pb-12 px-margin-mobile md:px-margin-desktop flex justify-center">
        <div className="w-full max-w-container-max">
          <div className="mb-6">
            <a href="/carte" className="font-label text-label text-iron-rim hover:text-fired-gold transition-colors uppercase tracking-[0.1em]">&larr; Revenir à la Carte</a>
          </div>
          <ContainerBox>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start">
              <div className="flex-1 max-w-full lg:max-w-[500px] border border-iron-rim overflow-hidden">
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
                  className="object-cover w-full h-auto"
                  style={{ viewTransitionName: `product-${id}` }}
                />
              </div>
              <div className="flex flex-col items-start gap-6 flex-1">
                <span className="font-label text-[10px] text-ember-orange uppercase tracking-[0.1em]">{product.category}</span>
                <h1 className="font-headline text-hxl-mobile md:text-hxl text-aged-parchment">{product.title}</h1>
                <div className="flex items-center gap-4">
                  <span className="font-headline text-3xl text-fired-gold">{product.prix.toFixed(2)}€</span>
                  {product.poids && (
                    <span className="font-body text-lg text-aged-parchment/60">{product.poids} gr</span>
                  )}
                </div>
                <button
                  className="forged-btn-primary px-8 py-4 font-label text-label tracking-[0.1em] uppercase flex items-center gap-2"
                  onClick={() =>
                    handleAddToCart({ id: product.id, name: product.title, price: product.prix })
                  }
                >
                  <CgAdd className="size-4" />
                  Ajouter au panier
                </button>
                <div className="separator" />
                <p className="font-body text-body-lg text-aged-parchment/80 leading-relaxed">{product.description}</p>
              </div>
            </div>
          </ContainerBox>
        </div>
      </main>
      <Footer />
    </ToastProvider>
  );
}
