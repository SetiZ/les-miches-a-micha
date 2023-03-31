import { Box, Heading, HStack } from "@chakra-ui/react";

const Header = () => {
return (
    <>
      <Box as={'header'} bgColor={'yellow.100'}>
        <HStack>
          <Heading as={'h1'} bgColor={'yellow.100'}>Les Miches à Micha</Heading>
        </HStack>
      </Box>
    </>
  )
}

export default Header;
