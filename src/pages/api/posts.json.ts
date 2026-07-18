import type { APIRoute } from 'astro';
import { getPosts, serializePost } from '../../lib/posts';

export const GET: APIRoute = async ({ site }) => {
	const posts = await getPosts();
	const items = await Promise.all(posts.map((post) => serializePost(post, site)));
	return new Response(JSON.stringify({ count: items.length, posts: items }, null, '\t'), {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
};
