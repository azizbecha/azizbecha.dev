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
