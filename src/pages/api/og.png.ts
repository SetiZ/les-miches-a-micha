import type { APIRoute } from 'astro';
import { ImageResponse } from '@vercel/og';
import React from 'react';

export const GET: APIRoute = async () => {
  try {
    const imageData = await fetch(
      new URL('./miches_blanc.png', import.meta.url),
    ).then(async (res) => {
      const buffer = await res.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const contentType = res.headers.get('content-type') || 'image/png';
      return `data:${contentType};base64,${base64}`;
    });

    const element = React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          fontSize: 30,
          color: '#F5E6D3',
          background: '#141313',
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
        width: '40%',
      }),
      React.createElement('p', {
        style: {
          marginTop: '30px',
          fontSize: '28px',
          color: '#D4AF37',
          fontFamily: 'sans-serif',
          fontWeight: '600',
        },
      }, "N'allez plus à la boulangerie"),
      React.createElement('p', {
        style: {
          fontSize: '24px',
          color: '#c8c6c5',
          fontFamily: 'sans-serif',
        },
      }, "c'est elle qui vient à vous !"),
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
