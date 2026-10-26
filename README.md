# Taha Bouhsine’s personal site

Research, poems, talks, music, and a little about the person behind them.

The site uses Vue 3 and Vite SSG. Every public route, including each poem and talk, is generated as HTML. The blog is a separate project at `/blog/`; this repository links to it.

## Develop

Use Node 20 or newer.

```sh
npm ci
npm run dev
```

## Verify and preview

```sh
npm run build
npm run check
npm run serve
```

`check` verifies generated pages, internal links, asset references, metadata, complete poem text, discoverable lazy-loaded recording players, and every page’s JSON-LD. Schema checks use a reviewed subset of the official Schema.org vocabulary and check the rendered content as well as the graph. They also run in the existing deploy workflow. See [structured-data validation](docs/structured-data-validation.md) for coverage and external test results.

SEO checks also verify unique search metadata, social previews, image and font assets, fragment links, sitemap coverage, and discovery within three clicks. Run `npm run check:seo` against an existing build. See the [SEO audit](docs/seo-audit.md) for the Search Console baseline, fixes, and production follow-up.

Before shipping, also inspect desktop and mobile layouts, keyboard navigation, search, browser Back, and the CV print layout.

## Edit content

- `src/data/poetry.json`: poems. Preserve the original wording, line breaks, dates, and language labels.
- `src/data/talk-art.json`: local thumbnail paths for the recording library; artwork is in `public/talk-art/`.
- `src/utils/searchMeta.js`: concise search titles and complete snippet excerpts; original session names and URLs stay in `talks.json`.
- `src/data/talks.json`: talk descriptions and resource links. Existing title-derived URLs are preserved; changing a title also changes its URL, so add a redirect when renaming.
- `src/data/video-metadata.json`: verified recording upload timestamps and durations, with YouTube source URLs and verification dates. When adding a recording, check its original upload metadata rather than guessing from the talk date.
- `src/data/publications.json`: papers shown on Research.
- `src/data/about-me-data.js`: CV experience, education, and credentials.
- `src/data/reading.js`: selected blog articles.
- `src/views/AboutMeView.vue`: personal introduction. Use real details rather than inventing biographical scenes.
- `src/assets/site.css`: layout, typography, and visual styles.
- `src/assets/fonts.css`: self-hosted Arabic and Tifinagh fonts with `font-display: swap`; original font licenses are in `public/fonts/`.
- `src/utils/structuredData.js`: shared page-specific JSON-LD builders. Keep entities consistent with the visible content; run `npm run build && npm run check` after changes.

Recording pages include native lazy-loaded YouTube privacy-enhanced players so crawlers can discover the video without clicking. They do not autoplay; a visit to a recording page can contact YouTube. Spotify loads after a visitor requests its player. The homepage film and its poster are served locally; playback respects reduced-motion preferences and has a pause control. The original source video is retained in `src/assets/background-video.mp4`, and the smaller delivery copy is in `public/background-video.mp4`. The portrait appears on About. Navigation uses ordinary links and the document scrolls normally.

## Deploy

The existing GitHub Actions workflow builds and publishes pushes to `master`. The custom domain is configured in `CNAME`. Run build and content checks before pushing. The site has not been deployed by making local changes.

`public/sitemap-index.xml` also references standalone projects on the same domain; preserve those entries when changing the portfolio sitemap.

`scripts/generate-sitemap.mjs` derives `dist/sitemap.xml` from the generated HTML canonicals, excluding errors and deduplicating aliases. It deliberately omits `lastmod` until trustworthy per-page modification dates are available.
