// @ts-check

import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import icon from 'astro-icon';
import pagefind from 'astro-pagefind';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// https://astro.build/config
export default defineConfig({
	site: 'https://azizbecha.dev',
	// expressiveCode must come before mdx so it processes code fences first.
	integrations: [
		expressiveCode({
			themes: ['tokyo-night'],
			styleOverrides: {
				borderRadius: '0.5rem',
				borderColor: 'var(--border)',
				codeFontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
				frames: {
					shadowColor: 'transparent',
				},
			},
		}),
		mdx(),
		sitemap({
			// No news/video/i18n/image entries on this site — keep the XML lean.
			namespaces: { news: false, xhtml: false, image: false, video: false },
		}),
		react(),
		pagefind(),
		icon(),
	],
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
					// aria-hidden span so the visible "#" doesn't clash with the aria-label
					// (accessible-name-must-contain-visible-text rule).
					content: {
						type: 'element',
						tagName: 'span',
						properties: { ariaHidden: 'true' },
						children: [{ type: 'text', value: '#' }],
					},
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
