import { createSystem, defaultConfig } from '@chakra-ui/react';

export const themeSystem = createSystem(defaultConfig, {
  globalCss: {
    'html, body, #__next': {
      height: '100%',
    },
  },
});
