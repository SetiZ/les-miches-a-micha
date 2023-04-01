import { Box, Heading, HStack, List } from "@chakra-ui/react";

const Header = () => {
  const Links = ['Le Concept', 'La carte', 'Abonnements', 'Les cours'];

  return (
    <>
      {/* <Box> */}
        <HStack as={'header'} bgColor={'yellow.100'}>
          <Heading as={'h1'} bgColor={'yellow.100'}>Les Miches à Micha</Heading>
          {/* <Box as={'nav'}> */}
          {/* <HStack spacing={8} alignItems={'center'}> */}
            <HStack
              as={'nav'}
              spacing={8}
              alignItems={'center'}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <span key={link}>{link}</span>
              ))}
            </HStack>
          {/* </HStack> */}
          {/* </Box> */}
        </HStack>
      {/* </Box> */}
    </>
  )
}

export default Header;
