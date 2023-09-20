import { Box } from "@chakra-ui/react";

type LayoutProps = {
    children: React.ReactNode
  }
  

const ContainerBox = ({ children }: LayoutProps) => {
    return (
        <Box
        backdropFilter="saturate(180%) blur(3px)"
        bgGradient='linear(to-b, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7), yellow.100)'
        p={'4'}
        maxW={'1440'}
        width={'full'}>
            {children}
        </Box>
    );
}

export default ContainerBox;
