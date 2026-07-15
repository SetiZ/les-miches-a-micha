import { OGImageRoute } from 'astro-og-canvas';

export const prerender = true;

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: {
    index: {
      title: 'Les Miches à Micha – Boulangerie artisanale bio',
      description: 'Pains au levain, viennoiseries et pâtisseries faits main.',
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
      path: './public/miches_noir_invert.png',
      size: [300],
    },
    bgGradient: [[20, 19, 19]],
    border: {
      color: [212, 175, 55],
      width: 4,
      side: 'block-start',
    },
    font: {
      title: {
        size: 64,
        weight: 'Bold',
        color: [245, 230, 211],
      },
      description: {
        size: 32,
        weight: 'Normal',
        color: [200, 198, 197],
        lineHeight: 1.4,
      },
    },
  }),
});
