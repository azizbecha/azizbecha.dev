---
title: 'Code blocks showcase'
description: 'A tour of what code blocks can do on this blog: frames, titles, line highlights, and diffs.'
pubDate: 'Jul 17 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
tags: ['demo', 'meta']
---

This post demos the code block features powered by Expressive Code. Delete it once real posts exist.

## Plain block with syntax highlighting

```ts
export async function getPosts(limit?: number) {
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	return limit ? posts.slice(0, limit) : posts;
}
```

Hover it — a copy button appears in the corner.

## Editor frame with a file title

```ts title="src/lib/posts.ts"
/** Estimated reading time in whole minutes (min 1). */
export function readingTime(markdown: string | undefined): number {
	const words = (markdown ?? '').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 200));
}
```

## Shell blocks

Shell snippets render as plain code blocks — no terminal chrome:

```bash
pnpm add astro-expressive-code
npx astro build
```

## Highlighted lines

Mark the lines that matter with `{2-3}`:

```ts {2-3}
const authors = defineCollection({
	loader: glob({ base: './src/content/authors', pattern: '**/*.json' }),
	schema: z.object({ name: z.string() }),
});
```

## Diff markers

Show what changed with `ins` and `del`:

```ts ins={3} del={2}
const blog = defineCollection({
	schema: z.object({ title: z.string() }),
	schema: z.object({ title: z.string(), tags: z.array(z.string()).default([]) }),
});
```

## Inline code

Inline code like `astro dev --background` stays styled by the site theme, untouched by Expressive Code.
