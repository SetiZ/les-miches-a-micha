import { useCartStore } from '@/utils/store';
import { AddIcon } from '@chakra-ui/icons';
// import { Image } from '@chakra-ui/next-js';
import { Box, Button, Tag, Text } from '@chakra-ui/react';
import Image from 'next/image';

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
    <Box
      as="a"
      bgColor="white"
      boxShadow="md"
      rounded="md"
      width={'260px'}
      justifySelf={'center'}
      href={`/carte/${id}`}>
      {/* <Box position={"relative"} width={"260px"} height={"260px"}> */}
      <Image
        // as={NextImage}
        // loader={supabaseLoader}
        loading="lazy"
        // src={images}
        src={
          images && images.length > 0
            ? `/images/${images}`
            : `/images/${fallbackSrc}`
        }
        placeholder="blur"
        blurDataURL={`/images/${fallbackSrc}`}
        alt={''}
        width={260}
        height={260}
        style={{ objectFit: 'cover', width: '260px', height: '260px' }}
        // borderTopRadius="md"
        // objectFit="cover"
      />
      {/* </Box> */}
      <Box p="4">
        <Text
          as="h3"
          mt={2}
          fontSize="xl"
          fontWeight="semibold"
          lineHeight="short">
          {title}
        </Text>
        <Tag colorScheme="yellow">{category}</Tag>
        <Box display="flex" alignItems="baseline" gap={2}>
          <Text>{prix.toFixed(2)}€</Text>
          {poids && <Text>{poids}gr</Text>}
        </Box>
        <Box display="flex" alignItems="baseline" gap={2} mt={4}>
          <Button
            colorScheme="yellow"
            leftIcon={<AddIcon />}
            width={'full'}
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart({ id, name: title, price: +prix });
            }}>
            Ajouter au panier
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductBox;
