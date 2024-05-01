import { supabaseLoader } from '@/utils/image-loader';
import { useCartStore } from '@/utils/store';
import { AddIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/next-js';
import { Box, Button, Tag, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

interface ProductProps {
  id: number;
  images: string;
  title: string;
  category: string;
  prix: number;
  poids: number | null;
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
  // const product = {id, name, price} as Product;

  const [imgSrc, set_imgSrc] = useState(images);

  useEffect(() => {
    set_imgSrc(images);
  }, [images]);

  const fallbackSrc = '0000_miches.png';

  return (
    <Box
      bgColor="white"
      boxShadow="md"
      rounded="md"
      width={'260px'}
      justifySelf={'center'}>
      {/* <Box position={"relative"} width={"260px"} height={"260px"}> */}
      <Image
        as={NextImage}
        loader={supabaseLoader}
        loading="lazy"
        // src={images}
        src={imgSrc}
        alt={''}
        width={260}
        height={260}
        borderTopRadius="md"
        placeholder="empty"
        onLoadingComplete={(result) => {
          if (result.naturalWidth === 0) {
            // Broken image
            set_imgSrc(fallbackSrc);
          }
        }}
        onError={() => {
          set_imgSrc(fallbackSrc);
        }}
        objectFit="cover"
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
          <Text>{prix}€</Text>
          {poids && <Text>{poids}gr</Text>}
        </Box>
        <Box display="flex" alignItems="baseline" gap={2} mt={4}>
          <Button
            colorScheme="yellow"
            leftIcon={<AddIcon />}
            width={'full'}
            onClick={() => handleAddToCart({ id, name: title, price: +prix })}>
            Ajouter au panier
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductBox;
