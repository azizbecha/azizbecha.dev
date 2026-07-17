// @ts-check

import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import pagefind from 'astro-pagefind';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
	site: 'https://azizbecha.dev',
	integrations: [mdx(), sitemap(), react(), pagefind()],
	markdown: {
		rehypePlugins: [
			// Astro's own heading-id pass normally runs after user plugins;
			// run it first so autolink sees the ids.
			rehypeHeadingIds,
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'append',
					properties: { className: ['heading-anchor'], ariaLabel: 'Link to this section' },
					content: { type: 'text', value: '#' },
				},
			],
		],
	},
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
	vite: {
		plugins: [tailwindcss()],
	},
});
