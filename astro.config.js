// @ts-check
import { unified } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import classPlugin from './class-plugin.js';
import fragmentPlugin from './fragment-plugin.js';
import fragmentTransformer from './fragment-transformer.js';
import slidesPlugin from './slides-plugin.js';


// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [
			// @ts-ignore
			viteStaticCopy({
				targets: [
					{
						src: 'node_modules/p-slides/css/*.css',
						dest: '',
						rename: { stripBase: 1 }
					}
				]
			})
		]
	},
	markdown: {
		processor: unified({
			remarkPlugins: [
				slidesPlugin
			],
			rehypePlugins: [
				classPlugin, fragmentPlugin
			]
		}),
		shikiConfig: {
			transformers: [fragmentTransformer]
		}
	},
	devToolbar: {
		enabled: false
	}
});
