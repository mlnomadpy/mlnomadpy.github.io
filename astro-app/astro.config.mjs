import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mlnomadpy.github.io',
  // GitHub Pages deployment configuration
  // base: '/', // Use this if deploying to root domain
  output: 'static', // Static site generation for GitHub Pages
  build: {
    inlineStylesheets: 'auto',
  },
});
