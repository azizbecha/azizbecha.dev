import { type CollectionEntry, getCollection, getEntries } from 'astro:content';

const WORDS_PER_MINUTE = 200;

/** Estimated reading time in whole minutes (min 1) for a markdown body. */
export function readingTime(markdown: string | undefined): number {
	const text = (markdown ?? '')
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/[#>*_[\]()`!-]/g, ' ');
	const words = text.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Blog posts sorted newest first. Pass `limit` to take the top N. */
export async function getPosts(limit?: number) {
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	return limit ? posts.slice(0, limit) : posts;
}

/** All tags with post counts, sorted by count desc then name. */
export async function getAllTags(): Promise<Map<string, number>> {
	const posts = await getPosts();
	const tags = new Map<string, number>();
	for (const post of posts) {
		for (const tag of post.data.tags) tags.set(tag, (tags.get(tag) ?? 0) + 1);
	}
	return new Map([...tags.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])));
}

/** Posts carrying the given tag, newest first. */
export async function getPostsByTag(tag: string) {
	return (await getPosts()).filter((post) => post.data.tags.includes(tag));
}

/** JSON-safe shape of a post for the public API. */
export async function serializePost(post: CollectionEntry<'blog'>, site?: URL) {
	const authors = await getEntries(post.data.authors);
	return {
		slug: post.id,
		title: post.data.title,
		description: post.data.description,
		pubDate: post.data.pubDate.toISOString(),
		...(post.data.updatedDate && { updatedDate: post.data.updatedDate.toISOString() }),
		tags: post.data.tags,
		minutes: readingTime(post.body),
		authors: authors.map((author) => ({
			id: author.id,
			name: author.data.name,
			...(author.data.url && { url: author.data.url }),
		})),
		...(post.data.heroImage && {
			heroImage: site ? new URL(post.data.heroImage.src, site).href : post.data.heroImage.src,
		}),
		url: site ? new URL(`/blog/${post.id}/`, site).href : `/blog/${post.id}/`,
	};
}
