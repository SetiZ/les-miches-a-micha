import { useCartStore } from '@/utils/store';
// import { Image } from '@chakra-ui/next-js';
import { Button } from '@chakra-ui/react'; // Removed Box, Text, and Tag
import Image from 'next/image';
import NextLink from 'next/link';
import { FaPlus } from 'react-icons/fa';

interface ProductProps {
  id: number;
  images?: string;
  title: string;
  // category: string; // Removed unused prop
  prix: number;
  // poids?: number | null; // Removed unused prop
}

const ProductBox = ({
  id,
  images,
  title,
  // category, // Removed unused prop
  prix,
  // poids, // Removed unused prop
}: ProductProps) => {
  const { add: handleAddToCart } = useCartStore();

  const fallbackSrc = '0000_miches.png';

  return (
    <NextLink href={`/carte/${id}`} passHref legacyBehavior>
      <a
        href={`/carte/${id}`} // Explicitly add href to satisfy Biome
        style={{
          display: 'block',
          backgroundColor: 'white',
          border: '1px solid red',
        }}>
        {' '}
        {/* Use a plain <a> tag */}
        <Image
          src={
            images && images.length > 0
              ? `/images/${images}`
              : `/images/${fallbackSrc}`
          }
          placeholder="blur"
          blurDataURL={`/images/${fallbackSrc}`}
          alt={title} // Use title for alt text
          width={260}
          height={260}
          style={{ objectFit: 'cover' }}
        />
        <div style={{ padding: '16px' }}>
          {' '}
          {/* Use plain <div> */}
          <p>{title}</p> {/* Use plain <p> */}
          <p>{prix.toFixed(2)}€</p>
          {/* Keep the Add to Cart button but simplify its container if needed */}
          <Button
            colorPalette="yellow" // Assuming this was already changed
            leftIcon={<FaPlus />} // Assuming this was already changed
            width={'full'}
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart({ id, name: title, price: +prix });
            }}>
            Ajouter au panier
          </Button>
        </div>
      </a>
    </NextLink>
  );
};

export default ProductBox;
