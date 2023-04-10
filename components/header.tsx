import { Box, Heading, HStack, Icon } from "@chakra-ui/react";
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
          hideBelow={'md'}>
            {/* display={{ base: 'none', md: 'flex' }}  */}
          {Links.map((link) => (
            <Link key={link.link} href={`/${link.link}`}>{link.title}</Link>
          ))}
          <Link href={`/cart`}><Icon as={CgShoppingCart} /></Link>
        </HStack>
        {/* <Icon as={CgShoppingCart} /> */}
        </HStack>
      </Box>
  )
}

export default Header;
