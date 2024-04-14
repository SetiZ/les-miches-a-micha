import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

export default async function handler() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        fontSize: 40,
        color: 'black',
        background: '#fefcbfb3',
        width: '100%',
        height: '100%',
        padding: '50px 200px',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <img
        src="https://les-miches-a-micha.vercel.app/miches_noir.png"
        alt="les miches a micha"
        width="500"
        height="410"
      />
      <p>N’allez plus à la boulangerie – c’est elle qui vient à vous !</p>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
