import Cart from '@/components/cart';
import { useCartStore } from '@/utils/store';
// import { HamburgerIcon } from '@chakra-ui/icons';
import { Image, Link } from '@chakra-ui/next-js';
import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  useDisclosure,
} from '@chakra-ui/react';
import { CgShoppingCart } from 'react-icons/cg';
import { useEffect, useState } from 'react';

const Header = () => {
  const Links = [
    // { title: 'Le Concept', link: 'concept' },
    // { title: 'La carte', link: 'carte' },
    { title: 'Liens', link: 'socials' },
    // { title: 'Abonnements', link: 'abonnements' },
    // { title: 'Les cours', link: 'cours' },
  ];

  // const totalItems = 3;
  //
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
        fontWeight={'600'}>
        <Link href={'/'} _hover={{ textDecoration: 'none' }}>
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
          alignItems={'center'}>
          {Links.map((link) => (
            <Link key={link.link} href={`/${link.link}`}>
              {/* <Icon as={CgIcecream} w={6} h={6} /> */}
              <Image
                src={'/breads.png'}
                alt={'social links'}
                width={50}
                height={50}
              />
              {/* {link.title} */}
            </Link>
          ))}
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
