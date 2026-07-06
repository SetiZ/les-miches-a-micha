import { Box } from '@chakra-ui/react';
import type * as React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

const ContainerBox = ({ children }: LayoutProps) => {
  return (
    <Box
      backdropFilter="blur(7px)"
      bgColor={'rgba(255, 255, 255, 0.5)'}
      boxShadow={'0 4px 30px rgba(0, 0, 0, 0.1)'}
      borderRadius={16}
      borderWidth={'1'}
      borderStyle={'solid'}
      borderColor={'rgba(255, 255, 255, 0.3)'}
      p={'4'}
      maxW={'1440'}
      width={'full'}>
      {children}
    </Box>
  );
};

export default ContainerBox;
