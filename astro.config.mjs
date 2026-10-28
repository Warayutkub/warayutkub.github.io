// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // User site on GitHub Pages: served from the domain root, so no `base`.
  site: 'https://warayutkub.github.io',
  vite: {
    plugins: [tailwindcss()]
  }
});