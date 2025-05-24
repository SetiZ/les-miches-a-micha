'use client';

import {
  ChakraProvider,
  type SystemConfig,
  defaultSystem,
} from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

interface ProviderProps extends ColorModeProviderProps {
  value?: SystemConfig;
}

export function Provider(props: ProviderProps) {
  const { value, ...rest } = props;
  return (
    <ChakraProvider value={value || defaultSystem}>
      <ColorModeProvider {...rest} />
    </ChakraProvider>
  );
}
