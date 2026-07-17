import { getEntries } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getPosts } from '../lib/posts';

export async function GET(context) {
	const posts = await getPosts();
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: await Promise.all(
			posts.map(async (post) => {
				const { authors, ...data } = post.data;
				const names = (await getEntries(authors)).map((author) => author.data.name);
				return {
					...data,
					author: names.join(', '),
					link: `/blog/${post.id}/`,
				};
			}),
		),
	});
}
