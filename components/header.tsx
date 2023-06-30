import { Box, IconButton, Heading, HStack, Icon, Menu, MenuButton, MenuItem, MenuList, Portal } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import { CgShoppingCart } from "react-icons/cg";


const Header = () => {
  const Links = [
    {title: 'Le Concept', link: 'concept'},
    {title: 'La carte', link: 'carte'},
    {title: 'Abonnements', link: 'abonnements'},
    {title: 'Les cours', link: 'cours'}
  ];

  return (
      <Box
        as={'header'}
        w={'full'}
        position={'fixed'}
        backgroundColor="rgba(254, 252, 191, 0.7)"
        backdropFilter="saturate(180%) blur(5px)">
        <HStack padding={'4'} h={'72px'} justify={'space-between'} maxW={'1440'} alignItems={'center'}  margin={'0 auto'}>
          <Link href={`/`} _hover={{ textDecoration: "none" }}><Heading as={'h1'} size='l'>Les Miches à Micha</Heading></Link>
          <HStack
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
          </HStack>
        </HStack>
      </Box>
  )
}

export default Header;
