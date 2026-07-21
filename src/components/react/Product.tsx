import { CgAdd } from 'react-icons/cg';
import { useCartStore } from '@/utils/store';

interface ProductProps {
  id: number;
  images?: string;
  title: string;
  category: string;
  prix: number;
  poids?: number | null;
}

const ProductBox = ({
  id,
  images,
  title,
  category,
  prix,
  poids,
}: ProductProps) => {
  const { add: handleAddToCart } = useCartStore();
  const fallbackSrc = '0000_miches.png';

  return (
    <a
      href={`/carte/${id}`}
      className="stone-slab w-65 justify-self-center block group">
      <div className="relative overflow-hidden">
        <img
          loading="lazy"
          src={images ? `/images/${images}` : `/images/${fallbackSrc}`}
          alt={title}
          width={260}
          height={260}
          className="object-cover w-65 h-65 transition-transform duration-500 group-hover:scale-105"
          style={{ viewTransitionName: `product-${id}` }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface/80 to-transparent pointer-events-none" />
      </div>
      <div className="p-4 space-y-2">
        <span className="font-label text-[10px] text-ember-orange uppercase tracking-widest">
          {category}
        </span>
        <h3 className="font-headline text-hmd text-aged-parchment leading-tight">
          {title}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-headline text-lg text-fired-gold">
            {prix.toFixed(2)}€
          </span>
          {poids && (
            <span className="font-body text-sm text-aged-parchment/60">
              {poids}gr
            </span>
          )}
        </div>
        <button
          type="button"
          className="forged-btn w-full py-2 font-label text-xs uppercase tracking-widest text-aged-parchment flex items-center justify-center gap-2 mt-4"
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart({ id, name: title, price: prix });
          }}>
          <CgAdd className="size-4" />
          Ajouter au panier
        </button>
      </div>
    </a>
  );
};

export default ProductBox;
