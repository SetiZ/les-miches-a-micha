// import { SpeedInsights } from '@vercel/speed-insights/next';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';

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
			{/* <SpeedInsights /> */}
			<Analytics />
		</ChakraProvider>
	);
}
