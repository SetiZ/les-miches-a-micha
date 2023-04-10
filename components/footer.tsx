import { Box, HStack } from "@chakra-ui/react";

const Footer = () => {
  const year: number = new Date().getFullYear();

  return (
    <Box
        as={'footer'}
        w={'full'}
        bgColor={'gray.600'}
        color={'gray.100'}
        position={'absolute'}
        bottom={0}>
        <HStack padding={'4'} justify={'space-between'} maxW={'1440'} alignItems={'center'} margin={'0 auto'}>
          <span>Les miches à Micha - {year}</span>
        </HStack>
    </Box>
  )
}

export default Footer;