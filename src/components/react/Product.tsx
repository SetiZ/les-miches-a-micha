import { useCartStore } from '@/utils/store';
import { CgAdd } from 'react-icons/cg';

interface ProductProps {
  id: number;
  images?: string;
  title: string;
  category: string;
  prix: number;
  poids?: number | null;
}

const ProductBox = ({ id, images, title, category, prix, poids }: ProductProps) => {
  const { add: handleAddToCart } = useCartStore();
  const fallbackSrc = '0000_miches.png';

  return (
    <a
      href={`/carte/${id}`}
      className="bg-white shadow-md rounded-md w-[260px] justify-self-center block"
    >
      <img
        loading="lazy"
        src={images ? `/images/${images}` : `/images/${fallbackSrc}`}
        alt=""
        width={260}
        height={260}
        className="object-cover w-[260px] h-[260px] rounded-t-md"
      />
      <div className="p-4 text-base-content">
          <h3 className="mt-2 text-xl font-semibold leading-tight">{title}</h3>
        <span className="badge badge-warning badge-sm">{category}</span>
        <div className="flex items-baseline gap-2 mt-1">
          <span>{prix.toFixed(2)}€</span>
          {poids && <span>{poids}gr</span>}
        </div>
        <div className="flex items-baseline gap-2 mt-4">
          <button
            className="btn btn-warning btn-sm w-full"
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart({ id, name: title, price: prix });
            }}
          >
            <CgAdd className="size-4" />
            Ajouter au panier
          </button>
        </div>
      </div>
    </a>
  );
};

export default ProductBox;
