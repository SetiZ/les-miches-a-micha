import { HamburgerIcon } from '@chakra-ui/icons';
import { Image, Link } from '@chakra-ui/next-js';
import {
	Box,
	Flex,
	HStack,
	Heading,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Portal,
} from '@chakra-ui/react';
import { CgShoppingCart } from 'react-icons/cg';

const Header = () => {
	const Links = [
		{ title: 'Le Concept', link: 'concept' },
		{ title: 'La carte', link: 'carte' },
		{ title: 'Abonnements', link: 'abonnements' },
		{ title: 'Les cours', link: 'cours' },
	];

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
				justify={['center', 'center', 'center', 'space-between']}
				maxW={'1440'}
				alignItems={'center'}
				margin={'0 auto'}>
				<Link href={'/'} _hover={{ textDecoration: 'none' }}>
					<HStack alignItems={'end'}>
						<Image
							src={'/miches_blanc_no_text.png'}
							alt={'bread'}
							width={65}
							height={50}
						/>
						<Heading
							as={'h1'}
							display={['none', 'none', 'none', 'inline-block']}
							size="l">
							Les Miches à Micha
						</Heading>
					</HStack>
				</Link>
				{/* remove the menu for now */}
				{/* <HStack
            as={'nav'}
            spacing={8}
            alignItems={'center'}
            hideBelow={'660px'}>
            {Links.map((link) => (
              <Link key={link.link} href={`/${link.link}`}>{link.title}</Link>
            ))}
            <Link href={`/cart`}><Icon as={CgShoppingCart} /></Link>
          </HStack>
          <HStack as={'nav'}
            spacing={8} alignItems={'center'} hideFrom={'660px'}>
            <Link href={`/cart`}><Icon as={CgShoppingCart} /></Link>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Options'
                colorScheme="yellow"
              ><HamburgerIcon /></MenuButton>
              <Portal>
                <MenuList>
                {Links.map((link) => (
                  <MenuItem as='a' key={link.link} href={`/${link.link}`}>{link.title}</MenuItem>
                ))}
                </MenuList>
              </Portal>
            </Menu>
          </HStack> */}
			</HStack>
		</Box>
	);
};

export default Header;
