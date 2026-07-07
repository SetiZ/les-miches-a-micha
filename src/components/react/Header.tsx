import Cart from '@/components/react/Cart';
import { useCartStore } from '@/utils/store';
import { useEffect, useState } from 'react';
import { CgShoppingCart } from 'react-icons/cg';

const Header = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  const { count: cartCount } = useCartStore();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4 bg-surface/90 backdrop-blur-sm border-b-2 border-iron-rim">
        <a href="/" className="flex items-center gap-4">
          <img src="/miches_noir_no_text.png" alt="Les Miches à Micha" width={45} height={45} className="object-contain" />
          <span className="hidden md:block font-headline text-hmd text-aged-parchment">Les Miches à Micha</span>
        </a>
        <div className="flex gap-gutter items-center">
          <div className="hidden md:flex gap-8">
            <a href="/carte" className="font-label text-label text-aged-parchment hover:text-fired-gold transition-colors duration-300 uppercase tracking-[0.1em]">
              CARTE
            </a>
            <a href="/ateliers" className="font-label text-label text-aged-parchment hover:text-fired-gold transition-colors duration-300 uppercase tracking-[0.1em]">
              ATELIERS
            </a>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            className="text-aged-parchment hover:text-fired-gold transition-transform active:scale-95 relative"
            aria-label="Panier"
          >
            <CgShoppingCart className="size-6" />
            {hydrated && cartCount() > 0 ? (
              <span className="absolute -right-2 -top-2 text-xs bg-ember-orange text-aged-parchment rounded-full w-5 h-5 flex items-center justify-center font-label">
                {cartCount()}
              </span>
            ) : null}
          </button>
        </div>
      </nav>
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
