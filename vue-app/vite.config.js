import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import generateSitemap from 'vite-ssg-sitemap'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() {
      generateSitemap({
        hostname: 'https://mlnomadpy.github.io',
        readable: true /* consistent indentation */
      })
    },
    includedRoutes(paths, routes) {
      // Static routes are already in 'paths'
      const extraRoutes = []

      // Helper to read JSON and extract IDs/Slugs
      const readData = (filename, slugFn) => {
        try {
          const filePath = resolve(__dirname, 'src/data', filename)
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, 'utf-8')
            const data = JSON.parse(content)
            // Handle array or object structure
            const items = Array.isArray(data) ? data : (data.default || [])
            items.forEach(item => {
              const slug = slugFn(item)
              if (slug) extraRoutes.push(slug)
            })
          }
        } catch (e) {
          console.warn(`Failed to process ${filename} for sitemap`, e)
        }
      }

      // 1. Talks - /talks/:id (slug from title)
      readData('talks.json', (item) => {
        const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        return `/talks/${slug}`
      })

      // 2. Research - /research/:id (using item.id)
      readData('research.json', (item) => {
        return item.id ? `/research/${item.id}` : null
      })

      // 3. Poetry - /poetry/:id (using item.id)
      readData('poetry.json', (item) => {
        return item.id ? `/poetry/${item.id}` : null
      })

      // 4. Blogs - /blogs/:id (using item.id) -> Assuming blogs.json exists
      readData('blogs.json', (item) => {
        return item.id ? `/blogs/${item.id}` : null
      })

      return paths.concat(extraRoutes)
    }
  },
})
