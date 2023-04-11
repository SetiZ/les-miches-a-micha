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
        <HStack padding={'4'} justify={'space-between'} maxW={'1440'} alignItems={'center'} margin={'0 auto'}>
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
          </HStack>
          <Link href={`/cart`}><Icon as={CgShoppingCart} /></Link>
          <Menu>
            {/* <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            /> */}
            <MenuButton
              as={IconButton}
              aria-label='Options'
              // variant='outline'
              colorScheme="yellow"
            ><HamburgerIcon /></MenuButton>
            <MenuList>
              <MenuItem icon={<AddIcon />} command='⌘T'>
                New Tab
              </MenuItem>
              <MenuItem icon={<ExternalLinkIcon />} command='⌘N'>
                New Window
              </MenuItem>
              <MenuItem icon={<RepeatIcon />} command='⌘⇧N'>
                Open Closed Tab
              </MenuItem>
              <MenuItem icon={<EditIcon />} command='⌘O'>
                Open File...
              </MenuItem>
              <MenuItem as='a' href='#'>Link 1</MenuItem>
              <MenuItem as='a' href='#'>Link 2</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
  )
}

export default Header;
