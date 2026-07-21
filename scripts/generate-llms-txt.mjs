import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SITE_URL = 'https://les-miches-a-micha.vercel.app';

const carte = JSON.parse(
  readFileSync(resolve(ROOT, 'src/data/carte.json'), 'utf-8'),
);

function parseFrontmatter(file) {
  const match = file.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    fm[key] = val;
  }
  return fm;
}

const home = parseFrontmatter(
  readFileSync(resolve(ROOT, 'src/content/pages/home.md'), 'utf-8'),
);
const ateliers = parseFrontmatter(
  readFileSync(resolve(ROOT, 'src/content/pages/ateliers.md'), 'utf-8'),
);

const featured = [101, 202, 401, 402, 501, 601, 909];

const products = carte.products.filter(
  (p) => p.visible && featured.includes(p.id),
);

const lines = [
  `# Les Miches à Micha`,
  '',
  '> Boulangerie artisanale à Suresnes : pains bio au levain, livraison à domicile et ateliers boulangers.',
  '',
  'Micro-fournil artisanal spécialisé dans les pains au levain naturel, fabriqués à la demande à partir de farines bio, locales et semences paysannes. Livraison à domicile sur Suresnes et alentours, ateliers boulangers pour apprendre à faire son pain.',
  '',
  '## Pages principales',
  '',
  `- [Accueil](${SITE_URL}/): ${home.tagline?.replace(/\\n/g, ' ') || 'Présentation du micro-fournil'}`,
  `- [La Carte](${SITE_URL}/carte): Catalogue complet des pains, viennoiseries et gourmandises avec prix`,
  `- [Ateliers Boulangers](${SITE_URL}/ateliers): ${ateliers.subtitle || 'Ateliers de boulangerie artisanale'}`,
  '',
  '## Nos spécialités',
  '',
];

for (const p of products) {
  const desc = p.description?.split('.')[0] || p.category;
  lines.push(`- [${p.title}](${SITE_URL}/carte/${p.id}): ${desc}`);
}

lines.push('');
lines.push('## Optional');
lines.push('');

const optional = carte.products.filter(
  (p) => p.visible && !featured.includes(p.id),
);
for (const p of optional.slice(0, 10)) {
  const desc = p.description?.split('.')[0] || p.category;
  lines.push(`- [${p.title}](${SITE_URL}/carte/${p.id}): ${desc}`);
}

lines.push('');

writeFileSync(resolve(ROOT, 'public/llms.txt'), lines.join('\n'), 'utf-8');
console.log(
  `Generated llms.txt with ${products.length + optional.slice(0, 10).length} product links`,
);
