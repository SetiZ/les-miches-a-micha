import type { APIRoute } from 'astro';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://les-miches-a-micha.vercel.app';

const staticPages = ['/', '/carte', '/ateliers'];

export const GET: APIRoute = async () => {
  const { default: carte } = await import('../../data/carte.json');
  const productPages = carte.products
    .filter((p: { visible: boolean }) => p.visible)
    .map((p: { id: number }) => `/carte/${p.id}`);

  const allPages = [...staticPages, ...productPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page}</loc>
    <changefreq>${page === '/' ? 'weekly' : page === '/carte' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '/' ? '1.0' : page === '/carte' ? '0.9' : '0.7'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
