import { Heading, HStack } from "@chakra-ui/react";

const Header = () => {
  const Links = ['Le Concept', 'La carte', 'Abonnements', 'Les cours'];

  return (
    <>
        <HStack as={'header'} justify={'space-between'} w={'100%'} position={'fixed'} backgroundColor="rgba(254, 
 252, 191, 0.8)" backdropFilter="saturate(180%) blur(5px)" padding={'4'} >
          <Heading as={'h1'}>Les Miches à Micha</Heading>
          <HStack
            as={'nav'}
            spacing={8}
            alignItems={'center'}
            display={{ base: 'none', md: 'flex' }}>
            {Links.map((link) => (
              <span key={link}>{link}</span>
            ))}
          </HStack>
        </HStack>
    </>
  )
}

export default Header;
