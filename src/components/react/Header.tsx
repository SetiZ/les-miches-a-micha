import Cart from '@/components/react/Cart';
import { useCartStore } from '@/utils/store';
import { useEffect, useState } from 'react';
import { CgBowl, CgShoppingCart } from 'react-icons/cg';

const Header = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);

  const { count: cartCount } = useCartStore();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="w-full fixed top-0 z-10" style={{ backgroundColor: 'rgba(254, 252, 191, 0.7)', backdropFilter: 'saturate(180%) blur(5px)' }}>
        <div className="max-w-[1440px] mx-auto px-4 h-[72px] flex justify-between items-center font-semibold">
          <a href="/" className="flex items-end gap-2">
            <img
              src="/miches_blanc_no_text.png"
              alt="les miches à micha"
              width={65}
              height={50}
            />
            <h1 className="hidden xl:inline-block text-lg">Les Miches à Micha</h1>
          </a>
          <nav className="flex items-center gap-6">
            <a href="/ateliers" aria-label="Ateliers">
              <CgBowl className="size-8" />
            </a>
            <a href="/carte">
              <img src="/breads.png" alt="la carte" width={50} height={50} />
            </a>
            <button className="relative h-4" onClick={() => setCartOpen(true)} aria-label="Panier">
              <CgShoppingCart className="size-8" />
              {hydrated && cartCount() > 0 ? (
                <span className="absolute -right-1 -top-1 badge badge-error badge-xs text-white">{cartCount()}</span>
              ) : null}
            </button>
          </nav>
        </div>
      </header>
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
