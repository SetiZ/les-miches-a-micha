import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    tagline: z.string().optional(),
    intro: z.string().optional(),
    outro: z.string().optional(),
    workshops: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      )
      .optional(),
    formats: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
          price: z.string(),
        }),
      )
      .optional(),
    contactPhone: z.string().optional(),
    contactEmail: z.string().optional(),
  }),
});

export const collections = { pages };
