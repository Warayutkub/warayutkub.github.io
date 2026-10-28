import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One folder per project in src/content/works/<slug>/ with index.md + its images.
// Adding a project = adding one folder.
const works = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/works', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      label: z.string(), // short frame-style name, e.g. "dech-karnchang"
      summary: z.string(),
      category: z.string(),
      year: z.number(),
      status: z.enum(['live', 'built', 'design']),
      liveUrl: z.string().url().optional(),
      role: z.string().optional(),
      tags: z.array(z.string()).default([]),
      cover: image(),
      screens: z.array(z.object({ src: image(), caption: z.string(), alt: z.string() })).default([]),
      shots: z.array(z.object({ src: image(), alt: z.string() })).default([]),
      order: z.number(),
      featured: z.boolean().default(false),
    }),
});

export const collections = { works };
