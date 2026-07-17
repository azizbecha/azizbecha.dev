import { getCollection } from 'astro:content';

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
