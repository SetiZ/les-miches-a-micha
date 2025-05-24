import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { AppProps } from 'next/app';
import { Provider } from '../components/ui/provider';
import { themeSystem } from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={themeSystem}>
      <Component {...pageProps} />
      <SpeedInsights />
      <Analytics />
    </Provider>
  );
}
