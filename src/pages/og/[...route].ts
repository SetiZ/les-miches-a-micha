import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { OGImageRoute } from 'astro-og-canvas';
import sharp from 'sharp';

const PREPARED_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../../node_modules/.astro-og-canvas/prepared',
);

const { default: carte } = await import('../../data/carte.json');

const ALPHA_SVG = `<svg width="1200" height="630"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#000"/><stop offset="0.5" stop-color="#000"/><stop offset="0.75" stop-color="#fff"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><rect width="1200" height="630" fill="url(#g)"/></svg>`;

const gradAlpha = await sharp(Buffer.from(ALPHA_SVG))
  .greyscale()
  .raw()
  .toBuffer();

function shortDescription(text?: string) {
  const first = text?.split('.')[0] || '';
  return first.length > 140 ? `${first.slice(0, 137)}…` : first;
}

interface OgPageData {
  title: string;
  description?: string;
  id?: number;
  images?: string;
}

const staticPages: Record<string, OgPageData> = {
  index: {
    title: 'Les Miches à Micha – Boulangerie artisanale bio',
    description: 'Pains au levain, viennoiseries et pâtisseries faits main.',
  },
  carte: {
    title: 'La Carte',
    description:
      'Découvrez nos pains artisanaux, viennoiseries et pâtisseries.',
  },
  ateliers: {
    title: 'Les Ateliers',
    description:
      "Apprenez l'art de la boulangerie avec nos ateliers participatifs.",
  },
};

const productPages: Record<string, OgPageData> = Object.fromEntries(
  carte.products
    .filter((p) => p.visible)
    .map((p) => [
      `carte/${p.id}`,
      {
        id: p.id,
        title: p.title,
        description: p.description,
        images: p.images,
      },
    ]),
);

export const prerender = true;

export const { getStaticPaths, GET } = await OGImageRoute({
  pages: { ...staticPages, ...productPages },

  getImageOptions: async (path, page) => {
    let bgImage: { path: string; fit: 'fill' } | undefined;
    if (path.startsWith('carte/') && page.images) {
      const preparedPath = join(PREPARED_DIR, `${page.id}.png`);
      mkdirSync(PREPARED_DIR, { recursive: true });
      const photo = await sharp(`./public/images/${page.images}`)
        .resize(1200, 630, { fit: 'cover' })
        .modulate({ brightness: 0.4 })
        .blur(1.5)
        .removeAlpha()
        .toBuffer();
      const alpha = gradAlpha;
      await sharp(photo)
        .joinChannel(alpha, { raw: { width: 1200, height: 630, channels: 1 } })
        .png()
        .toFile(preparedPath);
      bgImage = { path: preparedPath, fit: 'fill' };
    }
    return {
      title: page.title,
      description: shortDescription(page.description),
      format: 'JPEG',
      quality: 82,
      logo: {
        path: './public/miches_noir_invert.png',
        size: [300],
      },
      bgGradient: [[20, 19, 19]],
      bgImage,
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
    };
  },
});
