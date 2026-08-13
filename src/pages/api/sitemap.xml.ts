import type { APIRoute } from 'astro';

const SITE_URL =
  import.meta.env.SITE ||
  (import.meta.env.VERCEL_URL && `https://${import.meta.env.VERCEL_URL}`) ||
  'https://les-miches-a-micha.vercel.app';

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/carte', priority: '0.9', changefreq: 'weekly' },
  { path: '/ateliers', priority: '0.8', changefreq: 'monthly' },
];

const lastmod = new Date().toISOString().split('T')[0];

export const GET: APIRoute = async () => {
  const { default: carte } = await import('../../data/carte.json');
  const productPages = carte.products
    .filter((p: { visible: boolean }) => p.visible)
    .map((p: { id: number }) => `/carte/${p.id}`);

  const entries = [
    ...staticPages,
    ...productPages.map((path) => ({
      path,
      priority: '0.7',
      changefreq: 'monthly',
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${SITE_URL}${entry.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
