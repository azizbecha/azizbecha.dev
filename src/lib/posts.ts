import { getCollection } from 'astro:content';

/** Blog posts sorted newest first. Pass `limit` to take the top N. */
export async function getPosts(limit?: number) {
	const posts = (await getCollection('blog')).sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);
	return limit ? posts.slice(0, limit) : posts;
}
