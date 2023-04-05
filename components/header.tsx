import { Heading, HStack, Icon } from "@chakra-ui/react";
import { CgShoppingCart } from "react-icons/cg";


const Header = () => {
  const Links = ['Le Concept', 'La carte', 'Abonnements', 'Les cours'];

  return (
    <>
        <HStack
          as={'header'}
          justify={'space-between'}
          w={'100%'}
          position={'fixed'}
          backgroundColor="rgba(254, 252, 191, 0.7)"
          backdropFilter="saturate(180%) blur(5px)"
          padding={'4'} >
          <Heading as={'h1'} size='l'>Les Miches à Micha</Heading>
          <HStack
            as={'nav'}
            spacing={8}
            alignItems={'center'}
            hideBelow={'md'}>
             {/* display={{ base: 'none', md: 'flex' }}  */}
            {Links.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </HStack>
          <Icon as={CgShoppingCart} />
        </HStack>
    </>
  )
}

export default Header;
