import { OGImageRoute } from 'astro-og-canvas';

export const prerender = true;

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: {
    index: {
      title: 'Les Miches à Micha',
      description: "N'allez plus à la boulangerie – c'est elle qui vient à vous !",
    },
    carte: {
      title: 'La Carte',
      description: 'Découvrez nos pains artisanaux, viennoiseries et pâtisseries.',
    },
    'ateliers': {
      title: 'Les Ateliers',
      description: "Apprenez l'art de la boulangerie avec nos ateliers participatifs.",
    },
  },

  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description,
    logo: {
      path: './public/miches_noir.png',
      size: [300],
    },
    bgGradient: [[254, 252, 191]],
    border: {
      color: [183, 121, 31],
      width: 4,
      side: 'block-start',
    },
    font: {
      title: {
        size: 64,
        weight: 'Bold',
        color: [20, 19, 19],
      },
      description: {
        size: 32,
        weight: 'Normal',
        color: [80, 78, 77],
        lineHeight: 1.4,
      },
    },
  }),
});
