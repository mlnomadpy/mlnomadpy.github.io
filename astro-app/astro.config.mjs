import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mlnomadpy.github.io',
  base: '/',
  output: 'static',
  build: {
    format: 'file',
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
});
