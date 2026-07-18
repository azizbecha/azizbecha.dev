import { defineMiddleware } from 'astro:middleware';

// Mirror the Vercel rewrites (vercel.json) in dev: /api/posts and /api/posts/<slug>
// resolve to their .json endpoints. In production the static host handles this.
export const onRequest = defineMiddleware((context, next) => {
	const { pathname } = context.url;
	if (!pathname.endsWith('.json')) {
		const match = pathname.match(/^\/api\/posts(?:\/([^/]+))?\/?$/);
		if (match) {
			return context.rewrite(match[1] ? `/api/posts/${match[1]}.json` : '/api/posts.json');
		}
	}
	return next();
});
