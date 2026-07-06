import { z, defineCollection } from 'astro:content';

const pageSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  tagline: z.string().optional(),
  intro: z.string().optional(),
  outro: z.string().optional(),
  workshops: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })).optional(),
  formats: z.array(z.object({
    title: z.string(),
    description: z.string(),
    price: z.string(),
  })).optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
});

const pages = defineCollection({
  type: 'content',
  schema: pageSchema,
});

export const collections = { pages };
