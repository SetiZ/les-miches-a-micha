import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SITE_URL = 'https://les-miches-a-micha.vercel.app';

const carte = JSON.parse(
  readFileSync(resolve(ROOT, 'src/data/carte.json'), 'utf-8'),
);

const featured = [101, 202, 401, 402, 501, 601, 909];

const products = carte.products.filter(
  (p) => p.visible && featured.includes(p.id),
);

const lines = [
  `# Les Miches à Micha`,
  '',
  '> Boulangerie artisanale bio à Suresnes (92150). Commandes en ligne, livraison à domicile et ateliers boulangers.',
  '',
  'Micro-fournil artisanal spécialisé dans les pains au levain naturel, fabriqués à la demande à partir de farines bio, locales et semences paysannes. Ouvert du lundi au vendredi de 7h à 13h et le week-end de 7h à 12h30, au 29 rue Gambetta, Suresnes. Commandez en ligne ou par téléphone au 06 52 39 48 79.',
  '',
  '## Pages principales',
  '',
  `- [Accueil](${SITE_URL}/): Présentation du micro-fournil, livraison à domicile et commande personnalisée`,
  `- [La Carte](${SITE_URL}/carte): Catalogue complet des pains, viennoiseries et gourmandises avec prix`,
  `- [Ateliers Boulangers](${SITE_URL}/ateliers): Ateliers de boulangerie artisanale pour apprendre à faire son pain`,
  '',
  '## Nos spécialités',
  '',
];

for (const p of products) {
  const desc = p.description?.split('.')[0] || p.category;
  lines.push(`- [${p.title}](${SITE_URL}/carte/${p.id}): ${desc}`);
}

lines.push('');
lines.push('## Catalogue complet');
lines.push('');

const catalog = carte.products.filter(
  (p) => p.visible && !featured.includes(p.id),
);
for (const p of catalog) {
  const desc = p.description?.split('.')[0] || p.category;
  lines.push(`- [${p.title}](${SITE_URL}/carte/${p.id}): ${desc}`);
}

lines.push('');

writeFileSync(resolve(ROOT, 'public/llms.txt'), lines.join('\n'), 'utf-8');
console.log(
  `Generated llms.txt with ${products.length + catalog.length} product links`,
);
