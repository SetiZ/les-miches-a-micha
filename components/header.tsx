import { useRef } from "react";
import { Box, IconButton, Heading, HStack, Icon, useDisclosure, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
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
          <Heading as={'h1'} size='l'>Les Miches à Micha</Heading>
          <HStack
            as={'nav'}
            spacing={8}
            alignItems={'center'}
            hideBelow={'660px'}>
              {/* display={{ base: 'none', md: 'flex' }}  */}
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
                // variant='outline'
                colorScheme="yellow"
              ><HamburgerIcon /></MenuButton>
              <MenuList>
              {Links.map((link) => (
                <MenuItem as='a' key={link.link} href={`/${link.link}`}>{link.title}</MenuItem>
              ))}
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Box>
  )
}

export default Header;
