import { Head, Html, Main, NextScript } from 'next/document';
import Hydration from '@/utils/hydration';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Hydration />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
