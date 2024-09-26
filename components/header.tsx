import Cart from '@/components/cart';
import { useCartStore } from '@/utils/store';
import {
  Badge,
  Box,
  HStack,
  Heading,
  Icon,
  useDisclosure,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CgShoppingCart } from 'react-icons/cg';

const Header = () => {
  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const { count: cartCount } = useCartStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as={'header'}
      w={'full'}
      position={'fixed'}
      zIndex={10}
      backgroundColor="rgba(254, 252, 191, 0.7)"
      backdropFilter="saturate(180%) blur(5px)">
      <HStack
        padding={'4'}
        h={'72px'}
        justify={'space-between'}
        maxW={'1440'}
        alignItems={'center'}
        fontWeight={'600'}
        margin={'0 auto'}>
        <Link href={'/'}>
          <HStack alignItems={'end'}>
            <Image
              src={'/miches_blanc_no_text.png'}
              alt={'les miches à micha'}
              width={65}
              height={50}
            />
            <Heading
              as={'h1'}
              display={['none', 'none', 'none', 'inline-block']}
              fontSize="lg">
              Les Miches à Micha
            </Heading>
          </HStack>
        </Link>
        <HStack
          as={'nav'}
          spacing={8}
          // hideBelow={'660px'}
          alignItems={'center'}
        >
          {/* {Links.map((link) => ( */}
          <Link href={'/carte'}>
            {/* <Icon as={CgIcecream} w={6} h={6} /> */}
            <Image
              src={'/breads.png'}
              alt={'la carte'}
              width={50}
              height={50}
            />
            {/* {link.title} */}
          </Link>
          {/* ))} */}
          <Box pos="relative" as="button" height={'16px'} onClick={onOpen}>
            <Icon aria-label="Panier" as={CgShoppingCart} boxSize={8} />
            {hydrated && cartCount() > 0 ? (
              <Badge
                colorScheme="red"
                pos="absolute"
                variant="solid"
                bgColor="red.500"
                right={-1}
                top={-1}>
                {cartCount()}
              </Badge>
            ) : null}
          </Box>
        </HStack>
        {/* <HStack as={'nav'} spacing={8} alignItems={'center'} hideFrom={'660px'}>
					<Link href={`/cart`} height={'16px'}>
						<Icon as={CgShoppingCart} />
					</Link>
					<Menu>
						<MenuButton
							as={IconButton}
							aria-label="Options"
							colorScheme="yellow">
							<HamburgerIcon />
						</MenuButton>
						<Portal>
							<MenuList>
								{Links.map((link) => (
									<MenuItem as="a" key={link.link} href={`/${link.link}`}>
										{link.title}
									</MenuItem>
								))}
							</MenuList>
						</Portal>
					</Menu>
				</HStack> */}
      </HStack>
      <Cart isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Header;
