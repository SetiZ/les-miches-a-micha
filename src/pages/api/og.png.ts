import type { APIRoute } from 'astro';
import { ImageResponse } from '@vercel/og';
import React from 'react';

export const GET: APIRoute = async () => {
  try {
    const imageData = await fetch(
      new URL('./miches_noir.png', import.meta.url),
    ).then((res) => res.arrayBuffer());

    const element = React.createElement(
      'div',
      {
        style: {
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
        },
      },
      React.createElement('img', {
        src: imageData as unknown as string,
        alt: 'les miches a micha',
        width: '50%',
      }),
      React.createElement('p', null, "N'allez plus à la boulangerie"),
      React.createElement('p', null, "c'est elle qui vient à vous !"),
    );

    return new ImageResponse(element, {
      width: 1200,
      height: 630,
    });
  } catch (error) {
    console.error('Failed to generate OG image:', error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
};
