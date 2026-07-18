import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { getPosts, serializePost } from '@/lib/posts';

export async function getStaticPaths() {
	const posts = await getPosts();
	return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export const GET: APIRoute<{ post: CollectionEntry<'blog'> }> = async ({ props, site }) => {
	const serialized = await serializePost(props.post, site);
	// The single-post endpoint also carries the raw markdown body.
	return new Response(JSON.stringify({ ...serialized, body: props.post.body ?? '' }, null, '\t'), {
		headers: { 'Content-Type': 'application/json; charset=utf-8' },
	});
};
