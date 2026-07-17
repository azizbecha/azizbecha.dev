import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const authors = defineCollection({
	// One JSON file per author in `src/content/authors/`.
	loader: glob({ base: './src/content/authors', pattern: '**/*.json' }),
	schema: z.object({
		name: z.string(),
		avatar: z.string().optional(),
		bio: z.string().optional(),
		url: z.url().optional(),
	}),
});

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Normalized to lowercase so "Astro" and "astro" never fork.
			tags: z.array(z.string().transform((tag) => tag.trim().toLowerCase())).default([]),
			// Always an array; a solo post is an array of one.
			authors: z
				.array(reference('authors'))
				.min(1)
				.default(() => [{ collection: 'authors' as const, id: 'aziz-becha' }]),
		}),
});

export const collections = { authors, blog };
