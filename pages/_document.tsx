import Hydration from '@/utils/hydration';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="fr">
      <Head />
      <body>
        <Hydration />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
