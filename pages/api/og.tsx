import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  const imageData = await fetch(
    new URL('./miches_noir.png', import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        fontSize: 30,
        color: 'black',
        background: '#fefcbfb3',
        backgroundImage: 'linear-gradient(to bottom, #fefcbf, #B7791F)',
        width: '100%',
        height: '100%',
        padding: '50px 200px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <img
        src={imageData && (imageData as never as string)}
        alt="les miches a micha"
        width="50%"
      />
      <p>N’allez plus à la boulangerie</p>
      <p>c’est elle qui vient à vous !</p>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
