import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  const theme = extendTheme({
    styles: {
      global: {
        'html, body, #__next': {
          height: '100%',
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Analytics />
    </ChakraProvider>
  )
}
