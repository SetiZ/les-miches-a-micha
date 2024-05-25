import { HStack, Tag, Text } from '@chakra-ui/react';

interface FilterProps {
  categories: string[];
  filteredProducts: number;
  onClick: (index: number) => void;
}

export const Filter = ({
  categories,
  filteredProducts,
  onClick,
}: FilterProps) => {
  console.log(filteredProducts);
  return (
    <HStack wrap={'wrap'}>
      <Text>Filtrer par :</Text>
      <Tag
        size={'lg'}
        variant={filteredProducts === -1 ? 'solid' : 'subtle'}
        colorScheme="yellow"
        onClick={() => onClick(-1)}
        cursor={'pointer'}>
        tous
      </Tag>
      {categories.map((category, index) => (
        <Tag
          size={'lg'}
          variant={filteredProducts === index ? 'solid' : 'subtle'}
          colorScheme="yellow"
          key={index}
          onClick={() => onClick(index)}
          cursor={'pointer'}>
          {category}
        </Tag>
      ))}
    </HStack>
  );
};